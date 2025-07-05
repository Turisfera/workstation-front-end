import axios from "axios";
const EXPERIENCE_API_URL = import.meta.env.VITE_EXPERIENCE_API_URL || 'http://localhost:5000/api/v1/Experience';

const http = axios.create({
    baseURL: EXPERIENCE_API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
});

export class ExperiencesApiService {

    async getExperienceById(id) {
        try {
            const response = await http.get(`/${id}`);
            return response;
        } catch (error) {
            console.error(`Error fetching experience with ID ${id}:`, error);
            throw error;
        }
    }

    async createExperience(experienceData) {
        try {
            const response = await http.post('/', experienceData);
            return response;
        } catch (error) {
            console.error("Error creating experience:", error);
            throw error;
        }
    }

    async updateExperience(id, experienceData) {
        try {
            const response = await http.put(`/${id}`, experienceData);
            return response;
        } catch (error) {
            console.error(`Error updating experience with ID ${id}:`, error);
            throw error;
        }
    }

    async deleteExperience(id) {
        try {
            const response = await http.delete(`/${id}`);
            return response;
        } catch (error) {
            console.error(`Error deleting experience with ID ${id}:`, error);
            throw error;
        }
    }

    async getExperiencesByAgencyId(agencyUserId) {
        try {
            const response = await http.get(`/agency/${agencyUserId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching experiences for agency ${agencyUserId}:`, error);
            throw error;
        }
    }

    async getExperiencesByCategoryId(categoryId) {
        try {
            const response = await http.get(`/category/${categoryId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching experiences for category ${categoryId}:`, error);
            throw error;
        }
    }
    async getAllExperiences() {
        try {
            const response = await http.get(`/`);
            return response;
        } catch (error) {
            console.error("Error fetching all experiences:", error);
            throw error;
        }
    }
}