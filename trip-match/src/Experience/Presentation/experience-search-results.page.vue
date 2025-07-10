<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ExperienceCardUser from '@/Experience/Presentation/experience-card-user.component.vue'
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service'
import { ExperienceAssembler } from '@/Experience/Application/experience.assembler.js'
import { CategoryApiService } from '@/Experience/Application/category-api.service.js'
import { CategoryAssembler } from '@/Experience/Application/category.assembler.js'
import { useI18n } from 'vue-i18n';
const route = useRoute()
const experiencesApiService = new ExperiencesApiService()
const categoryApiService = new CategoryApiService()
const { t } = useI18n();
const experiences = ref([])
const categories = ref([]);
const categoryMap = ref({})
const mapUrl = ref('')
const destination = ref('')
const day = ref('')
const experienceType = ref('')
const budget = ref('')
const isLoading = ref(true);
const frequencyOptions = [
  { label: t('create-experience-form.frequenciesOptions.weekdays'), value: 'weekdays' },
  { label: t('create-experience-form.frequenciesOptions.weekends'), value: 'weekends' },
  { label: t('create-experience-form.frequenciesOptions.everyDay'), value: 'daily' }
];
const loadFilteredExperiences = async () => {
  try {
    isLoading.value = true;
    const searchParams = {
      destination: destination.value,
      day: day.value,
      experienceType: experienceType.value,
      budget: budget.value ? parseFloat(budget.value) : null
    };

    const cleanedSearchParams = Object.fromEntries(
        Object.entries(searchParams).filter(([, v]) => v !== '' && v !== null && v !== undefined)
    );

    const experiencesResponse = await experiencesApiService.getAllExperiences(cleanedSearchParams);
    experiences.value = ExperienceAssembler.toEntitiesFromResponse(experiencesResponse);


    if (categories.value.length === 0) {
      const categoriesResponse = await categoryApiService.getCategory();
      categories.value = CategoryAssembler.toEntitiesFromResponse(categoriesResponse);
      categoryMap.value = Object.fromEntries(categories.value.map(c => [c.id, c.description]));
    }

    mapUrl.value = getMapUrl(destination.value);

  } catch (error) {
    console.error(t('error.loadSearchResultsError'), error);
    experiences.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  try {
    const categoriesResponse = await categoryApiService.getCategory();
    categories.value = CategoryAssembler.toEntitiesFromResponse(categoriesResponse);
    categoryMap.value = Object.fromEntries(categories.value.map(c => [c.id, c.description]));
  } catch (error) {
    console.error("Error al cargar categorías/frecuencias en ExperienceSearch:", error);
  }

  destination.value = route.query.destination || '';
  day.value = route.query.day || '';
  experienceType.value = route.query.experienceType || '';
  budget.value = route.query.budget || '';

  await loadFilteredExperiences();
});

watch(() => route.query, async (newQuery) => {
  destination.value = newQuery.destination || '';
  day.value = newQuery.day || '';
  experienceType.value = newQuery.experienceType || '';
  budget.value = newQuery.budget || '';

  await loadFilteredExperiences();
}, { deep: true });

watch(destination, (newDest) => {
  mapUrl.value = getMapUrl(newDest);
});

function getMapUrl(dest) {
  if (!dest) return '';
  return `https://maps.google.com/maps?q=$${encodeURIComponent(dest)},+${encodeURIComponent(t('searchResults.mapDefaultCountry'))}&output=embed`;
}
</script>

<template>
  <div class="search-view">
    <div class="results-column">
      <div class="filters-summary">
        <div class="filter-item">
          <label class="filter-item-text">{{ $t('searchResults.filterDestinationLabel') }}</label>
          <input
              v-model="destination"
              class="filter-input"
              type="text"
              :placeholder="$t('searchResults.filterDestinationPlaceholder')"
          />
        </div>
        <div class="filter-item">
          <label class="filter-item-text">{{ $t('searchResults.filterDayLabel') }}</label>
          <select v-model="day" class="filter-input">
            <option value="">{{ $t('searchResults.filterDayPlaceholder') }}</option>
            <option
                v-for="option in frequencyOptions"
                :key="option.value"
                :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="filter-item">
          <label class="filter-item-text">{{ $t('searchResults.filterBudgetLabel') }}</label>
          <input
              v-model="budget"
              class="filter-input"
              type="number"
              placeholder="Máx. S/ 100"
          />
        </div>
        <div class="filter-item">
          <label class="filter-item-text">{{ $t('searchResults.filterExperienceTypeLabel') }}</label>
          <select v-model="experienceType" class="filter-input">
            <option value="">{{ $t('searchResults.filterExperienceTypePlaceholder') }}</option>
            <option
                v-for="cat in categories"
                :key="cat.id"
                :value="cat.description"
            >
              {{ cat.description }}
            </option>
          </select>
        </div>
        <div class="filter-button-container">
          <button @click="loadFilteredExperiences" class="search-button-local">
            {{ $t('searchResults.applyFilters') }}
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="loading-results">
        <p>{{ $t('searchResults.loadingResults') }}</p>
      </div>
      <div v-else-if="experiences.length === 0" class="no-results">
        <p>{{ $t('searchResults.noResultsMessage') }}</p>
      </div>

      <div v-else class="result-list">
        <ExperienceCardUser
            v-for="exp in experiences"
            :key="exp.id"
            :experience="exp"
            :categoryDescription="categoryMap[exp.categoryId]"
        />
      </div>
    </div>

    <div class="map-column" v-if="destination">
      <iframe
          :src="mapUrl"
          width="100%"
          height="700"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
      ></iframe>
    </div>
  </div>
</template>


<style scoped>
.search-view {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1500px;
  margin: auto;
  padding: 2rem;
}

@media (min-width: 1024px) {
  .search-view {
    grid-template-columns: 1fr 1fr;
  }
}

.filters-summary {
  background-color: #D9F2EF;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  align-items: flex-end;
}

.filters-summary .filter-item {
  flex: 1 1 200px;
  margin-bottom: 0;
  font-weight: bold;
  font-size: 0.9rem;
  background-color: transparent;
  min-width: 180px;
}

.filter-button-container {
  flex-basis: 150px;
  min-width: 150px;
  margin-left: auto;
  margin-top: 1.5rem;
}

.filter-item-text {
  background-color: transparent;
}

.results-column {
  display: flex;
  flex-direction: column;
}

.map-column {
  height: 700px;
  position: sticky;
  top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}

.no-results {
  margin-top: 2rem;
  font-style: italic;
  color: #666;
  text-align: center;
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}
.filter-input {
  margin-top: 0.3rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-weight: normal;
  width: 100%;
}

.filter-input {
  margin-top: 0.3rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-weight: normal;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20d%3D%22M9.293%2012.95l.707.707L15.657%208l-1.414-1.414L10%2010.828l-4.243-4.243L4.343%208z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.8em;
  padding-right: 2rem;
}

.search-button-local {
  height: 48px;
  padding: 0 2rem;
  background-color: #6E58AA;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.search-button-local:hover {
  background-color: #372b50;
}
</style>