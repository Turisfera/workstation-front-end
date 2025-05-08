<script setup>
import ExperienceCard from './experience-card.component.vue'
import {ExperiencesApiService} from '@/Experience/Application/experiences-api.service.js'
import {ExperienceAssembler} from '@/Experience/Application/experience.assembler.js'
import {onBeforeMount, ref} from "vue";

const experiencesApiService = new ExperiencesApiService();

const experiences = ref([])


onBeforeMount(async () => {
  const apiResponse = await experiencesApiService.getExperiences();
  console.log('API Response:', apiResponse);
  experiences.value = ExperienceAssembler.toEntitiesFromResponse(await experiencesApiService.getExperiences());
  console.log('Transformed Experiences:', experiences.value);
});

defineProps({
  experiences: {
    type: Array,
    required: true
  }
});

</script>

<template>
  <ExperienceCard
      v-for="experience in experiences"
      :key="experience.id"
      :experience="experience"
  />

</template>

<style scoped>

</style>