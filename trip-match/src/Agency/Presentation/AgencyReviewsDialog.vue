<template>
  <Dialog
      v-model:visible="modelVisible"
      modal
      style="width:600px"
  >
    <template #header>
      <h2 class="dialog-title">{{ t('agencyProfile.reviewsTitle','Reseñas') }}</h2>
    </template>

    <div class="review-summary">
      <div class="rating-left">
        <span class="rating-number">{{ rating.toFixed(1) }}</span>
        <StarRating :rating="rating" :showText="true" />
      </div>
      <div class="rating-right">
        <span class="review-count">
          {{ reviewCount }} {{ t('agencyProfile.reviews','Reseñas') }}
        </span>
      </div>
    </div>
    <hr />
    <div class="review-list">
      <div
          v-for="rev in reviews"
          :key="rev.id"
          class="review-item"
      >
        <Avatar :image="rev.avatar || rev.touristAvatarUrl" shape="circle" size="large"/>
        <div class="review-content">
          <div class="review-header">
            <strong>{{ rev.name || rev.touristName }}</strong>
            <small>{{ rev.date }}</small>
          </div>
          <StarRating :rating="rev.rating" />
          <p class="review-text">{{ rev.comment }}</p>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
import StarRating from '@/Agency/Presentation/StarRating.vue';

const props = defineProps({
  visible: Boolean,
  reviews: Array,
  rating: Number,
  reviewCount: Number
});
const emit = defineEmits(['update:visible']);
const { t } = useI18n();
const modelVisible = computed({
  get: () => props.visible,
  set: value => emit('update:visible', value)
});
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

.stat-item span,

.stat-item span {
  display: inline;
}
.stat-item * {
  background-color: transparent !important;
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



.review-text {
  margin-top: 0.5rem;
  line-height: 1.5;
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

</style>
