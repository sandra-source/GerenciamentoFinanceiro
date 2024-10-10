// src/redux/despesasReducer.js
import { SET_TRANSACOES } from './actions';

const despesasReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TRANSACOES:
      return action.payload; 
    default:
      return state;
  }
};

export default despesasReducer;
