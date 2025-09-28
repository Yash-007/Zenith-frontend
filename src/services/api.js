import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // if (token) {
      config.headers['X-Auth-Token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZjA2NzA2Yi00YWJhLTQ0NjktODQ1ZC1hN2JmODQxZDc0NWEiLCJpYXQiOjE3NTg5ODAxNzEsImV4cCI6MTc1OTU4NDk3MX0.SESSbp93hEFXvp8a5cxTKEGmCR3_rc-jjjUokQxeLpk";
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const challengeApi = {
  getAllChallenges: () => api.get('/challenge/all'),
  getUserChallenges: () => api.get('/challenge/user'),
  getChallenge: (id) => api.get(`/challenge/${id}`),
  submitChallenge: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'images' || key === 'videos') {
        data[key]?.forEach(file => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, data[key]);
      }
    });
    return api.post('/submission/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export const categoryApi = {
  getAllCategories: () => api.get('/category'),
  getCategoriesByIds: (ids) => {
    const queryParams = Array.isArray(ids) 
      ? ids.map(id => `categoryId=${id}`).join('&')
      : `categoryId=${ids}`;
    return api.get(`/category/ids?${queryParams}`);
  },
};

export const userApi = {
  login: (credentials) => api.post('/user/login', credentials),
  register: (userData) => api.post('/user/register', userData),
  getCurrentUser: () => api.get('/user'),
  getLeaderboard: (params) => api.get('/user/leaderboard', { params }),
};

export const rewardApi = {
  getHistory: () => api.get('/reward/history'),
  createEntry: (data) => api.post('/reward/entry', data),
};

export default api;
