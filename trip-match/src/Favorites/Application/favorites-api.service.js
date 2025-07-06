import axios from 'axios';

const API_URL = import.meta.env.VITE_AUTH_URL || 'http://localhost:5000/api/v1';

export class FavoritesApiService {
    constructor() {
        this.token = localStorage.getItem('token');
        this.touristId = localStorage.getItem('userId');
    }

    getAuthHeaders() {
        return {
            Authorization: `Bearer ${this.token}`
        };
    }

    async getFavorites() {
        const response = await axios.get(`${API_URL}/Favorite/tourist/${this.touristId}`, {
            headers: this.getAuthHeaders()
        });
        return response.data; // lista de favoritos con experiencias
    }

    async addFavorite(experienceId) {
        const response = await axios.post(
            `${API_URL}/Favorite`,
            { experienceId, touristId: this.touristId },
            { headers: { ...this.getAuthHeaders(), 'Content-Type': 'application/json' } }
        );
        return response.data;
    }

    async removeFavorite(experienceId) {
        const response = await axios.delete(`${API_URL}/Favorite?experienceId=${experienceId}`, {
            headers: this.getAuthHeaders()
        });
        return response;
    }
}