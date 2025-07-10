import http from '@/Shared/Infrastructure/httpClient.js';

export class ReviewsApiService {

    getReviewsByAgencyId(agencyId) {
        return http.get(`/Review/agency/${agencyId}`);
    }

    async createReview(reviewData) {
        return http.post(`/Review`, reviewData);
    }
}