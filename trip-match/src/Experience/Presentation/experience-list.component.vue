<script setup>
import ExperienceCard from './experience-card.component.vue'
import {ExperiencesApiService} from '@/Experience/Application/experiences-api.service.js'
import {ExperienceAssembler} from '@/Experience/Application/experience.assembler.js'
import {CategoryAssembler} from "@/Experience/Application/category.assembler.js";
import {CategoryApiService} from "@/Experience/Application/category-api.service.js";

import {onBeforeMount, onMounted, reactive, ref} from "vue";

const experiencesApiService = new ExperiencesApiService();
const categoryApiService = new CategoryApiService();
const publishedExperiences = ref([]);
const experiences = ref([])
const categories = ref([])
const categoriesMap = reactive(new Map());

onMounted(async () => {
  try {
    const categoryResponse = await categoryApiService.getCategory();
    if (categoryResponse && categoryResponse.data && Array.isArray(categoryResponse.data)) {
      categoryResponse.data.forEach(cat => {
        categoriesMap.set(cat.id, cat.name);
      });
      console.log("Categories loaded for mapping:", categoriesMap); // Depuración
    } else {
      console.warn("API de categorías no devolvió un array válido.");
    }
  } catch (error) {
    console.error("Error loading categories for list:", error);
  }


  const agencyId = localStorage.getItem('userId');
  if (!agencyId) {
    console.error("No agency ID found in localStorage for listing experiences.");
    isLoading.value = false;
    return;
  }

  try {
    const response = await experiencesApiService.getExperiencesByAgencyId(agencyId);
    if (response && response.data) {
      publishedExperiences.value = response.data;
      console.log("Experiences loaded:", publishedExperiences.value);
    } else {
      console.warn("API did not return valid experience data:", response);
      publishedExperiences.value = [];
    }
  } catch (error) {
    console.error("Error loading published experiences:", error);
    publishedExperiences.value = [];
  } finally {
    isLoading.value = false;
  }
});

</script>

<template>
  <div v-if="!isLoading" class="experiences-list">
    <ExperienceCard
        v-for="experience in publishedExperiences"
        :key="experience.id"
        :experience="experience"
        :category-description="categoriesMap.get(experience.categoryId) || 'Categoría Desconocida'"
    />
  </div>
</template>

<style scoped>

</style>