export class Booking {
    constructor({
                    id = 0,
                    bookingDate = '',
                    numberOfPeople = 1,
                    price = 0.0,
                    status = '',
                    time = '',
                    experienceId = 0,
                    touristId = '',
                    experience = null
                }) {
        this.id = id;
        this.bookingDate = (bookingDate instanceof Date) ? bookingDate : new Date(bookingDate);
        this.numberOfPeople = numberOfPeople;
        this.price = price;
        this.status = status;
        this.time = time;
        this.experienceId = experienceId;
        this.touristId = touristId;
        this.experience = experience;
    }
}