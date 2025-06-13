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
  <div class="fixed flex items-center justify-center">
    <div class="form-container">
      <div class="form-title">
        <h2>Eliminar Experiencia</h2>
        <button @click="close" class="button-close pi pi-times"></button>
      </div>
      <div class="separator mb-4"></div>
      <p class="font-semibold">
        ¿Estás seguro de que deseas cancelar esta experiencia turística?
      </p>
      <p>Esta acción no se puede deshacer.</p>
      <div class="form-button-group">
        <button @click="close" class="form-button cancel">Cancelar</button>
        <button @click="deleteExperience" class="form-button save">Borrar</button>
      </div>
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
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-title h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #0f172a;
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
  background-color: #e5e7eb;
}

.font-semibold {
  font-weight: 600;
}

.form-button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.form-button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
}

.form-button.save {
  background-color: #318C8B;
}

.form-button.cancel {
  background-color: #D9534F;
}
</style>
