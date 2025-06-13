<template>
  <div v-if="isLoading" class="loading-container">
    <p>Cargando detalles de la experiencia...</p>
  </div>

  <div v-else-if="experience" class="detail-container">
    <div class="info-column">
      <div class="header">
        <h1 class="title">{{ experience.title }}</h1>
        <div class="meta-info">
          <span class="rating">★ {{ experience.rating.toFixed(1) }}</span>
          <span class="location"><i class="pi pi-map-marker"></i> {{ experience.location }}</span>
        </div>
      </div>

      <Galleria :value="experience.images" :numVisible="5" containerStyle="max-width: 100%" :showThumbnails="false" :showIndicators="true" :circular="true" :autoPlay="true" :transitionInterval="3000">
        <template #item="slotProps">
          <img :src="slotProps.item" :alt="experience.title" style="width: 100%; display: block; border-radius: 12px;" />
        </template>
      </Galleria>

      <div class="section">
        <h2>Descripción</h2>
        <p>{{ experience.description }}</p>
      </div>

      <div class="section">
        <h2>¿Qué incluye?</h2>
        <ul>
          <li v-for="(item, index) in experience.includes" :key="index">
            <i class="pi pi-check-circle" style="color: #2c8a8a;"></i> {{ item }}
          </li>
        </ul>
      </div>
      <div class="section">
        <h2>Horarios y Frecuencia</h2>
        <p><strong>Frecuencia:</strong> {{ experience.frequencies }}</p>
        <p><strong>Horarios de inicio disponibles:</strong> {{ experience.schedules.join(', ') }}</p>
      </div>

    </div>

    <div class="booking-column">
      <div class="booking-card">
        <h3 class="price">S/ {{ experience.price }} <span class="price-unit">/ persona</span></h3>
        <div class="booking-form">
          <div class="form-group">
            <label>Fecha</label>
            <Calendar v-model="selectedDate" placeholder="Elige una fecha" dateFormat="dd/mm/yy" class="w-full" />
          </div>
          <div class="form-group">
            <label>Número de personas</label>
            <InputNumber v-model="numberOfPeople" mode="decimal" showButtons :min="1" :max="10" class="w-full" />
          </div>
        </div>
        <div class="total-price">
          <span>Total</span>
          <span>S/ {{ totalPrice.toFixed(2) }}</span>
        </div>
        <Button label="Reservar ahora" class="w-full booking-button" @click="handleBooking" />
      </div>
    </div>
  </div>

  <div v-else class="not-found-container">
    <h2>Experiencia no encontrada</h2>
    <p>La experiencia que buscas no existe o no está disponible.</p>
    <router-link to="/">Volver al inicio</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service.js';
import Galleria from 'primevue/galleria';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
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
const totalPrice = computed(() => {
  if (experience.value) {
    return experience.value.price * numberOfPeople.value;
  }
  return 0;
});

onMounted(async () => {
  try {
    const response = await experienceService.getById(props.id);
    if (response.data) {
      experience.value = response.data;
    }
  } catch (error) {
    console.error("Error al cargar la experiencia:", error);
    experience.value = null;
  } finally {
    isLoading.value = false;
  }
});

const handleBooking = () => {
  if (!selectedDate.value) {
    alert('Por favor, selecciona una fecha para la reserva.');
    return;
  }

  const bookingDetails = {
    experienceId: experience.value.id,
    experienceTitle: experience.value.title,
    date: selectedDate.value.toLocaleDateString('es-ES'),
    people: numberOfPeople.value,
    total: totalPrice.value
  };

  console.log('Datos de la reserva:', bookingDetails);
  alert(`¡Gracias por tu interés! Funcionalidad de reserva en desarrollo.\nHas seleccionado: ${bookingDetails.people} persona(s) para el ${bookingDetails.date}.`);
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
.info-column .rating {
  font-weight: 600;
  color: #e8a900;
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