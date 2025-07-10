import http from '@/Shared/Infrastructure/httpClient.js';

export class ExperienceApiService {
    /**
     * Gets all experiences for a specific agency.
     * @param {string} agencyId - The user ID of the agency.
     * @returns {Promise<any>}
     */
    getExperiencesByAgencyId(agencyUserId) {
        return http.get(`/Experience/agency/${agencyUserId}`);
    }
}