import axios from 'axios';
const API_URL = import.meta.env.VITE_AUTH_URL;

export class UserProfileApiService {
    async getProfile(userId) {
        return await axios.get(`${API_URL}/users/${userId}`);
    }
    async updateProfile(userId, userData) {
        return await axios.put(`${API_URL}/users/${userId}`, userData);
    }
}