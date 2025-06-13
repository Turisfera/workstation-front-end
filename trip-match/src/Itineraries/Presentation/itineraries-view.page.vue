<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Calendar from 'primevue/calendar';
import ExperienceCardUser from '@/Experience/Presentation/experience-card-user.component.vue';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';

const router = useRouter();
const confirm = useConfirm();
const toast = useToast();

const allReservations = ref([]);
const selectedDate = ref(null); // Lo inicializamos en null para que no haya día pre-seleccionado

// --- CORRECCIÓN 1: Se crea un Set para guardar las fechas resaltadas ---
// Un Set es mucho más rápido para buscar si un elemento existe.
const highlightedDateSet = ref(new Set());

const setupMockData = () => {
  const today = new Date();
  const mockData = [
    { id: 101, bookingDate: new Date(), experience: { id: 'exp1', title: 'Trekking a la Montaña', description: 'Una increíble aventura en los Andes.', price: 120, duration: 8, rating: 4.8, images: ['https://placehold.co/600x400/318C8B/white?text=Trekking'], schedules: ['08:00'] } },
    { id: 102, bookingDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3), experience: { id: 'exp2', title: 'City Tour Histórico', description: 'Recorre el centro histórico y sus maravillas.', price: 80, duration: 4, rating: 4.5, images: ['https://placehold.co/600x400/6E58AA/white?text=City+Tour'], schedules: ['10:00'] } },
    { id: 103, bookingDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3), experience: { id: 'exp3', title: 'Clase de Cocina Peruana', description: 'Aprende a preparar lomo saltado y ceviche.', price: 150, duration: 3, rating: 4.9, images: ['https://placehold.co/600x400/d35400/white?text=Cocina'], schedules: ['18:00'] } },
    { id: 104, bookingDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8), experience: { id: 'exp4', title: 'Paseo en Bote', description: 'Navega por las islas y observa la fauna.', price: 100, duration: 5, rating: 4.6, images: ['https://placehold.co/600x400/2980b9/white?text=Bote'], schedules: ['09:00'] } },
  ];
  allReservations.value = mockData;

  // --- CORRECCIÓN 2: Se llena el Set con un formato de texto 'AÑO-MES-DÍA' ---
  highlightedDateSet.value = new Set(
      mockData.map(res => {
        const d = res.bookingDate;
        // Creamos una clave única para cada fecha
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      })
  );
};

onMounted(() => {
  setupMockData();
});

const reservationsForSelectedDate = computed(() => {
  if (!selectedDate.value) return [];
  const selectedKey = `${selectedDate.value.getFullYear()}-${selectedDate.value.getMonth()}-${selectedDate.value.getDate()}`;
  return allReservations.value.filter(res => {
    const resKey = `${res.bookingDate.getFullYear()}-${res.bookingDate.getMonth()}-${res.bookingDate.getDate()}`;
    return resKey === selectedKey;
  });
});

// --- CORRECCIÓN 3: Se crea una función para usar en el template ---
// Esta función comprueba si una fecha del calendario debe ser resaltada.
const isDayHighlighted = (date) => {
  // 'date' aquí es el objeto {day, month, year} que viene del slot del calendario
  const key = `${date.year}-${date.month}-${date.day}`;
  return highlightedDateSet.value.has(key);
}

const handleCancelReservation = (reservationId) => {
  confirm.require({
    message: '¿Estás seguro de que quieres cancelar esta reserva?',
    header: 'Confirmación de Cancelación',
    icon: 'pi pi-info-circle',
    rejectLabel: 'No, volver',
    acceptLabel: 'Sí, cancelar',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: () => {
      allReservations.value = allReservations.value.filter(res => res.id !== reservationId);
      setupMockData(); // Regeneramos los datos para actualizar el calendario
      toast.add({ severity: 'success', summary: 'Cancelado', detail: 'La reserva ha sido cancelada.', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'info', summary: 'Acción Abortada', detail: 'No se ha cancelado la reserva.', life: 3000 });
    }
  });
};
</script>

<template>
  <Toast />
  <ConfirmDialog />

  <div class="itinerary-view">
    <header class="view-header">
      <h1>Mi Itinerario de Viaje</h1>
      <p>Selecciona un día en el calendario para ver los detalles de tus reservas.</p>
    </header>

    <div class="content-layout">
      <div class="reservations-details">
        <div v-if="!selectedDate" class="placeholder">
          <i class="pi pi-calendar-plus"></i>
          <span>Selecciona un día marcado para ver tus actividades</span>
        </div>
        <div v-else-if="reservationsForSelectedDate.length === 0" class="placeholder">
          <i class="pi pi-sun"></i>
          <span>No tienes actividades programadas para este día</span>
        </div>
        <div v-else class="cards-container">
          <div v-for="reservation in reservationsForSelectedDate" :key="reservation.id" class="reservation-item">
            <ExperienceCardUser :experience="reservation.experience" />
            <div class="cancel-button-container">
              <Button
                  label="Cancelar Reserva"
                  severity="danger"
                  outlined
                  @click="handleCancelReservation(reservation.id)"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="calendar-container">
        <Calendar v-model="selectedDate" inline>
          <template #date="slotProps">
            <strong v-if="isDayHighlighted(slotProps.date)" class="highlighted-day">
              {{ slotProps.date.day }}
            </strong>
            <span v-else>
              {{ slotProps.date.day }}
            </span>
          </template>
        </Calendar>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tus estilos se mantienen igual, solo se ajusta el resaltado */
.itinerary-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}
.view-header {
  margin-bottom: 2.5rem;
}
.view-header h1 {
  font-size: 2rem;
  font-weight: 700;
}
.view-header p {
  font-size: 1.1rem;
  color: #64748b;
}
.content-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: flex-start;
}
.reservations-details {
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 2rem;
  min-height: 500px; /* Altura mínima para que no salte el layout */
}
.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #94a3b8;
  text-align: center;
}
.placeholder i {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.placeholder span {
  font-weight: 500;
}
.cards-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.reservation-item {
  border: 1px solid #e2e8f0;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
}
.cancel-button-container {
  padding: 1rem;
  background-color: #f8fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
}
.calendar-container {
  position: sticky;
  top: 2rem;
}

:deep(.highlighted-day) {
  background-color: #318C8B;
  color: white !important;
  border-radius: 50%;
  width: 2.3rem;
  height: 2.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>