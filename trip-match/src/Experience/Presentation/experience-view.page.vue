<script setup>
import ExperienceForm from '@/Experience/Presentation/experience-form.component.vue'
import ExperienceList from "./experience-list.component.vue"
import {ref} from "vue";

const openModal = ref(false)

</script>

<template>
  <div class="p-fluid px-3 py-3 experience-container">
    <div class="experience-container-header flex justify-content-between align-items-center mb-3">
      <h3 class=" experience-tittle text-2xl font-bold">{{ $t("experience-view.title") }}</h3>
      <button @click="openModal = true" class="add-experience-button">{{ $t("experience-view.button") }}</button>
    </div>

    <teleport to="body">
      <ExperienceForm v-if="openModal" @close="openModal = false"  />
    </teleport>
    <div class="article-list">
      <ExperienceList/>
    </div>

  </div>
</template>

<style scoped>
*{
  color: black;
}

.experience-container {
  padding: 0 1.5rem ;
}

.experience-container-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-experience-button {
  background-color: #318C8B;
  padding: 16px;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;
}

.experience-tittle {
  font-size: 28px;
}

</style>