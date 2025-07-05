import {Category} from "@/Experience/Domain/category.entity.js"

export class CategoryAssembler {
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`Error en la respuesta de categorías: ${response.status}, ${response.code || 'N/A'}, ${response.message || 'N/A'}`);
            return [];
        }
        const categoryResponse = response.data;
        if (!Array.isArray(categoryResponse)) {
            console.error("La respuesta de la API de categorías no es un array válido:", categoryResponse);
            return [];
        }
        return categoryResponse.map((resource) => {
            return new Category(resource);
        });
    }
}