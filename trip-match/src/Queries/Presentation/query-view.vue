<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { QueryApiService } from '../Application/query-api.service.js';
import { QueryAssembler } from '../Application/query.assembler.js';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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
    console.error(t('error.fetchQueries'), error);
  }
};

const filteredQueries = computed(() => {
  const filtered = allQueries.value.filter(q => q.isAnswered === showAnswered.value);
  if (!searchTerm.value) return filtered;
  const lower = searchTerm.value.toLowerCase();
  return filtered.filter(
      q =>
          q.userName.toLowerCase().includes(lower) ||
          q.experienceName.toLowerCase().includes(lower)
  );
});

const paginatedQueries = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredQueries.value.slice(start, start + perPage);
});

const paginationText = computed(() => {
  const total = filteredQueries.value.length;
  if (total === 0) return t('queryView.pagination.no_entries');
  const start = (currentPage.value - 1) * perPage + 1;
  const end = Math.min(start + perPage - 1, total);
  return t('queryView.pagination.display_range', { start: start, end: end, total: total });
});

const setAnsweredFilter = answered => {
  showAnswered.value = answered;
  currentPage.value = 1;
  searchTerm.value = '';
};

const openModal = query => {
  modalQuery.value = { ...query };
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
      const updated = {
        ...modalQuery.value,
        isAnswered: true,
        answer: modalResponse.value.trim()
      };
      await queryApiService.updateQuery(
          modalQuery.value.id,
          QueryAssembler.toRequestPayload(updated)
      );
      await fetchQueries();
      closeModal();
    } catch (e) {
      console.error(t('error.submitResponse'), e);
    }
  }
};

watch(searchTerm, () => {
  currentPage.value = 1;
});

onMounted(fetchQueries);
</script>

<template>
  <div class="query-view">
    <div class="header">
      <h2 class="query-view_title">{{ $t('queryView.title') }}</h2>
      <p class="query-view_subtitle">
        {{ $t('queryView.subtitle') }}
      </p>
    </div>

    <div class="controls-container">
      <div class="search-bar-container">
        <i class="pi pi-search search-icon"></i>
        <input
            type="text"
            v-model="searchTerm"
            :placeholder="$t('queryView.searchPlaceholder')"
            class="search-input"
        />
      </div>

      <div class="query-view_filters">
        <button
            class="query-view_filter-button"
            :class="{ active: !showAnswered }"
            @click="setAnsweredFilter(false)"
        >
          <i class="pi pi-inbox"></i>
          <span>{{ $t('queryView.filterNotAnswered') }}</span>
        </button>
        <button
            class="query-view_filter-button"
            :class="{ active: showAnswered }"
            @click="setAnsweredFilter(true)"
        >
          <i class="pi pi-check-circle"></i>
          <span>{{ $t('queryView.filterAnswered') }}</span>
        </button>
      </div>
    </div>

    <div class="query-view_table-container">
      <table class="query-view_table">
        <thead>
        <tr>
          <th>{{ $t('queryView.tableHeader.user') }}</th>
          <th>{{ $t('queryView.tableHeader.experience') }}</th>
          <th>{{ $t('queryView.tableHeader.date') }}</th>
          <th>{{ $t('queryView.tableHeader.query') }}</th>
          <th class="text-center">{{ $t('queryView.tableHeader.action') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="paginatedQueries.length === 0">
          <td colspan="5" class="text-center py-4">{{ $t('queryView.noQueriesInCategory') }}</td>
        </tr>
        <tr v-for="q in paginatedQueries" :key="q.id">
          <td class="query-view_user-cell">

            <Avatar
                v-if="q.userAvatar"
                :image="q.userAvatar"
                shape="circle"
                size="large"
                class="avatar"
            />
            <Avatar
                v-else
                icon="pi pi-user"
                shape="circle"
                size="large"
                class="avatar"
            />
            <span>{{ q.userName }}</span>
          </td>
          <td>{{ q.experienceName }}</td>
          <td>{{ q.date }}</td>
          <td class="query-view_question">{{ q.question }}</td>
          <td class="text-center">
            <Button v-if="!q.isAnswered" :label="$t('queryView.buttonAnswer')" @click="openModal(q)" />
            <Button
                v-else
                :label="$t('queryView.buttonViewAnswer')"
                severity="secondary"
                outlined
                @click="openModal(q)"
            />
          </td>
        </tr>
        </tbody>
      </table>

      <div class="query-view_pagination">
        {{ paginationText }}
      </div>
    </div>

    <Dialog
        v-model:visible="showModal"
        modal
        :header="modalQuery && modalQuery.isAnswered ? $t('queryView.modalHeaderAnswered') : $t('queryView.modalHeaderAddAnswer')"
        :style="{ width: '35rem' }"
    >
      <p v-if="modalQuery && modalQuery.isAnswered" class="query-view_response-text">
        {{ modalQuery.answer }}
      </p>
      <div v-else class="flex flex-col gap-3">
        <p class="query-view_modal-hint">{{ $t('queryView.modalHint') }}</p>
        <Textarea v-model="modalResponse" rows="5" maxlength="200" autoResize />
      </div>
      <template #footer>
        <Button :label="$t('queryView.buttonCancel')" severity="secondary" @click="closeModal" />
        <Button
            v-if="modalQuery && !modalQuery.isAnswered"
            :label="$t('queryView.buttonSendAnswer')"
            @click="submitResponse"
        />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.query-view {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}
.query-view_title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
}
.query-view_subtitle {
  color: #64748b;
  margin-top: 0.25rem;
}
.controls-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.search-bar-container {
  position: relative;
  width: 100%;
  max-width: 700px;
}
.search-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  background-color: #D9F2EF;
  font-size: 1rem;
  color: #334155;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-input:focus {
  outline: none;
  border-color: #318C8B;
  box-shadow: 0 0 0 3px rgba(49, 140, 139, 0.2);
}
.query-view_filters {
  display: flex;
  gap: 0.75rem;
}
.query-view_filter-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 8px;
  background-color: #ffe4b5;
  color: #334155;
  border: 1px solid #ffe4b5;
  cursor: pointer;
  transition: all 0.2s;
}
.query-view_filter-button:hover {
  background-color: #f9d090;
}
.query-view_filter-button.active {
  background-color: #f9d090;
  color: black;
  border-color: #f9d090;
}
.query-view_table-container {
  margin-top: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}
.query-view_table {
  width: 100%;
  border-collapse: collapse;
}
.query-view_table th {
  background-color: #D9F2EF;
  padding: 1rem;
  text-align: left;
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
}
.query-view_table td {
  padding: 1.25rem 1rem;
  text-align: left;
  border-top: 1px solid #e2e8f0;
}
.query-view_user-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}
.avatar {
  flex-shrink: 0;
}
.query-view_question {
  max-width: 400px;
  white-space: normal;
  color: #475569;
}
.text-center {
  text-align: center;
}
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.query-view_pagination {
  padding: 1rem;
  text-align: right;
  font-size: 0.875rem;
  color: #64748b;
  border-top: 1px solid #e2e8f0;
}
.query-view_modal-hint {
  font-size: 0.875rem;
  color: #6b7280;
}
.query-view_response-text {
  background-color: #D9F2EF;
  padding: 1rem;
  border-radius: 6px;
}

.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.gap-3 {
  gap: 0.75rem;
}
</style>