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

export const obterDistribuicaoReceitasDespesas = async () => {
    try {
        const response = await api.get('/dashboard/distribuicao-receitas-despesas');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados de distribuição de receitas e despesas:', error);
        throw error;
    }
};

export const obterReceitasDespesasPagasPorMes = async () => {
    try {
        const response = await api.get('/dashboard/receitas-despesas-pagas-por-mes');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados de receitas e despesas pagas:', error);
        throw error;
    }
};
