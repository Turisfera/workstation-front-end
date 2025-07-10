import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'https://trip-match-hfaqachdend9amey.canadacentral-01.azurewebsites.net/api/v1';

const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

http.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export class CategoryApiService {
    async getCategory(){
        try {
            var response = await http.get(`/Category`);
            return response;
        } catch (error) {
            console.error("Error fetching categories from backend:", error);
            throw error;
        }
    }
    async getCategoryById(categoryId){
        try {
            var response = await http.get(`/Category/${categoryId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching category with ID ${categoryId} from backend:`, error);
            throw error;
        }
    }
}