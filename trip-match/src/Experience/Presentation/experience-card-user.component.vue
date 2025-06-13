<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { FavoritesService } from '@/Favorites/Application/favorites.service.js';
const props = defineProps({ experience: Object, categoryDescription: String, required: true });
const router = useRouter();
const favoritesService = new FavoritesService();
const isFavorite = ref(favoritesService.isFavorite(props.experience.id));

const displayRating = computed(() => {
  const rating = Number(props.experience.rating) || 0;
  return Math.max(0, Math.min(5, rating));
});
const toggleFavorite = () => {
  if (isFavorite.value) {
    favoritesService.removeFavorite(props.experience.id);
  } else {
    favoritesService.addFavorite(props.experience.id);
  }
  isFavorite.value = !isFavorite.value;
};

const goToDetails = () => { router.push({ name: 'ExperienceDetail', params: { id: props.experience.id } }); };
</script>

<template>
  <div class="experience-card">
    <div class="experience-header">
      <img :src="experience.images[0]" alt="Imagen experiencia" class="experience-img" />
      <div class="experience-info">
        <h2 class="experience-title">{{ experience.title }}</h2>
        <div class="experience-rating">
          <span class="stars">{{ '★'.repeat(Math.round(displayRating)) }}</span>
          <span class="score">{{ displayRating.toFixed(1) }}</span>
        </div>
        <p class="experience-details">
          S/ {{ experience.price }} · {{ experience.duration }}h · {{ categoryDescription }}
        </p>
        <p class="experience-schedule">
          Horarios: {{ experience.schedules.join(' | ') }}
        </p>
        <p class="experience-description">{{ experience.description }}</p>
        <div class="experience-footer">
          <a href="#" class="experience-agency">{{ experience.agencyName || 'Agencia Verificada' }} →</a>
          <button class="experience-button" @click="goToDetails">Ver más</button>
        </div>
      </div>
      <button class="favorite-btn" @click.stop.prevent="toggleFavorite">
        <i :class="isFavorite ? 'pi pi-heart-fill text-red-500' : 'pi pi-heart'"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.pi-heart-fill {
  color: #ef4444;
}
.experience-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  background: white;
  transition: box-shadow 0.2s;
}
.experience-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.experience-header { display: flex; gap: 1rem; position: relative; }
.experience-img { width: 120px; height: 120px; border-radius: 8px; object-fit: cover; }
.experience-info { flex: 1; }
.experience-title { font-weight: 600; font-size: 1.1rem; margin: 0 0 0.25rem 0; color: #1e293b;}
.experience-rating { display: flex; align-items: center; font-size: 0.9rem; margin-bottom: 0.5rem; }
.stars { color: #f59e0b; margin-right: 0.25rem; }
.score { font-weight: 600; color: #475569; }
.experience-details, .experience-schedule { font-size: 0.85rem; margin: 2px 0; color: #64748b; }
.experience-description {
  font-size: 0.9rem;
  margin: 0.75rem 0;
  color: #475569;
  line-height: 1.5;
  /* Limitar a 2 líneas de texto */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.experience-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; }
.experience-agency { color: #318C8B; font-weight: 500; text-decoration: none; }
.experience-button {
  background-color: #318C8B;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
}
.favorite-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  color: #475569;
}
</style>