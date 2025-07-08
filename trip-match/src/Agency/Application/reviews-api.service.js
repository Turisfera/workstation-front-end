import http from '@/Shared/Infrastructure/httpClient.js';

export class ReviewsApiService {
    getReviewsByAgencyId(agencyId) {
        // --- ¡CORRECCIÓN AQUÍ! ---
        // La ruta correcta es "Review" (singular) según tu ReviewController.cs
        return http.get(`/Review/agency/${agencyId}`);
    }
}