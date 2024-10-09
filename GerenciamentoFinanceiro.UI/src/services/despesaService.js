import api from './api';

const despesaService = {
  fetchDespesas: async () => {
    const response = await api.get('/despesa');
    return response.data;
  }
};

export default despesaService;