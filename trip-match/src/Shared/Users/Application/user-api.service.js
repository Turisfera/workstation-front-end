import http from '@/Shared/Infrastructure/httpClient.js';

export class UserApiService {
    async getUserById(userId) {
        try {
            const response = await http.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`FALLO AL BUSCAR USUARIO. ID: ${userId}. Razón:`, error.message);
            return null;
        }
    }
}