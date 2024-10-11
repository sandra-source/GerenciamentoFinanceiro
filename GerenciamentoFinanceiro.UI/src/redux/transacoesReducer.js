import { SET_TRANSACOES, LIMPAR_TRANSACOES } from './actions';

const initialState = {
    transacoes: [],
};

const transacoesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRANSACOES:
            return { ...state, transacoes: action.payload };
        case LIMPAR_TRANSACOES:
            return { ...state, transacoes: [] };
        default:
            return state;
    }
};

export default transacoesReducer;
