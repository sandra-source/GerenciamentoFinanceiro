// src/redux/actions.js
import { obterDespesas } from '../services/despesaService';
import { obterReceitas } from '../services/receitaService';

export const SET_TRANSACOES = 'SET_TRANSACOES';

export const filtrarTransacoes = (filtros) => async (dispatch) => {
    try {
        let transacoes = [];

        // Verificar o filtro de tipo e buscar os dados correspondentes
        if (filtros.tipo === 'Receita') {
            const receitasResponse = await obterReceitas(filtros);
            transacoes = receitasResponse.data.map(r => ({ ...r, tipo: 'Receita' }));
        } else if (filtros.tipo === 'Despesa') {
            const despesasResponse = await obterDespesas(filtros);
            transacoes = despesasResponse.data.map(d => ({ ...d, tipo: 'Despesa' }));
        } else {
            const [despesasResponse, receitasResponse] = await Promise.all([
                obterDespesas(filtros),
                obterReceitas(filtros),
            ]);

            transacoes = [
                ...despesasResponse.data.map(d => ({ ...d, tipo: 'Despesa' })),
                ...receitasResponse.data.map(r => ({ ...r, tipo: 'Receita' }))
            ];
        }

        dispatch({
            type: SET_TRANSACOES,
            payload: transacoes,
        });
    } catch (error) {
        console.error('Erro ao filtrar transações:', error);
    }
};
