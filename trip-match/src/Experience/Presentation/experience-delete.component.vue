<script setup>
import { ExperiencesApiService } from "@/Experience/Application/experiences-api.service.js";
import { ref } from "vue";
import router from "@/router.js";
import { useRoute } from "vue-router";

const route = useRoute();
const experienceId = route.params.id;

const experiencesApiService = new ExperiencesApiService();

const deleteExperience = async () => {
  const response = await experiencesApiService.deleteExperience(experienceId);
  if (response.status === 200 || response.status === 204) {
    alert("Experiencia eliminada con éxito.");
    await router.replace({ name: 'ExperienceList' });
  } else {
    alert("No se pudo eliminar la experiencia.");
  }
};

const close = async () => {
  await router.replace({ name: 'ExperienceList' });
};
</script>

<template>
  <div class="fixed flex items-center justify-center ">
    <div class=" rounded-lg relative form-container">
      <div class="form-title">
        <h2>Eliminar Experiencia</h2>
        <button @click="close" class="button-close pi pi-times"></button>
      </div>
      <div class="separator mb-4"></div>
      <div>
        <p class="font-semibold">¿Estás seguro de que deseas cancelar esta experiencia turística?</p>
        <p>Esta acción no se puede deshacer.</p>
      </div>
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
  background-color: rgba(0, 0, 0, 0.6);
}

.form-container {
  width: 400px;
  background-color: white;
  padding: 30px 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  gap: unset;
}

.button-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #334155;
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
