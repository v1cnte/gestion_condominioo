import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true 
});

// ESTA PARTE ES CRUCIAL: Envía el token en cada petición
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default instance;