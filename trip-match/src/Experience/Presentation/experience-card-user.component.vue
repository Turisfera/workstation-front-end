<script setup>
import {ref, computed, onMounted} from "vue";
import { useRouter } from "vue-router";
import { FavoritesService } from '@/Favorites/Application/favorites.service.js';
import { FavoritesApiService } from '@/Favorites/Application/favorites-api.service.js';
import { useI18n } from 'vue-i18n';

const props = defineProps({ experience: Object, categoryDescription: String, required: true });
const router = useRouter();
const favoritesService = new FavoritesService();
const favoritesApiService = new FavoritesApiService();
const isFavorite = ref(false);
const { t } = useI18n();


onMounted(async () => {
  try {
    const favorites = await favoritesApiService.getFavorites();
    isFavorite.value = favorites.some(f => f.experienceId === props.experience.id);
  } catch (error) {
    console.error('Error checking favorites:', error);
  }
});

const toggleFavorite = async () => {
  try {
    if (isFavorite.value) {
      await favoritesApiService.removeFavorite(props.experience.id);
    } else {
      await favoritesApiService.addFavorite(props.experience.id);
    }
    isFavorite.value = !isFavorite.value;
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};

const goToDetails = () => { router.push({ name: 'ExperienceDetail', params: { id: props.experience.id } }); };
</script>

<template>
  <div class="experience-card">
    <div class="experience-header">
      <img :src="experience.experienceImages && experience.experienceImages.length > 0 ? experience.experienceImages[0].url : '/path/to/default-image.jpg'" :alt="$t('experienceCardUser.imageAlt')" class="experience-img" />
      <div class="experience-info">
        <h2 class="experience-title">{{ experience.title }}</h2>
        <p class="experience-details">
          {{ $t('experienceCardUser.currencyPrefix') }} {{ experience.price }} {{ $t('experienceCardUser.detailsSeparator') }} {{ experience.duration }}{{ $t('experienceCardUser.durationUnit') }} {{ $t('experienceCardUser.detailsSeparator') }} {{ categoryDescription }}
        </p>
        <p class="experience-schedule">
          {{ $t('experienceCardUser.schedulesPrefix') }}{{ experience.schedule.map(s => s.time).join($t('experienceCardUser.scheduleItemSeparator')) }}
        </p>
        <p class="experience-description">{{ experience.description }}</p>
        <div class="experience-footer">
          <router-link
              v-if="experience.agency"
              :to="{ name: 'AgencyPublicProfile', params: { agencyId: experience.agency.userId } }"
              class="experience-agency">
            {{ experience.agency.agencyName || $t('experienceCardUser.defaultAgencyName') }} {{ $t('experienceCardUser.agencyLinkSuffix') }}
          </router-link>

          <button class="experience-button" @click="goToDetails">{{ $t('experienceCardUser.viewMoreButton') }}</button>
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

.experience-details, .experience-schedule { font-size: 0.85rem; margin: 2px 0; color: #64748b; }
.experience-description {
  font-size: 0.9rem;
  margin: 0.75rem 0;
  color: #475569;
  line-height: 1.5;
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