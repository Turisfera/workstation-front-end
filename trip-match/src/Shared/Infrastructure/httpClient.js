import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;
if (!API_BASE) {
    console.warn('Advertencia: VITE_API_URL no está definida. Asegúrate de configurarla en tu archivo .env');
}

const http = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json'
    }
});
http.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default http;
