import http from '@/Shared/Infrastructure/httpClient.js';

export class ReviewsApiService {

    getReviewsByAgencyId(agencyId) {
        return http.get(`/Review/agency/${agencyId}`);
    }

    async createReview(reviewData) {
        // Asegúrate de que la ruta coincide con tu ReviewController
        return http.post(`/Review`, reviewData);
    }
}