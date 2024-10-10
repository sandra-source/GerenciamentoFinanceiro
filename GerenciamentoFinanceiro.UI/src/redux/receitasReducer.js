import { SET_TRANSACOES, LIMPAR_TRANSACOES } from './actions';

const receitasReducer = (state = [], action) => {
    switch (action.type) {
        case LIMPAR_TRANSACOES:
            return []; 
        case SET_TRANSACOES:
            return action.payload; 
        default:
            return state;
    }
};

export default receitasReducer;