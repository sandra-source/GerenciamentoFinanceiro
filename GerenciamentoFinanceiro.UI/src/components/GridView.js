// src/components/GridView.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtrarTransacoes } from '../redux/actions';

const GridView = () => {
  const dispatch = useDispatch();
  const transacoes = useSelector((state) => [
    ...state.despesas,
    ...state.receitas
  ]); // Combina despesas e receitas do estado global

  useEffect(() => {
    dispatch(filtrarTransacoes());
  }, [dispatch]);

  return (
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
  );
};

export default GridView;
