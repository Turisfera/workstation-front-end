import {Experience} from "@/Experience/Domain/experience.entity.js"

export class ExperienceAssembler {
    static toEntitiesFromResponse(response) {
        console.log("Response from API in Assembler:", response);
        if (response.status !== 200) {
            console.error(`Error en la respuesta del servicio: Status ${response.status}, Code ${response.code || 'N/A'}, Message ${response.message || 'N/A'}`);
            return [];
        }
        const experienceResponse = response.data;
        if (!Array.isArray(experienceResponse)) {
            console.error("La respuesta 'data' de la API no es un array válido de experiencias:", experienceResponse);
            return [];
        }
        return experienceResponse.map((experience) => {
            return this.toEntityFromResource(experience);
        });
    }

    static toEntityFromResource(resource) {
        let experience = new Experience(resource);
        return experience;
    }
}