import api from './api';

export const buscarTransacoes = async (filtros, pageNumber = 1, pageSize = 10) => {
    try {
        const response = await api.get('/transacao', {
            params: { 
                ...filtros, 
                pageNumber,   
                pageSize    
            }
        });
        return response;  
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

export const editarTransacao = async (id, transacaoAtualizada) => {
    try {
        const response = await api.put(`/transacao/${id}`, transacaoAtualizada);
        return response.data;
    } catch (error) {
        console.error('Erro ao editar transação:', error);
        throw error;
    }
};

export const buscarTransacaoPorId = async (id) => {
    try {
        const response = await api.get(`/transacao/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar transação por ID:', error);
        throw error;
    }
};

export const excluirTransacao = async (id) => {
    try {
        const response = await api.delete(`/transacao/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir transação:', error);
        throw error;
    }
};
