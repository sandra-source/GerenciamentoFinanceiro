import api from './api';

const receitaService = {
  fetchReceitas: async () => {
    const response = await api.get('/receita');
    return response.data;
  }
};

export default receitaService;