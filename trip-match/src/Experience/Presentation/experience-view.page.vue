<script setup>
import ExperienceList from "./experience-list.component.vue"
import {ref} from "vue";
import router from "@/router.js"

const openModal = ref(false)
const openNew = ()=>{
  router.push( "/manageExperience/create")
}

</script>

<template>
  <div class="p-fluid px-3 py-3 experience-container">
    <div class="experience-container-header flex justify-content-between align-items-center mb-3">
      <h3 class=" experience-tittle text-2xl font-bold">{{ $t("experience-view.title") }}</h3>

      <button @click="openNew" class="add-experience-button">{{ $t("experience-view.button") }}</button>
    </div>
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
  margin:  0 6.4rem;
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