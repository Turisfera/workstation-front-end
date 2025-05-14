import axios from "axios";

const BASE_URL = 'https://68242a2a65ba058033991eb6.mockapi.io/tripmatch';

export class ReviewsApiService {
    async getReviewsByAgencyId(agencyId) {
        return await axios.get(`${BASE_URL}/reviews?agencyId=${agencyId}`);
    }
}
