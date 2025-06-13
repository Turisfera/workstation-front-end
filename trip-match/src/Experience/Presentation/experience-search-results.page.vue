<script setup>
import { onMounted, ref, watch } from 'vue'
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
const mapUrl = ref('')

const destination = ref('')
const day = ref('')
const experienceType = ref('')
const budget = ref('')

onMounted(async () => {
  try {
    const experiencesResponse = await experiencesApiService.getExperiences();
    experiences.value = ExperienceAssembler.toEntitiesFromResponse(experiencesResponse);

    const categoriesResponse = await categoryApiService.getCategory();
    categoryMap.value = Object.fromEntries(CategoryAssembler.toEntitiesFromResponse(categoriesResponse).map(c => [c.id, c.description]));

    // Sincronizar filtros con la URL al cargar
    destination.value = route.query.destination || '';
    day.value = route.query.day || '';
    experienceType.value = route.query.experienceType || '';
    budget.value = route.query.budget || '';

    mapUrl.value = getMapUrl(destination.value);
    filterExperiences();
  } catch (error) {
    console.error("Error al cargar los datos de búsqueda:", error);
  }
});

// Observadores para actualizar resultados cuando los filtros cambian
watch(destination, (newDest) => {
  mapUrl.value = getMapUrl(newDest);
})
watch([destination, day, experienceType, budget], () => {
  filterExperiences();
});


function getMapUrl(dest) {
  if (!dest) return '';
  return `https://maps.google.com/maps?q=${encodeURIComponent(dest)},+Peru&output=embed`;
}

const filterExperiences = () => {
  filteredExperiences.value = experiences.value.filter((exp) => {
    const matchesDestination = destination.value === '' || exp.location.toLowerCase().includes(destination.value.toLowerCase());

    // --- ESTA ES LA CORRECCIÓN PRINCIPAL ---
    const matchesDay = day.value === '' || exp.frequencies.toLowerCase().includes(day.value.toLowerCase());

    const matchesType = experienceType.value === '' || exp.title.toLowerCase().includes(experienceType.value.toLowerCase());
    const matchesBudget = budget.value === '' || !budget.value || exp.price <= parseFloat(budget.value);

    return matchesDestination && matchesDay && matchesType && matchesBudget;
  });
};
</script>

<template>
  <div class="search-view">
    <div class="results-column">
      <div class="filters-summary">
        <div class="filter-item">
          <label class="filter-item-text">Destino</label>
          <input v-model="destination" class="filter-input" type="text" placeholder="Ej. Cusco" />
        </div>
        <div class="filter-item">
          <label class="filter-item-text">Día</label>
          <input v-model="day" class="filter-input" type="text" placeholder="Ej. Lunes" />
        </div>
        <div class="filter-item">
          <label class="filter-item-text">Presupuesto</label>
          <input v-model="budget" class="filter-input" type="number" placeholder="Máx. S/ 100" />
        </div>
        <div class="filter-item">
          <label class="filter-item-text">Tipo de experiencia</label>
          <input v-model="experienceType" class="filter-input" type="text" placeholder="Ej. Aventura" />
        </div>
      </div>

      <div v-if="filteredExperiences.length === 0" class="no-results">
        <p>No se encontraron experiencias con estos criterios.</p>
      </div>

      <div class="result-list">
        <ExperienceCardUser
            v-for="experience in filteredExperiences"
            :key="experience.id"
            :experience="experience"
            :categoryDescription="categoryMap[String(experience.categoryId)]"
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
          loading="lazy">
      </iframe>
    </div>
  </div>
</template>

<style scoped>
/* Tus estilos están bien, no necesitan cambios */
.search-view {
  display: grid;
  grid-template-columns: 1fr; /* Cambiado a una columna por defecto */
  gap: 2rem;
  max-width: 1500px;
  margin: auto;
  padding: 2rem;
}

/* En pantallas más grandes, volvemos a dos columnas */
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
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.filters-summary .filter-item {
  flex: 1 1 200px; /* Un poco más de espacio para cada filtro */
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 0.9rem;
  background-color: transparent;
}

.filter-item-text {
  background-color: transparent;
}

.results-column {
  display: flex;
  flex-direction: column;
}

.map-column {
  height: 700px; /* Altura fija para el mapa */
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
</style>