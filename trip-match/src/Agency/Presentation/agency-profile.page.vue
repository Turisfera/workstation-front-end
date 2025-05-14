<template>
  <div class="agency-profile">
    <!-- HEADER -->
    <div class="header">
      <h1 class="agency-name">{{ agency.name }}</h1>
      <Button
          :label="t('agencyProfile.edit')"
          icon="pi pi-pencil"
          severity="success"
          @click="editing = true"
      />
    </div>
    <div class="content-grid">
      <!-- Columna principal -->
      <div class="main-col">
        <p class="tax-id"><strong>RUC / NIT:</strong> {{ agency.taxId }}</p>
        <p class="description">{{ agency.description }}</p>

        <!-- Stats box -->
        <div class="stats">
          <div class="stat-item">
            <span class="stat-number">{{ agency.rating.toFixed(1) }}</span>
            <Rating :value="agency.rating" readonly :cancel="false" />
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ agency.reviewCount }}</span>
            <span class="stat-label">{{ t('agencyProfile.reviews') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ agency.reservationCount }}</span>
            <span class="stat-label">{{ t('agencyProfile.reservations') }}</span>
          </div>
        </div>
        <!-- Reseñas -->
        <div class="reviews">
          <div
              v-for="rev in agency.reviews"
              :key="rev.id"
              class="review-item"
          >
            <Avatar :image="rev.avatar" shape="circle" size="large" />
            <div class="review-content">
              <div class="review-header">
                <span class="reviewer">{{ rev.name }}</span>
                <span class="review-date">{{ rev.date }}</span>
              </div>
              <Rating
                  :value="rev.rating"
                  readonly
                  :cancel="false"
                  class="review-rating"
              />
              <p class="review-text">{{ rev.comment }}</p>
            </div>
          </div>
             <a href="#" class="view-more" @click.prevent="showReviews = true">
               {{ t('agencyProfile.viewMore') }} &rsaquo;
             </a>
        </div>
      </div>

      <!-- Columna lateral -->
      <div class="side-col">
        <img
            :src="agency.avatarUrl"
            alt="Logo Agencia"
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

    <!-- DIALOG DE EDICIÓN -->
    <Dialog
        v-model:visible="editing"
        modal
        :closable="false"
        :style="{ width: '600px' }"
    >
      <template #header>
        <h2 class="dialog-title">{{ t('agencyProfile.editprofile') }}</h2>
      </template>
      <AgencyForm
          :agency="agency"
          @cancel="editing = false"
          @saved="onSaved"
      />
    </Dialog>

    <!-- DIALOG de Reseñas -->
    <Dialog
        v-model:visible="showReviews"
        modal
        :style="{ width: '500px' }"
        :closable="true"
    >
         <template #header>
           <h2 class="dialog-title">{{ t('agencyProfile.reviewsTitle') }}</h2>
         </template>
      <div class="review-modal-content">
        <div class="global-rating">
          <span class="rating-number">{{ agency.rating.toFixed(1) }}</span>
          <Rating :value="agency.rating" readonly :cancel="false" />
          <span class="total-reviews">{{ agency.reviewCount }} {{ t('agencyProfile.reviews') }}</span>
        </div>
        <hr />
        <div v-for="rev in agency.reviews" :key="rev.id" class="modal-review-item">
          <Avatar :image="rev.avatar" shape="circle" size="large" />
          <div class="modal-review-content">
            <div class="modal-review-header">
              <strong>{{ rev.name }}</strong>
              <small>{{ rev.date }}</small>
            </div>
            <Rating :value="rev.rating" readonly :cancel="false" class="small-rating"/>
            <p>{{ rev.comment }}</p>
          </div>
          <hr />
        </div>
      </div>
    </Dialog>

  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useI18n } from "vue-i18n";
import Button from "primevue/button";
import Rating from "primevue/rating";
import Avatar from "primevue/avatar";
import Dialog from "primevue/dialog";
import AgencyForm from "./agency-form.component.vue";
import { AgenciesApiService } from "@/Agency/Application/agencies-api.service.js";

const { t } = useI18n();

const agency = ref({
  id: "",
  name: "",
  taxId: "",
  description: "",
  rating: 0,
  reviewCount: 0,
  reservationCount: 0,
  avatarUrl: "",
  contact: { email: "", phone: "" },
  socialLinks: { facebook: "", instagram: "", whatsapp: "" },
  reviews: [],
});
const editing = ref(false);
const showReviews = ref(false);
const service = new AgenciesApiService();

onBeforeMount(async () => {
  const resp = await service.getProfile("1");
  Object.assign(agency.value, resp.data);
});
function onSaved(updated) {
  Object.assign(agency.value, updated);
  editing.value = false;
}
</script>

<style scoped>
.agency-profile {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  color: #000;
  box-sizing: border-box;
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}
.divider {
  border: none;
  border-top: 1px solid #ddd;
  margin: 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

/* COLUMNA PRINCIPAL */
.tax-id {
  margin: 0 0 0.5rem;
}
.description {
  margin: 0 0 1.5rem;
  line-height: 1.5;
}

/* STATS BOX */
.stats {
  display: flex;
  justify-content: space-between;
  background: #ffe8b4;
  border-radius: 8px;
  padding: 1rem;
  max-width: 520px;
  margin: 0 0 2rem;
}
.stat-item {
  flex: 1;
  text-align: center;
}
.stat-item + .stat-item {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 1rem;
}
.stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  display: block;
}
.stat-label {
  display: block;
  margin-top: 0.25rem;
}

/* RESEÑAS */
.reviews {
  margin-top: 1rem;
}
.review-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
}
.review-content {
  margin-left: 1rem;
  flex: 1;
}
.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}
.reviewer {
  font-weight: bold;
}
.review-date {
  margin-left: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}
.review-text {
  margin: 0.5rem 0 0;
  line-height: 1.4;
}
.view-more {
  display: inline-block;
  margin-top: 0.5rem;
  color: #318c8b;
  text-decoration: none;
}
.side-col {
  text-align: center;
  border-left: 1px solid #ddd;
  padding-left: 1.5rem;
}
.agency-logo {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
}
.contact {
  margin: 0.5rem 0;
  line-height: 1.4;
}
.social-icons a {
  margin: 0 0.5rem;
  color: #000;
}

.dialog-title {
  margin: 0;
  color: #000;
  font-size: 1.25rem;
}
.p-dialog .p-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.review-modal-content {
  max-height: 400px;
  overflow-y: auto;
}
.global-rating {
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: 1.25rem;
}
.total-reviews {
  margin-left: auto;
  font-size: .9rem;
  color: #666;
}
.modal-review-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.modal-review-content {
  flex: 1;
}
.modal-review-header {
  display: flex;
  justify-content: space-between;
  font-size: .95rem;
}
.small-rating {
  font-size: .9rem;
}
.review-modal-content {
  color: #000;
}
.review-modal-content p,
.review-modal-content strong,
.review-modal-content small {
  color: #000;
}

</style>