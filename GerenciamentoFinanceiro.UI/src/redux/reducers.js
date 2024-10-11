import { combineReducers } from 'redux';
import transacoesReducer from './transacoesReducer';

const rootReducer = combineReducers({
  transacoes: transacoesReducer, 
});

export default rootReducer;  
