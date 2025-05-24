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
});


const filterExperiences = () => {
  const noFiltersApplied = !destination.value && !day.value && !experienceType.value && !budget.value;

  if (noFiltersApplied) {
    filteredExperiences.value = [];
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
    <main class="main-content">

      <h3 class="greetings">{{ $t('home.greeting', { user }) }}</h3>
      <p class="welcome-message">{{ $t('home.greetingSubtitle') }}</p>


      <div class="row">
        <input type="text" :placeholder="$t('home.destination')" class="input" v-model="destination" />
        <input type="text" :placeholder="$t('home.day')" class="input" v-model="day" />
      </div>


      <div class="row">
        <input type="text" :placeholder="$t('home.experienceType')" class="input" v-model="experienceType" />
        <input type="number" :placeholder="$t('home.budget')" class="input" v-model="budget" />
        <button class="search-button" @click="filterExperiences">{{ $t('home.search') }}</button>
      </div>


      <p class="recommendation-title">{{ $t('home.recommendations') }}</p>
      <div class="recommendation-grid">
        <ExperienceCard
            v-for="experience in filteredExperiences"
            :key="experience.id"
            :experience="experience"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-view {
  color: black;
}

.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.greetings {
  font-size: 36px;
  font-weight: 700;
}

.welcome-message {
  font-size: 1.2rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}

.row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.input {
  flex: 1 1 250px;
  height: 48px;
  font-size: 16px;
  padding: 0 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.search-button {
  height: 48px;
  padding: 0 1.5rem;
  background-color: black;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.recommendation-title {
  font-weight: 600;
  font-size: 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.recommendation-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
</style>