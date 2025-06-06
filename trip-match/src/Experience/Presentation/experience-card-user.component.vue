<script setup>
import {defineProps, ref} from "vue";
import router from "@/router.js";

const props = defineProps({ experience: Object, categoryDescription: String, required: true });

const isFavorite = ref(false);

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const goToDetails = () => {
  router.push(`/experiences/${props.experience.id}`);
};

</script>

<template>
  <div class="experience-card">
    <div class="experience-header">
      <img :src="experience.images[0]" alt="Imagen experiencia" class="experience-img" />

      <div class="experience-info">
        <h2 class="experience-title">{{ experience.title }}</h2>

        <div class="experience-rating">
          <span class="stars">{{ '★'.repeat(Math.round(experience.rating)) }}</span>
          <span class="score">{{ experience.rating }}</span>
        </div>

        <p class="experience-details">
          S/{{ experience.price }} · {{ experience.duration }}h · {{ experience.frequencies.value }} · {{ categoryDescription }}
        </p>

        <p class="experience-schedule">
          {{ experience.schedules.join(' | ') }}
        </p>

        <p class="experience-description">{{ experience.description }}</p>

        <div class="experience-footer">
          <a href="#" class="experience-agency">{{ experience.agency }} →</a>
          <button class="experience-button" @click="goToDetails">Ver más</button>
        </div>
      </div>

      <button class="favorite-btn" @click="toggleFavorite">
        <span v-if="isFavorite"><i class=" pi pi-heart-fill"></i></span>
        <span v-else><i class=" pi pi-heart"></i></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.experience-card {
  border: 1px solid #00000030;
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  max-width: 600px;
  font-family: sans-serif;
  box-shadow: 0 2px 6px #00000010;
  position: relative;
}

.experience-header {
  display: flex;
  gap: 16px;
  position: relative;
}

.experience-img {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
}

.experience-info {
  flex: 1;
}

.experience-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0;
}

.experience-rating {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  margin: 4px 0;
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
  margin: 2px 0;
  color: #333;
}

.experience-description {
  font-size: 0.9rem;
  margin: 8px 0 12px;
  color: #444;
}

.experience-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.experience-agency {
  color: #009688;
  font-weight: 500;
  text-decoration: none;
}

.experience-button {
  background-color: #b2dfdb;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.experience-button:hover {
  background-color: #80cbc4;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

</style>