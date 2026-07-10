import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data)
};

// Task API
export const taskAPI = {
    createTask: (data) => api.post('/tasks/create', data),
    getAllTasks: () => api.get('/tasks/all'),
    getTaskById: (id) => api.get(`/tasks/${id}`),
    updateTask: (id, data) => api.put(`/tasks/update/${id}`, data),
    deleteTask: (id) => api.delete(`/tasks/delete/${id}`)
};

export default api;
