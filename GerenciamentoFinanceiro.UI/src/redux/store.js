import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk'; // Corrigindo a importação do thunk
import despesasReducer from './despesasReducer';
import receitasReducer from './receitasReducer';

const rootReducer = combineReducers({
    despesas: despesasReducer,
    receitas: receitasReducer
  });
  
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

export default store;
