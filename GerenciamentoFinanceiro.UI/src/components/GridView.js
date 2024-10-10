// src/components/GridView.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtrarTransacoes } from '../redux/actions';
import '../css/gridView.css';

const GridView = () => {
    const dispatch = useDispatch();
    const transacoes = useSelector((state) => [
        ...state.despesas,
        ...state.receitas
    ]);

    useEffect(() => {
        dispatch(filtrarTransacoes());
    }, [dispatch]);

    return (
        <div className="grid-view-container">
            <nav className="navbar">
                <ul>
                    <li><a href="/cadastrar-despesa">Cadastrar Despesa</a></li>
                    <li><a href="/cadastrar-receita">Cadastrar Receita</a></li>
                    <li><a href="/meus-relatorios">Meus Relatórios</a></li>
                    <li><a href="/dashboard">Meu Dashboard</a></li>
                </ul>
            </nav>
            <div className="grid-view">
                <table>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Vencimento (dia da semana)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transacoes.length > 0 ? (
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
    );
};

export default GridView;
