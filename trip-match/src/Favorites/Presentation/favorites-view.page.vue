<script setup>
import { ref, onMounted } from 'vue';
import { FavoritesService } from '@/Favorites/Application/favorites.service.js';
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service.js';
import { ExperienceAssembler } from '@/Experience/Application/experience.assembler.js';
import ExperienceCardUser from '@/Experience/Presentation/experience-card-user.component.vue';
const favoritesService = new FavoritesService();
const experiencesApi = new ExperiencesApiService();
const favoriteExperiences = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const favoriteIds = favoritesService.getFavorites();

    if (favoriteIds.length === 0) {
      return;
    }
    const favoritePromises = favoriteIds.map(id => experiencesApi.getById(id));
    const responses = await Promise.all(favoritePromises);
    const favoriteData = responses.map(res => res.data);
    favoriteExperiences.value = favoriteData.map(data => ExperienceAssembler.toEntityFromResource(data));

  } catch (error) {
    console.error("Error al cargar las experiencias favoritas:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="favorites-view">
    <header class="view-header">
      <h1>Mis Experiencias Favoritas</h1>
      <p>Aquí encontrarás todas las experiencias que has guardado.</p>
    </header>

    <div v-if="isLoading" class="loading-state">
      Cargando tus favoritos...
    </div>

    <div v-else-if="favoriteExperiences.length === 0" class="empty-state">
      <h2>Aún no tienes favoritos</h2>
      <p>Explora las experiencias y presiona el corazón para guardarlas aquí.</p>
      <router-link to="/" class="explore-button">Explorar experiencias</router-link>
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