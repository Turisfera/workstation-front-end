import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export class AgenciesApiService {
    async getProfile(agencyId) {
        return await axios.get(`${BASE_URL}/agencies/${agencyId}`);
    }

    async createProfile(data) {
        return await axios.post(`${BASE_URL}/agencies`, data);
    }

    async updateProfile(agencyId, data) {
        return await axios.put(`${BASE_URL}/agencies/${agencyId}`, data);
    }

    async deleteProfile(agencyId) {
        return await axios.delete(`${BASE_URL}/agencies/${agencyId}`);
    }

    async getAllAgencies() {
        return await axios.get(`${BASE_URL}/agencies`);
    }
}

