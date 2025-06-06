<template>
  <div class="query-view">
    <h2 class="query-view_title">Bandeja de Consultas</h2>
    <p class="query-view_subtitle">
      Gestiona todas las preguntas que recibes de los viajeros interesadas en tus experiencias.
      Responde a tiempo para mejorar tu reputación.
    </p>

    <!-- Search -->
    <div class="query-view_search-container">
      <span class="query-view_search-icon">🔍</span>
      <input
          type="text"
          v-model="searchTerm"
          placeholder="Buscar por nombre del viajero o experiencia"
          class="query-view_search-input"
      />
    </div>

    <!-- Filter buttons -->
    <div class="query-view_filters">
      <button
          class="query-view_filter-button"
          :class="{ active: !showAnswered }"
          @click="setAnsweredFilter(false)"
      >
        Sin responder
      </button>
      <button
          class="query-view_filter-button"
          :class="{ active: showAnswered }"
          @click="setAnsweredFilter(true)"
      >
        Respondidas
      </button>
    </div>

    <!-- Table -->
    <div class="query-view_table-container">
      <table class="query-view_table">
        <thead>
        <tr>
          <th>Usuario</th>
          <th>Experiencia</th>
          <th>Fecha</th>
          <th>Consulta</th>
          <th class="text-center">Acción</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="query in paginatedQueries" :key="query.id">
          <td class="query-view_user-cell">
            <img
                v-if="query.userAvatar"
                :src="query.userAvatar"
                class="query-view_avatar"
            />
            <span v-else class="query-view_avatar-placeholder">
                <i class="pi pi-user"></i>
              </span>
            {{ query.userName }}
          </td>
          <td>{{ query.experienceName }}</td>
          <td>{{ query.date }}</td>
          <td class="query-view_question">{{ query.question }}</td>
          <td class="text-center">
            <button
                v-if="!query.isAnswered"
                class="query-view_button--primary"
                @click="openModal(query)"
            >
              Responder
            </button>
            <button
                v-else
                class="query-view_button--secondary"
                @click="openModal(query, true)"
            >
              Ver respuesta
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="query-view_pagination">
        {{ paginationText }}
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="query-view_modal-backdrop">
      <div class="query-view_modal">
        <div class="query-view_modal-header">
          <h3>
            {{ modalQuery.isAnswered ? 'Respuesta' : 'Añade tu respuesta' }}
          </h3>
          <button @click="closeModal" class="query-view_modal-close">×</button>
        </div>

        <p v-if="!modalQuery.isAnswered" class="query-view_modal-hint">
          (máx. 160 caracteres)
        </p>

        <textarea
            v-if="!modalQuery.isAnswered"
            v-model="modalResponse"
            maxlength="160"
            rows="4"
            class="query-view_textarea"
        ></textarea>

        <p v-else class="query-view_response-text">
          {{ modalQuery.answer }}
        </p>

        <div class="query-view_modal-footer">
          <button
              v-if="!modalQuery.isAnswered"
              class="query-view_button--primary"
              @click="submitResponse"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { QueryApiService } from '../Application/query-api.service.js';
import { QueryAssembler } from '../Application/query.assembler.js';

const queryApiService = new QueryApiService();

const searchTerm = ref('');
const showAnswered = ref(false);
const allQueries = ref([]);
const modalQuery = ref(null);
const showModal = ref(false);
const modalResponse = ref('');
const currentPage = ref(1);
const perPage = 5;

const fetchQueries = async () => {
  try {
    const response = await queryApiService.getAllQueries();
    allQueries.value = QueryAssembler.toEntitiesFromResponse(response);
  } catch (error) {
    console.error('Error al obtener las consultas:', error);
  }
};

const filteredQueries = computed(() => {
  const filtered = allQueries.value.filter(
      (q) => q.isAnswered === showAnswered.value
  );
  if (!searchTerm.value) return filtered;
  const lowerTerm = searchTerm.value.toLowerCase();
  return filtered.filter(
      (q) =>
          q.userName.toLowerCase().includes(lowerTerm) ||
          q.experienceName.toLowerCase().includes(lowerTerm)
  );
});

const paginatedQueries = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredQueries.value.slice(start, start + perPage);
});

const paginationText = computed(() => {
  const total = filteredQueries.value.length;
  const start = (currentPage.value - 1) * perPage + 1;
  const end = Math.min(start + perPage - 1, total);
  return `${start}-${end} de ${total}`;
});

const setAnsweredFilter = (answered) => {
  showAnswered.value = answered;
  currentPage.value = 1;
  searchTerm.value = '';
};

const openModal = (query, viewOnly = false) => {
  modalQuery.value = query;
  showModal.value = true;
  modalResponse.value = query.answer || '';
};

const closeModal = () => {
  showModal.value = false;
  modalQuery.value = null;
  modalResponse.value = '';
};

const submitResponse = async () => {
  if (modalQuery.value && modalResponse.value.trim()) {
    try {
      const updatedQuery = {
        ...modalQuery.value,
        isAnswered: true,
        answer: modalResponse.value.trim(),
      };
      await queryApiService.updateQuery(
          modalQuery.value.id,
          QueryAssembler.toRequestPayload(updatedQuery)
      );
      await fetchQueries();
      closeModal();
    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
    }
  }
};

watch(searchTerm, () => {
  currentPage.value = 1;
});

onMounted(() => {
  fetchQueries();
});
</script>

<style scoped>
.query-view {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: #0f172a;
}
.query-view_title {
  font-size: 1.5rem;
  font-weight: bold;
}
.query-view_subtitle {
  color: #4b5563;
}
.query-view_search-container {
  display: flex;
  align-items: center;
  background-color: #D9F2EF;
  padding: 0.75rem;
  border-radius: 0.375rem;
  max-width: 400px;
}
.query-view_search-icon {
  font-size: 1.25rem;
  margin-right: 0.5rem;
  background: transparent;
}
.query-view_search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: black;
}
.query-view_filters {
  display: flex;
  gap: 0.5rem;
}
.query-view_filter-button {
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 9999px;
  background-color: #fde68a;
  color: #6b7280;
  border: none;
  cursor: pointer;
}
.query-view_filter-button.active {
  background-color: #fbbf24;
  color: black;
}
.query-view_table-container {
  border: 1px solid #BEBEBE;
  border-radius: 0.5rem;
  overflow: hidden;

}
.query-view_table {
  width: 100%;
  border-collapse: collapse;
}
.query-view_table th {
  background-color: #D9F2EF;
  padding: 0.75rem 1rem;
  text-align: left;
}
.query-view_table td {
  padding: 1rem 1rem;
  text-align: left;
}
.query-view_table tr {
  border-bottom: 1px solid #e5e7eb;
  align-items: center;
}
.query-view_user-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.query-view_avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  object-fit: cover;
}
.query-view_avatar-placeholder {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 0.875rem;
}
.query-view_question {
  white-space: pre-line;
}
.query-view_button--primary {
  background-color: #0d9488;
  color: white;
  padding: 0.25rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}
.query-view_button--secondary {
  background-color: #e5e7eb;
  color: #374151;
  padding: 0.25rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}
.query-view_pagination {
  padding: 1rem;
  text-align: center;
  font-size: 0.875rem;
}
.query-view_modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-view_modal {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 400px;
}
.query-view_modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.query-view_modal-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #9ca3af;
  cursor: pointer;
}
.query-view_modal-hint {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}
.query-view_textarea {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem;
  resize: vertical;
  color: black;
}
.query-view_response-text {
  background-color: #f3f4f6;
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}
.query-view_modal-footer {
  text-align: right;
  margin-top: 1rem;
}
</style>