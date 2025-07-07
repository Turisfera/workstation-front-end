import axios from "axios";
import { Agency } from "@/Agency/Domain/agency.entity.js";

const API_ROOT    = import.meta.env.VITE_API_URL;
const REVIEW_PATH = `${API_ROOT}/Review/agency`;

export class ReviewsApiService {
    async getReviewsByAgencyId(agencyId) {
        const res = await axios.get(`${REVIEW_PATH}/${agencyId}`);
        return res.data;
    }
}

export class AgencyAssembler {
    static toEntityFromResource(resource) {
        const id = resource.id ?? resource.userId;
        return new Agency({
            id,
            agencyName:              resource.agencyName,
            description:       resource.description,
            ruc:               resource.ruc,
            avatarUrl:         resource.avatarUrl,
            rating:            resource.rating  ?? 0,
            reviewCount:       resource.reviewCount  ?? 0,
            reservationCount:  resource.reservationCount ?? 0,
            taxId:             resource.ruc,
            contact: {
                email: resource.contactEmail,
                phone: resource.contactPhone
            },
            socialLinks: {
                facebook:  resource.socialLinkFacebook,
                instagram: resource.socialLinkInstagram,
                whatsapp:  resource.socialLinkWhatsapp
            },
            reviews: []
        });
    }

    static toEntitiesFromResponse(response) {
        const list = Array.isArray(response) ? response : response.data;
        if (!Array.isArray(list)) {
            console.error("toEntitiesFromResponse: respuesta inesperada", response);
            return [];
        }
        return list.map(item => this.toEntityFromResource(item));
    }

    static toRequestPayload(entity) {
        return {
            agencyName:          entity.name,
            ruc:                 entity.ruc,
            description:         entity.description,
            avatarUrl:           entity.avatarUrl,
            contactEmail:        entity.contact.email,
            contactPhone:        entity.contact.phone,
            socialLinkFacebook:  entity.socialLinks.facebook,
            socialLinkInstagram: entity.socialLinks.instagram,
            socialLinkWhatsapp:  entity.socialLinks.whatsapp
        };
    }
}
