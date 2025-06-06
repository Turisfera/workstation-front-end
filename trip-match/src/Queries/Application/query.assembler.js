import { Query } from "@/Queries/Domain/query.entity.js";

export class QueryAssembler {
    static toEntityFromResource(resource) {
        return new Query({
            id: resource.id,
            userName: resource.userName,
            userAvatar: resource.userAvatar,
            experienceName: resource.experienceName,
            date: resource.date,
            question: resource.question,
            isAnswered: resource.isAnswered,
            answer: resource.answer
        });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}`, response.statusText);
            return [];
        }

        return response.data.map(resource => this.toEntityFromResource(resource));
    }

    static toRequestPayload(entity) {
        return {
            id: entity.id,
            userName: entity.userName,
            userAvatar: entity.userAvatar,
            experienceName: entity.experienceName,
            date: entity.date,
            question: entity.question,
            isAnswered: entity.isAnswered,
            answer: entity.answer
        };
    }
}

