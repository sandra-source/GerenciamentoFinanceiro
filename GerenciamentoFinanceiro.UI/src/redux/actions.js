// src/redux/actions.js
import despesaService from '../services/despesaService';
import receitaService from '../services/receitaService';

export const SET_TRANSACOES = 'SET_TRANSACOES'; // Definir a constante

export const filtrarTransacoes = () => async dispatch => {
    try {
      const [despesas, receitas] = await Promise.all([
        despesaService.fetchDespesas(),
        receitaService.fetchReceitas()
      ]);
  
      const transacoes = [
        ...despesas.map(d => ({ ...d, tipo: 'Despesa' })),
        ...receitas.map(r => ({ ...r, tipo: 'Receita' }))
      ];
  
      console.log('Transações carregadas:', transacoes); // Adicionar log para verificar os dados
  
      dispatch({ type: SET_TRANSACOES, payload: transacoes });
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };
