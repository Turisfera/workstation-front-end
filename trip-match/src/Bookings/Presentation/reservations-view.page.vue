<script setup>
import { ref, computed, onMounted } from 'vue';
import { BookingApiService } from '@/Bookings/Application/booking-api.service.js';
import { BookingAssembler } from '@/Bookings/Application/booking.assembler.js';
import { UserApiService } from '@/Shared/Users/Application/user-api.service.js';
import ReservationList from "@/Bookings/Presentation/reservations-list.component.vue";
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const allReservations = ref([]);
const searchTerm = ref('');
const isLoading = ref(true);
const error = ref(null);

const bookingService = new BookingApiService();
const userService = new UserApiService();

onMounted(async () => {
  try {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('rol');
    if (!userId || userRole !== 'agency') {
      throw new Error("Acceso denegado. Se requiere ser una agencia autenticada.");
    }

    const bookingsResponse = await bookingService.getBookingsByAgency();
    const originalBookingsData = bookingsResponse.data;
    let uiReservations = BookingAssembler.toUIModelCollection(originalBookingsData);

    const userFetchPromises = uiReservations.map(async (reservation) => {
      const originalBooking = originalBookingsData.find(b => b.id === reservation.id);

      if (originalBooking && originalBooking.touristId) {
        const user = await userService.getUserById(originalBooking.touristId);

        if (user && user.firstName) {
          reservation.traveler.name = `${user.firstName} ${user.lastName}`;
        } else {
          reservation.traveler.name = "Nombre no disponible";
        }
      }
      return reservation;
    });

    allReservations.value = await Promise.all(userFetchPromises);

  } catch (err) {
    console.error("Error detallado al cargar reservas:", err);
    error.value = "No se pudieron cargar las reservas.";
  } finally {
    isLoading.value = false;
  }
});

const filteredReservations = computed(() => {
  if (!searchTerm.value.trim()) {
    return allReservations.value;
  }
  const lowerCaseSearch = searchTerm.value.toLowerCase();
  return allReservations.value.filter(reservation =>
      (reservation.traveler?.name.toLowerCase().includes(lowerCaseSearch)) ||
      (reservation.experienceName?.toLowerCase().includes(lowerCaseSearch))
  );
});

const totalRevenue = computed(() => {
  return allReservations.value.reduce((sum, reservation) => sum + reservation.totalPaid, 0);
});
</script>

<template>
  <div class="reservations-page">
    <div class="header-controls">
      <div class="title-container">
        <h1>{{ $t("reservation-view.title") }}</h1>
      </div>
      <div class="search-and-revenue">
        <IconField iconPosition="left">
          <InputIcon class="pi pi-search" />
          <InputText v-model="searchTerm" :placeholder="$t('reservation-view.search')" class="search-box" />
        </IconField>

        <div class="revenue-display">
          {{ $t("reservation-view.revenues") }}: {{ $t("reservation-view.currencySymbol") }} {{ totalRevenue.toFixed(2) }}
        </div>
      </div>
    </div>

    <ReservationList :reservations="filteredReservations" />

    <div v-if="filteredReservations.length === 0 && searchTerm" class="no-results">
      <p>{{ $t('reservation-view.noResults', { searchTerm: searchTerm }) }}</p>
    </div>
  </div>
</template>

<style scoped>
.reservations-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
.header-controls { margin-bottom: 2rem; }
.title-container h1 { font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem; }
.search-and-revenue {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.search-box {
  border-radius: 9999px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  width: 900px;
}
:deep(.p-input-icon-left .p-inputtext) {
  padding-left: 2.5rem;
}
.revenue-display {
  background-color: #318C8B;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  white-space: nowrap;
}
.no-results {
  text-align: center;
  padding: 4rem;
  color: #64748b;
  background-color: #f8fafc;
  border-radius: 12px;
  margin-top: 1.5rem;
}
</style>