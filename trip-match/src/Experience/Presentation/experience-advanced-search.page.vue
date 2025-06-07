<template>
  <div class="search-container">
    <div class="search-header">
      <h1>Busqueda de Experiencias</h1>
      <p class="search-subtitle">Descubre experiencias increíbles para tu próximo viaje</p>
    </div>

    <div class="search-filters">
      <div class="filter-group">
        <label for="destination">Destino</label>
        <div class="input-wrapper">
          <i class="pi pi-map-marker filter-icon"></i>
          <input id="destination" v-model="searchParams.destination" type="text" placeholder="¿A dónde quieres ir?" />
        </div>
      </div>
      
      <div class="filter-group">
        <label for="day">Día</label>
        <div class="input-wrapper">
          <i class="pi pi-calendar filter-icon"></i>
          <select id="day" v-model="searchParams.day">
            <option value="">Cualquier día</option>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
        </div>
      </div>
      
      <div class="filter-group">
        <label for="category">Categoría</label>
        <div class="input-wrapper">
          <i class="pi pi-tag filter-icon"></i>
          <select id="category" v-model="searchParams.category">
            <option value="">Todas las categorías</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.description }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="filter-group">
        <label for="budget">Presupuesto</label>
        <div class="input-wrapper">
          <i class="pi pi-money-bill filter-icon"></i>
          <input id="budget" v-model.number="searchParams.budget" type="number" min="0" placeholder="Presupuesto máximo" />
        </div>
      </div>
      
      <button @click="searchExperiences" class="search-button">
        <i class="pi pi-search"></i>
        Buscar
      </button>
    </div>

    <div class="search-results">
      <div v-if="isLoading" class="loading-state">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        <p>Buscando experiencias...</p>
      </div>
      
      <div v-else>
        <div v-if="hasResults" class="results-summary">
          <p>{{ filteredExperiences.length }} experiencias encontradas</p>
          <div class="sort-options">
            <label>Ordenar por:</label>
            <select v-model="sortOption" @change="sortResults">
              <option value="price_asc">Precio: menor a mayor</option>
              <option value="price_desc">Precio: mayor a menor</option>
              <option value="rating_desc">Mejor valoradas</option>
            </select>
          </div>
        </div>
        
        <div v-if="hasResults" class="results-grid">
          <div v-for="experience in filteredExperiences" :key="experience.id" class="experience-card-container">
            <ExperienceCardUser 
              :experience="experience"
              :categoryDescription="getCategoryName(experience.categoryId)"
            />
          </div>
        </div>
        
        <div v-else class="no-results">
          <img src="@/assets/img/no-results.svg" alt="Sin resultados" class="no-results-img" />
          <h3>No se encontraron resultados</h3>
          <p>Intenta con filtros diferentes o explora todas nuestras experiencias disponibles</p>
          <button @click="resetFilters" class="reset-button">
            <i class="pi pi-refresh"></i> Limpiar filtros
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="hasResults && searchParams.destination" class="map-container">
      <h3>Mapa de ubicaciones</h3>
      <iframe
        :src="mapUrl"
        width="100%" 
        height="400" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ExperienceCardUser from '@/Experience/Presentation/experience-card-user.component.vue'
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service'
import { ExperienceAssembler } from '@/Experience/Application/experience.assembler.js'
import { CategoryApiService } from '@/Experience/Application/category-api.service.js'
import { CategoryAssembler } from '@/Experience/Application/category.assembler.js'

const route = useRoute()
const router = useRouter()
const experiencesApiService = new ExperiencesApiService()
const categoryApiService = new CategoryApiService()

const experiences = ref([])
const categories = ref([])
const filteredExperiences = ref([])
const isLoading = ref(true)
const sortOption = ref('price_asc')

// Reactive search params
const searchParams = reactive({
  destination: '',
  day: '',
  category: '',
  budget: ''
})

// Computed properties
const hasResults = computed(() => filteredExperiences.value.length > 0)

const mapUrl = computed(() => {
  if (!searchParams.destination) return null
  return `https://www.google.com/maps?q=${encodeURIComponent(searchParams.destination)},+Peru&output=embed`
})

// Methods
function getCategoryName(categoryId) {
  if (!categoryId) return ''
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.description : ''
}

function searchExperiences() {
  applyFilters()
  
  // Update URL with search params
  router.push({
    path: '/search',
    query: {
      destination: searchParams.destination || undefined,
      day: searchParams.day || undefined,
      category: searchParams.category || undefined, 
      budget: searchParams.budget || undefined
    }
  })
}

function applyFilters() {
  isLoading.value = true
  
  filteredExperiences.value = experiences.value.filter(exp => {
    const matchesDestination = !searchParams.destination || 
                              exp.location.toLowerCase().includes(searchParams.destination.toLowerCase())
    
    const matchesDay = !searchParams.day || 
                      (exp.frequencies && typeof exp.frequencies === 'string' && 
                       exp.frequencies.toLowerCase().includes(searchParams.day.toLowerCase()))
    
    const matchesCategory = !searchParams.category || exp.categoryId === searchParams.category
    
    const matchesBudget = !searchParams.budget || exp.price <= searchParams.budget
    
    return matchesDestination && matchesDay && matchesCategory && matchesBudget
  })
  
  sortResults()
  isLoading.value = false
}

function sortResults() {
  const option = sortOption.value
  
  switch(option) {
    case 'price_asc':
      filteredExperiences.value.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      filteredExperiences.value.sort((a, b) => b.price - a.price)
      break
    case 'rating_desc':
      filteredExperiences.value.sort((a, b) => b.rating - a.rating)
      break
  }
}

function resetFilters() {
  searchParams.destination = ''
  searchParams.day = ''
  searchParams.category = ''
  searchParams.budget = ''
  
  filteredExperiences.value = [...experiences.value]
  sortResults()
  
  router.push({ path: '/search' })
}

// Lifecycle hooks
onMounted(async () => {
  try {
    isLoading.value = true
    
    // Load experiences
    const experiencesResponse = await experiencesApiService.getExperiences()
    experiences.value = ExperienceAssembler.toEntitiesFromResponse(experiencesResponse)
    
    // Load categories
    const categoriesResponse = await categoryApiService.getCategory()
    categories.value = CategoryAssembler.toEntitiesFromResponse(categoriesResponse)
    
    // Set search params from URL
    if (route.query) {
      searchParams.destination = route.query.destination || ''
      searchParams.day = route.query.day || ''
      searchParams.category = route.query.category || ''
      searchParams.budget = route.query.budget ? Number(route.query.budget) : ''
    }
    
    applyFilters()
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.search-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
}

.search-header {
  text-align: center;
  margin-bottom: 2rem;
}

.search-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.search-subtitle {
  font-size: 1.2rem;
  color: #666;
}

.search-filters {
  background: #D9F2EF;
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: flex-end;
}

.filter-group {
  flex: 1 1 200px;
}

.filter-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.input-wrapper {
  position: relative;
}

.filter-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.input-wrapper input,
.input-wrapper select {
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
}

.search-button {
  background-color: #67B7B6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #4a9e9d;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  color: #666;
}

.results-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-options select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.no-results {
  text-align: center;
  padding: 3rem 0;
}

.no-results-img {
  max-width: 200px;
  margin-bottom: 1rem;
}

.reset-button {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.reset-button:hover {
  background-color: #e0e0e0;
}

.map-container {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.map-container h3 {
  margin-bottom: 1rem;
}

iframe {
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .search-filters {
    flex-direction: column;
    padding: 1.5rem;
  }
  
  .filter-group {
    flex: 1 1 100%;
  }
  
  .search-button {
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style>
