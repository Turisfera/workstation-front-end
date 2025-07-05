export class Reservation {
    constructor({ id = "", name = "", date = "", experience = "", people = 0, totalPaid = 0.0}) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.experience = experience;
        this.people = people;
        this.totalPaid = totalPaid;
    }
}
