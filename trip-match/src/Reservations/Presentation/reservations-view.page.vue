<script setup>
import { ref, computed } from 'vue';
import ReservationList from "@/Reservations/Presentation/reservations-list.component.vue";
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';

const allReservations = ref([
  {
    id: 1,
    traveler: { name: 'Carla Medina', avatarUrl: 'https://placehold.co/150x150/318C8B/white?text=CM' },
    bookingDate: '14 abril 2025',
    experienceName: 'City Tour Arequipa',
    pax: 3,
    totalPaid: 240
  },
  {
    id: 2,
    traveler: { name: 'Juan Rodriguez', avatarUrl: 'https://placehold.co/150x150/2c3e50/white?text=JR' },
    bookingDate: '12 abril 2025',
    experienceName: 'Trekking a la Montaña de 7 Colores',
    pax: 2,
    totalPaid: 350
  },
  {
    id: 3,
    traveler: { name: 'Sofia Castillo', avatarUrl: 'https://placehold.co/150x150/d35400/white?text=SC' },
    bookingDate: '10 abril 2025',
    experienceName: 'Paseo en Bote Islas Ballestas',
    pax: 4,
    totalPaid: 480
  }
]);

const searchTerm = ref('');
const filteredReservations = computed(() => {
  if (!searchTerm.value.trim()) {
    return allReservations.value;
  }
  const lowerCaseSearch = searchTerm.value.toLowerCase();
  return allReservations.value.filter(reservation =>
      reservation.traveler.name.toLowerCase().includes(lowerCaseSearch) ||
      reservation.experienceName.toLowerCase().includes(lowerCaseSearch)
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
          {{ $t("reservation-view.revenues") }}: S/ {{ totalRevenue.toFixed(2) }}
        </div>
      </div>
    </div>

    <ReservationList :reservations="filteredReservations" />

    <div v-if="filteredReservations.length === 0 && searchTerm" class="no-results">
      <p>No se encontraron reservas con el término "{{ searchTerm }}"</p>
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