<template>
  <div class="search-container">
    <div class="search-header">
      <h1>{{ t('search.title') }}</h1>
    </div>
    
    <div class="search-filters">
      <div class="filters-wrapper">
        <div class="filter-item">
          <label>{{ t('home.destination') }}</label>
          <input v-model="destination" type="text" :placeholder="t('search.destinationPlaceholder')" />
        </div>
        <div class="filter-item">
          <label>{{ t('home.day') }}</label>
          <input v-model="day" type="text" :placeholder="t('search.dayPlaceholder')" />
        </div>
        <div class="filter-item">
          <label>{{ t('home.budget') }}</label>
          <div class="budget-range">
            <span>{{ t('search.range') }}</span>
            <span>50-100</span>
          </div>
        </div>
        <div class="filter-item">
          <label>{{ t('home.experienceType') }}</label>
          <input v-model="experienceType" type="text" :placeholder="t('search.typePlaceholder')" />
        </div>
      </div>
    </div>

    <div class="search-results-container">
      <div class="results-column">
        <div v-if="loading" class="loading">
          <p>{{ t('search.loading') }}</p>
        </div>
        
        <div v-else-if="noResults" class="no-results">
          <h2>{{ t('search.noResults') }}</h2>
          <p>{{ t('search.tryAgain') }}</p>
        </div>
        
        <div v-else class="result-list">
          <ExperienceCardUser
              v-for="experience in filteredExperiences"
              :key="experience.id"
              :experience="experience"
              :categoryDescription="categoryMap[String(experience.categoryId)]"
          />
        </div>
      </div>
      
      <div class="map-column">
        <iframe
          :src="mapUrl"
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen=""
          loading="lazy">
        </iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ExperienceCardUser from '@/Experience/Presentation/experience-card-user.component.vue'
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service'
import { ExperienceAssembler } from '@/Experience/Application/experience.assembler.js'
import { CategoryApiService } from '@/Experience/Application/category-api.service.js'
import { CategoryAssembler } from '@/Experience/Application/category.assembler.js'

const { t } = useI18n()
const route = useRoute()
const experiencesApiService = new ExperiencesApiService()
const categoryApiService = new CategoryApiService()

// Estado de los datos
const experiences = ref([])
const filteredExperiences = ref([])
const categoryMap = ref({})
const loading = ref(true)

// Parámetros de búsqueda
const destination = ref('')
const day = ref('')
const experienceType = ref('')
const budget = ref('50-100')

// URL del mapa
const mapUrl = computed(() => {
  return destination.value ? 
    `https://www.google.com/maps?q=${encodeURIComponent(destination.value)},+Peru&output=embed` : 
    'https://www.google.com/maps?q=Peru&output=embed'
})

// Verificar si no hay resultados
const noResults = computed(() => {
  return !loading.value && filteredExperiences.value.length === 0
})

// Cargar datos al iniciar
onMounted(async () => {
  try {
    loading.value = true
    
    // Obtener experiencias
    const allExperiences = ExperienceAssembler.toEntitiesFromResponse(
      await experiencesApiService.getExperiences()
    )
    experiences.value = allExperiences

    // Obtener categorías
    const categories = CategoryAssembler.toEntitiesFromResponse(
      await categoryApiService.getCategory()
    )
    categoryMap.value = Object.fromEntries(categories.map(c => [c.id, c.description]))

    // Establecer parámetros de URL si existen
    destination.value = route.query.destination || 'Arequipa'
    day.value = route.query.day || '01/02/25'
    experienceType.value = route.query.experienceType || 'Aventura'
    budget.value = route.query.budget || '50-100'

    // Aplicar filtros
    filterExperiences()
  } catch (error) {
    console.error('Error al cargar datos:', error)
  } finally {
    loading.value = false
  }
})

// Actualizar filtros cuando cambien los parámetros
watch([destination, day, experienceType, budget], () => {
  filterExperiences()
})

// Función para filtrar experiencias
const filterExperiences = () => {
  // Si no hay experiencias cargadas, no hacer nada
  if (experiences.value.length === 0) return
  
  filteredExperiences.value = experiences.value.filter((exp) => {
    // Comprobar si coincide con el destino (ubicación)
    const matchesDestination = !destination.value || 
      exp.location.toLowerCase().includes(destination.value.toLowerCase())
    
    // Comprobar si coincide con el día (frecuencia)
    const matchesDay = !day.value || 
      exp.frequencies.some(f => f.toLowerCase().includes(day.value.toLowerCase()))
    
    // Comprobar tipo de experiencia (título o categoría)
    const matchesType = !experienceType.value || 
      exp.title.toLowerCase().includes(experienceType.value.toLowerCase())
    
    // Comprobar presupuesto (precio)
    let matchesBudget = true
    if (budget.value) {
      const [min, max] = budget.value.split('-').map(Number)
      matchesBudget = exp.price >= min && exp.price <= max
    }
    
    return matchesDestination && matchesDay && matchesType && matchesBudget
  })
}
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5rem;
}

.search-header {
  margin-bottom: 1rem;
}

.search-filters {
  margin-bottom: 2rem;
}

.filters-wrapper {
  background-color: #D9F2EF;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-item {
  flex: 1;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-item label {
  font-weight: 500;
}

.filter-item input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

.budget-range {
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-results-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: calc(100vh - 250px);
}

.results-column {
  overflow-y: auto;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.map-column {
  min-height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.loading, .no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  text-align: center;
}

.no-results h2 {
  margin-bottom: 1rem;
  color: #666;
}

.no-results p {
  color: #2196F3;
  cursor: pointer;
}

@media (max-width: 768px) {
  .search-results-container {
    grid-template-columns: 1fr;
  }
  
  .map-column {
    height: 300px;
  }
}
</style>
