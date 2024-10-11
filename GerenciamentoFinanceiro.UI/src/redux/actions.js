import { buscarTransacoes } from '../services/transacaoService'; // Ajuste para usar a nova API

export const SET_TRANSACOES = 'SET_TRANSACOES';
export const LIMPAR_TRANSACOES = 'LIMPAR_TRANSACOES';

export const limparTransacoes = () => ({
    type: LIMPAR_TRANSACOES,
});

export const filtrarTransacoes = (filtros) => async (dispatch) => {
  try {
      dispatch(limparTransacoes());

      const transacoesResponse = await buscarTransacoes(filtros); // Chame a nova função para obter transações
      const transacoes = transacoesResponse.map(t => ({ ...t }));
      dispatch({
          type: SET_TRANSACOES,
          payload: transacoes,
      });
  } catch (error) {
      console.error('Erro ao filtrar transações:', error);
  }
};
