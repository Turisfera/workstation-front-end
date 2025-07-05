<script setup>
import {ref, reactive, onMounted} from 'vue'
import {ExperiencesApiService} from "@/Experience/Application/experiences-api.service.js"
import {CategoryApiService} from "@/Experience/Application/category-api.service.js";
import router from "@/router.js";
import {useRoute} from "vue-router";
import { useI18n } from 'vue-i18n';
import {useToast} from "primevue/usetoast";

const experiencesApiService = new ExperiencesApiService()
const categoryApiService = new CategoryApiService()
const { t } = useI18n();
const toast = useToast();

const title = ref("")
const description = ref("")
const location = ref("")
const duration = ref(null)
const price = ref(null)
const frequencies = ref("")
const schedules = ref([])
const images = ref([])
const imageUrl = ref("")
const category = ref("")
const categories = ref([])

const formInvalid = ref(false)
const routes = useRoute();
const id = ref(routes.params.id || '');

const includes = ref([]);
const newIncludeItem = ref("");


defineProps({
  existingArticle: {
    type: Object,
    default: () => ({
      title: "",
      description: "",
      location: "",
      duration: 0,
      price: 0.0,
      frequencies: "",
      schedules: [],
      images: [],
      includes: [],
      categoryId: null
    })
  }
});

onMounted(async () => {
  try {
    const categoryResponse = await categoryApiService.getCategory();
    if (categoryResponse && categoryResponse.data && Array.isArray(categoryResponse.data)) {
      categories.value = categoryResponse.data.map(cat => ({ id: cat.id, description: cat.name }));
    } else {
      console.warn("API de categorías no devolvió un array válido:", categoryResponse);
      toast.add({severity:'warn', summary: t('common.warning'), detail: t('create-experience-form.loadCategoriesError'), life: 3000});
    }


    if (id.value !== '') {
      const response = await experiencesApiService.getExperienceById(id.value);
      const experienceData = response.data;

      title.value = experienceData.title;
      description.value = experienceData.description;
      location.value = experienceData.location;
      duration.value = experienceData.duration;
      price.value = experienceData.price;

      frequencies.value = frecuencias.find(f => f.value === experienceData.frequencies) || "";
      if (!frequencies.value && experienceData.frequencies) {
        console.warn(`Frecuencia "${experienceData.frequencies}" del backend no encontrada en opciones locales.`)
      }


      schedules.value = (experienceData.schedules || []).map(s => ({
        label: s.time,
        value: s.time
      }));

      images.value = (experienceData.experienceImages || []).map(img => ({
        name: t('create-experience-form.existingImageName'),
        url: img.url
      }));

      includes.value = (experienceData.includes || []).map(inc => inc.description);


      category.value = experienceData.categoryId;
    }
  } catch (error) {
    console.error("Error loading data (categories or experience):", error);
    toast.add({severity:'error', summary: t('common.error'), detail: t('create-experience-form.loadDataError'), life: 3000});
  }
});

const addImageByUrl = () => {
  if (imageUrl.value.trim() !== "") {
    images.value.push({
      name: t('create-experience-form.externalImageName'),
      url: imageUrl.value.trim()
    })
    imageUrl.value = ""
  }
}

const addIncludeItem = () => {
  const trimmed = newIncludeItem.value.trim();
  if (trimmed !== "" && includes.value.length < 3) {
    includes.value.push(trimmed);
    newIncludeItem.value = "";
  }
};

const removeIncludeItem = (index) => {
  includes.value.splice(index, 1);
};

const frecuencias = [
  { label: t('create-experience-form.frequenciesOptions.weekdays'), value: 'weekdays' },
  { label: t('create-experience-form.frequenciesOptions.weekends'), value: 'weekends' },
  { label: t('create-experience-form.frequenciesOptions.everyDay'), value: 'daily' }
];

const horariosDisponibles = [
  { label: '08:00', value: '08:00' },
  { label: '09:00', value: '09:00' },
  { label: '10:00', value: '10:00' },
  { label: '11:00', value: '11:00' },
  { label: '12:00', value: '12:00' },
  { label: '13:00', value: '13:00' },
  { label: '14:00', value: '14:00' },
  { label: '15:00', value: '15:00' },
  { label: '16:00', value: '16:00' },
  { label: '17:00', value: '17:00' },
  { label: '18:00', value: '18:00' },
  { label: '19:00', value: '19:00' },
  { label: '20:00', value: '20:00' },
];

const close = async () => {
  await router.replace({ name: 'ExperienceList' });
}

const SaveExperience = async () => {

  if (!title.value || !description.value || !location.value || duration.value === null || duration.value <= 0 ||
      price.value === null || price.value < 0 || !frequencies.value || schedules.value.length === 0 ||
      images.value.length === 0 || !category.value || !includes.value.length) {
    formInvalid.value = true;
    toast.add({severity:'warn', summary: t('common.warning'), detail: t('create-experience-form.alert'), life: 3000});
    return;
  }
  formInvalid.value = false;

  const agencyUserId = localStorage.getItem('userId');
  if (!agencyUserId) {
    console.error("No agencyUserId found in localStorage. User must be an agency to create/edit experiences.");
    toast.add({severity:'error', summary: t('common.error'), detail: t('create-experience-form.agencyUserError'), life: 5000});
    return;
  }

  const experiencePayload = {
    title: title.value,
    description: description.value,
    location: location.value,
    duration: parseInt(duration.value),
    price: parseFloat(price.value),
    frequencies: frequencies.value.value,
    schedules: schedules.value.map(s => ({ time: s.value })),
    experienceImages: images.value.map(img => ({ url: img.url })),
    includes: includes.value.map(item => ({ description: item })),
    categoryId: parseInt(category.value),
    agencyUserId: agencyUserId
  };

  console.log("Payload enviado:", JSON.stringify(experiencePayload, null, 2));
  console.log("Tipo de agencyUserId:", typeof agencyUserId, "Valor:", agencyUserId);
  try {
    let response;
    if (id.value !== '') {
      experiencePayload.id = parseInt(id.value);
      response = await experiencesApiService.updateExperience(experiencePayload.id, experiencePayload);
      if (response.status === 200) {
        toast.add({severity:'success', summary: t('common.success'), detail: t('create-experience-form.experienceUpdateSuccess'), life: 3000});
        await router.push({ name: 'ExperienceList' });
      } else {
        throw new Error(t('create-experience-form.updateFailed'));
      }
    } else {
      response = await experiencesApiService.createExperience(experiencePayload);
      if (response.status === 201) {
        toast.add({severity:'success', summary: t('common.success'), detail: t('create-experience-form.experienceCreateSuccess'), life: 3000});
        await router.push({ name: 'ExperienceList' });
      } else {
        throw new Error(t('create-experience-form.createFailed'));
      }
    }
  } catch (error) {
    console.error("Error saving experience:", error);
    const errorMessage = error.response?.data?.message || error.message || t('common.unknownError');
    toast.add({severity:'error', summary: t('common.error'), detail: errorMessage, life: 5000});
  }
}
</script>

<template>
  <div class="fixed flex items-center justify-center ">
    <div class=" rounded-lg relative form-container">
      <div class="form-title">
        <h2>{{$t("create-experience-form.title")}}</h2>
        <button @click="close" class="button-close pi pi-times"></button>
      </div>
      <div class="separator mb-4"></div>
      <div class="form form-scroll">
        <form @submit.prevent="submit" class="form-fields form1">
          <Toast />

          <div class="field-group">
            <label for="title">{{$t('create-experience-form.name')}}</label>
            <input v-model="title" id="title" type="text" :placeholder="$t('create-experience-form.name')" class="input" required />
          </div>

          <div class="field-group">
            <label for="description">{{$t('create-experience-form.description')}}</label>
            <textarea v-model="description" id="description" :placeholder="$t('create-experience-form.description')" class="input no-resize" rows="4" maxlength="200"></textarea>
          </div>

          <div class="field-group">
            <label for="location">{{$t('create-experience-form.location')}}</label>
            <input v-model="location" id="location" type="text" :placeholder="$t('create-experience-form.location')" class="input" required />
          </div>

          <div class="field-group">
            <label for="duration">{{$t('create-experience-form.hour')}}</label>
            <input v-model="duration" id="duration" type="number" min="1" step="1" :placeholder="$t('create-experience-form.hour')" class="input" />
          </div>

          <div class="field-group">
            <label for="price">{{$t('create-experience-form.price')}}</label>
            <input v-model="price" id="price" type="number" min="0" step="0.10" :placeholder="$t('create-experience-form.price')" class="input" />
          </div>

          <div class="field-group">
            <label for="frequencies">{{$t('create-experience-form.frequencies')}}</label>
            <pv-input-select v-model="frequencies" :options="frecuencias" optionLabel="label" :placeholder="$t('create-experience-form.frequencies')" class="w-full custom-multiselect"></pv-input-select>
          </div>

          <div class="field-group">
            <label for="schedules">{{$t('create-experience-form.schedules')}}</label>
            <pv-multi-select v-model="schedules" :options="horariosDisponibles" option-label="label" :placeholder="$t('create-experience-form.schedules')" class="custom-multiselect" />
          </div>

          <div class="field-group">
            <label for="category">{{$t('create-experience-form.category')}}</label>
            <pv-input-select v-model="category" :options="categories" optionLabel="description" optionValue="id" :placeholder="$t('create-experience-form.category')" class="w-full custom-multiselect"></pv-input-select>
          </div>

          <div class="field-group includes-section">
            <label for="includes">{{$t('create-experience-form.include')}}</label>
            <div class="includes-input-wrapper">
              <input v-model="newIncludeItem" id="includes" type="text" class="input include-input" :placeholder="$t('create-experience-form.include')" />
              <button
                  type="button"
                  class="include-add-button"
                  @click="addIncludeItem"
                  :disabled="includes.length >= 3 || !newIncludeItem"
              >
                <i class="pi pi-plus mr-1"></i>
                {{ $t("create-experience-form.include-button") }}
              </button>
            </div>
            <div class="include-chip-wrapper">
              <div class="include-chip" v-for="(item, index) in includes" :key="index">
                {{ item }}
                <button type="button" class="include-chip-remove pi pi-times" @click="removeIncludeItem(index)"></button>
              </div>
            </div>
          </div>

          <div class="field-group">
            <label for="imageUrl">{{ $t('create-experience-form.imageUrlLabel') }}</label>
            <input v-model="imageUrl" id="imageUrl" type="text" :placeholder="$t('create-experience-form.img')" class="input mt-2" />
            <button type="button" @click="addImageByUrl" class="button-add-image">{{ $t("create-experience-form.img-button") }}</button>
          </div>

          <div class="field-group">
            <label>{{ $t('create-experience-form.addedImagesLabel') }}</label>
            <div class="mt-2 grid grid-cols-3 gap-2">
              <div v-for="(img, index) in images" :key="index" class="border p-1 rounded">
                <img :src="img.url || img.objectUrl" :alt="$t('create-experience-form.imageAltText')" class="w-full h-32 object-cover rounded" width="40px" height="40px" />
                <p class="text-xs mt-1 break-all">{{ img.name }}</p>
              </div>
            </div>
          </div>

          <p v-if="formInvalid" class="alert">{{ $t("create-experience-form.alert") }}</p>

          <button @click="SaveExperience" type="submit" class="button-add-experience">{{ $t("create-experience-form.save") }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fixed {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.form-container {
  background-color: #fff;
  width: 600px;
  max-height: 90vh;
  border-radius: 12px;
  padding: 24px 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
}

.form-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-title h2 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.button-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
}

.separator {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 16px;
}

.form-scroll {
  overflow-y: auto;
  max-height: 65vh;
  padding-right: 8px;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-group label {
  font-size: 14px;
  margin-bottom: 6px;
  color: #222;
}

.input,
textarea {
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
  color: #333;
  background-color: #fff;
}

.no-resize {
  resize: none !important;
}

.custom-multiselect {
  color: #333;
}

.custom-multiselect .pv-multi-select,
.custom-multiselect .pv-input-select {
  border: 1px solid #ccc;
  border-radius: 6px;
}

.custom-multiselect .pv-chip {
  background-color: #318C8B;
  color: white;
}

.custom-multiselect .pv-multi-select-panel {
  max-height: 200px;
  overflow-y: auto;
}

.includes-input-wrapper {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  align-items: center;
}

.include-input {
  flex: 1;
}

.include-add-button {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #318C8B;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.include-add-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.include-chip-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.include-chip {
  display: flex;
  align-items: center;
  background-color: #D9F2EF;
  color: #333;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 13px;
  position: relative;
}

.include-chip-remove {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 14px;
  margin-left: 6px;
  cursor: pointer;
}

.button-add-image {
  margin-top: 8px;
  padding: 8px 16px;
  background-color: #D9F2EF;
  color: #333;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.grid-cols-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.button-add-experience {
  align-self: center;
  padding: 10px 28px;
  background-color: #318C8B;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.button-add-experience:hover {
  background-color: #246d6c;
}

.alert {
  color: red;
  font-size: 14px;
  margin-top: 6px;
}
</style>