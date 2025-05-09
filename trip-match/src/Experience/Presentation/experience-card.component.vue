<script setup>
import {defineProps, onBeforeMount, reactive, ref} from "vue";
import router from "@/router.js";
import {ExperiencesApiService} from "@/Experience/Application/experiences-api.service.js"
import {ExperienceAssembler} from "@/Experience/Application/experience.assembler.js";


const props = defineProps({ experience: Object, required: true });

const editArticle = (selected) => {
  router.push({name: "updateArticle", params: {id: selected.id}});
};

const goToDeleteExperience = (id) => {
  router.push( `/manageExperience/delete/${id}`)
};

</script>

<template>
  <div class="experience-card">
    <div class="experience-header">
      <img :src="experience.images[0]" alt="Imagen experiencia" class="experience-img" />
      <div class="experience-info">
        <h2 class="experience-title">{{ experience.title }}</h2>
        <div class="experience-rating">
          <span class="stars">★★★★★</span><span class="score">4</span>
        </div>
        <p class="experience-details">
          S/{{ experience.price }} · {{ experience.duration }} h · {{ experience.frequencies.map(s => s.value).join(' | ') }}
        </p>
        <p class="experience-schedule">
          {{ experience.schedules.map(s => s.value).join(' | ') }}
        </p>
      </div>
    </div>

    <p class="experience-description">{{ experience.description }}</p>

    <template class="experience-buttons" >
      <button @click="goToDeleteExperience(experience.id)" class="btn delete">Eliminar</button>
      <button class="btn edit" @click="editArticle(props.experience)">Editar</button>
    </template>
  </div>
</template>

<style scoped>
.experience-card {
  border: 1px solid #00000040;
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  max-width: 1400px;
  font-family: sans-serif;
  box-shadow: 2px 2px 8px #00000010;
  margin-bottom: 16px;
}

.experience-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
}

.experience-img {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
}

.experience-info {
  margin-left: 16px;
  flex: 1;
}

.experience-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0;
}

.experience-rating {
  display: flex;
  align-items: center;
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
  margin: 2px 0;
  font-size: 0.95rem;
}

.experience-status {
  background-color: #dff4e3;
  color: #184f28;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  position: absolute;
  top: 0;
  right: 0;
}

.experience-description {
  margin: 16px 0 8px;
  font-size: 0.95rem;
}

.experience-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn {
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}

.btn.delete {
  background-color: #d7f2f0;
  color: #000;
}

.btn.edit {
  background-color: #2c8a8a;
  color: white;
}
</style>