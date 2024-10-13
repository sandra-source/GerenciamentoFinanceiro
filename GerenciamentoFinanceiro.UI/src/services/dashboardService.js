import axios from 'axios';

export const obterReceitasDespesasPorMes = async () => {
    try {
        const response = await axios.get('/api/dashboard/receitas-despesas-por-mes');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        throw error;
    }
};