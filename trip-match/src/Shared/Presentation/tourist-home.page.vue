<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import ExperienceCardUser from '@/Experience/Presentation/experience-card-user.component.vue';
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service';
import { ExperienceAssembler } from '@/Experience/Application/experience.assembler.js';
import { CategoryApiService } from "@/Experience/Application/category-api.service.js";
import { CategoryAssembler } from "@/Experience/Application/category.assembler.js";
const router = useRouter();
const categoryApiService = new CategoryApiService(); // Instancia
const experiencesApiService = new ExperiencesApiService(); // Instancia
const { t } = useI18n();

const user = ref('');
const categories = ref([]);
const categoryMap= ref({});
const destination = ref('');
const day = ref('');
const experienceType = ref('');
const budget = ref('');
const experiences = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    user.value = localStorage.getItem('name') || t('home.defaultUser');
    const [experienceResponse, categoryResponse] = await Promise.all([
      experiencesApiService.getAllExperiences(),
      categoryApiService.getCategory()
    ]);

    experiences.value = ExperienceAssembler.toEntitiesFromResponse(experienceResponse);
    categories.value = CategoryAssembler.toEntitiesFromResponse(categoryResponse);
    categoryMap.value = Object.fromEntries(categories.value.map(c => [c.id, c.description]));

  } catch (error) {
    console.error(t('error.fetchHomeData'), error);
  } finally {
    isLoading.value = false;
  }
});

const searchExperiences = () => {
  router.push({
    name: 'ExperienceSearch',
    query: {
      destination: destination.value,
      day: day.value,
      experienceType: experienceType.value,
      budget: budget.value
    }
  });
};
</script>

<template>
  <div class="home-view">
    <main class="main-content">
      <h3 class="greetings">{{ $t('home.greeting', { user: user }) }}</h3>
      <p class="welcome-message">{{ $t('home.greetingSubtitle2') }}</p>

      <div class="search-form">
        <div class="row">
          <input type="text" :placeholder="$t('home.destination')" class="input" v-model="destination" />
          <input type="text" :placeholder="$t('home.day')" class="input" v-model="day" />
        </div>
        <div class="row">
          <input type="text" :placeholder="$t('home.experienceType')" class="input" v-model="experienceType" />
          <input type="number" :placeholder="$t('home.budget')" class="input" v-model="budget" />
          <button class="search-button" @click="searchExperiences">{{ $t('home.search') }}</button>
        </div>
      </div>

      <p class="recommendation-title">{{ $t('home.recommendations') }}</p>

      <div v-if="isLoading" class="loading-state">
        {{ $t('home.loadingRecommendations') }}
      </div>
      <div v-else class="recommendation-grid">
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
.home-view { color: black; }
.main-content { max-width: 1200px; margin: 0 auto; }
.greetings { font-size: 2.25rem; font-weight: 700; }
.welcome-message { font-size: 1.2rem; margin-top: 0.5rem; margin-bottom: 2rem; color: #4b5563; }
.search-form {
  background-color: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-bottom: 2.5rem;
}
.row { display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
.row:last-child { margin-bottom: 0; }
.input {
  flex: 1 1 250px;
  height: 48px;
  font-size: 1rem;
  padding: 0 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}
.input:focus {
  border-color: #318C8B;
  outline: none;
  box-shadow: 0 0 0 2px rgba(49, 140, 139, 0.2);
}
.search-button {
  height: 48px;
  padding: 0 2rem;
  background-color: #6E58AA;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.search-button:hover { background-color: #372b50; }
.recommendation-title { font-weight: 600; font-size: 1.25rem; margin-bottom: 1.5rem; }
.recommendation-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(500px, 1fr)); gap: 1.5rem; }
.loading-state { text-align: center; padding: 3rem; color: #64748b; }
</style>