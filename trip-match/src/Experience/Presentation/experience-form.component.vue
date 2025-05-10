<script setup>
import {ref, reactive, onMounted} from 'vue'
import {ExperiencesApiService} from "@/Experience/Application/experiences-api.service.js"
import router from "@/router.js";
import {useRoute} from "vue-router";

const experiencesApiService= new ExperiencesApiService()
const title = ref("")
const description = ref("")
const location = ref("")
const duration = ref(null)
const price = ref(null)
const frequencies = ref([])
const schedules = ref([])
const images = ref([])
const imageUrl = ref("")

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
      frequencies: [],
      schedules: [],
      images: []
    })
  }
});

onMounted(async () => {
  if (id.value !== '') {
    const response = await experiencesApiService.getById(id.value);
    title.value = response.data.title;
    description.value = response.data.description;
    location.value = response.data.location;
    duration.value = response.data.duration;
    price.value = response.data.price;
    frequencies.value = response.data.frequencies;
    schedules.value = response.data.schedules;
    images.value = response.data.images.map(url => ({
      name: "Imagen existente",
      url
    }));
    includes.value = response.data.includes || [];
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
  await router.replace({ path: '/manageExperience' })
}

const SaveExperience = async () => {
  if(!title.value|| !description.value || !location.value || !duration.value || !price.value || frequencies.value.length===0 || schedules.value.length===0 || images.value.length===0){
    formInvalid.value = true
    return
  }
  formInvalid.value = false

  const experience ={
    title: title.value,
    description: description.value,
    location: location.value,
    duration: duration.value,
    price: price.value,
    frequencies: frequencies.value.map(f => f.value || f),
    schedules: schedules.value.map(s => s.value || s),
    images: images.value.map(img => img.url || img.objectUrl),
    includes: includes.value

  }

  if(id.value!==''){
    const {status} =  await experiencesApiService.updateExperience(id.value, experience);
    if(status === 200){
      alert("Article udpated successfully.");
      router.push({ path: '/manageExperience' })
    }
  }else{
    const {status} =  await experiencesApiService.createExperience(experience);
    if ( status === 201 ) {
      alert("experience created successfully.")
      router.push({ path: '/manageExperience' })
    }
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
        <div class="form">
          <form @submit.prevent="submit" class="form-fields form1">
            <Toast />
            <input v-model="title" type="text" :placeholder="$t('create-experience-form.name')" class="input" required />
            <textarea v-model="description" :placeholder="$t('create-experience-form.description')" class=" input no-resize " rows="4" maxlength="200"></textarea>
            <input v-model="location" type="text" :placeholder="$t('create-experience-form.location')" class="input " required />
            <input v-model="duration" type="number" min="1" step="1" :placeholder="$t('create-experience-form.hour')" class="input">
            <input v-model="price" type="number" min="0" step="0.10" :placeholder="$t('create-experience-form.price')" class="input">
            <pv-multi-select v-model="frequencies" :options="frecuencias" option-label="label" :placeholder="$t('create-experience-form.frequencies')" class="w-full custom-multiselect" ></pv-multi-select>
            <pv-multi-select v-model="schedules" :options="horariosDisponibles" option-label="label" :placeholder="$t('create-experience-form.schedules')" class="custom-multiselect"  />

            <div class="includes-section">
              <div class="flex gap-2 mb-2">
                <input v-model="newIncludeItem" type="text" class="input" :placeholder="$t('create-experience-form.include')" />
                <button type="button" class="btn-include-item" @click="addIncludeItem" :disabled="includes.length >= 3 || !newIncludeItem">{{ $t("create-experience-form.include-button") }}</button>
              </div>
              <ul class="list-disc pl-5">
                <li v-for="(item, index) in includes" :key="index">{{ item }}
                  <button type="button" class="text-red-500 ml-2" @click="removeIncludeItem(index)">✖</button>
                </li>
              </ul>
            </div>

            <input v-model="imageUrl" type="text" :placeholder="$t('create-experience-form.img')" class="input mt-2"/>
            <button type="button" @click="addImageByUrl" class="button-add-image">{{ $t("create-experience-form.img-button") }}</button>

            <div class="mt-4 grid grid-cols-3 gap-2">
              <div v-for="(img, index) in images" :key="index" class="border p-1 rounded">
                <img :src="img.url || img.objectUrl" alt="Imagen" class="w-full h-32 object-cover rounded" width="40px" height="40px"/>
                <p class="text-xs mt-1 break-all">{{ img.name }}</p>
              </div>
            </div>

            <p v-if="formInvalid" class="alert">{{ $t("create-experience-form.alert") }}</p>
            <button  @click="SaveExperience" type="submit" class="button-add-experience">{{ $t("create-experience-form.save") }}</button>
          </form>
        </div>
      </div>
    </div>
</template>

<style scoped>
.custom-multiselect {
  color: black;
}

.custom-multiselect .pv-multi-select {
  border: 1px solid #ccc;
  border-radius: 6px;
}

.custom-multiselect .pv-multi-select-label {
  color: black;
}

.custom-multiselect .pv-multi-select-item {
  color: black;
}

.custom-multiselect .pv-chip {
  background-color: #4CAF50;
  color: white;
}

.custom-multiselect .pv-multi-select-panel {
  max-height: 200px;
  overflow-y: auto;
}

.custom-multiselect .pv-multi-select-item:hover {
  background-color: #f1f1f1;
}

.input {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 6px;
  width: 100%;
  color: black;
}
h2{
  color: black;
}

.button-add-image {
  color: black;
  border: 1px solid #ccc;
  background-color: #D9F2EF;
  padding: 4px 16px;
  width: 250px;
  align-items: flex-start;
  border-radius: 6px;
  cursor: pointer;
}

.button-add-experience {
  margin: 0 auto;
  padding: 10px 30px;
  background-color: #318C8B;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.separator {
  width: 100%;
  height: 1px;
  background-color: #726E6E;
}

.form-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
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
  background-color: rgba(0, 0, 0, 0.5);
}

.form-container {
  width: 600px;
  padding: 30px 40px;
  margin: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.button-close {
  width: 30px;
  color: black;
  border: none;
  cursor: pointer;
}

.no-resize {
  resize: none !important;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.alert {
  font-size: 14px;
  color: red;
}

.includes-section {
  margin-bottom: 16px;
}
.includes-section input {
  flex: 1;
}
.btn-include-item {
  color: black;
  cursor: pointer;
  background-color: #D9F2EF;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.list-disc li{
  color: black;
  font-size: 14px;
}

</style>