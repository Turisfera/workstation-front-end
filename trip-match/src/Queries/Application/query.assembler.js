import { Query } from "../Domain/query.entity.js";

export class QueryAssembler {

    static toEntityFromResource(resource) {
        return new Query({
            id: resource.id,
            userName: resource.userName,
            userAvatar: resource.userAvatar || null,
            experienceName: resource.experienceName,
            date: new Date(resource.date),
            question: resource.question,
            answer: resource.answer || '',
            isAnswered: resource.isAnswered
        });
    }

    static toEntitiesFromResponse(response) {
        if (response.status && response.status !== 200) {
            console.error(`${response.status}, ${response.code}, ${response.message}`);
            return [];
        }

        const data = response.data || response;
        return data.map(resource => this.toEntityFromResource(resource));
    }

    static toRequestPayload(entity) {
        return {
            id: entity.id,
            userName: entity.userName,
            userAvatar: entity.userAvatar,
            experienceName: entity.experienceName,
            date: entity.date.toISOString().split('T')[0],
            question: entity.question,
            answer: entity.answer,
            isAnswered: entity.isAnswered
        };
    }
}
