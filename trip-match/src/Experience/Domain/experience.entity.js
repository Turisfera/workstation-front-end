export class Experience {
    constructor({ id = "", title = "", description = "", location = "", duration = 0, price = 0.0 , frequencies = [], schedules = [], images = [], includes = [] }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.duration = duration;
        this.price = price;
        this.frequencies = frequencies;
        this.schedules = schedules;
        this.images = images;
        this.includes = includes;
    }
}
