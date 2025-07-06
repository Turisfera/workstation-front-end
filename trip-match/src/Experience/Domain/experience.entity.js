export class Experience {
    constructor({
                    id = 0, // Id es int en el backend
                    title = "",
                    description = "",
                    location = "",
                    duration = 0,
                    price = 0.0,
                    frequencies = "",
                    schedule = [],
                    experienceImages = [],
                    includes = [],
                    categoryId = 0,
                    agencyUserId = "",
                    isActive = true,
                    createdDate = null,
                    modifiedDate = null,
                    category = null,
                    agency = null
                }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.duration = duration;
        this.price = price;
        this.frequencies = frequencies;
        this.schedule = schedule;
        this.experienceImages = experienceImages;
        this.includes = includes;
        this.categoryId = categoryId;
        this.agencyUserId = agencyUserId;
        this.isActive = isActive;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.category = category;
        this.agency = agency;
    }
}