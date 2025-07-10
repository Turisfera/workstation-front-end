import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_EXPERIENCE_API_URL || 'https://backend-prueba-vqqv.onrender.com/api/v1';


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

export class ExperiencesApiService {

    async getExperienceById(id) {
        try {
            const response = await http.get(`/Experience/${id}`);
            return response;
        } catch (error) {
            console.error(`Error fetching experience with ID ${id}:`, error);
            throw error;
        }
    }

    async createExperience(experienceData) {
        try {
            const response = await http.post('/Experience', experienceData);
            return response;
        } catch (error) {
            console.error("Error creating experience:", error);
            throw error;
        }
    }

    async updateExperience(id, experienceData) {
        try {
            const response = await http.put(`/Experience/${id}`, experienceData);
            return response;
        } catch (error) {
            console.error(`Error updating experience with ID ${id}:`, error);
            throw error;
        }
    }

    async deleteExperience(id) {
        try {
            const response = await http.delete(`/Experience/${id}`);
            return response;
        } catch (error) {
            console.error(`Error deleting experience with ID ${id}:`, error);
            throw error;
        }
    }

    async getExperiencesByAgencyId(agencyUserId) {
        try {
            const response = await http.get(`/Experience/agency/${agencyUserId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching experiences for agency ${agencyUserId}:`, error);
            throw error;
        }
    }

    async getExperiencesByCategoryId(categoryId) {
        try {
            const response = await http.get(`/Experience/category/${categoryId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching experiences for category ${categoryId}:`, error);
            throw error;
        }
    }a

    async getAllExperiences(params = {}) {
        try {
            const response = await http.get(`/Experience`, { params: params });
            return response;
        } catch (error) {
            console.error("Error fetching all experiences:", error);
            throw error;
        }
    }
}

