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
import { useI18n } from 'vue-i18n';
import { BookingApiService } from '@/Bookings/Application/booking-api.service.js';
import { BookingAssembler } from '@/Bookings/Application/booking.assembler.js';

const router = useRouter();
const confirm = useConfirm();
const toast = useToast();
const { t } = useI18n();

const bookingApiService = new BookingApiService();

const allReservations = ref([]);
const selectedDate = ref(null);
const highlightedDateSet = ref(new Set());
const isLoading = ref(true);

const fetchBookings = async () => {
  isLoading.value = true;
  const touristId = localStorage.getItem('userId');

  if (!touristId) {
    console.error("No Tourist ID found in localStorage. User must be logged in to view itineraries.");
    toast.add({ severity: 'error', summary: t('common.error'), detail: t('error.userNotLoggedInBooking'), life: 5000 });
    isLoading.value = false;
    return;
  }

  try {
    const response = await bookingApiService.getBookingsByTourist(touristId);

    if (response && response.data) {

      allReservations.value = BookingAssembler.toEntitiesFromResponse(response);
      console.log("Reservas cargadas y mapeadas:", allReservations.value);


      highlightedDateSet.value = new Set(
          allReservations.value.map(res => {

            const d = res.bookingDate instanceof Date ? res.bookingDate : new Date(res.bookingDate);
            return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
          })
      );
      console.log("Reservas cargadas:", allReservations.value);
    } else {
      console.warn("API de reservas no devolvió datos válidos:", response);
      allReservations.value = [];
    }
  } catch (error) {
    console.error("Error al cargar las reservas:", error);
    toast.add({ severity: 'error', summary: t('common.error'), detail: t('error.loadBookingsError'), life: 5000 });
    allReservations.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchBookings();
});

const reservationsForSelectedDate = computed(() => {
  if (!selectedDate.value) return [];
  const selectedKey = `${selectedDate.value.getFullYear()}-${selectedDate.value.getMonth()}-${selectedDate.value.getDate()}`;
  return allReservations.value.filter(res => {
    const resDate = res.bookingDate instanceof Date ? res.bookingDate : new Date(res.bookingDate);
    const resKey = `${resDate.getFullYear()}-${resDate.getMonth()}-${resDate.getDate()}`;
    return resKey === selectedKey;
  });
});

const isDayHighlighted = (date) => {
  const key = `${date.year}-${date.month}-${date.day}`;
  return highlightedDateSet.value.has(key);
}

const handleCancelReservation = (reservationId) => {
  confirm.require({
    message: t('itineraryView.confirmDialog.message'),
    header: t('itineraryView.confirmDialog.header'),
    icon: 'pi pi-info-circle',
    rejectLabel: t('itineraryView.confirmDialog.rejectLabel'),
    acceptLabel: t('itineraryView.confirmDialog.acceptLabel'),
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await bookingApiService.deleteBooking(reservationId);
        toast.add({ severity: 'success', summary: t('itineraryView.toast.cancelSuccessSummary'), detail: t('itineraryView.toast.cancelSuccessDetail'), life: 3000 });
        await fetchBookings();
        if (reservationsForSelectedDate.value.length === 0) {
          selectedDate.value = null;
        }
      } catch (error) {
        console.error("Error al cancelar la reserva:", error);
        toast.add({ severity: 'error', summary: t('itineraryView.toast.cancelErrorSummary'), detail: t('itineraryView.toast.cancelErrorDetail'), life: 5000 });
      }
    },
    reject: () => {
      toast.add({ severity: 'info', summary: t('itineraryView.toast.cancelAbortSummary'), detail: t('itineraryView.toast.cancelAbortDetail'), life: 3000 });
    }
  });
};
</script>

<template>
  <Toast />
  <ConfirmDialog />

  <div class="itinerary-view">
    <header class="view-header">
      <h1>{{ $t('itineraryView.title') }}</h1>
      <p>{{ $t('itineraryView.subtitle') }}</p>
    </header>

    <div class="content-layout">
      <div class="reservations-details">
        <div v-if="isLoading" class="placeholder">
          <i class="pi pi-spin pi-spinner"></i>
          <span>{{ $t('itineraryView.loadingReservations') }}</span>
        </div>
        <div v-else-if="!selectedDate" class="placeholder">
          <i class="pi pi-calendar-plus"></i>
          <span>{{ $t('itineraryView.placeholderSelectDay') }}</span>
        </div>
        <div v-else-if="reservationsForSelectedDate.length === 0" class="placeholder">
          <i class="pi pi-sun"></i>
          <span>{{ $t('itineraryView.placeholderNoActivities') }}</span>
        </div>
        <div v-else class="cards-container">
          <div v-for="reservation in reservationsForSelectedDate" :key="reservation.id" class="reservation-item">
            <ExperienceCardUser :experience="reservation.experience" />
            <div class="cancel-button-container">
              <Button
                  :label="$t('itineraryView.cancelReservationButton')"
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
  min-height: 500px;
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