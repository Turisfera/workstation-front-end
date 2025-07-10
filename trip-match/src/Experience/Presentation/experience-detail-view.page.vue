<template>
  <Toast /> <div v-if="isLoading" class="loading-container">
  <p>{{ $t('experienceDetail.loadingDetails') }}</p>
  </div>

  <div v-else-if="experience" class="detail-container">
    <div class="info-column">
      <div class="header">
        <h1 class="title">{{ experience.title }}</h1>
        <div class="meta-info">
          <span class="location"><i class="pi pi-map-marker"></i> {{ experience.location }}</span>
        </div>
      </div>

      <Galleria :value="experience.experienceImages" :numVisible="5" containerStyle="max-width: 100%" :showThumbnails="false" :showIndicators="true" :circular="true" :autoPlay="true" :transitionInterval="3000">
        <template #item="slotProps">
          <img :src="slotProps.item.url" :alt="experience.title" style="width: 100%; display: block; border-radius: 12px;" />
        </template>
      </Galleria>

      <div class="section">
        <h2>{{ $t('experienceDetail.descriptionTitle') }}</h2>
        <p>{{ experience.description }}</p>
      </div>

      <div class="section">
        <h2>{{ $t('experienceDetail.includesTitle') }}</h2>
        <ul>
          <li v-for="(item, index) in experience.includes" :key="index">
            <i class="pi pi-check-circle" style="color: #2c8a8a;"></i> {{ item.description }}
          </li>
        </ul>
      </div>
      <div class="section">
        <h2>{{ $t('experienceDetail.schedulesTitle') }}</h2>
        <p><strong>{{ $t('experienceDetail.frequencyLabel') }}</strong> {{ experience.frequencies }}</p>
        <p><strong>{{ $t('experienceDetail.availableSchedulesLabel') }}</strong> {{ experience.schedule.map(s => s.time).join(', ') }}</p>
      </div>

    </div>

    <div class="booking-column">
      <div class="booking-card">
        <h3 class="price">{{ $t('experienceDetail.priceCurrency') }} {{ experience.price }} <span class="price-unit">{{ $t('experienceDetail.priceUnit') }}</span></h3>
        <div class="booking-form">
          <div class="form-group">
            <label>{{ $t('experienceDetail.dateLabel') }}</label>
            <Calendar
                v-model="selectedDate"
                :placeholder="$t('experienceDetail.datePlaceholder')"
                dateFormat="dd/mm/yy"
                class="w-full"
                :disabledDays="disabledDays" :minDate="new Date()"
                selectionMode="single"
                touchUI
            />
          </div>
          <div class="form-group">
            <label>{{ $t('experienceDetail.scheduleLabel') }}</label>
            <Dropdown v-model="selectedSchedule" :options="availableSchedules" :placeholder="$t('experienceDetail.schedulePlaceholder')" class="w-full" />
          </div>
          <div class="form-group">
            <label>{{ $t('experienceDetail.numberOfPeopleLabel') }}</label>
            <InputNumber v-model="numberOfPeople" mode="decimal" showButtons :min="1" :max="10" class="w-full" />
          </div>
        </div>
        <div class="total-price">
          <span>{{ $t('experienceDetail.totalLabel') }}</span>
          <span>{{ $t('experienceDetail.priceCurrency') }} {{ totalPrice.toFixed(2) }}</span>
        </div>
        <Button :label="$t('experienceDetail.bookNowButton')" class="w-full booking-button" @click="handleBooking" />
      </div>
    </div>
  </div>

  <div v-else class="not-found-container">
    <h2>{{ $t('experienceDetail.notFoundTitle') }}</h2>
    <p>{{ $t('experienceDetail.notFoundMessage') }}</p>
    <router-link to="/">{{ $t('experienceDetail.backToHomeButton') }}</router-link>
  </div>
</template>

<script setup>
import {ref, onMounted, computed, watch} from 'vue';
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service.js';
import Galleria from 'primevue/galleria';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { useI18n } from 'vue-i18n';
import {ExperienceAssembler} from "@/Experience/Application/experience.assembler.js";
import {BookingApiService} from "@/Bookings/Application/booking-api.service.js";
import { useToast } from "primevue/usetoast";

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const experienceService = new ExperiencesApiService();
const experience = ref(null);
const isLoading = ref(true);
const selectedDate = ref(null);
const numberOfPeople = ref(1);
const selectedSchedule = ref(null);
const { t } = useI18n();
const toast = useToast();
const bookingApiService = new BookingApiService();

const disabledDates = ref([]);
const disabledDays = ref([]);
const availableSchedules = ref([]);

const totalPrice = computed(() => {
  if (experience.value) {
    return experience.value.price * numberOfPeople.value;
  }
  return 0;
});


const setDisabledDaysOfWeek = (frequencies) => {
  const normalizedFrequencies = frequencies ? frequencies.toLowerCase() : '';

  switch (normalizedFrequencies) {
    case 'weekdays':
      disabledDays.value = [0, 6]; // Domingo y Sábado
      break;
    case 'weekends':
      disabledDays.value = [1, 2, 3, 4, 5]; // Lunes a Viernes
      break;
    case 'daily':
      disabledDays.value = []; // Todos los días
      break;
    default:
      console.warn(`Frecuencia de experiencia desconocida o no mapeada: "${frequencies}". Se deshabilitarán todos los días por precaución.`);
      disabledDays.value = [0, 1, 2, 3, 4, 5, 6];
      break;
  }
};


onMounted(async () => {
  try {
    const response = await experienceService.getExperienceById(Number(props.id));

    if (response.data) {
      experience.value = ExperienceAssembler.toEntityFromResource(response.data);
      console.log("Frecuencias de la experiencia:", experience.value.frequencies);

      if (experience.value.schedule && Array.isArray(experience.value.schedule)) {
        availableSchedules.value = experience.value.schedule.map(s => s.time);
      } else {
        availableSchedules.value = [];
        console.warn("La propiedad 'schedule' de la experiencia no es un array o es nula.");
      }

      if (experience.value.frequencies) {
        setDisabledDaysOfWeek(experience.value.frequencies);
      } else {
        console.warn("La propiedad 'frequencies' de la experiencia es nula o vacía. Deshabilitando todos los días por precaución.");
        setDisabledDaysOfWeek("none");
      }
    }
  } catch (error) {
    console.error(t('error.loadExperienceError'), error);
    experience.value = null;
  } finally {
    isLoading.value = false;
  }
});

watch(selectedDate, (newDate) => {
  selectedSchedule.value = null;
});

const handleBooking = async () => {
  if (!selectedDate.value) {
    toast.add({ severity: 'warn', summary: t('common.warning'), detail: t('error.selectDateAlert'), life: 3000 });
    return;
  }
  if (!selectedSchedule.value) {
    toast.add({ severity: 'warn', summary: t('common.warning'), detail: t('error.selectScheduleAlert'), life: 3000 });
    return;
  }

  // Frontend validation for frequency
  const dayOfWeekSelected = selectedDate.value.getDay();
  const frequencies = experience.value.frequencies.toLowerCase();
  let isValidFrequencySelection = false;

  switch (frequencies) {
    case 'weekdays':
      isValidFrequencySelection = (dayOfWeekSelected >= 1 && dayOfWeekSelected <= 5);
      break;
    case 'weekends':
      isValidFrequencySelection = (dayOfWeekSelected === 0 || dayOfWeekSelected === 6);
      break;
    case 'daily':
      isValidFrequencySelection = true;
      break;
    default:
      isValidFrequencySelection = false;
      break;
  }

  if (!isValidFrequencySelection) {
    toast.add({ severity: 'error', summary: t('common.error'), detail: t('error.invalidDateFrequencyAlert'), life: 5000 });
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    toast.add({ severity: 'error', summary: t('common.error'), detail: t('error.userNotLoggedIn'), life: 5000 });
    console.error("No authentication token found. User must be logged in to make a booking.");
    return;
  }

  const bookingData = {
    experienceId: experience.value.id,
    bookingDate: selectedDate.value.toISOString(),
    numberOfPeople: numberOfPeople.value,
    time: selectedSchedule.value
  };

  console.log("Booking data sent:", bookingData);

  try {
    const response = await bookingApiService.createBooking(bookingData);

    if (response.status >= 200 && response.status < 300) {
      toast.add({ severity: 'success', summary: t('common.success'), detail: t('booking.success'), life: 3000 });

    } else {
      console.error('Error en la respuesta no-2xx del backend:', response.status, response.data);
      toast.add({ severity: 'error', summary: t('common.error'), detail: t('error.networkOrServerIssue'), life: 7000 });
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: t('common.error'), detail: t('error.networkOrServerIssue'), life: 7000 });
    console.error('Error de red o del servidor al crear reserva:', error);

    if (error.response && error.response.data) {
      console.error("Detalles de error del backend (catch):", error.response.data);
      const errorData = error.response.data;
      let detailMessage = t('error.bookingFailedDefault');

      if (errorData.message) {
        detailMessage = errorData.message;
      } else if (errorData.errors) {
        const validationErrors = Object.values(errorData.errors).flat().map(e => e.message || e);
        detailMessage = t('error.validationFailed') + ": " + validationErrors.join('; ');
      } else if (errorData.detail) {
        detailMessage = errorData.detail;
      }
      toast.add({ severity: 'error', summary: t('common.error'), detail: detailMessage, life: 7000 });
    }
  }
};
</script>

<style scoped>
.detail-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.info-column .header {
  margin-bottom: 1.5rem;
}
.info-column .title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}
.info-column .meta-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: #555;
  font-size: 1rem;
}
.info-column .meta-info .pi {
  margin-right: 0.5rem;
}

.section {
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 2rem;
}
.section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.section p, .section li {
  line-height: 1.6;
  color: #333;
}
.section ul {
  list-style: none;
  padding: 0;
}
.section li {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.booking-column {
  position: relative;
}
.booking-card {
  position: sticky;
  top: 2rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.booking-card .price {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}
.booking-card .price-unit {
  font-size: 1rem;
  font-weight: 400;
  color: #555;
}
.booking-form {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.booking-form .form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.total-price {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 600;
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-top: 1rem;
}
.booking-button {
  margin-top: 1.5rem;
  background-color: #2c8a8a;
  border: none;
  font-size: 1.1rem;
  padding: 0.9rem;
}
.booking-button:hover {
  background-color: #257575;
}

.loading-container, .not-found-container {
  text-align: center;
  padding: 4rem;
  color: #555;
}
</style>