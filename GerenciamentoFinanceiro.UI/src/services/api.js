// src/services/api.js
import axios from 'axios';

const API_URL = 'https://localhost:7024/api';

// Configura a instância do axios
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use(
  (config) => {
    //const token = localStorage.getItem('authToken');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2FvQGV4ZW1wbG8uY29tIiwianRpIjoiMjEzNjhiODItMGQzZi00YWM5LTllZDEtNTY1NzYxZTQzNDBjIiwiZXhwIjoxNzI4NDQ5MzM1LCJpc3MiOiJhbHRlcmRhdGEiLCJhdWQiOiJhbHRlcmRhdGEucGxlbm8ifQ.wrS6epCiu4DOGj3QulmdLM7wEivrtJptvaT3IR-RZc0'
    if (token) {
      // Adiciona o token ao cabeçalho Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Lidar com o erro
    return Promise.reject(error);
  }
);

// Função para buscar transações, utilizando a instância configurada do axios
export const buscarTransacoes = async () => {
  try {
    const despesasResponse = await api.get('/despesa');
    const receitasResponse = await api.get('/receita');

    // Combina as listas de despesas e receitas, adicionando o campo "tipo"
    const transacoes = [
      ...despesasResponse.data.map(d => ({ ...d, tipo: 'Despesa' })),
      ...receitasResponse.data.map(r => ({ ...r, tipo: 'Receita' })),
    ];

    return transacoes;
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    throw error;
  }
};

export default api;
