<template>
  <div class="review-form">
    <div class="field">
      <label for="rating">{{ t('reviewForm.rating', 'Calificación') }}</label>
      <Rating v-model="rating" :cancel="false" />
    </div>
    <div class="field">
      <label for="comment">{{ t('reviewForm.comment', 'Comentario') }}</label>
      <Textarea v-model="comment" rows="5" class="w-full" />
    </div>
    <div class="form-buttons">
      <Button
          :label="t('common.cancel', 'Cancelar')"
          severity="secondary"
          @click="$emit('cancel')"
      />
      <Button
          :label="t('reviewForm.submit', 'Enviar Reseña')"
          @click="submitReview"
          :loading="isSubmitting"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import Rating from 'primevue/rating';
import Textarea from 'primevue/textarea';
import { ReviewsApiService } from '@/Agency/Application/reviews-api.service.js';

const props = defineProps({ agencyId: { type: String, required: true } });
const emit = defineEmits(['review-submitted', 'cancel']);

const { t } = useI18n();
const reviewService = new ReviewsApiService();

const rating = ref(0);
const comment = ref('');
const isSubmitting = ref(false);

async function submitReview() {
  if (rating.value === 0 || !comment.value) {
    alert(
        t(
            'reviewForm.validationError',
            'Por favor, completa la calificación y el comentario.'
        )
    );
    return;
  }

  isSubmitting.value = true;
  try {
    const touristId = localStorage.getItem('userId');
    const reviewData = {
      touristUserId: touristId,
      agencyUserId: props.agencyId,
      rating: rating.value,
      comment: comment.value
    };
    await reviewService.createReview(reviewData);
    emit('review-submitted');
  } catch (error) {
    console.error('Error submitting review:', error);
    alert(
        t(
            'error.submitReviewError',
            'Hubo un error al enviar tu reseña.'
        )
    );
  } finally {
    isSubmitting.value = false;
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