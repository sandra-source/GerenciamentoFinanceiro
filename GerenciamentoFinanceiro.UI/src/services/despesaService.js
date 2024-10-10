import api from './api';
import axios from 'axios';

const despesaService = {
  fetchDespesas: async () => {
    const response = await api.get('/despesa');
    return response.data;
  }
};

export const obterDespesas = (filtros) => {
  const params = {
      ordenacaoValor: filtros.ordenacaoValor,
      ordenacaoVencimento: filtros.ordenacaoVencimento,
      tipo: filtros.tipo,
      status: filtros.status,
  };
  
  return api.get('/Despesa', { params });
};

export default despesaService;