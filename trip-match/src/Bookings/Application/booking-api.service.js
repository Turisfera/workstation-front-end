import http from '@/Shared/Infrastructure/httpClient.js'; // Importa el cliente http centralizado

export class BookingApiService {

    /**
     * Obtiene las reservas de un turista específico.
     * @param {string} touristId - El ID del turista.
     * @returns {Promise<object>}
     */
    async getBookingsByTourist(touristId) {
        try {
            return await http.get(`/Booking/tourist/${touristId}`);
        } catch (error) {
            console.error("Error fetching tourist bookings:", error);
            throw error;
        }
    }

    /**
     * Obtiene las reservas asociadas a una agencia.
     * @param {string} agencyId - El ID de la agencia.
     * @returns {Promise<object>}
     */
    async getBookingsByAgency() {
        try {
            return await http.get(`/Booking`);
        } catch (error) {
            console.error("Error fetching all bookings for agency view:", error);
            throw error;
        }
    }

    /**
     * Crea una nueva reserva.
     * @param {object} bookingData - Los datos de la reserva a crear.
     * @returns {Promise<object>}
     */
    async createBooking(bookingData) {
        try {
            return await http.post('/Booking', bookingData);
        } catch (error) {
            console.error("Error creating booking:", error);
            throw error;
        }
    }

    /**
     * Elimina una reserva por su ID.
     * @param {string|number} bookingId - El ID de la reserva a eliminar.
     * @returns {Promise<object>}
     */
    async deleteBooking(bookingId) {
        try {
            return await http.delete(`/Booking/${bookingId}`);
        } catch (error) {
            console.error("Error deleting booking:", error);
            throw error;
        }
    }
}