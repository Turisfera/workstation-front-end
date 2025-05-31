<script setup>
import { ref, onMounted,watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ExperienceCardUser from '@/Experience/Presentation/experience-card-user.component.vue'
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service'
import { ExperienceAssembler } from '@/Experience/Application/experience.assembler.js'
import {CategoryAssembler} from "@/Experience/Application/category.assembler.js";
import {CategoryApiService} from "@/Experience/Application/category-api.service.js";
import router from "@/router.js";

const categoryApiService = new CategoryApiService();
const experiencesApiService = new ExperiencesApiService();
const { t } = useI18n()
const user = 'Marcia Melgarejo'

const categories = ref([])
const categoryMap= ref({})
const destination = ref('')
const day = ref('')
const experienceType = ref('')
const budget = ref('')


const experiences = ref([])
const filteredExperiences = ref([])

onMounted(async () => {
  const apiResponse = await experiencesApiService.getExperiences();
  experiences.value = ExperienceAssembler.toEntitiesFromResponse(await experiencesApiService.getExperiences());
  const categoryResponse = await categoryApiService.getCategory()
  categories.value = CategoryAssembler.toEntitiesFromResponse(categoryResponse)

  categoryMap.value= Object.fromEntries(categories.value.map(c=>[c.id, c.description]))
});

const searchExperiences = async () => {
  router.push({
    path: `/search`,
    query: {
      destination: destination.value,
      day: day.value,
      experienceType: experienceType.value,
      budget: budget.value
    }
  });
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
        <button class="search-button" @click="searchExperiences">{{ $t('home.search') }}</button>
      </div>


      <p class="recommendation-title">{{ $t('home.recommendations') }}</p>
      <div class="recommendation-grid">
        <ExperienceCardUser
            v-for="experience in experiences"
            :key="experience.id"
            :experience="experience"
            :categoryDescription="categoryMap[String(experience.categoryId)]"
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 1.5rem;
}
</style>