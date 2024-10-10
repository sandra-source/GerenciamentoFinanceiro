import api from './api';
import axios from 'axios';

const receitaService = {
  fetchReceitas: async () => {
    const response = await api.get('/receita');
    return response.data;
  }
};

export const obterReceitas = (filtros) => {
  const params = {
      ordenacaoValor: filtros.ordenacaoValor,
      ordenacaoVencimento: filtros.ordenacaoVencimento,
      tipo: filtros.tipo,
      status: filtros.status,
  };

  return axios.get('/api/Receita', { params });
};

export default receitaService;