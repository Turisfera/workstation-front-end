<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { AgenciesApiService } from "@/Agency/Application/agencies-api.service.js";
import { ReviewsApiService } from "@/Agency/Application/reviews-api.service.js";
import { QueryApiService } from "@/Queries/Application/query-api.service.js";
import StarRating from "@/Agency/Presentation/StarRating.vue";
import Avatar from "primevue/avatar";
const router = useRouter();
const agenciesApi = new AgenciesApiService();
const reviewsApi = new ReviewsApiService();
const queriesApi = new QueryApiService();
const agencyName = ref('');
const stats = ref({
  totalExperiences: 12,
  newQueries: 0,
  totalBookings: 0,
  totalEarnings: 'S/ 0.00'
});
const latestReviews = ref([]);
const latestBookings = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const agencyId = "1";
    const [agencyData, reviewsData, queriesData] = await Promise.all([
      agenciesApi.getProfile(agencyId),
      reviewsApi.getReviewsByAgencyId(agencyId),
      queriesApi.getAllQueries()
    ]);

    agencyName.value = agencyData.data.name;
    latestReviews.value = reviewsData.data.slice(0, 2);
    const unansweredQueries = queriesData.data.filter(q => !q.isAnswered);
    stats.value.newQueries = unansweredQueries.length;
    const mockBookings = [
      { id: 1, name: 'Carlos Mendoza', experience: 'City Tour Lima', amount: 150 },
      { id: 2, name: 'Ana Gutierrez', experience: 'Trekking a la Montaña', amount: 250 },
    ];
    latestBookings.value = mockBookings;
    stats.value.totalBookings = 78;
    stats.value.totalEarnings = 'S/ 12,450';

  } catch (error) {
    console.error("Error al cargar los datos del dashboard:", error);
  } finally {
    isLoading.value = false;
  }
});

const navigateTo = (routeName) => {
  router.push({ name: routeName });
};
</script>

<template>
  <div class="agency-dashboard" v-if="!isLoading">
    <header class="dashboard-header">
      <div>
        <h1>¡Bienvenido, {{ agencyName }}!</h1>
        <p>Este es el resumen de tu actividad reciente.</p>
      </div>
      <button class="action-button-main" @click="navigateTo('ExperienceCreate')">
        <i class="pi pi-plus"></i>
        <span>Añadir Experiencia</span>
      </button>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <span class="card-value">{{ stats.totalExperiences }}</span>
        <span class="card-label">Experiencias Totales</span>
      </div>
      <div class="stat-card">
        <span class="card-value text-orange">{{ stats.newQueries }}</span>
        <span class="card-label">Consultas Nuevas</span>
      </div>
      <div class="stat-card">
        <span class="card-value">{{ stats.totalBookings }}</span>
        <span class="card-label">Reservas Totales</span>
      </div>
      <div class="stat-card">
        <span class="card-value text-green">{{ stats.totalEarnings }}</span>
        <span class="card-label">Ganancias Totales</span>
      </div>
    </div>

    <div class="content-grid">
      <div class="content-section">
        <div class="section-header">
          <h2>Últimas Reseñas</h2>
          <router-link :to="{name: 'AgencyProfile'}" class="view-all-link">Ver todas</router-link>
        </div>
        <div class="review-list">
          <div v-for="review in latestReviews" :key="review.id" class="review-item">
            <Avatar :image="review.avatar" shape="circle" size="large" />
            <div class="review-content">
              <div class="review-header">
                <strong>{{ review.name }}</strong>
                <StarRating :rating="Number(review.rating)" />
              </div>
              <p class="review-text">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <div class="section-header">
          <h2>Últimas Reservas</h2>
          <router-link :to="{name: 'Reservations'}" class="view-all-link">Ver todas</router-link>
        </div>
        <div class="booking-list">
          <div v-for="booking in latestBookings" :key="booking.id" class="booking-item">
            <div class="booking-info">
              <span class="booking-name">{{ booking.name }}</span>
              <span class="booking-experience">{{ booking.experience }}</span>
            </div>
            <span class="booking-amount">S/ {{ booking.amount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading-state">
    Cargando panel de control...
  </div>
</template>

<style scoped>
.agency-dashboard {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.dashboard-header h1 {
  font-size: 2rem;
  font-weight: 700;
}
.dashboard-header p {
  color: #64748b;
}

.action-button-main {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #318C8B;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.action-button-main:hover {
  background-color: #2a7574;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background-color: #fef3c7;
  border: 1px solid #FFDCA4;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.card-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: #000000;
}
.card-value.text-green { color: #158f4b; }
.card-value.text-orange { color: #f63a3a; }

.card-label {
  font-size: 0.9rem;
  color: #000000;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.content-section {
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
.section-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}
.view-all-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: #318C8B;
  text-decoration: none;
}
.view-all-link:hover {
  text-decoration: underline;
}

.review-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem 0;
}
.review-item:not(:last-child) {
  border-bottom: 1px solid #f1f5f9;
}
.review-content { flex: 1; }
.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}
.review-text {
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.5;
}

.booking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
}
.booking-item:nth-child(odd) {
  background-color: #f8fafc;
}
.booking-info {
  display: flex;
  flex-direction: column;
}
.booking-name {
  font-weight: 600;
}
.booking-experience {
  font-size: 0.85rem;
  color: #64748b;
}
.booking-amount {
  font-weight: 600;
  font-size: 1rem;
}

.loading-state {
  padding: 4rem;
  text-align: center;
  color: #64748b;
}
</style>