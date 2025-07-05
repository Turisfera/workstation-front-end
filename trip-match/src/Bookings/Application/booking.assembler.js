import { Booking } from "@/Bookings/Domain/booking.entity.js";
import { Experience } from "@/Experience/Domain/experience.entity.js";

export class BookingAssembler {


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

    static toEntityFromResource(resource) {

        let experienceEntity = null;
        if (resource.experience) {

            experienceEntity = new Experience(resource.experience);
        } else if (resource.experienceId && resource.experienceTitle) {

            experienceEntity = new Experience({
                id: resource.experienceId,
                title: resource.experienceTitle,

            });
            console.warn("Experiencia creada a partir de experienceId y experienceTitle directamente. Considera enviar el objeto 'experience' completo desde el backend si necesitas más detalles de la experiencia en el frontend.");
        }


        let booking = new Booking({
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
        return booking;
    }
}