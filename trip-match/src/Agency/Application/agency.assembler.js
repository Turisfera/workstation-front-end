import { Agency } from "@/Agency/Domain/agency.entity.js";

export const AgencyAssembler = {
    toEntity(resp) {
        const { id, name, description, socialLinks, avatarUrl } = resp.data;
        return new Agency({ id, name, description, socialLinks, avatarUrl });
    },
    toRequestPayload(entity) {
        return {
            name:        entity.name,
            description: entity.description,
            socialLinks: entity.socialLinks,
            avatarUrl:   entity.avatarUrl,
            contact:     {
                email: entity.contact.email,
                phone: entity.contact.phone
            }
        };
    }
};
