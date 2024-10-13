import React from 'react';
import { useDispatch } from 'react-redux';
import { filtrarReceitas, filtrarDespesas } from '../redux/actions';

const Filters = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === 'receitas') {
      dispatch(filtrarReceitas(value));
    } else {
      dispatch(filtrarDespesas(value));
    }
  };

  return (
    <div className="filters">
      <h3>Filtros</h3>
      <label>
        Período:
        <input type="date" name="dataInicio" onChange={handleFilterChange} />
      </label>
      <label>
        Tipo de Receita/Despesa:
        <select name="tipo" onChange={handleFilterChange}>
          <option value="todas">Todas</option>
          <option value="receitas">Receitas</option>
          <option value="despesas">Despesas</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;
