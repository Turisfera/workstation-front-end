<template>  
  <div class="search-container">
    <div class="search-filters">
      <div class="filters-wrapper">
        <div class="filter-item">
          <label for="destination">Destino</label>
          <div class="filter-input-container">
            <i class="pi pi-map-marker location-icon"></i>
            <input 
              id="destination"
              v-model="destination" 
              type="text" 
              placeholder="E.g. Arequipa" 
              class="search-input" 
            />
          </div>
        </div>
        
        <div class="filter-item">
          <label for="day">Día</label>
          <div class="filter-input-container">
            <i class="pi pi-calendar date-icon"></i>
            <select v-model="day" id="day" class="search-input">
              <option value="">Cualquier día</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
              <option value="Todos los días">Todos los días</option>
              <option value="Fines de Semana">Fines de Semana</option>
            </select>
          </div>
        </div>
        
        <div class="filter-item">
          <label for="budget">Presupuesto</label>
          <div class="filter-input-container">
            <i class="pi pi-dollar budget-icon"></i>
            <select v-model="budget" id="budget" class="search-input">
              <option value="0-50">S/0 - S/50</option>
              <option value="50-100">S/50 - S/100</option>
              <option value="100-200">S/100 - S/200</option>
              <option value="200-300">S/200 - S/300</option>
              <option value="300-1000">S/300+</option>
            </select>
          </div>
        </div>
        
        <div class="filter-item">
          <label for="experienceType">Tipo de Experiencia</label>
          <div class="filter-input-container">
            <i class="pi pi-tag type-icon"></i>
            <select v-model="experienceType" id="experienceType" class="search-input">
              <option value="">Todos los tipos</option>
              <option v-for="category in categories" :key="category.id" :value="category.description">
                {{ category.description }}
              </option>
            </select>
          </div>
        </div>
      </div>
      
      <button @click="filterExperiences" class="search-button">
        <i class="pi pi-search"></i>
        Buscar
      </button>
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
          <SearchResultCard
              v-for="experience in filteredExperiences"
              :key="experience.id"
              :experience="experience"
              :categoryDescription="categoryMap[String(experience.categoryId)]"
          />
        </div>
      </div>
      
      <div class="map-column">
        <div id="map-container" style="width:100%; height:100%"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchResultCard from '@/Experience/Presentation/search-result-card.component.vue'
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service'
import { ExperienceAssembler } from '@/Experience/Application/experience.assembler.js'
import { CategoryApiService } from '@/Experience/Application/category-api.service.js'
import { CategoryAssembler } from '@/Experience/Application/category.assembler.js'
import { MarkerService } from '@/Experience/Application/marker.service.js'

const route = useRoute()
const router = useRouter()
const experiencesApiService = new ExperiencesApiService()
const categoryApiService = new CategoryApiService()

// Estado de los datos
const experiences = ref([])
const filteredExperiences = ref([])
const categoryMap = ref({})
const categories = ref([])
const loading = ref(true)

// Referencia del mapa
const map = ref(null)
const markers = ref([])

// Parámetros de búsqueda
const destination = ref('')
const day = ref('')
const experienceType = ref('')
const budget = ref('50-100')

// Verificar si no hay resultados
const noResults = computed(() => {
  return !loading.value && filteredExperiences.value.length === 0
})

// Cargar datos al iniciar
onMounted(async () => {
  try {
    loading.value = true
    
    // Obtener experiencias
    let allExperiences;
    try {
      allExperiences = ExperienceAssembler.toEntitiesFromResponse(
        await experiencesApiService.getExperiences()
      );
    } catch (error) {
      // Si hay un error al obtener experiencias, usar datos de muestra
      console.warn('Usando datos de muestra para experiencias debido a error:', error);
      allExperiences = getSampleExperiences();
    }
    
    experiences.value = allExperiences    
    
    // Obtener categorías
    let categoriesData;
    try {
      categoriesData = CategoryAssembler.toEntitiesFromResponse(
        await categoryApiService.getCategory()
      );
    } catch (error) {
      // Si hay un error al obtener categorías, usar datos de muestra
      console.warn('Usando datos de muestra para categorías debido a error:', error);
      categoriesData = [
        { id: 1, description: 'Gastronomía' },
        { id: 2, description: 'Aventura' },
        { id: 3, description: 'Cultural' }
      ];
    }
    categoryMap.value = Object.fromEntries(categoriesData.map(c => [c.id, c.description]))
    categories.value = categoriesData;

    // Establecer parámetros de URL si existen
    destination.value = route.query.destination || ''
    day.value = route.query.day || ''
    experienceType.value = route.query.experienceType || ''
    budget.value = route.query.budget || '50-100'

    // Inicializar mapa y aplicar filtros
    await initializeMap()
    filterExperiences()
  } catch (error) {
    console.error('Error al cargar datos:', error)
  } finally {
    loading.value = false
  }
})

// Inicializar el mapa de Google Maps
const initializeMap = async () => {
  try {
    // Cargar la API de Google Maps
    await MarkerService.loadGoogleMapsApi()
    
    // Crear el mapa
    map.value = new window.google.maps.Map(document.getElementById('map-container'), {
      center: { lat: -9.1900, lng: -75.0152 }, // Centro de Perú
      zoom: 6,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });
    
    // Si hay un destino seleccionado, centralizar el mapa allí
    updateMapLocation()
  } catch (error) {
    console.error('Error al inicializar el mapa:', error)
    
    // Si falla la carga del mapa, mostrar un iframe de mapa estático como fallback
    const mapContainer = document.getElementById('map-container')
    if (mapContainer) {
      mapContainer.innerHTML = `
        <iframe
          src="${mapUrl.value}"
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen=""
          loading="lazy">
        </iframe>
      `
    }
  }
}

// URL del mapa (para fallback)
const mapUrl = computed(() => {
  return destination.value ? 
    `https://www.google.com/maps?q=${encodeURIComponent(destination.value)},+Peru&output=embed` : 
    'https://www.google.com/maps?q=Peru&output=embed'
})

// Actualizar ubicación del mapa según el destino
const updateMapLocation = async () => {
  if (!map.value || !destination.value) return
  
  try {
    // Usar la Geocoding API para obtener las coordenadas del destino
    const geocoder = new window.google.maps.Geocoder()
    const response = await new Promise((resolve, reject) => {
      geocoder.geocode(
        { address: `${destination.value}, Peru` }, 
        (results, status) => {
          if (status === 'OK') {
            resolve(results[0])
          } else {
            reject(status)
          }
        }
      )
    })
    
    // Centrar el mapa en la ubicación
    map.value.setCenter(response.geometry.location)
    map.value.setZoom(10)
  } catch (error) {
    console.warn('Error al obtener ubicación:', error)
    // Si hay un error, volver al centro de Perú
    if (map.value) {
      map.value.setCenter({ lat: -9.1900, lng: -75.0152 })
      map.value.setZoom(6)
    }
  }
}

// Actualizar los markers en el mapa
const updateMapMarkers = () => {
  if (!map.value) return
  
  // Limpiar markers existentes
  markers.value.forEach(m => {
    m.marker.setMap(null);
    if (m.infoWindow) {
      m.infoWindow.close();
    }
  });
  markers.value = [];
  
  // Crear nuevos markers para las experiencias filtradas
  markers.value = MarkerService.createMarkersForExperiences(filteredExperiences.value, map.value);
}

// Actualizar filtros cuando cambien los parámetros
watch([destination], async () => {
  await updateMapLocation()
  filterExperiences()
})

watch([day, experienceType, budget], () => {
  filterExperiences()
})

// Función para obtener datos de muestra
function getSampleExperiences() {
  return [
    {
      id: 1,
      title: 'Tour gastronómico por Lima',
      description: 'Descubre los sabores de Lima en un recorrido por mercados locales y restaurantes emblemáticos.',
      location: 'Lima',
      duration: 4,
      price: 85,
      rating: 4.5,
      frequencies: {
        value: 'Lunes a Viernes'
      },
      schedules: ['09:00', '11:00', '12:00'],
      categoryId: 1,
      agency: 'Lima Food Tours',
      latitude: -12.0464,
      longitude: -77.0428,
      images: [
        'https://images.unsplash.com/photo-1626197031507-c17099753214?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3'
      ],
      includes: [
        'Guía local gastronómico',
        'Degustación en 5 paradas',
        'Bebida típica'
      ]
    },
    {
      id: 2,
      title: 'Aventura en las dunas de Huacachina',
      description: 'Adrenalina pura deslizándote por las dunas del desierto y paseo en buggy.',
      location: 'Ica',
      duration: 3,
      price: 70,
      rating: 5,
      frequencies: {
        value: 'Fines de Semana'
      },
      schedules: ['10:00', '12:00', '13:00'],
      categoryId: 2,
      agency: 'Desert Adventures',
      latitude: -14.0787,
      longitude: -75.7626,
      images: [
        'https://images.unsplash.com/photo-1656074414945-7ec0cde461e4?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3'
      ],
      includes: [
        'Equipo de seguridad',
        'Instructor profesional',
        'Transporte ida y vuelta'
      ]
    },
    {
      id: 3,
      title: 'City Tour Arequipa',
      description: 'Descubre la belleza colonial de Arequipa en este recorrido guiado por el Centro Histórico, el Mirador de Yanahuara, y el Monasterio de Santa Catalina.',
      location: 'Arequipa',
      duration: 2,
      price: 80,
      rating: 4,
      frequencies: {
        value: 'Todos los días'
      },
      schedules: ['10:00', '12:00', '14:00'],
      categoryId: 3,
      agency: 'Andes Explorer',
      latitude: -16.3988,
      longitude: -71.5369,
      images: [
        'https://images.unsplash.com/photo-1548018560-c7196548e84d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1564658347837-2505f703117b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3'
      ],
      includes: [
        'Guía turístico profesional',
        'Transporte desde el punto de encuentro',
        'Botella de agua'
      ]
    }
  ];
}

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
      (exp.frequencies.value && exp.frequencies.value.toLowerCase().includes(day.value.toLowerCase())) ||
      (exp.frequencies.length && exp.frequencies.some(f => f.toLowerCase().includes(day.value.toLowerCase())))
    
    // Comprobar tipo de experiencia (título o categoría)
    const matchesType = !experienceType.value || 
      exp.title.toLowerCase().includes(experienceType.value.toLowerCase()) ||
      (categoryMap.value[exp.categoryId] && categoryMap.value[exp.categoryId].toLowerCase().includes(experienceType.value.toLowerCase()))
    
    // Comprobar presupuesto (precio)
    let matchesBudget = true
    if (budget.value) {
      const [min, max] = budget.value.split('-').map(Number)
      matchesBudget = exp.price >= min && exp.price <= max
    }
    
    return matchesDestination && matchesDay && matchesType && matchesBudget
  })
  
  // Actualizar los markers en el mapa
  updateMapMarkers()
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filters-wrapper {
  background-color: #D9F2EF;
  border-radius: 0.8rem;
  padding: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
  font-size: 0.9rem;
  font-weight: 500;
  color: #444;
}

.filter-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.filter-input-container i {
  position: absolute;
  left: 10px;
  color: #777;
}

.search-input {
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 0.9rem;
  background-color: white;
  border: none;
  border-radius: 4px;
  box-shadow: none;
  outline: none;
  appearance: none;
}

select.search-input {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%23888' d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
}

.search-input:focus {
  box-shadow: 0 0 0 2px rgba(153, 211, 210, 0.3);
}

.search-button {
  align-self: flex-end;
  padding: 0.8rem 1.5rem;
  background-color: #99D3D2;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.search-button:hover {
  background-color: #7fc7c6;
}

.search-results-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  height: calc(100vh - 220px);
}

.results-column {
  overflow-y: auto;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-right: 1rem;
}

.map-column {
  height: calc(100vh - 220px);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
}

#map-container {
  border-radius: 8px;
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

/* Estilos para la ventana de información del marcador */
:global(.marker-info-window) {
  padding: 5px;
  max-width: 200px;
}

:global(.marker-info-window h3) {
  margin: 0 0 5px 0;
  font-size: 14px;
}

:global(.marker-info-window p) {
  margin: 2px 0;
  font-size: 12px;
}

@media (max-width: 768px) {
  .search-results-container {
    grid-template-columns: 1fr;
  }
  
  .map-column {
    height: 300px;
  }
  
  .search-button {
    align-self: stretch;
  }
}
</style>

<script>
let map;
let markers = [];

function initMap() {
  map = L.map('map-container').setView([-9.19, -75.0152], 4);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);
}

function addMarker(location, title) {
  const marker = L.marker(location).addTo(map)
    .bindPopup(title)
    .openPopup();

  markers.push(marker);
}

function clearMarkers() {
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];
}

onMounted(() => {
  initMap();

  watch(filteredExperiences, (newExperiences) => {
    clearMarkers();

    newExperiences.forEach(exp => {
      const location = exp.location.split(',').map(coord => parseFloat(coord.trim()));
      addMarker(location, exp.title);
    });
  });
});
</script>
