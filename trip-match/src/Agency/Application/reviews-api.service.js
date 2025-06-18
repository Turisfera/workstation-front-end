import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export class ReviewsApiService {
    async getReviewsByAgencyId(agencyId) {
        return await axios.get(`${BASE_URL}/reviews?agencyId=${agencyId}`);
    }
}
