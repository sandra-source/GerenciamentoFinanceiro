import api from './api';

export const obterReceitasDespesasPorMes = async () => {
    try {
        const response = await api.get('/dashboard/receitas-despesas-por-mes');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        throw error;
    }
};