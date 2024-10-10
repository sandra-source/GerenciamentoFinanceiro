import { combineReducers } from 'redux';
import despesasReducer from './despesasReducer';

const rootReducer = combineReducers({
  transacoes: despesasReducer, 
});

export default rootReducer;
