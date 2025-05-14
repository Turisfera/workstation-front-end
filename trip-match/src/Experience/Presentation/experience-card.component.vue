<script setup>
import {defineProps, onBeforeMount, reactive, ref} from "vue";
import router from "@/router.js";
import {ExperiencesApiService} from "@/Experience/Application/experiences-api.service.js"
import {ExperienceAssembler} from "@/Experience/Application/experience.assembler.js";


const props = defineProps({ experience: Object, required: true });

const isFavorite = ref(false);

// Simulación de favoritos en localStorage (puedes cambiar a API si tienes backend)
const FAVORITES_KEY = 'favoriteExperiences';

onBeforeMount(() => {
  const favs = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  isFavorite.value = favs.includes(props.experience.id);
});

const toggleFavorite = () => {
  let favs = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  if (isFavorite.value) {
    favs = favs.filter(id => id !== props.experience.id);
    isFavorite.value = false;
  } else {
    favs.push(props.experience.id);
    isFavorite.value = true;
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
};

const editArticle = (selected) => {
  router.push({name: "updateArticle", params: {id: selected.id}});
};

const goToDeleteExperience = (id) => {
  router.push( `/manageExperience/delete/${id}`)
};

</script>

<template>
  <div class="experience-card">
    <img :src="experience.images[0]" alt="Imagen experiencia" class="experience-img" />
    <div class="experience-content">
      <h3 class="experience-title">{{ experience.title }}</h3>
      <div class="experience-rating">
        <span class="stars">★★★★★</span>
        <span class="score">{{ experience.rating }}</span>
      </div>
      <p class="experience-details">
        S/{{ experience.price }} · {{ experience.duration }} h · {{ experience.frequencies.join(' | ') }}
      </p>
      <p class="experience-schedule">
        {{ experience.schedules.join(' | ') }}
      </p>
      <p class="experience-description">{{ experience.description }}</p>
      <div class="experience-footer">
        <button class="favorite-btn" @click="toggleFavorite">
          <span :class="['heart', isFavorite ? 'heart--active' : '']">♥</span>
        </button>
        <button class="btn more-info">Ver más</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.experience-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.experience-card:hover {
  transform: translateY(-5px);
}

.experience-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.experience-content {
  padding: 16px;
}

.experience-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 8px;
}

.experience-rating {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.stars {
  color: #f5a623;
  margin-right: 4px;
}

.score {
  font-weight: bold;
}

.experience-details,
.experience-schedule {
  font-size: 0.9rem;
  color: #555;
  margin: 4px 0;
}

.experience-description {
  font-size: 0.9rem;
  color: #777;
  margin: 8px 0;
}

.experience-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #ccc;
  transition: color 0.2s;
}

.favorite-btn .heart--active {
  color: #000;
}

.btn.more-info {
  background-color: #318C8B;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn.more-info:hover {
  background-color: #256c6b;
}
</style>