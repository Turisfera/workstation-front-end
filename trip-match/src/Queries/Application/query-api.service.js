import axios from "axios";

export class QueryApiService {
    BASE_URL = 'https://backend-prueba-vqqv.onrender.com/api/v2';

    async getAllQueries() {
        return await axios.get(`${this.BASE_URL}/queries`);
    }

    async getQueryById(id) {
        return await axios.get(`${this.BASE_URL}/queries/${id}`);
    }

    async createQuery(query) {
        return await axios.post(`${this.BASE_URL}/queries`, query);
    }

    async updateQuery(id, query) {
        return await axios.put(`${this.BASE_URL}/queries/${id}`, query);
    }

    async deleteQuery(id) {
        return await axios.delete(`${this.BASE_URL}/queries/${id}`);
    }
}

