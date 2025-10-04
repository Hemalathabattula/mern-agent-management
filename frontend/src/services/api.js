import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = new Error();
    if (error.response) {
      customError.message = error.response.data.message || 'An error occurred';
      customError.status = error.response.status;
    } else if (error.request) {
      customError.message = 'No response from server';
      customError.status = null;
    } else {
      customError.message = error.message;
      customError.status = null;
    }
    return Promise.reject(customError);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
};

export const agentAPI = {
  createAgent: (data) => api.post('/agents', data),
  getAgents: () => api.get('/agents'),
};

export const listAPI = {
  uploadFile: (formData) => api.post('/lists/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  getLists: () => api.get('/lists'),
};

export default api;
