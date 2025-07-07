<template>
  <div class="agency-profile">
    <div class="header">
      <h1 class="agency-name">
        {{ agency.agencyName || t('agencyProfile.noName') }}
      </h1>
      <button class="add-experience-button" @click="editing = true">
        {{ t('agencyProfile.edit', 'Editar perfil') }}
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
          <a href="#" class="view-more" @click.prevent="showReviews = true">
            {{ t('agencyProfile.viewMore', 'Ver más') }} ›
          </a>
        </div>
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

    <Dialog v-model:visible="editing" modal :closable="false" style="width:600px">
      <template #header>
        <h2 class="dialog-title">
          {{ t('agencyProfile.editprofile', 'Editar perfil') }}
        </h2>
      </template>
      <AgencyForm
          :agency="agency"
          @cancel="editing = false"
          @saved="onSaved"
      />
    </Dialog>

    <Dialog v-model:visible="showReviews" modal style="width:600px">
      <template #header>
        <h2 class="dialog-title">
          {{ t('agencyProfile.reviewsTitle', 'Reseñas') }}
        </h2>
      </template>
      <div class="review-summary">
        <div class="rating-left">
          <span class="rating-number">{{ agency.rating.toFixed(1) }}</span>
          <StarRating :rating="agency.rating" :showText="true" />
        </div>
        <div class="rating-right">
          <span class="review-count">
            {{ agency.reviewCount }} {{ t('agencyProfile.reviews', 'Reseñas') }}
          </span>
        </div>
      </div>
      <hr />
      <div class="review-list">
        <div v-for="rev in agency.reviews" :key="rev.id" class="review-item">
          <Avatar :image="rev.avatar" shape="circle" size="large" />
          <div class="review-content">
            <div class="review-header">
              <strong>{{ rev.name }}</strong>
              <small>{{ rev.date }}</small>
            </div>
            <StarRating :rating="rev.rating" />
            <p class="review-text">{{ rev.comment }}</p>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import Avatar from 'primevue/avatar'
import Dialog from 'primevue/dialog'
import StarRating from '@/Agency/Presentation/StarRating.vue'
import AgencyForm from './agency-form.component.vue'

import { AgenciesApiService } from '@/Agency/Application/agencies-api.service.js'
import { ReviewsApiService } from '@/Agency/Application/reviews-api.service.js'

const { t } = useI18n()
const router = useRouter()

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
})

const loading = ref(false)
const editing = ref(false)
const showReviews = ref(false)

const agencyService = new AgenciesApiService()
const reviewService = new ReviewsApiService()

onMounted(async () => {
  const agencyId = localStorage.getItem('userId')
  if (!agencyId) {
    console.error('No se encontró agencyId en localStorage')
    return router.push('/login')
  }
  await loadAgencyData(agencyId)
})

async function loadAgencyData(id) {
  loading.value = true
  try {
    const { data } = await agencyService.getProfile(id)
    let raw = []
    try {
      raw = await reviewService.getReviewsByAgencyId(id)
    } catch {
      console.warn('No se pudieron cargar reseñas')
    }
    const list = Array.isArray(raw) ? raw : raw.data || []
    const reviews = list.map(r => ({ ...r, rating: Number(r.rating) }))
    const total = reviews.reduce((s, r) => s + r.rating, 0)
    const avg = reviews.length ? total / reviews.length : 0

    agency.value = {
      id: data.id,
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
    }
  } catch (err) {
    console.error('Error loading agency data:', err)
    if (err.response?.status === 404) {
      alert(
          t(
              'agencyProfile.notFound',
              'Aún no tienes un perfil de agencia. ¡Créalo ahora!'
          )
      )
      editing.value = true
    } else {
      alert(
          t(
              'error.loadAgencyDataError',
              'Error al cargar datos de la agencia, intenta más tarde.'
          )
      )
    }
  } finally {
    loading.value = false
  }
}

async function onSaved(payload) {
  console.log('Payload enviado:', payload);
  const id = localStorage.getItem('userId')
  if (!id) return

  try {
    const { data: updated } = await agencyService.updateProfile(id, payload)
    agency.value = {
      ...agency.value,
      agencyName: updated.agencyName,
      ruc: updated.ruc,
      description: updated.description,
      avatarUrl: updated.avatarUrl,
      contact: {
        email: updated.contactEmail,
        phone: updated.contactPhone
      },
      socialLinks: {
        facebook: updated.socialLinkFacebook,
        instagram: updated.socialLinkInstagram,
        whatsapp: updated.socialLinkWhatsapp
      }
    }
    if (payload.agencyName) localStorage.setItem('name', payload.agencyName)
    if (payload.avatarUrl) localStorage.setItem('avatar', payload.avatarUrl)

    alert(t('agencyProfile.updateSuccess','Perfil actualizado exitosamente'))
    editing.value = false
  } catch (err) {
    console.error('Error saving changes:', err)
    if (err.response?.status === 400) {
      alert(
          t(
              'agencyProfile.invalidData',
              'Datos inválidos. Por favor, revisa los campos.'
          )
      )
    } else {
      alert(
          t(
              'agencyProfile.updateError',
              'Error al guardar los cambios. Intenta nuevamente.'
          )
      )
    }
  }
}
</script>

<style scoped>
.agency-profile {
  max-width: 1300px;
  margin: 0 auto;
  padding: 1rem;
  color: #0f172a;
  font-family: 'Poppins', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}


.agency-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #0f172a;
}

.add-experience-button {
  background-color: #318C8B;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-experience-button:hover {
  background-color: #bae6fd;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.tax-id {
  margin: 0 0 0.5rem;
  font-weight: 500;
}

.description {
  margin: 0 0 1.5rem;
  line-height: 1.6;
}

.stats {
  display: flex;
  justify-content: space-between;
  background-color: #fef3c7;
  border-radius: 12px;
  padding: 1.25rem;
  max-width: 600px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  background-color: transparent;
}

.stat-item + .stat-item {
  border-left: 1px solid rgba(0, 0, 0, 0.08);
}
.stat-number {
  font-size: 1.4rem;
  font-weight: bold;
  color: #0f172a;
}

.stat-label {
  font-size: 0.9rem;
  color: #334155;
}
.stat-stars {
  display: flex;
  justify-content: center;
}
.stat-item span,
.stat-item {
  background-color: transparent !important;
  box-shadow: none !important;
}
.stat-item span {
  display: inline;
}
.stat-item * {
  background-color: transparent !important;
}
.reviews {
  margin-top: 1rem;
}

.review-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.review-content {
  flex: 1;
}

.review-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.95rem;
}

.review-date {
  color: #64748b;
  font-size: 0.85rem;
}

.review-text {
  margin-top: 0.5rem;
  line-height: 1.5;
  color: #1e293b;
}

.view-more {
  display: inline-block;
  margin-top: 0.5rem;
  color: #318C8B;
  font-weight: 500;
  text-decoration: none;
}

.view-more:hover {
  text-decoration: underline;
}

.side-col {
  text-align: center;
  border-left: 1px solid #e5e7eb;
  padding-left: 1.5rem;
}

.agency-logo {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.contact {
  margin: 0.5rem 0;
  line-height: 1.4;
  color: #1e293b;
}

.social-icons a {
  margin: 0 0.5rem;
  color: #000;
}

.dialog-title {
  margin: 0;
  color: #0f172a;
  font-size: 1.25rem;
  font-weight: 600;
}

.review-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: #000;
}

.rating-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #000;
}

.rating-number {
  font-size: 2rem;
  font-weight: bold;
}

.review-count {
  font-size: 1rem;
  font-weight: 500;
  color: #475569;
}


.review-list {
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  color: #000;
}
.social-icons a i {
  font-size: 1.8rem;
  transition: color 0.2s ease;
}

.social-icons a i:hover {
  color: #318C8B;
}
.agency-logo {
  width: 100%;
  max-width: 300px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto 1rem auto;
}


</style>