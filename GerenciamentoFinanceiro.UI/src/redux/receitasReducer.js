// src/redux/receitasReducer.js
import { SET_TRANSACOES } from './actions';

const receitasReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TRANSACOES:
      // Filtrar apenas as receitas
      return action.payload.filter(transacao => transacao.tipo === 'Receita');
    default:
      return state;
  }
};

export default receitasReducer;
