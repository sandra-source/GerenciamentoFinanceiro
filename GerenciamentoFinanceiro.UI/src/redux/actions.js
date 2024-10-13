import { buscarTransacoes } from '../services/transacaoService'; 

export const SET_TRANSACOES = 'SET_TRANSACOES';
export const LIMPAR_TRANSACOES = 'LIMPAR_TRANSACOES';

export const limparTransacoes = () => ({
    type: LIMPAR_TRANSACOES,
});

export const filtrarTransacoes = (filtros, pageNumber = 1, pageSize = 10) => async (dispatch) => {
    try {
        dispatch(limparTransacoes());

        const response = await buscarTransacoes(filtros, pageNumber, pageSize); 
        console.log('Resposta da API após a paginação:', response.data); 

        const transacoes = response.data.map(t => ({ ...t })); 
        
        dispatch({
            type: SET_TRANSACOES,
            payload: transacoes,
        });
        
        return response; 
    } catch (error) {
        console.error('Erro ao filtrar transações:', error);
    }
};

