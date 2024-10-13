import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk'; 
import transacoesReducer from './transacoesReducer'; 

const rootReducer = combineReducers({
    transacoes: transacoesReducer,
});
  
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
