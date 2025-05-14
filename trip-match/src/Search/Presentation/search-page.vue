<script setup>
import { ref, watch } from 'vue';
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service.js';
import { ExperienceAssembler } from '@/Experience/Application/experience.assembler.js';

const destination = ref('Arequipa');
const day = ref('01/02/25');
const budget = ref('50-100');
const experienceType = ref('Aventura');

const experiences = ref([
  {
    id: '1',
    title: 'City Tour Arequipa',
    description: 'Descubre la belleza colonial de Arequipa en este recorrido guiado por el Centro Histórico, el Mirador de Yanahuara, y el Monasterio de Santa Catalina.',
    location: 'Arequipa',
    duration: 2,
    price: 80,
    frequencies: ['Todos los días'],
    schedules: ['10:00am', '2:00pm'],
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'],
    rating: 4
  },
  {
    id: '2',
    title: 'City Tour Arequipa',
    description: 'Descubre la belleza colonial de Arequipa en este recorrido guiado por el Centro Histórico, el Mirador de Yanahuara, y el Monasterio de Santa Catalina.',
    location: 'Arequipa',
    duration: 2,
    price: 80,
    frequencies: ['Todos los días'],
    schedules: ['10:00am', '2:00pm'],
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'],
    rating: 4
  }
]);

const mapUrl = ref(getMapUrl(destination.value));

function getMapUrl(dest) {
  return `https://www.google.com/maps?q=${encodeURIComponent(dest)},+Peru&output=embed`;
}

watch(destination, (newDest) => {
  mapUrl.value = getMapUrl(newDest);
});

// Modal logic
const showModal = ref(false);
const selectedExperience = ref(null);

const showBookingModal = ref(false);
const bookingForm = ref({
  name: '',
  email: '',
  date: '',
  people: 1
});

const showQueryModal = ref(false);
const queryForm = ref({
  name: '',
  email: '',
  query: ''
});

function openModal(exp) {
  selectedExperience.value = exp;
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
  selectedExperience.value = null;
}
function openBookingModal() {
  showBookingModal.value = true;
}
function closeBookingModal() {
  showBookingModal.value = false;
  bookingForm.value = { name: '', email: '', date: '', people: 1 };
}
function confirmBooking() {
  // Aquí podrías enviar la reserva a una API o mostrar un mensaje de éxito
  alert('¡Reserva realizada con éxito!');
  closeBookingModal();
  closeModal();
}
function openQueryModal() {
  showQueryModal.value = true;
}
function closeQueryModal() {
  showQueryModal.value = false;
  queryForm.value = { name: '', email: '', query: '' };
}
function submitQuery() {
  // Aquí podrías enviar la consulta a una API o mostrar un mensaje de éxito
  alert('¡Consulta enviada con éxito!');
  closeQueryModal();
  closeModal();
}
</script>

<template>
  <div class="queries-page">
    <div class="filters-and-results">
      <div class="filters-bar">
        <div class="filter-item">
          <span class="filter-label">Destino</span>
          <input v-model="destination" class="filter-value input-inline" />
        </div>
        <div class="filter-item"><span class="filter-label">Día</span><span class="filter-value">{{ day }}</span></div>
        <div class="filter-item"><span class="filter-label">Presupuesto</span><span class="filter-value">{{ budget }}</span></div>
        <div class="filter-item"><span class="filter-label">Experiencia</span><span class="filter-value">{{ experienceType }}</span></div>
      </div>
      <div class="results-list">
        <div v-for="exp in experiences" :key="exp.id" class="tour-card">
          <img :src="exp.images[0]" class="tour-img" />
          <div class="tour-content">
            <div class="tour-header">
              <h3 class="tour-title">{{ exp.title }}</h3>
              <span class="favorite-icon">♡</span>
            </div>
            <div class="tour-rating">
              <span class="stars">★★★★★</span>
              <span class="score">{{ exp.rating }}</span>
            </div>
            <div class="tour-details">S/{{ exp.price }} · {{ exp.duration }}h · {{ exp.frequencies[0] }}</div>
            <div class="tour-schedule">{{ exp.schedules.join(' | ') }}</div>
            <div class="tour-description">{{ exp.description }}</div>
            <div class="tour-footer">
              <a href="#" class="andes-link">Andes explorer →</a>
              <button class="see-more-btn" @click="openModal(exp)">Ver mas</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="map-section">
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        style="border:0; border-radius: 16px; min-height: 500px;"
        :src="mapUrl"
        allowfullscreen
      ></iframe>
    </div>

    <!-- Modal de información -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">×</button>
        <template v-if="selectedExperience">
          <img :src="selectedExperience.images[0]" class="modal-img" />
          <h2 class="modal-title">{{ selectedExperience.title }}</h2>
          <div class="modal-rating">
            <span class="stars">★★★★★</span>
            <span class="score">{{ selectedExperience.rating }}</span>
          </div>
          <div class="modal-details">
            <span><b>Precio:</b> S/{{ selectedExperience.price }}</span> ·
            <span><b>Duración:</b> {{ selectedExperience.duration }}h</span> ·
            <span><b>Frecuencia:</b> {{ selectedExperience.frequencies[0] }}</span>
          </div>
          <div class="modal-schedule"><b>Horarios:</b> {{ selectedExperience.schedules.join(' | ') }}</div>
          <p class="modal-description">{{ selectedExperience.description }}</p>
          <div class="modal-actions">
            <button class="booking-btn" @click="openBookingModal">Reservar</button>
            <button class="query-btn" @click="openQueryModal">Consultas</button>
          </div>
        </template>
      </div>
    </div>
    <!-- Modal de reserva -->
    <div v-if="showBookingModal" class="modal-overlay" @click.self="closeBookingModal">
      <div class="modal-content booking-modal">
        <button class="modal-close" @click="closeBookingModal">×</button>
        <h2 class="modal-title">Reservar experiencia</h2>
        <form @submit.prevent="confirmBooking">
          <input v-model="bookingForm.name" class="booking-input" type="text" placeholder="Nombre completo" required />
          <input v-model="bookingForm.email" class="booking-input" type="email" placeholder="Correo electrónico" required />
          <input v-model="bookingForm.date" class="booking-input" type="date" required />
          <input v-model.number="bookingForm.people" class="booking-input" type="number" min="1" placeholder="Personas" required />
          <div class="booking-actions">
            <button type="button" class="cancel-btn" @click="closeBookingModal">Cancelar</button>
            <button type="submit" class="confirm-btn">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Modal de consulta -->
    <div v-if="showQueryModal" class="modal-overlay" @click.self="closeQueryModal">
      <div class="modal-content query-modal">
        <button class="modal-close" @click="closeQueryModal">×</button>
        <h2 class="modal-title">Enviar consulta</h2>
        <form @submit.prevent="submitQuery">
          <input v-model="queryForm.name" class="booking-input" type="text" placeholder="Nombre completo" required />
          <input v-model="queryForm.email" class="booking-input" type="email" placeholder="Correo electrónico" required />
          <textarea v-model="queryForm.query" class="query-textarea" placeholder="Escribe tu consulta aquí..." required></textarea>
          <div class="booking-actions">
            <button type="button" class="cancel-btn" @click="closeQueryModal">Cancelar</button>
            <button type="submit" class="confirm-btn">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.queries-page {
  display: flex;
  gap: 2rem;
  padding: 2rem 1rem;
}
.filters-and-results {
  flex: 2;
  display: flex;
  flex-direction: column;
}
.filters-bar {
  display: flex;
  gap: 1.5rem;
  background: #e6f2f1;
  border-radius: 12px;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
}
.filter-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.filter-label {
  font-size: 0.9rem;
  color: #888;
}
.filter-value {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1.1rem;
}
.results-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.tour-card {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: box-shadow 0.2s;
}
.tour-card:hover {
  box-shadow: 0 4px 16px rgba(49,140,139,0.12);
}
.tour-img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 12px 0 0 12px;
  margin: 16px;
}
.tour-content {
  flex: 1;
  padding: 16px 16px 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.tour-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.tour-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
  color: #1a1a1a;
}
.favorite-icon {
  font-size: 1.4rem;
  color: #318C8B;
  cursor: pointer;
}
.tour-rating {
  display: flex;
  align-items: center;
  margin: 4px 0 8px 0;
}
.stars {
  color: #f5a623;
  margin-right: 4px;
}
.score {
  font-weight: bold;
  color: #222;
}
.tour-details, .tour-schedule {
  font-size: 0.95rem;
  color: #222;
  margin-bottom: 2px;
}
.tour-description {
  font-size: 0.95rem;
  color: #222;
  margin: 8px 0;
}
.tour-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}
.andes-link {
  color: #318C8B;
  text-decoration: underline;
  font-size: 0.95rem;
}
.see-more-btn {
  background: #e6f2f1;
  color: #318C8B;
  border: none;
  border-radius: 8px;
  padding: 6px 18px;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.see-more-btn:hover {
  background: #c2e0de;
}
.map-section {
  flex: 1;
  min-width: 350px;
  max-width: 500px;
  min-height: 500px;
  height: 100%;
  background: #f8f8f8;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.input-inline {
  border: none;
  background: transparent;
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1.1rem;
  outline: none;
  min-width: 80px;
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 2rem 2.5rem;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  position: relative;
  text-align: center;
}
.modal-close {
  position: absolute;
  top: 12px;
  right: 18px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #318C8B;
  cursor: pointer;
}
.modal-img {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}
.modal-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}
.modal-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: #222;
}
.modal-details {
  font-size: 1rem;
  color: #222;
  margin-bottom: 0.5rem;
}
.modal-schedule {
  font-size: 0.95rem;
  color: #222;
  margin-bottom: 1rem;
}
.modal-description {
  font-size: 1rem;
  color: #222;
}
.booking-btn {
  background: #318C8B;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1.2rem;
  cursor: pointer;
  transition: background 0.2s;
}
.booking-btn:hover {
  background: #256c6b;
}
.booking-modal {
  max-width: 380px;
}
.booking-input {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.7rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  color: #1a1a1a;
  background: #fff;
}
.booking-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.cancel-btn {
  background: #eee;
  color: #318C8B;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}
.confirm-btn {
  background: #318C8B;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}
.confirm-btn:hover {
  background: #256c6b;
}
.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.2rem;
}
.query-btn {
  background: #e6f2f1;
  color: #318C8B;
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.query-btn:hover {
  background: #c2e0de;
}
.query-modal {
  max-width: 380px;
}
.query-textarea {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.7rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  color: #1a1a1a;
  background: #fff;
  min-height: 100px;
  resize: vertical;
}
</style>
