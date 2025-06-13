<script setup>
import {ref, reactive, onMounted} from 'vue'
import {ExperiencesApiService} from "@/Experience/Application/experiences-api.service.js"
import {CategoryApiService} from "@/Experience/Application/category-api.service.js";
import router from "@/router.js";
import {useRoute} from "vue-router";

const experiencesApiService = new ExperiencesApiService()
const categoryApiService = new CategoryApiService()

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
const id = ref(routes.params.id || '')

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
      images: []
    })
  }
});

onMounted(async () => {
  const categoryResponse = await categoryApiService.getCategory();
  categories.value = categoryResponse.data;

  if (id.value !== '') {
    const response = await experiencesApiService.getById(id.value);

    title.value = response.data.title;
    description.value = response.data.description;
    location.value = response.data.location;
    duration.value = response.data.duration;
    price.value = response.data.price;
    frequencies.value = response.data.frequencies;
    schedules.value = (response.data.schedules || []).map(s => ({
      label: s,
      value: s
    }));

    images.value = response.data.images.map(url => ({
      name: "Imagen existente",
      url
    }));
    includes.value = response.data.includes || [];
    category.value = response.data.categoryId;
  }
})

const addImageByUrl = () => {
  if (imageUrl.value.trim() !== "") {
    images.value.push({
      name: "Imagen externa",
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
  { label: 'Lunes a Viernes', value: 'Lunes a Viernes' },
  { label: 'Fines de Semana', value: 'Fines de Semana' },
  { label: 'Todos los días', value: 'Todos los días' }
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
]

const close = async () => {
  await router.replace({ name: 'ExperienceList' });
}

const SaveExperience = async () => {
  if (!title.value || !description.value || !location.value || !duration.value || !price.value || !frequencies.value || schedules.value.length === 0 || images.value.length === 0 || !category.value) {
    formInvalid.value = true
    return
  }
  formInvalid.value = false

  const experience = {
    title: title.value,
    description: description.value,
    location: location.value,
    duration: duration.value,
    price: price.value,
    frequencies: frequencies.value,
    schedules: schedules.value.map(s => s.value || s),
    images: images.value.map(img => img.url || img.objectUrl),
    includes: includes.value,
    categoryId: category.value
  }

  if (id.value !== '') {
    const { status } = await experiencesApiService.updateExperience(id.value, experience);
    if (status === 200) {
      alert("Article updated successfully.");
      router.push({ name: 'ExperienceList' });
    }
  } else {
    const { status } = await experiencesApiService.createExperience(experience);
    if (status === 201) {
      alert("Experience created successfully.")
      router.push({ name: 'ExperienceList' });
    }
  }
}
</script>

<template>
  <div class="fixed flex items-center justify-center">
    <div class="rounded-lg relative form-container">
      <div class="form-title">
        <h2>{{$t("create-experience-form.title")}}</h2>
        <button @click="close" class="button-close pi pi-times"></button>
      </div>
      <div class="separator mb-4"></div>
      <div class="form form-scroll">
        <div class="form-fields">
          <Toast />

          <label>{{$t('create-experience-form.name')}}</label>
          <pv-input-text v-model="title" required />

          <label>{{$t('create-experience-form.description')}}</label>
          <textarea v-model="description" rows="4" maxlength="200" class="p-inputtextarea p-inputtext p-component p-filled"></textarea>

          <label>{{$t('create-experience-form.location')}}</label>
          <pv-input-text v-model="location" required />

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label>{{$t('create-experience-form.hour')}}</label>
              <pv-input-number v-model="duration" :min="1" :step="1" class="w-full" />
            </div>
            <div>
              <label>{{$t('create-experience-form.price')}}</label>
              <pv-input-number v-model="price" mode="currency" currency="USD" :min="0" :step="0.10" class="w-full" />
            </div>
          </div>

          <label>{{$t('create-experience-form.frequencies')}}</label>
          <pv-input-select v-model="frequencies" :options="frecuencias" optionLabel="label" class="w-full" />

          <label>{{$t('create-experience-form.schedules')}}</label>
          <pv-multi-select v-model="schedules" :options="horariosDisponibles" option-label="label" class="w-full" />

          <label>{{$t('create-experience-form.category')}}</label>
          <pv-input-select v-model="category" :options="categories" optionLabel="description" optionValue="id" class="w-full" />

          <div class="includes-section">
            <label>{{$t('create-experience-form.include')}}</label>
            <div class="flex gap-2 mb-2">
              <pv-input-text v-model="newIncludeItem" class="flex-1" />
              <button type="button" class="btn-include-item" @click="addIncludeItem" :disabled="includes.length >= 3 || !newIncludeItem">
                {{ $t("create-experience-form.include-button") }}
              </button>
            </div>
            <ul class="list-disc pl-5" v-if="includes.length > 0">
              <li v-for="(item, index) in includes" :key="index" class="include-item">
                {{ item }}
                <button type="button" class="remove-include-btn" @click="removeIncludeItem(index)">✖</button>
              </li>
            </ul>
          </div>

          <div class="images-section">
            <label>{{$t('create-experience-form.img')}}</label>
            <div class="flex gap-2 mb-2">
              <pv-input-text v-model="imageUrl" class="flex-1" />
              <button type="button" @click="addImageByUrl" class="btn-add-image">
                {{ $t("create-experience-form.img-button") }}
              </button>
            </div>

            <div class="grid grid-cols-3 gap-2 mt-4" v-if="images.length > 0">
              <div v-for="(img, index) in images" :key="index" class="image-preview">
                <img :src="img.url || img.objectUrl" alt="Imagen" class="preview-img" />
                <p class="image-name">{{ img.name }}</p>
              </div>
            </div>
          </div>

          <p v-if="formInvalid" class="alert">{{ $t("create-experience-form.alert") }}</p>

          <div class="form-button-group">
            <button @click="close" class="form-button cancel">Cancelar</button>
            <button @click="SaveExperience" class="form-button save">{{ $t("create-experience-form.save") }}</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  width: 600px;
  background: white;
  padding: 30px 40px;
  margin: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 90vh;
}

.form-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-title h2 {
  color: black;
  margin: 0;
}

.button-close {
  width: 30px;
  height: 30px;
  color: black;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
}

.form-scroll {
  overflow-y: auto;
  max-height: 70vh;
  padding-right: 15px;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-fields label {
  font-weight: 600;
  margin-bottom: -0.25rem;
  color: black;
}

.separator {
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
}

.form-button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.form-button {
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  color: white;
}

.form-button.save {
  background-color: #318C8B;
}

.form-button.cancel {
  background-color: #D9534F;
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}

.w-full {
  width: 100%;
}

.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}

.pl-5 {
  padding-left: 1.25rem;
}

.includes-section {
  margin-bottom: 1rem;
}

.include-item {
  color: black;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remove-include-btn {
  color: #dc2626;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 12px;
}

.btn-include-item,
.btn-add-image {
  padding: 8px 16px;
  background-color: #D9F2EF;
  color: black;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-include-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.images-section {
  margin-bottom: 1rem;
}

.image-preview {
  border: 1px solid #e5e7eb;
  padding: 0.25rem;
  border-radius: 6px;
  text-align: center;
}

.preview-img {
  width: 100%;
  height: 128px;
  object-fit: cover;
  border-radius: 4px;
}

.image-name {
  font-size: 12px;
  margin-top: 0.25rem;
  color: #666;
  word-break: break-all;
}

.alert {
  font-size: 14px;
  color: #dc2626;
  background-color: #fee2e2;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #fecaca;
}

.p-inputtextarea {
  resize: none !important;
  width: 100%;
  min-height: 100px;
}

.list-disc {
  list-style-type: disc;
}
</style>