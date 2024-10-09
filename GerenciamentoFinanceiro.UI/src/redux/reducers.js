// src/redux/reducers.js
const initialState = {
    transacoes: []
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TRANSACOES':
        return {
          ...state,
          transacoes: action.payload
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  