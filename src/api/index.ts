// src/api/index.ts
import axios from 'axios';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL+'/api' || 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器 - 添加认证令牌
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['x-auth-token'] = token;
    }
    return config;
});

export default api;
