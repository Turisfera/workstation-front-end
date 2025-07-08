import { Booking } from "@/Bookings/Domain/booking.entity.js";
import { Experience } from "@/Experience/Domain/experience.entity.js";

export class BookingAssembler {

    /**
     * Convierte la respuesta completa de la API en un array de entidades Booking.
     * @param {object} response - El objeto de respuesta de axios.
     * @returns {Array<Booking>} - Un array de entidades Booking.
     */
    static toEntitiesFromResponse(response) {
        console.log("Respuesta cruda de API de reservas:", response.data);
        if (response.status !== 200 && response.status !== 204) {
            console.error(`Error en la respuesta del servicio de reservas: Status ${response.status}, Code ${response.code || 'N/A'}, Message ${response.message || 'N/A'}`);
            return [];
        }
        const bookingResponse = response.data;
        if (!Array.isArray(bookingResponse)) {
            console.warn("La respuesta 'data' de la API de reservas no es un array válido:", bookingResponse);
            return [];
        }
        return bookingResponse.map((bookingResource) => {
            return this.toEntityFromResource(bookingResource);
        });
    }

    /**
     * Convierte un único recurso de la API en una entidad Booking.
     * @param {object} resource - El objeto de reserva individual de la API.
     * @returns {Booking} - Una instancia de la entidad Booking.
     */
    static toEntityFromResource(resource) {
        let experienceEntity = null;
        if (resource.experience) {
            experienceEntity = new Experience(resource.experience);
        } else if (resource.experienceId && resource.Title) {
            experienceEntity = new Experience({
                id: resource.experienceId,
                title: resource.Title,
            });
            console.warn("Experiencia creada a partir de experienceId y experienceTitle directamente. Considera enviar el objeto 'experience' completo desde el backend si necesitas más detalles de la experiencia en el frontend.");
        }

        return new Booking({
            id: resource.id,
            bookingDate: resource.bookingDate,
            numberOfPeople: resource.numberOfPeople,
            price: resource.price,
            status: resource.status,
            time: resource.time,
            experienceId: resource.experienceId,
            touristId: resource.touristId,
            experience: experienceEntity
        });
    }

    /**
     * Transforma una colección de datos de la API en un array de modelos para la UI.
     * @param {Array<object>} apiBookings - El array de reservas directamente desde la API.
     * @returns {Array<object>} - Un array de objetos listos para ser mostrados en la vista.
     */
    static toUIModelCollection(apiBookings) {
        if (!Array.isArray(apiBookings)) {
            console.warn("BookingAssembler.toUIModelCollection: La entrada no es un array válido.", apiBookings);
            return [];
        }
        return apiBookings.map(this.toUIModel);
    }

    /**
     * Transforma un único objeto de reserva de la API en un modelo para la UI.
     * @param {object} apiBooking - La reserva individual desde la API.
     * @returns {object} - Un objeto con el formato que la vista de reservas necesita.
     */
    static toUIModel(apiBooking) {

        const travelerName = apiBooking.tourist?.fullName || 'Viajero Anónimo';
        const experienceName = apiBooking.experience?.title || 'Experiencia sin nombre';

        const travelerInitials = "ID";

        const formattedDate = new Date(apiBooking.bookingDate).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return {
            id: apiBooking.id,
            traveler: {
                name: travelerName,
                avatarUrl: `https://placehold.co/150x150/2c3e50/white?text=${travelerInitials}`
            },
            bookingDate: formattedDate,
            experienceName: experienceName,
            pax: apiBooking.numberOfPeople || 0,
            totalPaid: apiBooking.price || 0
        };
    }
}