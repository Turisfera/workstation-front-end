<script setup>
import { reactive, watch } from 'vue';
import InputText from 'primevue/inputtext';

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['save', 'cancel']);

const form = reactive({});

watch(() => props.user, (newUser) => {
  Object.assign(form, newUser);
}, { immediate: true, deep: true });

const onSave = () => {
  emit('save', form);
};
</script>

<template>
  <div class="user-form">
    <div class="field">
      <label for="name">Nombre Completo</label>
      <InputText id="name" v-model="form.name" class="w-full" />
    </div>
    <div class="field">
      <label for="email">Correo Electrónico (no se puede cambiar)</label>
      <InputText id="email" v-model="form.email" disabled class="w-full" />
    </div>
    <div class="field">
      <label for="avatar">URL de la Foto de Perfil</label>
      <InputText id="avatar" v-model="form.avatarUrl" class="w-full" />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="field">
        <label for="country">País</label>
        <InputText id="country" v-model="form.country" class="w-full" />
      </div>
      <div class="field">
        <label for="phone">Teléfono</label>
        <InputText id="phone" v-model="form.phone" class="w-full" />
      </div>
    </div>

    <div class="form-button-group">
      <button class="form-button cancel" @click="$emit('cancel')">Cancelar</button>
      <button class="form-button save" @click="onSave">Guardar Cambios</button>
    </div>
  </div>
</template>

<style scoped>
.user-form { padding: 1rem; }
.field { margin-bottom: 1.25rem; }
.field label { display: block; margin-bottom: 0.5rem; font-weight: 600; }
.grid { display: grid; }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.gap-4 { gap: 1rem; }
.w-full { width: 100%; }
.form-button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
}
.form-button { padding: 0.75rem 1.5rem; font-size: 1rem; border: none; border-radius: 8px; cursor: pointer; color: white; font-weight: 600; }
.form-button.save { background-color: #318C8B; }
.form-button.cancel { background-color: #64748b; }
</style>