import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk'; // Corrigindo a importação do thunk
import transacoesReducer from './transacoesReducer'; // Ajuste para usar transações

const rootReducer = combineReducers({
    transacoes: transacoesReducer, // Utilize transações como a chave principal
});
  
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
