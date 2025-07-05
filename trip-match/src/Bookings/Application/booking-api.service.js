import axios from "axios";

const bookingHttp = axios.create({
    baseURL: "http://localhost:5000/api/v1/Booking",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Incluye el token aquí
        'Content-Type': 'application/json'
    }
});

export class BookingApiService {
    constructor() {
        this.baseUrl = "http://localhost:5000/api/v1/Booking";
    }

    async getBookingsByTourist(touristId) {
        try {
            const response = await bookingHttp.get(`/tourist/${touristId}`);
            return response;
        } catch (error) {
            console.error("Error fetching bookings:", error);
            throw error;
        }
    }

    async createBooking(booking) {
        try {
            const response = await bookingHttp.post('/', booking);
            return response;
        } catch (error) {
            console.error("Error creating booking:", error);
            throw error;
        }
    }

    async deleteBooking(id) {
        try {
            const response = await bookingHttp.delete(`/${id}`);
            return response;
        } catch (error) {
            console.error("Error deleting booking:", error);
            throw error;
        }
    }
}