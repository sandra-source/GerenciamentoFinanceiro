// src/redux/reducers.js
const initialState = {
  despesas: [],
  receitas: [],
  transacoes: [], // Estado inicial como array vazio
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SET_TRANSACOES':
          return {
              ...state,
              transacoes: action.payload || [],
          };
      default:
          return state;
  }
};

export default rootReducer;
