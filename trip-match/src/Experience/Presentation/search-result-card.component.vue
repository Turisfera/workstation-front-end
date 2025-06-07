<template>
  <div class="search-result-card">
    <div class="card-image">
      <img :src="experience.images[0]" alt="Imagen experiencia" />
      <button 
        class="bookmark-button" 
        @click.stop="toggleFavorite" 
        :class="{ 'is-favorite': isFavorite }"
      >
        <i :class="isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'"></i>
      </button>
    </div>
    
    <div class="card-content">
      <div class="rating">
        <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(experience.rating) }">★</span>
      </div>
      
      <div class="card-info">
        <div class="price-duration">
          S/{{ experience.price }} · {{ experience.duration }}h · {{ experienceFrequency }} · {{ categoryName }}
        </div>
        
        <div class="schedules">
          {{ experience.schedules.join(' | ') }}
        </div>
        
        <div class="description">
          {{ experience.description }}
        </div>
      </div>
      
      <div class="card-actions">
        <a class="view-more-link" @click="openModal">Ver más</a>
      </div>
    </div>
      <!-- Modal para ver detalles -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-container" @click.stop>
        <button class="close-button" @click="closeModal">×</button>
        
        <div class="modal-content">
          <div class="modal-images">
            <div class="main-image">
              <img :src="experience.images[0]" alt="Imagen principal" />
            </div>
            <div class="secondary-images">
              <img 
                v-for="(img, index) in modalImages" 
                :key="index" 
                :src="img" 
                alt="Imagen secundaria" 
              />
            </div>
          </div>
          
          <div class="modal-title-section">
            <h2 class="experience-title">{{ experience.title }}</h2>
            
            <div class="rating-container">
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(experience.rating) }">★</span>
              <span class="rating-number">{{ experience.rating }}</span>
            </div>
          </div>
            
          <div class="modal-body">
            <div class="modal-left">
              <div class="details">
                <div>s/{{ experience.price }} · {{ experience.duration }}h · {{ experienceFrequency }}</div>
                <div>{{ modalSchedules }}</div>
              </div>
              
              <p class="experience-description">
                {{ experience.description }}
              </p>
              
              <div class="reviews-section">
                <h3>Opiniones de los usuarios</h3>
                <div v-if="reviews.length > 0" class="reviews-list">
                  <ExperienceReview 
                    v-for="(review, index) in reviews" 
                    :key="index"
                    :username="review.username"
                    :rating="review.rating"
                    :comment="review.comment"
                    :date="review.date"
                    :avatarUrl="review.avatarUrl"
                  />
                </div>
                <div v-else class="no-reviews">
                  <p>Esta experiencia aún no tiene opiniones.</p>
                  <button 
                    v-if="isLoggedIn" 
                    class="add-review-btn"
                    @click="showAddReviewForm = true"
                  >
                    Deja tu opinión
                  </button>
                </div>
              </div>
              
              <div v-if="showAddReviewForm" class="add-review-form">
                <h4>Escribir una opinión</h4>
                <div class="rating-input">
                  <span>Tu calificación:</span>
                  <div class="star-rating">
                    <span 
                      v-for="i in 5" 
                      :key="i" 
                      class="star-btn"
                      :class="{ active: i <= newReviewRating }"
                      @click="newReviewRating = i"
                    >
                      ★
                    </span>
                  </div>
                </div>
                <textarea 
                  v-model="newReviewComment" 
                  placeholder="Comparte tu experiencia..." 
                  rows="3"
                  class="review-textarea"
                ></textarea>
                <div class="form-actions">
                  <button class="cancel-btn" @click="showAddReviewForm = false">Cancelar</button>
                  <button 
                    class="submit-btn" 
                    @click="submitReview"
                    :disabled="!canSubmitReview"
                  >
                    Publicar
                  </button>
                </div>
              </div>
              
              <div class="modal-actions">
                <button class="consult-btn">Consultar</button>
                <button class="reserve-btn">Reservar</button>
              </div>
            </div>
            
            <div class="modal-right">
              <div class="includes">
                <h3>Incluye:</h3>
                <ul>
                  <li v-for="(item, index) in includes" :key="index">
                    <span class="bullet">•</span> {{ item }}
                  </li>
                </ul>
              </div>
              
              <div class="location-map">
                <h3>Ubicación</h3>
                <div class="map-container">
                  <iframe
                    :src="`https://www.google.com/maps?q=${encodeURIComponent(experience.location)},+Peru&output=embed`"
                    width="100%" 
                    height="200" 
                    style="border:0;" 
                    allowfullscreen=""
                    loading="lazy">
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed, onMounted } from 'vue';
import ExperienceReview from './experience-review.component.vue';

const props = defineProps({
  experience: {
    type: Object,
    required: true
  },
  categoryDescription: {
    type: String,
    default: ''
  }
});

// Estado del modal
const showModal = ref(false);

// Estado de favoritos
const isFavorite = ref(false);

// Estado de reviews
const reviews = ref([]);
const showAddReviewForm = ref(false);
const newReviewRating = ref(0);
const newReviewComment = ref('');

// Verificar si el usuario está logueado
const isLoggedIn = computed(() => {
  return !!localStorage.getItem('token');
});

// Verificar si puede enviar review
const canSubmitReview = computed(() => {
  return newReviewRating.value > 0 && newReviewComment.value.trim().length > 0;
});

// Categoría mostrada
const categoryName = computed(() => props.categoryDescription || 'Aventura');

// Formato de frecuencia
const experienceFrequency = computed(() => {
  if (typeof props.experience.frequencies === 'string') {
    return props.experience.frequencies;
  }
  if (typeof props.experience.frequencies === 'object' && props.experience.frequencies.value) {
    return props.experience.frequencies.value;
  }
  if (Array.isArray(props.experience.frequencies) && props.experience.frequencies.length > 0) {
    return props.experience.frequencies[0];
  }
  return 'Todos los días';
});

// Imágenes para el modal
const modalImages = computed(() => {
  const images = [...props.experience.images];
  // Si no hay suficientes imágenes, duplicar la primera
  while (images.length < 2) {
    images.push(images[0]);
  }
  return images.slice(1, 3);
});

// Horarios formateados
const modalSchedules = computed(() => {
  if (!props.experience.schedules || props.experience.schedules.length === 0) {
    return '10:00am | 2:00pm';
  }
  return props.experience.schedules.join(' | ');
});

// Items incluidos
const includes = computed(() => {
  if (props.experience.includes && props.experience.includes.length > 0) {
    return props.experience.includes;
  }
  return [
    'Guía turístico profesional',
    'Transporte desde el punto de encuentro',
    'Botella de agua'
  ];
});

// Función para alternar favorito
const toggleFavorite = (event) => {
  event.stopPropagation();
  isFavorite.value = !isFavorite.value;
  
  // Almacenar en localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  if (isFavorite.value) {
    favorites.push(props.experience.id);
  } else {
    const index = favorites.indexOf(props.experience.id);
    if (index > -1) {
      favorites.splice(index, 1);
    }
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Cargar reviews al montar el componente
onMounted(() => {
  // Verificar si está en favoritos
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  isFavorite.value = favorites.includes(props.experience.id);
  
  // Cargar reviews desde localStorage (simulado)
  loadReviews();
});

// Abrir el modal
const openModal = () => {
  showModal.value = true;
  document.body.style.overflow = 'hidden'; // Prevenir scroll en el fondo
};

// Cerrar el modal
const closeModal = () => {
  showModal.value = false;
  document.body.style.overflow = ''; // Restaurar scroll
  showAddReviewForm.value = false;
};

// Cargar reviews (simulados)
const loadReviews = () => {
  // Aquí podríamos hacer una llamada API real
  // Por ahora usamos datos ficticios
  
  // Para experiencias reales, usar datos ficticios diferentes por cada ID
  if (props.experience.id % 2 === 0) {
    reviews.value = [
      {
        username: 'Marina López',
        rating: 5,
        comment: '¡Increíble experiencia! El guía fue muy amable y conocedor. Totalmente recomendable para cualquiera que visite la zona.',
        date: '2025-05-10',
        avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      {
        username: 'Carlos Mendoza',
        rating: 4,
        comment: 'Muy buena experiencia. La organización fue excelente, aunque el tiempo se hizo un poco corto.',
        date: '2025-04-22',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    ];
  } else {
    reviews.value = [
      {
        username: 'Juan Pérez',
        rating: 5,
        comment: 'Una experiencia única. El paisaje es espectacular y el servicio fue impecable.',
        date: '2025-05-15',
        avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg'
      }
    ];
  }
};

// Enviar review
const submitReview = () => {
  if (!canSubmitReview.value) return;
  
  // En una app real, aquí enviaríamos la review a un backend
  
  // Por ahora, solo la agregamos al array local
  const newReview = {
    username: 'Usuario Actual', // En una app real, obtendríamos el nombre del usuario logueado
    rating: newReviewRating.value,
    comment: newReviewComment.value,
    date: new Date().toISOString().split('T')[0],
    avatarUrl: '' // En una app real, podríamos tener el avatar del usuario
  };
  
  reviews.value.unshift(newReview);
  
  // Limpiar el formulario
  newReviewRating.value = 0;
  newReviewComment.value = '';
  showAddReviewForm.value = false;
};
</script>

<style scoped>
.search-result-card {
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-bottom: 1rem;
  overflow: hidden;
  padding: 15px;
  display: flex;
  flex-direction: row;
}

.card-image {
  position: relative;
}

.card-image img {
  width: 85px;
  height: 85px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
}

.bookmark-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bookmark-button:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.9);
}

.bookmark-button i {
  color: #777;
  font-size: 1rem;
}

.bookmark-button.is-favorite i {
  color: #ff5252;
}

.card-content {
  padding: 15px;
  flex: 1;
}

.star {
  color: #ddd;
  font-size: 1rem;
}

.star.filled {
  color: #FFD700;
}

.rating {
  margin-bottom: 8px;
}

.price-duration {
  font-weight: 500;
  margin-bottom: 4px;
}

.schedules {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 8px;
}

.description {
  font-size: 0.9rem;
  margin-bottom: 15px;
  line-height: 1.4;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}

.view-more-link {
  color: #99D3D2;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.view-more-link:hover {
  color: #7fc7c6;
  text-decoration: underline;
}

/* Estilos del modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
}

.modal-container {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 15px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.modal-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
}

.main-image {
  grid-column: 1;
  grid-row: span 2;
}

.main-image img {
  width: 100%;
  height: 100%;
  max-height: 240px;
  object-fit: cover;
  border-radius: 4px;
}

.secondary-images {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.secondary-images img {
  width: 100%;
  height: 115px;
  object-fit: cover;
  border-radius: 4px;
}

.modal-title-section {
  margin-bottom: 15px;
}

.experience-title {
  font-size: 1.3rem;
  margin-bottom: 5px;
  color: #333;
}

.rating-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.rating-number {
  margin-left: 5px;
  font-weight: bold;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.modal-left, .modal-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.details {
  margin-bottom: 15px;
  font-size: 0.95rem;
  color: #555;
}

.experience-description {
  margin-bottom: 20px;
  line-height: 1.4;
  font-size: 0.95rem;
}

.includes {
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 6px;
}

.includes h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;
  margin-top: 0;
}

.includes ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.includes li {
  margin-bottom: 8px;
  display: flex;
  align-items: flex-start;
  font-size: 0.95rem;
}

.bullet {
  color: #333;
  margin-right: 8px;
}

/* Estilos para reviews */
.reviews-section {
  margin: 20px 0;
}

.reviews-section h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.reviews-list {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 6px;
}

.no-reviews {
  text-align: center;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 6px;
}

.add-review-btn {
  background-color: #99D3D2;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 10px;
}

.add-review-form {
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 6px;
  margin-top: 15px;
}

.add-review-form h4 {
  margin-top: 0;
  margin-bottom: 10px;
}

.rating-input {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.star-rating {
  display: flex;
  margin-left: 10px;
}

.star-btn {
  font-size: 1.5rem;
  color: #ddd;
  cursor: pointer;
  transition: color 0.2s;
}

.star-btn:hover,
.star-btn.active {
  color: #FFD700;
}

.review-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  margin-bottom: 10px;
  font-family: inherit;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn, .submit-btn {
  padding: 8px 15px;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f1f1f1;
}

.submit-btn {
  background-color: #99D3D2;
  color: white;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Estilos para la ubicación */
.location-map {
  margin-top: 20px;
}

.location-map h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.map-container {
  border-radius: 6px;
  overflow: hidden;
  height: 200px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.consult-btn, .reserve-btn {
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  cursor: pointer;
}

.consult-btn {
  background-color: #f1f1f1;
  color: #333;
}

.reserve-btn {
  background-color: #99D3D2;
  color: white;
}

@media (max-width: 768px) {
  .modal-body {
    grid-template-columns: 1fr;
  }
  
  .modal-images {
    grid-template-columns: 1fr;
  }
  
  .main-image {
    grid-column: auto;
  }
  
  .secondary-images {
    grid-column: auto;
    display: flex;
    flex-direction: row;
  }
  
  .secondary-images img {
    height: 80px;
  }
}
</style>
