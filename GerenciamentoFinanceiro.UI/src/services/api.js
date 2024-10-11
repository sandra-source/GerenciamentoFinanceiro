import axios from 'axios';

const API_URL = 'https://localhost:7024/api';

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (email, password) => {
  try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
  } catch (error) {
      throw error.response ? error.response.data : new Error('Erro ao conectar com o servidor');
  }
};

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('Token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
