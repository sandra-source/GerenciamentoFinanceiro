// src/components/GridView.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtrarTransacoes } from '../redux/actions';
import { FaSignOutAlt } from 'react-icons/fa';
import '../css/gridView.css';

const GridView = () => {
    const dispatch = useDispatch();
    const transacoes = useSelector((state) => state.transacoes ?? []); // Garantir que seja um array
    
    const [ordenacaoValor, setOrdenacaoValor] = useState('');
    const [ordenacaoVencimento, setOrdenacaoVencimento] = useState('');
    const [tipo, setTipo] = useState('');
    const [status, setStatus] = useState('');

    const aplicarFiltros = () => {
        dispatch(filtrarTransacoes({ ordenacaoValor, ordenacaoVencimento, tipo, status }));
    };

    const handleLogout = () => {
        window.location.href = '/';
        sessionStorage.setItem("Token", "");
    };

    return (
        <div className="grid-view-container">
            <nav className="navbar">
                <ul>
                    <li><a href="/cadastrar-despesa">Cadastrar Despesa</a></li>
                    <li><a href="/cadastrar-receita">Cadastrar Receita</a></li>
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
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            <option value="">Todos</option>
                            <option value="Despesa">Despesa</option>
                            <option value="Receita">Receita</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Status:</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Todos</option>
                            <option value="Pago">Pago</option>
                            <option value="Pendente">Pendente</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Ordenar por Valor:</label>
                        <select value={ordenacaoValor} onChange={(e) => setOrdenacaoValor(e.target.value)}>
                            <option value="">Selecione</option>
                            <option value="crescente">Crescente</option>
                            <option value="decrescente">Decrescente</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Ordenar por Vencimento:</label>
                        <select value={ordenacaoVencimento} onChange={(e) => setOrdenacaoVencimento(e.target.value)}>
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
                                <th>Valor</th>
                                <th>Vencimento</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(transacoes) && transacoes.length > 0 ? (
                                transacoes.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.tipo}</td>
                                        <td>{item.descricao}</td>
                                        <td>{item.valor}</td>
                                        <td>{item.dataVencimento}</td>
                                        <td>{item.status || 'N/A'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Nenhuma transação encontrada</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GridView;
