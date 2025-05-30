import {Category} from "@/Experience/Domain/category.entity.js"

export class CategoryAssembler {

    static toEntitiesFromResponse(response) {
        console.log(response)
        if (response.status !== 200) {
            console.error(`${response.status},  ${response.code}, ${response.message}`);
            return [];
        }
        const categoryResponse = response.data;
        return categoryResponse.map((category) => {
            return this.toEntityFromResource(category);
        });
    }

    static toEntityFromResource(resource) {
        let category = new Category(resource);
        return category;
    }
}