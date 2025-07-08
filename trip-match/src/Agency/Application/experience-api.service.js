import http from '@/Shared/Infrastructure/httpClient.js';

export class ExperienceApiService {
    /**
     * Gets all experiences for a specific agency.
     * @param {string} agencyId - The user ID of the agency.
     * @returns {Promise<any>}
     */
    getExperiencesByAgencyId(agencyUserId) {
        // --- ¡CORRECCIÓN AQUÍ! ---
        // La ruta correcta es "Experience" (singular) según tu ExperienceController.cs
        return http.get(`/Experience/agency/${agencyUserId}`);
    }
}