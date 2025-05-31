<script setup>
import ExperienceCard from './experience-card.component.vue'
import {ExperiencesApiService} from '@/Experience/Application/experiences-api.service.js'
import {ExperienceAssembler} from '@/Experience/Application/experience.assembler.js'
import {CategoryAssembler} from "@/Experience/Application/category.assembler.js";
import {CategoryApiService} from "@/Experience/Application/category-api.service.js";

import {onBeforeMount, ref} from "vue";

const experiencesApiService = new ExperiencesApiService();
const categoryApiService = new CategoryApiService();

const experiences = ref([])
const categories = ref([])
const categoryMap= ref({})

onBeforeMount(async () => {

  const apiResponse = await experiencesApiService.getExperiences();
  experiences.value = ExperienceAssembler.toEntitiesFromResponse(apiResponse);

  const categoryResponse = await categoryApiService.getCategory()
  categories.value = CategoryAssembler.toEntitiesFromResponse(categoryResponse)

  categoryMap.value= Object.fromEntries(categories.value.map(c=>[c.id, c.description]))

});

</script>

<template>
  <ExperienceCard
      v-for="experience in experiences"
      :key="experience.id"
      :experience="experience"
      :categoryDescription="categoryMap[String(experience.categoryId)]"
  />

</template>

<style scoped>

</style>