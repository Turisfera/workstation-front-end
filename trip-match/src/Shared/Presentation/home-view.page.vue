<script setup>
import { ref, onMounted,watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ExperienceCard from '@/Experience/Presentation/experience-card.component.vue'
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service'
import { ExperienceAssembler } from '@/Experience/Application/experience.assembler.js'


const experiencesApiService = new ExperiencesApiService();
const { t } = useI18n()
const user = 'Marcia Melgarejo'


const destination = ref('')
const day = ref('')
const experienceType = ref('')
const budget = ref('')


const experiences = ref([])
const filteredExperiences = ref([])

onMounted(async () => {
  const apiResponse = await experiencesApiService.getExperiences();
  console.log('API Response:', apiResponse);
  experiences.value = ExperienceAssembler.toEntitiesFromResponse(await experiencesApiService.getExperiences());
  console.log('Transformed Experiences:', experiences.value);
  filterExperiences();
});


const filterExperiences = () => {
  const noFiltersApplied = !destination.value && !day.value && !experienceType.value && !budget.value;

  if (noFiltersApplied) {
    filteredExperiences.value = experiences.value;
    return;
  }

  filteredExperiences.value = experiences.value.filter((exp) => {
    const matchesDestination = destination.value === '' ||
        exp.location.toLowerCase().endsWith(destination.value.toLowerCase())
    const matchesDay = day.value === '' || exp.frequencies.some(f => f.toLowerCase().includes(day.value.toLowerCase()))
    const matchesType = experienceType.value === '' || exp.title.toLowerCase().includes(experienceType.value.toLowerCase())
    const matchesBudget = budget.value === '' || exp.price <= parseFloat(budget.value)

    return matchesDestination && matchesDay && matchesType && matchesBudget
  })
}

</script>

<template>
  <div class="home-view">
    <div class="main-content">
      <div class="greetings">
        <div class="welcome-message">
          <h2>{{ t('home.greeting', { user }) }}</h2>
          <p>{{ t('home.greetingSubtitle') }}</p>
        </div>
      </div>
      <div class="row">
        <input v-model="destination" class="input" :placeholder="t('home.destination')" />
        <input v-model="day" class="input" :placeholder="t('home.day')" />
        <input v-model="experienceType" class="input" :placeholder="t('home.experienceType')" />
        <input v-model="budget" class="input" type="number" :placeholder="t('home.budget')" />
        <button class="search-button" @click="filterExperiences">{{ t('home.search') }}</button>
      </div>
      <h3 class="recommendation-title">{{ t('home.recommendations') }}</h3>
      <div class="recommendation-grid">
        <ExperienceCard
          v-for="experience in filteredExperiences"
          :key="experience.id"
          :experience="experience"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}
.main-content {
  padding: 2rem 1rem;
}
.greetings {
  margin-bottom: 2rem;
}
.welcome-message h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #222;
}
.welcome-message p {
  color: #666;
  font-size: 1.1rem;
}
.row {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}
.search-button {
  background: #318C8B;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.search-button:hover {
  background: #256c6b;
}
.recommendation-title {
  margin: 2rem 0 1rem 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #222;
}
.recommendation-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>