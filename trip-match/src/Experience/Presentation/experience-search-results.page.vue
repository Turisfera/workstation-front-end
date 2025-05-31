<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ExperienceCardUser from '@/Experience/Presentation/experience-card-user.component.vue'
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service'
import { ExperienceAssembler } from '@/Experience/Application/experience.assembler.js'
import { CategoryApiService } from '@/Experience/Application/category-api.service.js'
import { CategoryAssembler } from '@/Experience/Application/category.assembler.js'

const route = useRoute()
const experiencesApiService = new ExperiencesApiService()
const categoryApiService = new CategoryApiService()

const experiences = ref([])
const filteredExperiences = ref([])
const categoryMap = ref({})

onMounted(async () => {
  const allExperiences = ExperienceAssembler.toEntitiesFromResponse(await experiencesApiService.getExperiences())
  experiences.value = allExperiences

  const categories = CategoryAssembler.toEntitiesFromResponse(await categoryApiService.getCategory())
  categoryMap.value = Object.fromEntries(categories.map(c => [c.id, c.description]))

  filterExperiences()
})

const filterExperiences = () => {
  const destination = route.query.destination || ''
  const day = route.query.day || ''
  const experienceType = route.query.experienceType || ''
  const budget = route.query.budget || ''

  filteredExperiences.value = experiences.value.filter((exp) => {
    const matchesDestination = destination === '' || exp.location.toLowerCase().endsWith(destination.toLowerCase())
    const matchesDay = day === '' || exp.frequencies.some(f => f.toLowerCase().includes(day.toLowerCase()))
    const matchesType = experienceType === '' || exp.title.toLowerCase().includes(experienceType.toLowerCase())
    const matchesBudget = budget === '' || exp.price <= parseFloat(budget)

    return matchesDestination && matchesDay && matchesType && matchesBudget
  })
}
</script>

<template>
  <div class="search-results">
    <h2>Resultados de la búsqueda</h2>

    <div v-if="filteredExperiences.length === 0">
      <p>No se encontraron experiencias.</p>
    </div>

    <div class="grid">
      <ExperienceCardUser
          v-for="experience in filteredExperiences"
          :key="experience.id"
          :experience="experience"
          :categoryDescription="categoryMap[String(experience.categoryId)]"
      />
    </div>
  </div>
</template>

<style scoped>
.search-results {
  padding: 2rem;
}

.grid {
  display: grid;
  gap: 1.5rem;
}
</style>