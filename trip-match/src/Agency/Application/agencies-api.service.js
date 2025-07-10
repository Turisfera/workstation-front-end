import http from '@/Shared/Infrastructure/httpClient.js';

export class AgenciesApiService {
    /**
     * Obtiene el perfil de una agencia.
     * @param {string} userId - El ID de usuario de la agencia.
     */
    getProfile(userId) {
        return http.get(`/Agencies/${userId}`);
    }

    /**
     * Actualiza el perfil de una agencia.
     * @param {string} userId - El ID de usuario de la agencia.
     * @param {object} payload - Los datos a actualizar.
     */
    updateProfile(userId, payload) {
        return http.put(`/Agencies/${userId}`, payload);
    }
}