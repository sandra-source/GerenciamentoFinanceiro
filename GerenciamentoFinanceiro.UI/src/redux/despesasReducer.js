// src/redux/despesasReducer.js
import { SET_TRANSACOES } from './actions';

const despesasReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TRANSACOES:
      // Filtrar apenas as despesas
      return action.payload.filter(transacao => transacao.tipo === 'Despesa');
    default:
      return state;
  }
};


export default despesasReducer;
