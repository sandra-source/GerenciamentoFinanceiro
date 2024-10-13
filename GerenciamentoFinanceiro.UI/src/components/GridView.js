import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtrarTransacoes } from '../redux/actions';
import { FaSignOutAlt, FaEdit, FaTrash, FaHome, FaFilePdf, FaFileExcel, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';
import ModalTransacao from './ModalTransacao.js';
import ConfirmacaoModal from './ConfirmacaoModal.js';
import HeaderOptions from './HeaderOptions.js';
import { adicionarTransacao, editarTransacao, buscarTransacaoPorId, excluirTransacao } from '../services/transacaoService.js';
import { exportToExcel, exportToPdf } from '../utils/exportUtils';
import '../css/gridView.css';
import Dashboard from './Dashboard.js';

const Status = {
    0: 'Pendente',
    1: 'Pago',
    2: 'Em Negociação',
    3: 'Vencido',
};

const TipoTransacao = {
    0: 'Receita',
    1: 'Despesa',
};

const Natureza = {
    0: 'Recorrente',
    1: 'Não Recorrente',
};

const FormaDePagamento = {
    0: 'Cartão',
    1: 'Dinheiro',
    2: 'Transferência',
    3: 'Pix',
    4: 'Cheque',
};

const GridView = () => {
    const dispatch = useDispatch();
    const transacoes = useSelector((state) => state.transacoes.transacoes || []);

    const [ordenacaoValor, setOrdenacaoValor] = useState('');
    const [ordenacaoVencimento, setOrdenacaoVencimento] = useState('');
    const [tipo, setTipo] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isConfirmacaoOpen, setConfirmacaoOpen] = useState(false);
    const [transacaoAtual, setTransacaoAtual] = useState(null);
    const [descricaoParaExcluir, setDescricaoParaExcluir] = useState('');
    const [mostrarDashboardComponent, setmostrarDashboardComponent] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const [filtroOrdenacaoValor, setFiltroOrdenacaoValor] = useState('');
    const [filtroOrdenacaoVencimento, setFiltroOrdenacaoVencimento] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');
    const [filtroDataInicio, setFiltroDataInicio] = useState('');
    const [filtroDataFim, setFiltroDataFim] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const mostrarDashboard = () => {
        setmostrarDashboardComponent(true);
    };

    const mostrarHome = () => {
        setmostrarDashboardComponent(false);
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => {
        setModalOpen(false);
        setTransacaoAtual(null);
    };

    const handleNewTransaction = async (novaTransacao) => {
        try {
            if (transacaoAtual) {
                await editarTransacao(novaTransacao.id, novaTransacao);
            } else {
                await adicionarTransacao(novaTransacao);
            }
            aplicarFiltros(); 
        } catch (error) {
            console.error("Erro ao salvar transação:", error);
        } finally {
            handleCloseModal();
        }
    };

    const handleEdit = async (id) => {
        try {
            const transacao = await buscarTransacaoPorId(id);
            setTransacaoAtual(transacao);
            handleOpenModal();
        } catch (error) {
            console.error("Erro ao buscar transação para edição:", error);
        }
    };

    const handleDelete = (id, descricao) => {
        setTransacaoAtual({ id });
        setDescricaoParaExcluir(descricao);
        setConfirmacaoOpen(true);
    };

    const confirmarExclusao = async () => {
        try {
            await excluirTransacao(transacaoAtual.id);
            aplicarFiltros();
        } catch (error) {
            console.error("Erro ao excluir transação:", error);
        } finally {
            setConfirmacaoOpen(false);
        }
    };

    const aplicarFiltros = (page = currentPage) => {
        setIsLoading(true);
    
        const tipoFiltrado = filtroTipo === "Receita" ? 0 : (filtroTipo === "Despesa" ? 1 : '');
    
        const dataInicioUtc = filtroDataInicio ? new Date(filtroDataInicio).toISOString() : '';
        const dataFimUtc = filtroDataFim ? new Date(filtroDataFim).toISOString() : '';
    
        dispatch(filtrarTransacoes({
            ordenacaoValor: filtroOrdenacaoValor,
            ordenacaoVencimento: filtroOrdenacaoVencimento,
            tipo: tipoFiltrado,
            status: filtroStatus,
            dataInicio: dataInicioUtc,
            dataFim: dataFimUtc
        }, page, itemsPerPage)).then(response => {
            if (response && response.headers) { 
                const totalTransacoes = parseInt(response.headers['x-total-count'], 10);
                const newTotalPages = Math.ceil(totalTransacoes / itemsPerPage); 
                setTotalPages(newTotalPages); 
            } else {
                console.error("API response did not return headers");
            }
        }).finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages]);

    const ordenarTransacoes = (transacoes) => {
        if (!Array.isArray(transacoes)) {
            console.error('Erro: transacoes não é um array', transacoes);
            return [];
        }

        let sortedTransacoes = [...transacoes];

        if (ordenacaoValor) {
            sortedTransacoes.sort((a, b) =>
                ordenacaoValor === 'crescente' ? a.valor - b.valor : b.valor - a.valor
            );
        }

        if (ordenacaoVencimento) {
            sortedTransacoes.sort((a, b) => {
                const dataA = new Date(a.dataVencimento);
                const dataB = new Date(b.dataVencimento);
                return ordenacaoVencimento === 'crescente' ? dataA - dataB : dataB - dataA;
            });
        }
        return sortedTransacoes;
    };

    const getTransactionStatusIcon = (item) => {
        const vencimento = new Date(item.dataVencimento);
        const hoje = new Date();
        const diffEmDias = (vencimento - hoje) / (1000 * 60 * 60 * 24);

        if (item.status === 1) {
            return <FaCheckCircle className="icon-check" title="Pago" />;
        } else if (diffEmDias < 0) {
            return <FaTimesCircle className="icon-times" title="Vencido" />;
        } else if (diffEmDias <= 30) {
            return <FaExclamationCircle className="icon-warning" title="Próximo do Vencimento" />;
        }
        return null;
    };

    const transacoesOrdenadas = ordenarTransacoes(transacoes);

    const currentItems = transacoesOrdenadas;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);  
        aplicarFiltros(pageNumber);  
    };

    const handleExportPdf = () => {
        exportToPdf(transacoesOrdenadas);
    };

    const handleExportExcel = () => {
        exportToExcel(transacoesOrdenadas);
    };

    const handleLogout = () => {
        window.location.href = '/';
        sessionStorage.setItem("Token", "");
    };

    useEffect(() => {
        aplicarFiltros();
    }, []);

    return (
        <>
            <ModalTransacao
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleNewTransaction}
                transacao={transacaoAtual}
            />
            <ConfirmacaoModal
                isOpen={isConfirmacaoOpen}
                onClose={() => setConfirmacaoOpen(false)}
                onConfirm={confirmarExclusao}
                descricao={descricaoParaExcluir}
            />
            <div className="grid-view-container">
                <nav className="navbar">
                    <ul>
                        {mostrarDashboardComponent && (
                            <li><a onClick={mostrarHome}><FaHome size={24} title="Home" /></a></li>
                        )}
                        {!mostrarDashboardComponent && (
                            <li><a onClick={handleOpenModal}>Cadastrar Transação</a></li>
                        )}
                        <li><a onClick={mostrarDashboard}>Meu Dashboard</a></li>
                    </ul>
                    <div className="logout-icon" onClick={handleLogout}>
                        <FaSignOutAlt size={24} title="Logout" />
                    </div>
                </nav>
                {mostrarDashboardComponent ? (
                    <Dashboard />
                ) : (
                    <div className="main-content">
                        <div className="filters-container">
                            <h3>Filtros</h3>
                            <div className="filter-item">
                                <label>Tipo:</label>
                                <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                                    <option value="">Todos</option>
                                    <option value="Receita">Receita</option>
                                    <option value="Despesa">Despesa</option>
                                </select>
                            </div>
                            <div className="filter-item">
                                <label>Status:</label>
                                <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
                                    <option value="">Todos</option>
                                    <option value="Pago">Pago</option>
                                    <option value="Pendente">Pendente</option>
                                    <option value="EmNegociacao">Em Negociação</option>
                                </select>
                            </div>
                            <div className="filter-item">
                                <label>Ordenar por Valor:</label>
                                <select value={filtroOrdenacaoValor} onChange={(e) => setFiltroOrdenacaoValor(e.target.value)}>
                                    <option value="">Selecione</option>
                                    <option value="crescente">Crescente</option>
                                    <option value="decrescente">Decrescente</option>
                                </select>
                            </div>
                            <div className="filter-item">
                                <label>Ordenar por Vencimento:</label>
                                <select value={filtroOrdenacaoVencimento} onChange={(e) => setFiltroOrdenacaoVencimento(e.target.value)}>
                                    <option value="">Selecione</option>
                                    <option value="crescente">Crescente</option>
                                    <option value="decrescente">Decrescente</option>
                                </select>
                            </div>
                            <div className="filter-item">
                                <label>Data de Início:</label>
                                <input
                                    type="date"
                                    value={filtroDataInicio}
                                    onChange={(e) => setFiltroDataInicio(e.target.value)}
                                />
                            </div>
                            <div className="filter-item">
                                <label>Data de Fim:</label>
                                <input
                                    type="date"
                                    value={filtroDataFim}
                                    onChange={(e) => setFiltroDataFim(e.target.value)}
                                />
                            </div>
                            <button className="apply-filters-button" onClick={() => aplicarFiltros(1)}>
                                Aplicar Filtros
                            </button>
                        </div>
                        <div className="grid-view">
                            <div className="grid-actions-container">
                                <button className="export-button pdf" onClick={handleExportPdf}>
                                    <FaFilePdf /> Relatório em PDF
                                </button>
                                <button className="export-button excel" onClick={handleExportExcel}>
                                    <FaFileExcel /> Relatório em Excel
                                </button>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th> 
                                        <th>Tipo</th>
                                        <th>Descrição</th>
                                        <th>Valor</th>
                                        <th>Forma de pagamento</th>
                                        <th>Vencimento</th>
                                        <th>Pagamento</th> 
                                        <th>Status</th>
                                        <th>Natureza</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="10">Carregando...</td>
                                        </tr>
                                    ) : currentItems.length > 0 ? (
                                        currentItems.map((item) => (
                                            <tr key={item.id}>
                                                <td>{getTransactionStatusIcon(item)}</td> 
                                                <td>{TipoTransacao[item.tipo] || 'N/A'}</td>
                                                <td>{item.descricao}</td>
                                                <td>{item.valor}</td>
                                                <td>{FormaDePagamento[item.formaDePagamento] || 'N/A'}</td> 
                                                <td>
                                                    {item.dataVencimento
                                                        ? item.dataVencimento.substring(0, 10).split('-').reverse().join('/')
                                                        : 'N/A'}
                                                </td>
                                                <td>
                                                    {item.dataPagamento
                                                        ? item.dataPagamento.substring(0, 10).split('-').reverse().join('/')
                                                        : 'N/A'}
                                                </td>
                                                <td>{Status[item.status] || 'N/A'}</td>
                                                <td>{Natureza[item.natureza] || 'N/A'}</td>
                                                <td>
                                                    <FaEdit
                                                        onClick={() => handleEdit(item.id)}
                                                        className="icon-action icon-edit"
                                                        title="Editar"
                                                    />
                                                    <FaTrash
                                                        onClick={() => handleDelete(item.id, item.descricao)}
                                                        className="icon-action icon-delete"
                                                        title="Excluir"
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10">Nenhuma transação encontrada</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="pagination-container">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}  
                                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default GridView;
