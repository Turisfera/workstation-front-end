import {Experience} from "@/Experience/Domain/experience.entity.js"

export class ExperienceAssembler {

    static toEntitiesFromResponse(response) {
        console.log(response)
        if (response.status !== 200) {
            console.error(`${response.status},  ${response.code}, ${response.message}`);
            return [];
        }
        const experienceResponse = response.data;
        return experienceResponse.map((experience) => {
            return this.toEntityFromResource(experience);
        });
    }

    static toEntityFromResource(resource) {
        let experience = new Experience(resource);
        return experience;
    }
}