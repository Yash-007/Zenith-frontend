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
    if (token) {
      config.headers['X-Auth-Token'] = token;
    }
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
    return error;
  }
);

export const challengeApi = {
  getAllChallenges: () => api.get('/challenge/all'),
  getUserChallenges: () => api.get('/challenge/user'),
  getChallenge: (id) => api.get(`/challenge?id=${id}`),
  submitChallenge: (formData) => {
    return api.post('/submission/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export const submissionApi = {
  getSubmissionDetails: (submissionId) => api.get(`/submission?submissionId=${submissionId}`),
  getUserSubmissions: (page = 1) => api.get(`/submission/all?page=${page}`),
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
  getLeaderboard: ({ page, lowerAge, upperAge, city, fetchUser }) => {
    const params = {
      ...(page && { page }),
      ...(lowerAge && { lowerAge }),
      ...(upperAge && { upperAge }),
      ...(city && { city: city.toUpperCase() }),
      ...(fetchUser && { fetchUser }),
      _t: Date.now() // Add timestamp to prevent caching
    };
    return api.get('/user/leaderboard', { 
      params,
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
  },
};

export const rewardApi = {
  getHistory: () => api.get('/reward/history'),
  redeem: (points) => api.post('/reward/redeem', { points }),
};

export const chatApi = {
  sendQuery: (query) => api.post('/chat/query', { query }),
  getChatHistory: () => api.get('/chat/all'),
};

export default api;
