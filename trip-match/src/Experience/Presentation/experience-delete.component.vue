<script setup>
import {ExperiencesApiService} from "@/Experience/Application/experiences-api.service.js"
import {ref} from "vue";
import router from "@/router.js";
import { useRoute } from "vue-router";

const route = useRoute();
const experienceId = route.params.id;

const experiencesApiService = new ExperiencesApiService();

const deleteExperience = async () => {
  const response = await experiencesApiService.deleteExperience(experienceId);
  if (response.status === 200 || response.status === 204) {
    alert("Experiencia eliminada con éxito.");
    await router.replace({ path: '/manageExperience' })
  } else {
    alert("No se pudo eliminar la experiencia.");
  }
};

const close = async () => {
  await router.replace({ path: '/manageExperience' })
}

</script>

<template>
  <div class="fixed flex items-center justify-center ">
    <div class=" rounded-lg relative form-container">
      <div class="form-title">
        <h2>Eliminar Experiencia</h2>
        <button @click="close" class="button-close pi pi-times"></button>
      </div>
      <div class="separator mb-4"></div>
      <p class="font-semibold">¿Estás seguro de que deseas cancelar esta experiencia turística? </p>
      <p class=""> Esta acción no se puede deshacer.</p>
      <button @click="deleteExperience" class="button-delete-experience">{{ "Borrar" }}</button>
    </div>
  </div>
</template>

<style scoped>
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
  width:400px;
  padding: 30px 40px;
  margin: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  color: black;
  font-size: 16px;
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
  font-size: 12px;
}

.button-close {
  width: 30px;
  color: black;
  border: none;
  cursor: pointer;
}

.button-delete-experience {

  margin: 0 auto;
  padding: 10px 30px;
  background-color: #318C8B;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}


</style>