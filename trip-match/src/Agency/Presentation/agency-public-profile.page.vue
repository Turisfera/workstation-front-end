<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Avatar from 'primevue/avatar';
import Dialog from 'primevue/dialog';
import StarRating from '@/Agency/Presentation/StarRating.vue';
import ReviewForm from './review-form.component.vue';
import { AgenciesApiService } from '@/Agency/Application/agencies-api.service.js';
import { ReviewsApiService } from '@/Agency/Application/reviews-api.service.js';
import AgencyReviewsDialog from "@/Agency/Presentation/AgencyReviewsDialog.vue";

const { t } = useI18n();
const route = useRoute();
const agency = ref({
  id: '',
  agencyName: '',
  ruc: '',
  description: '',
  avatarUrl: '',
  reservationCount: 0,
  rating: 0,
  reviewCount: 0,
  contact: { email: '', phone: '' },
  socialLinks: { facebook: '', instagram: '', whatsapp: '' },
  reviews: []
});

const loading = ref(true);
const showReviews = ref(false);
const showReviewModal = ref(false);

const agencyService = new AgenciesApiService();
const reviewService = new ReviewsApiService();

onMounted(async () => {
  const agencyId = route.params.agencyId;
  if (agencyId) {
    await loadAgencyData(agencyId);
  } else {
    console.error("No se encontró ID de agencia en la ruta.");
    loading.value = false;
  }
});

async function loadAgencyData(id) {
  loading.value = true;
  try {
    const { data } = await agencyService.getProfile(id);
    let rawReviewsData = [];
    try {
      const { data: reviewsPayload } = await reviewService.getReviewsByAgencyId(id);
      rawReviewsData = Array.isArray(reviewsPayload)
          ? reviewsPayload
          : Array.isArray(reviewsPayload.data)
              ? reviewsPayload.data
              : [];
    } catch (error) {
      console.warn('No se pudieron cargar las reseñas.', error);
    }

    const reviews = Array.isArray(rawReviewsData)
        ? rawReviewsData.map(r => ({
          id:        r.id,
          name:      r.touristName || r.name,
          avatar:    r.touristAvatarUrl || r.avatar,
          comment:   r.comment,
          rating:    Number(r.rating),
          date:      new Date(r.reviewDate || r.date).toLocaleDateString()
        }))
        : [];
    const total = reviews.reduce((s, r) => s + r.rating, 0);
    const avg = reviews.length ? total / reviews.length : 0;

    agency.value = {
      id: data.userId,
      agencyName: data.agencyName,
      ruc: data.ruc,
      description: data.description,
      avatarUrl: data.avatarUrl,
      reservationCount: data.reservationCount,
      rating: Number(avg.toFixed(1)),
      reviewCount: reviews.length,
      contact: {
        email: data.contactEmail,
        phone: data.contactPhone
      },
      socialLinks: {
        facebook: data.socialLinkFacebook,
        instagram: data.socialLinkInstagram,
        whatsapp: data.socialLinkWhatsapp
      },
      reviews
    };
  } catch (err) {
    console.error('Error loading agency data:', err);
  } finally {
    loading.value = false;
  }
}

async function handleNewReview() {
  showReviewModal.value = false;
  alert(t('agencyPublicProfile.reviewSuccess', '¡Reseña enviada con éxito!'));
  await loadAgencyData(agency.value.id);
}
</script>

<template>
  <div class="agency-profile">
    <div class="header">
      <h1 class="agency-name">
        {{ agency.agencyName || t('agencyProfile.noName') }}
      </h1>
      <button class="add-experience-button" @click="showReviewModal = true">
        {{ t('agencyPublicProfile.leaveReview', 'Dejar una reseña') }}
      </button>
    </div>

    <div v-if="loading" class="loading">
      {{ t('agencyProfile.loading', 'Cargando') }}…
    </div>

    <div v-else class="content-grid">
      <div class="main-col">
        <p class="tax-id">
          <strong>{{ t('agencyProfile.taxIdLabel', 'RUC:') }}</strong>
          {{ agency.ruc }}
        </p>
        <p class="description">{{ agency.description }}</p>

        <div class="stats">
          <div class="stat-item">
            <div class="stat-number">{{ agency.rating.toFixed(1) }}</div>
            <div class="stat-stars">
              <StarRating :rating="agency.rating" />
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ agency.reviewCount }}</div>
            <div class="stat-label">{{ t('agencyProfile.reviews', 'Reseñas') }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ agency.reservationCount }}</div>
            <div class="stat-label">{{ t('agencyProfile.reservations', 'Reservas') }}</div>
          </div>
        </div>

        <div class="reviews">
          <div
              v-for="rev in agency.reviews.slice(0, 2)"
              :key="rev.id"
              class="review-item"
          >
            <Avatar :image="rev.avatar" shape="circle" size="large" />
            <div class="review-content">
              <div class="review-header">
                <span class="reviewer">{{ rev.name }}</span>
                <span class="review-date">{{ rev.date }}</span>
              </div>
              <StarRating :rating="rev.rating" />
              <p class="review-text">{{ rev.comment }}</p>
            </div>
          </div>
          <a
              v-if="agency.reviews.length > 2"
              href="#"
              class="view-more"
              @click.prevent="showReviews = true"
          >
            {{ t('agencyProfile.viewMore', 'Ver más') }} ›
          </a>
        </div>
        <AgencyReviewsDialog
            v-model:visible="showReviews"
            :reviews="agency.reviews"
            :rating="agency.rating"
            :reviewCount="agency.reviewCount"
        />
      </div>

      <div class="side-col">
        <img
            :src="agency.avatarUrl"
            :alt="t('agencyProfile.agencyLogoAlt', 'Logo de la agencia')"
            class="agency-logo"
        />
        <p class="contact">{{ agency.contact.email }}</p>
        <p class="contact">{{ agency.contact.phone }}</p>
        <div class="social-icons">
          <a :href="agency.socialLinks.facebook" target="_blank">
            <i class="pi pi-facebook pi-2x"></i>
          </a>
          <a :href="agency.socialLinks.instagram" target="_blank">
            <i class="pi pi-instagram pi-2x"></i>
          </a>
          <a :href="agency.socialLinks.whatsapp" target="_blank">
            <i class="pi pi-whatsapp pi-2x"></i>
          </a>
        </div>
      </div>
    </div>

    <Dialog
        v-model:visible="showReviewModal"
        modal
        :closable="true"
        :header="t('agencyPublicProfile.writeReview', 'Escribe tu Reseña')"
        :style="{ width: '500px' }"
    >
      <ReviewForm
          v-if="agency.id"
          :agency-id="agency.id"
          @review-submitted="handleNewReview"
          @cancel="showReviewModal = false"
      />
    </Dialog>
  </div>
</template>
<style scoped>
.agency-profile { max-width: 1300px; margin: 0 auto; padding: 1rem; color: #0f172a; font-family: 'Poppins', sans-serif; }
.header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e7eb; padding-bottom: 1rem; margin-bottom: 1.5rem; }
.agency-name { font-size: 1.8rem; font-weight: 700; color: #0f172a; }
.add-experience-button { background-color: #318C8B; color: #ffffff; border: none; border-radius: 8px; padding: 12px 24px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background-color 0.3s ease; }
.add-experience-button:hover { background-color: #2c7a7b; }
.content-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
.tax-id { margin: 0 0 0.5rem; font-weight: 500; }
.description { margin: 0 0 1.5rem; line-height: 1.6; }
.stats { display: flex; justify-content: space-between; background-color: #fef3c7; border-radius: 12px; padding: 1.25rem; max-width: 600px; margin-bottom: 2rem; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08); }
.stat-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }
.stat-item + .stat-item { border-left: 1px solid rgba(0, 0, 0, 0.08); }
.stat-number { font-size: 1.4rem; font-weight: bold; color: #0f172a; }
.stat-label { font-size: 0.9rem; color: #334155; }
.stat-stars { display: flex; justify-content: center; }
.reviews { margin-top: 1rem; }
.review-item { display: flex; gap: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 1rem; }
.review-content { flex: 1; }
.review-header { display: flex; justify-content: space-between; align-items: center; font-size: 0.95rem; }
.review-date { color: #64748b; font-size: 0.85rem; }
.review-text { margin-top: 0.5rem; line-height: 1.5; color: #1e293b; }
.view-more { display: inline-block; margin-top: 0.5rem; color: #318C8B; font-weight: 500; text-decoration: none; }
.view-more:hover { text-decoration: underline; }
.side-col { text-align: center; border-left: 1px solid #e5e7eb; padding-left: 1.5rem; }
.agency-logo { width: 100%; max-width: 300px; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); margin: 0 auto 1rem auto; }
.contact { margin: 0.5rem 0; line-height: 1.4; color: #1e293b; }
.social-icons a { margin: 0 0.5rem; color: #000; }
.social-icons a i { font-size: 1.8rem; transition: color 0.2s ease; }
.social-icons a i:hover { color: #318C8B; }
.dialog-title { margin: 0; color: #0f172a; font-size: 1.25rem; font-weight: 600; }
.review-summary { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.rating-left { display: flex; flex-direction: column; align-items: flex-start; }
.rating-number { font-size: 2rem; font-weight: bold; }
.review-count { font-size: 1rem; font-weight: 500; color: #475569; }
.review-list { max-height: 400px; overflow-y: auto; display: flex; flex-direction: column; gap: 1.25rem; }
.loading-state { text-align: center; padding: 4rem; font-size: 1.2rem; color: #64748b; }
</style>