<template>
  <div v-if="show" class="experience-modal-overlay" @click="closeModal">
    <div class="experience-modal" @click.stop>
      <button class="modal-close-btn" @click="closeModal">
        <i class="pi pi-times"></i>
      </button>
      
      <div class="modal-content">
        <div class="image-gallery">
          <div class="main-images">
            <img :src="experience.images[0]" class="main-image" alt="Experiencia principal" />
            <div v-if="experience.images.length > 1" class="secondary-images">
              <img v-for="(img, index) in experience.images.slice(1, 3)" :key="index" :src="img" alt="Imagen secundaria" />
            </div>
          </div>
        </div>
        
        <div class="experience-details">
          <h2 class="modal-title">{{ experience.title }}</h2>
          
          <div class="rating-container">
            <span class="stars">{{ '★'.repeat(Math.round(experience.rating)) }}</span>
            <span class="score">{{ experience.rating }}</span>
          </div>
          
          <div class="price-duration">
            <p>s/{{ experience.price }} · {{ experience.duration }}h · {{ frequency }}</p>
            <p>{{ experience.schedules.join(' | ') }}</p>
          </div>
          
          <p class="experience-description">{{ experience.description }}</p>
          
          <div class="includes-section">
            <h3>Incluye:</h3>
            <ul>
              <li v-for="(item, index) in includes" :key="index">
                <i class="pi pi-check"></i> {{ item }}
              </li>
            </ul>
          </div>
          
          <div class="action-buttons">
            <button class="consult-btn">Consultar</button>
            <button class="reserve-btn">Reservar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  show: Boolean,
  experience: Object,
  categoryDescription: String
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

// Para la demostración, creamos algunos items de "incluye" ficticios
// En un caso real, estos vendrían del objeto experiencia
const includes = computed(() => {
  if (!props.experience) return [];
  
  // Si la experiencia tiene includes, usarlos
  if (props.experience.includes && props.experience.includes.length) {
    return props.experience.includes;
  }
  
  // Si no, usar valores predeterminados basados en el tipo de experiencia
  return [
    'Guía turístico profesional',
    'Transporte desde el punto de encuentro',
    'Botella de agua'
  ];
});

const frequency = computed(() => {
  if (!props.experience) return '';
  
  return props.experience.frequencies.value || props.experience.frequencies[0] || 'Todos los días';
});
</script>

<style scoped>
.experience-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.experience-modal {
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  z-index: 10;
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.image-gallery {
  width: 100%;
}

.main-images {
  display: flex;
  flex-direction: row;
  gap: 4px;
  width: 100%;
}

.main-image {
  width: 65%;
  height: 300px;
  object-fit: cover;
}

.secondary-images {
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.secondary-images img {
  width: 100%;
  height: 148px;
  object-fit: cover;
}

.experience-details {
  padding: 20px;
}

.modal-title {
  margin: 0 0 10px 0;
  font-size: 1.8rem;
  font-weight: bold;
}

.rating-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.stars {
  color: #f5a623;
  margin-right: 5px;
}

.price-duration {
  margin-bottom: 15px;
  font-size: 0.95rem;
  color: #333;
}

.experience-description {
  margin-bottom: 20px;
  line-height: 1.6;
}

.includes-section {
  margin-bottom: 20px;
  border-top: 1px solid #eaeaea;
  padding-top: 15px;
}

.includes-section h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.includes-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.includes-section li {
  padding: 5px 0;
  display: flex;
  align-items: center;
}

.includes-section li i {
  color: #4CAF50;
  margin-right: 10px;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.action-buttons button {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  font-size: 1rem;
}

.consult-btn {
  background-color: #f1f1f1;
  color: #333;
}

.reserve-btn {
  background-color: #67B7B6;
  color: white;
}

@media (min-width: 768px) {
  .modal-content {
    flex-direction: row;
  }
  
  .image-gallery, .experience-details {
    width: 50%;
  }
  
  .experience-details {
    padding: 30px;
  }
  
  .main-image {
    height: 400px;
  }
  
  .secondary-images img {
    height: 198px;
  }
}
</style>
