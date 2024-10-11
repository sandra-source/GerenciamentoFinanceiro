import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtrarTransacoes } from '../redux/actions';
import { FaSignOutAlt, FaHome, FaFilePdf, FaFileExcel } from 'react-icons/fa';
import ConfirmacaoModal from './ConfirmacaoModal.js';
import { excluirTransacao } from '../services/transacaoService.js';
import '../css/gridView.css';
import { exportToExcel, exportToPdf } from '../utils/exportUtils'; // Funções utilitárias para exportação

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

const RelatoriosView = () => {
    const dispatch = useDispatch();
    const transacoes = useSelector((state) => state.transacoes.transacoes || []);

    const [ordenacaoValor, setOrdenacaoValor] = useState('');
    const [ordenacaoVencimento, setOrdenacaoVencimento] = useState('');
    const [tipo, setTipo] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmacaoOpen, setConfirmacaoOpen] = useState(false);
    const [transacaoAtual, setTransacaoAtual] = useState(null);
    const [descricaoParaExcluir, setDescricaoParaExcluir] = useState('');

    const [filtroOrdenacaoValor, setFiltroOrdenacaoValor] = useState('');
    const [filtroOrdenacaoVencimento, setFiltroOrdenacaoVencimento] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');
    const [filtroDataInicio, setFiltroDataInicio] = useState('');
    const [filtroDataFim, setFiltroDataFim] = useState('');

    const aplicarFiltros = () => {
        setIsLoading(true);
        dispatch(filtrarTransacoes({ 
            ordenacaoValor: filtroOrdenacaoValor, 
            ordenacaoVencimento: filtroOrdenacaoVencimento, 
            tipo: filtroTipo, 
            status: filtroStatus,
            dataInicio: filtroDataInicio,
            dataFim: filtroDataFim
        })).finally(() => setIsLoading(false));

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

    const handleLogout = () => {
        window.location.href = '/';
        sessionStorage.setItem("Token", "");
    };

    const handleExportPdf = () => {
        exportToPdf(transacoesOrdenadas);
    };

    const handleExportExcel = () => {
        exportToExcel(transacoesOrdenadas);
    };

    useEffect(() => {
        aplicarFiltros();
    }, []);

    return (
        <>
            <ConfirmacaoModal 
                isOpen={isConfirmacaoOpen}
                onClose={() => setConfirmacaoOpen(false)}
                onConfirm={confirmarExclusao}
                descricao={descricaoParaExcluir}
            />
            <div className="grid-view-container">
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
                        <button className="apply-filters-button" onClick={aplicarFiltros}>
                            Aplicar Filtros
                        </button>
                        <button className="export-button" onClick={handleExportPdf}>
                            <FaFilePdf /> Exportar em PDF
                        </button>
                        <button className="export-button">
                            <FaFileExcel /> Exportar em Excel
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
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="6">Carregando...</td>
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
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">Nenhuma transação encontrada</td>
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

export default RelatoriosView;
