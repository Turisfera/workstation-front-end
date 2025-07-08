<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { AgenciesApiService } from "@/Agency/Application/agencies-api.service.js";
import { ReviewsApiService } from "@/Agency/Application/reviews-api.service.js";
import { QueryApiService } from "@/Queries/Application/query-api.service.js";
import { BookingApiService } from "@/Bookings/Application/booking-api.service.js";
import { ExperiencesApiService } from "@/Experience/Application/experiences-api.service.js";
import { UserService } from "@/Security/Application/user.service.js";
import StarRating from "@/Agency/Presentation/StarRating.vue";
import Avatar from "primevue/avatar";
import { useI18n } from 'vue-i18n';
const router = useRouter();
const agenciesApi = new AgenciesApiService();
const reviewsApi = new ReviewsApiService();
const queriesApi = new QueryApiService();
const bookingApi = new BookingApiService();
const experienceApi = new ExperiencesApiService();
const userApi = new UserService();
const { t } = useI18n();
const agencyName = ref('');
const stats = ref({
  totalExperiences: 0,
  newQueries: 0,
  totalBookings: 0,
  totalEarnings: 0.00
});
const latestReviews = ref([]);
const latestBookings = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const agencyId = localStorage.getItem('userId');
    if (!agencyId) throw new Error("ID de agencia no encontrado.");
    const results = await Promise.allSettled([
      agenciesApi.getProfile(agencyId),
      reviewsApi.getReviewsByAgencyId(agencyId),
      queriesApi.getAllQueries(),
      bookingApi.getBookingsByAgency(),
      experienceApi.getExperiencesByAgencyId(agencyId)
    ]);

    const getData = (result) => result.status === 'fulfilled' ? result.value.data : [];

    const agencyData = getData(results[0]);
    const reviewsData = getData(results[1]);
    const queriesData = getData(results[2]);
    const bookingsData = getData(results[3]);
    const experiencesData = getData(results[4]);

    // --- El resto de la lógica para procesar los datos es la misma ---
    agencyName.value = agencyData.agencyName || 'Agencia';
    stats.value.totalExperiences = experiencesData.length;

    const agencyExperienceIds = experiencesData.map(exp => exp.id);
    const agencyBookings = bookingsData.filter(booking => agencyExperienceIds.includes(booking.experienceId));

    stats.value.totalBookings = agencyBookings.length;
    stats.value.totalEarnings = agencyBookings.reduce((sum, booking) => sum + booking.price, 0);

    const unansweredQueries = queriesData.filter(q => q.isAnswered === false);
    stats.value.newQueries = unansweredQueries.length;

    const reviewPromises = reviewsData.slice(0, 2).map(async (review) => {
      const tourist = await userApi.getUserById(review.touristId);
      return { ...review, name: `${tourist.firstName} ${tourist.lastName}`, avatar: tourist.avatarUrl };
    });
    latestReviews.value = await Promise.all(reviewPromises);

    const bookingPromises = agencyBookings.slice(0, 2).map(async (booking) => {
      const tourist = await userApi.getUserById(booking.touristId);
      const experience = experiencesData.find(exp => exp.id === booking.experienceId);
      return { id: booking.id, name: `${tourist.firstName} ${tourist.lastName}`, experience: experience?.title, amount: booking.price };
    });
    latestBookings.value = await Promise.all(bookingPromises);

  } catch (error) {
    console.error("Falló al obtener los datos del dashboard:", error);
  } finally {
    isLoading.value = false;
  }
});

const navigateTo = (routeName) => router.push({ name: routeName });
</script>
<template>
  <div class="agency-dashboard" v-if="!isLoading">
    <header class="dashboard-header">
      <div>
        <h1>{{ $t('agencyDashboard.welcome', { agencyName: agencyName }) }}</h1>
        <p>{{ $t('agencyDashboard.summary') }}</p>
      </div>
      <button class="action-button-main" @click="navigateTo('ExperienceCreate')">
        <i class="pi pi-plus"></i>
        <span>{{ $t('agencyDashboard.addExperienceButton') }}</span>
      </button>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <span class="card-value">{{ stats.totalExperiences }}</span>
        <span class="card-label">{{ $t('agencyDashboard.totalExperiencesLabel') }}</span>
      </div>
      <div class="stat-card">
        <span class="card-value text-orange">{{ stats.newQueries }}</span>
        <span class="card-label">{{ $t('agencyDashboard.newQueriesLabel') }}</span>
      </div>
      <div class="stat-card">
        <span class="card-value">{{ stats.totalBookings }}</span>
        <span class="card-label">{{ $t('agencyDashboard.totalBookingsLabel') }}</span>
      </div>
      <div class="stat-card">
        <span class="card-value text-green">{{ $t('agencyDashboard.currencySymbol') }} {{ stats.totalEarnings.toFixed(2) }}</span>
        <span class="card-label">{{ $t('agencyDashboard.totalEarningsLabel') }}</span>
      </div>
    </div>

    <div class="content-grid">
      <div class="content-section">
        <div class="section-header">
          <h2>{{ $t('agencyDashboard.latestReviewsTitle') }}</h2>
          <router-link :to="{name: 'AgencyProfile'}" class="view-all-link">{{ $t('agencyDashboard.viewAll') }}</router-link>
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
          <h2>{{ $t('agencyDashboard.latestBookingsTitle') }}</h2>
          <router-link :to="{name: 'Reservations'}" class="view-all-link">{{ $t('agencyDashboard.viewAll') }}</router-link>
        </div>
        <div class="booking-list">
          <div v-for="booking in latestBookings" :key="booking.id" class="booking-item">
            <div class="booking-info">
              <span class="booking-name">{{ booking.name }}</span>
              <span class="booking-experience">{{ booking.experience }}</span>
            </div>
            <span class="booking-amount">{{ $t('agencyDashboard.currencySymbol') }} {{ booking.amount.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading-state">
    <p>{{ $t('agencyDashboard.loadingDashboard') }}</p>
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
.loading-state p {
  font-size: 1.25rem;
}
</style>