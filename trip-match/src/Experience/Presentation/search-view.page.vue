<template>  <div class="search-container">
    <div class="search-filters">
      <div class="filters-wrapper">
        <div class="filter-item">
          <input v-model="destination" type="text" placeholder="E.g. Arequipa" class="search-input" />
        </div>
        <div class="filter-item">
          <input v-model="day" type="text" placeholder="E.g. 01/02/25" class="search-input" />
        </div>
        <div class="filter-item">
          <input v-model="budget" type="text" class="search-input" readonly />
        </div>
        <div class="filter-item">
          <input v-model="experienceType" type="text" placeholder="E.g. Adventure" class="search-input" />
        </div>
      </div>
    </div>

    <div class="search-results-container">
      <div class="results-column">        <div v-if="loading" class="loading">
          <p>Cargando experiencias...</p>
        </div>
          <div v-else-if="noResults" class="no-results">
          <h2>No se encontraron resultados de tu búsqueda.</h2>
          <p>Vuelve a intentarlo con otras opciones</p>
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
import ExperienceCardUser from '@/Experience/Presentation/experience-card-user.component.vue'
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service'
import { ExperienceAssembler } from '@/Experience/Application/experience.assembler.js'
import { CategoryApiService } from '@/Experience/Application/category-api.service.js'
import { CategoryAssembler } from '@/Experience/Application/category.assembler.js'

const route = useRoute()
const experiencesApiService = new ExperiencesApiService()
const categoryApiService = new CategoryApiService()

// Estado de los datos
const experiences = ref([])
const filteredExperiences = ref([])
const categoryMap = ref({})
const loading = ref(true)

// Parámetros de búsqueda
const destination = ref('Arequipa')
const day = ref('01/02/25')
const experienceType = ref('Aventura')
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
    destination.value = route.query.destination || ''
    day.value = route.query.day || ''
    experienceType.value = route.query.experienceType || ''
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

.search-filters {
  margin-bottom: 2rem;
}

.filters-wrapper {
  background-color: #D9F2EF;
  border-radius: 0.8rem;
  padding: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
}

.filter-item {
  flex: 1;
  min-width: 150px;
}

.filter-item input {
  padding: 0.8rem 1rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 0.9rem;
}

.search-input {
  background-color: white;
  border: none;
  border-radius: 4px;
  box-shadow: none;
  outline: none;
}

.search-input:focus {
  box-shadow: none;
  outline: none;
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
  height: calc(100vh - 150px);
  border-radius: 0;
  overflow: hidden;
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
