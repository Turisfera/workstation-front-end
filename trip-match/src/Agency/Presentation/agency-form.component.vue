<template>
  <div class="agency-form">
    <!-- Nombre -->
    <div class="field">
      <label for="name">{{ t('createAgency.name') }}</label>
      <InputText
          id="name"
          v-model="form.name"
          class="input-text full-width"
      />
    </div>

    <!-- Descripción -->
    <div class="field">
      <label for="description">{{ t('createAgency.description') }}</label>
      <textarea
          id="description"
          v-model="form.description"
          class="input-textarea full-width"
          rows="4"
      ></textarea>
    </div>

    <!-- Avatar URL -->
    <div class="field">
      <label for="avatar">{{ t('createAgency.img') }}</label>
      <InputText
          id="avatar"
          v-model="form.avatarUrl"
          class="input-text full-width"
          placeholder="https://..."
      />
    </div>
    <!-- Teléfono -->
    <div class="field">
      <label for="phone">{{ t('createAgency.phone') }}</label>
      <InputText
          id="phone"
          v-model="form.contact.phone"
          class="input-text full-width"
          placeholder="+51 987 654 321"
      />
    </div>

    <div class="field">
      <label for="email">{{ t('createAgency.email') }}</label>
      <InputText
          id="email"
          v-model="form.contact.email"
          class="input-text full-width"
          placeholder="contacto@andesexplorer.pe"
      />
    </div>

    <!-- Redes sociales -->
    <div class="field">
      <label for="facebook">{{ t('createAgency.facebook') }}</label>
      <InputText
          id="facebook"
          v-model="form.socialLinks.facebook"
          class="input-text full-width"
      />
    </div>
    <div class="field">
      <label for="instagram">{{ t('createAgency.instagram') }}</label>
      <InputText
          id="instagram"
          v-model="form.socialLinks.instagram"
          class="input-text full-width"
      />
    </div>
    <div class="field">
      <label for="whatsapp">{{ t('createAgency.whatsapp') }}</label>
      <InputText
          id="whatsapp"
          v-model="form.socialLinks.whatsapp"
          class="input-text full-width"
          placeholder="https://wa.me/..."
      />
    </div>

    <!-- Botones -->
    <div class="actions">
      <Button
          label="Cancelar"
          class="p-button-text"
          @click="$emit('cancel')"
      />
      <Button
          label="Guardar"
          severity="success"
          @click="onSave"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import InputText  from 'primevue/inputtext'
import Button     from 'primevue/button'
import { AgencyAssembler } from '@/Agency/Application/agency.assembler.js'

const props = defineProps({ agency: Object })
const emit  = defineEmits(['cancel','saved'])
const { t } = useI18n()
const form = reactive(AgencyAssembler.toRequestPayload(props.agency))

function onSave() {
  emit('saved', { ...form })
}
</script>

<style scoped>
.agency-form {
  background: #fff;
  padding: 1rem;
}

.field label {
  display: block;
  margin-bottom: .25rem;
  color: #000;
  font-weight: 600;
}

.input-text,
.input-textarea {
  width: 100%;
  padding: .5rem;
  border: 1px solid #000;
  border-radius: 4px;
  background: #fff;
  color: #000;
  box-sizing: border-box;
}

.input-textarea {
  min-height: 120px;
  resize: vertical;
}
.full-width { width: 100%; }

.field { margin-bottom: 1rem; }

.actions {
  display: flex;
  justify-content: flex-end;
  gap: .5rem;
}
</style>
