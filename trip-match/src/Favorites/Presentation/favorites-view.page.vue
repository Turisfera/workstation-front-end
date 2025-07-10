<script setup>
import { ref, onMounted } from 'vue';
import { FavoritesService } from '@/Favorites/Application/favorites.service.js';
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service.js';
import { ExperienceAssembler } from '@/Experience/Application/experience.assembler.js';
import ExperienceCardUser from '@/Experience/Presentation/experience-card-user.component.vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { FavoritesApiService } from '@/Favorites/Application/favorites-api.service.js';
const favoritesApiService = new FavoritesApiService();


const favoritesService = new FavoritesService();
const experiencesApi = new ExperiencesApiService();
const favoriteExperiences = ref([]);
const isLoading = ref(true);
const { t } = useI18n();
const router = useRouter();


onMounted(async () => {
  try {
    const response = await favoritesApiService.getFavorites();
    const experiences = response.map(f => f.experience);
    favoriteExperiences.value = experiences.map(data =>
        ExperienceAssembler.toEntityFromResource(data)
    );
  } catch (error) {
    console.error(t('error.fetchFavoritesError'), error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="favorites-view">
    <header class="view-header">
      <h1>{{ $t('favoritesView.title') }}</h1>
      <p>{{ $t('favoritesView.subtitle') }}</p>
    </header>

    <div v-if="isLoading" class="loading-state">
      {{ $t('favoritesView.loadingState') }}
    </div>

    <div v-else-if="favoriteExperiences.length === 0" class="empty-state">
      <h2>{{ $t('favoritesView.emptyStateTitle') }}</h2>
      <p>{{ $t('favoritesView.emptyStateSubtitle') }}</p>
      <router-link to="/" class="explore-button">{{ $t('favoritesView.exploreButton') }}</router-link>
    </div>

    <div v-else class="favorites-grid">
      <ExperienceCardUser
          v-for="experience in favoriteExperiences"
          :key="experience.id"
          :experience="experience"
      />
    </div>
  </div>
</template>

<style scoped>
.favorites-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.view-header {
  margin-bottom: 2.5rem;
}
.view-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
}
.view-header p {
  font-size: 1.1rem;
  color: #64748b;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 1.5rem;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background-color: #f8fafc;
  border-radius: 12px;
}
.empty-state h2 {
  font-size: 1.5rem;
  font-weight: 600;
}
.empty-state p {
  color: #64748b;
  margin: 0.5rem 0 1.5rem 0;
}
.explore-button {
  background-color: #318C8B;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
}
</style>