<script setup>
import { ref, reactive } from 'vue'
import {ExperiencesApiService} from "@/Experience/Application/experiences-api.service.js"
import router from "@/router.js";


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

const addImageByUrl = () => {
  if (imageUrl.value.trim() !== "") {
    images.value.push({
      name: "Imagen externa",
      url: imageUrl.value.trim()
    })
    imageUrl.value = ""
  }
}
const form = reactive({

})

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


const SaveExperience = async () => {
  var experience ={
    title: title.value,
    description: description.value,
    location: location.value,
    duration: duration.value,
    price: price.value,
    frequencies: frequencies.value,
    schedules:schedules.value,
    images: images.value.map(img => img.url || img.objectUrl),

  }
  var response =  await experiencesApiService.createExperience(experience);

  if ( response.status === 201 ) {
    alert("experience created successfully.")
    await router.replace({ path: '/reload' })
    await router.replace({ path: '/manageExperience' })
  }

}

</script>

<template>
    <div class="fixed flex items-center justify-center ">
      <div class=" rounded-lg relative form-container">
        <div class="form-title">
          <h2>Add new experience</h2>
          <button @click="$emit('close')" class="button-close pi pi-times"></button>
        </div>
        <div class="separator mb-4"></div>
        <div class="form">
          <form @submit.prevent="submit" class="form-fields form1">
            <Toast />
            <input v-model="title" type="text" placeholder="Nombre" class="input" required />
            <textarea v-model="description" placeholder="Descripción" class=" input no-resize " rows="4" maxlength="200"></textarea>
            <input v-model="location" type="text" placeholder="Lugar" class="input " required />
            <input v-model="duration" type="number" min="1" step="1" placeholder="Duración en horas" class="input">
            <input v-model="price" type="number" min="0" step="0.10" placeholder="Precio" class="input">
            <pv-multi-select v-model="frequencies" :options="frecuencias" option-label="label" placeholder="Selecciona las frecuencias" class="w-full custom-multiselect" ></pv-multi-select>
            <pv-multi-select v-model="schedules" :options="horariosDisponibles" option-label="label" placeholder="Selecciona los horarios" class="custom-multiselect"  />

            <input v-model="imageUrl" type="text" placeholder="Pega la URL de la imagen (ej. https://i.imgur.com/abc.jpg)" class="input mt-2"/>
            <button type="button" @click="addImageByUrl" class="mt-2 bg-blue-600 text-white px-3 py-1 rounded">Agregar imagen por URL</button>
            <div class="mt-4 grid grid-cols-3 gap-2">
              <div v-for="(img, index) in images" :key="index" class="border p-1 rounded">
                <img :src="img.url || img.objectUrl" alt="Imagen" class="w-full h-32 object-cover rounded" width="40px" height="40px"/>
                <p class="text-xs mt-1 break-all">{{ img.name }}</p>
              </div>
            </div>
            <button @click="SaveExperience" type="submit" class="mt-4 bg-green-600 text-white px-4 py-2 rounded">Guardar</button>
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

</style>