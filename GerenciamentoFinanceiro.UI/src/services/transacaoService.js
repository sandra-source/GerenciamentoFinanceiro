
import api from './api';

export const buscarTransacoes = async (filtros) => {
    try {
        const response = await api.get('/transacao', { params: filtros });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        throw error;
    }
};

export const adicionarTransacao = async (novaTransacao) => {
    try {
        const response = await api.post('/transacao', novaTransacao);
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar transação:', error);
        throw error;
    }
};
