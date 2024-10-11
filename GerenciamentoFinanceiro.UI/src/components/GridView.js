import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtrarTransacoes } from '../redux/actions';
import { FaSignOutAlt, FaEdit, FaTrash } from 'react-icons/fa';
import ModalTransacao from './ModalTransacao.js';
import ConfirmacaoModal from './ConfirmacaoModal.js'; 
import { adicionarTransacao, editarTransacao, buscarTransacaoPorId, excluirTransacao } from '../services/transacaoService.js';
import '../css/gridView.css';

const Status = {
    0: 'Recebido',
    1: 'A Receber',
    2: 'Pendente',
    3: 'Pago',
    4: 'Em Negociação',
};

const TipoTransacao = {
    0: 'Receita',
    1: 'Despesa',
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

    // Estados temporários para os filtros
    const [filtroOrdenacaoValor, setFiltroOrdenacaoValor] = useState('');
    const [filtroOrdenacaoVencimento, setFiltroOrdenacaoVencimento] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');

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
            aplicarFiltros(); // Atualiza a lista após adicionar/editar
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
            aplicarFiltros(); // Atualiza a lista após excluir
        } catch (error) {
            console.error("Erro ao excluir transação:", error);
        } finally {
            setConfirmacaoOpen(false);
        }
    };

    const aplicarFiltros = () => {
        setIsLoading(true);
        // Aplicar os filtros usando os valores dos estados temporários
        dispatch(filtrarTransacoes({ 
            ordenacaoValor: filtroOrdenacaoValor, 
            ordenacaoVencimento: filtroOrdenacaoVencimento, 
            tipo: filtroTipo, 
            status: filtroStatus 
        })).finally(() => setIsLoading(false));

        // Atualizar os estados dos filtros com os valores temporários
        setOrdenacaoValor(filtroOrdenacaoValor);
        setOrdenacaoVencimento(filtroOrdenacaoVencimento);
        setTipo(filtroTipo);
        setStatus(filtroStatus);
    };

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

    const transacoesOrdenadas = ordenarTransacoes(transacoes);

    const handleLogout = () => {
        window.location.href = '/';
        sessionStorage.setItem("Token", "");
    };

    // useEffect para carregar os dados inicialmente
    useEffect(() => {
        aplicarFiltros();
    }, []); // O array vazio faz com que o efeito seja executado apenas na montagem do componente

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
                        <li><a onClick={handleOpenModal}>Cadastrar Transação</a></li>
                        <li><a href="/meus-relatorios">Meus Relatórios</a></li>
                        <li><a href="/dashboard">Meu Dashboard</a></li>
                    </ul>
                    <div className="logout-icon" onClick={handleLogout}>
                        <FaSignOutAlt size={24} title="Logout" />
                    </div>
                </nav>
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
                        <button className="apply-filters-button" onClick={aplicarFiltros}>
                            Aplicar Filtros
                        </button>
                    </div>
                    <div className="grid-view">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Descrição</th>
                                    <th>Valor (R$)</th>
                                    <th>Forma de pagamento</th>
                                    <th>Vencimento</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="7">Carregando...</td>
                                    </tr>
                                ) : transacoesOrdenadas.length > 0 ? (
                                    transacoesOrdenadas.map((item) => (
                                        <tr key={item.id}>
                                            <td>{TipoTransacao[item.tipo] || 'N/A'}</td>
                                            <td>{item.descricao}</td>
                                            <td>{item.valor}</td>
                                            <td>{item.formaDePagamento}</td>
                                            <td>
                                                {item.dataVencimento ?
                                                    new Date(item.dataVencimento).toLocaleDateString('pt-BR', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric'
                                                    }) : 'N/A'}
                                            </td>
                                            <td>{Status[item.status] || 'N/A'}</td>
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
                                        <td colSpan="7">Nenhuma transação encontrada</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GridView;
