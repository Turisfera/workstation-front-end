<script setup>
import { ref, onMounted } from 'vue'
import { ExperiencesApiService } from '@/Experience/Application/experiences-api.service.js'
import { CategoryApiService }    from '@/Experience/Application/category-api.service.js'
import { useRoute, useRouter }   from 'vue-router'
import { useI18n }               from 'vue-i18n'
import { useToast }              from 'primevue/usetoast'
const experiencesApiService = new ExperiencesApiService()
const categoryApiService    = new CategoryApiService()
const route                 = useRoute()
const router                = useRouter()
const { t }                 = useI18n()
const toast                 = useToast()
const id = ref(route.params.id || '')

const frecuencias = [
  { label: t('create-experience-form.frequenciesOptions.weekdays'), value: 'weekdays' },
  { label: t('create-experience-form.frequenciesOptions.weekends'), value: 'weekends' },
  { label: t('create-experience-form.frequenciesOptions.everyDay'), value: 'daily' }
]

const title       = ref('')
const description = ref('')
const location    = ref('')
const duration    = ref(null)
const price       = ref(null)
const frequencies = ref('')
const schedules   = ref([])
const images      = ref([])
const imageUrl    = ref('')
const category    = ref('')
const categories  = ref([])
const includes    = ref([])
const newInclude  = ref('')
const formInvalid = ref(false)

const horariosDisponibles = Array.from({ length: 13 }, (_, i) => {
  const hour = 8 + i
  const label = hour.toString().padStart(2, '0') + ':00'
  return { label, value: label }
})
onMounted(async () => {
  try {
    const catRes = await categoryApiService.getCategory()
    if (Array.isArray(catRes.data)) {
      categories.value = catRes.data.map(c => ({ id: c.id, description: c.name }))
    } else {
      toast.add({ severity: 'warn', summary: t('common.warning'), detail: t('create-experience-form.loadCategoriesError'), life: 3000 })
    }

    if (id.value) {
      const { data } = await experiencesApiService.getExperienceById(id.value)
      title.value       = data.title
      description.value = data.description
      location.value    = data.location
      duration.value    = data.duration
      price.value       = data.price
      const found = frecuencias.find(f => f.value === data.frequencies)
      frequencies.value = found || ''
      if (!found && data.frequencies) console.warn(`Frecuencia desconocida: ${data.frequencies}`)

      schedules.value = (data.schedules || []).map(s => ({ label: s.time, value: s.time }))
      images.value    = (data.experienceImages || []).map(img => ({
        name: t('create-experience-form.existingImageName'),
        url: img.url
      }))
      includes.value = (data.includes || []).map(i => i.description)
      category.value = data.categoryId
    }
  } catch (e) {
    console.error(e)
    toast.add({ severity: 'error', summary: t('common.error'), detail: t('create-experience-form.loadDataError'), life: 3000 })
  }
})
function addImageByUrl() {
  if (imageUrl.value.trim()) {
    images.value.push({ name: t('create-experience-form.externalImageName'), url: imageUrl.value.trim() })
    imageUrl.value = ''
  }
}
function addInclude() {
  const txt = newInclude.value.trim()
  if (txt && includes.value.length < 3) {
    includes.value.push(txt)
    newInclude.value = ''
  }
}
function removeInclude(i) {
  includes.value.splice(i, 1)
}

async function close() {
  await router.replace({ name: 'ExperienceList' })
}
async function SaveExperience() {
  if (
      !title.value ||
      !description.value ||
      !location.value ||
      !duration.value ||
      duration.value <= 0 ||
      price.value == null ||
      price.value < 0 ||
      !frequencies.value ||
      schedules.value.length === 0 ||
      images.value.length === 0 ||
      !category.value ||
      includes.value.length === 0
  ) {
    formInvalid.value = true
    toast.add({ severity: 'warn', summary: t('common.warning'), detail: t('create-experience-form.alert'), life: 3000 })
    return
  }
  formInvalid.value = false

  const agencyUserId = localStorage.getItem('userId')
  if (!agencyUserId) {
    toast.add({ severity: 'error', summary: t('common.error'), detail: t('create-experience-form.agencyUserError'), life: 5000 })
    return
  }

  const payload = {
    title: title.value,
    description: description.value,
    location: location.value,
    duration: parseInt(duration.value),
    price: parseFloat(price.value),
    frequencies: frequencies.value.value,
    schedules: schedules.value.map(s => ({ time: s.value })),
    experienceImages: images.value.map(i => ({ url: i.url })),
    includes: includes.value.map(i => ({ description: i })),
    categoryId: parseInt(category.value),
    agencyUserId
  }
  if (id.value) payload.id = parseInt(id.value)

  try {
    const res = id.value
        ? await experiencesApiService.updateExperience(payload.id, payload)
        : await experiencesApiService.createExperience(payload)

    const okStatus = id.value ? 200 : 201
    if (res.status === okStatus) {
      toast.add({
        severity: 'success',
        summary: t('common.success'),
        detail: id.value
            ? t('create-experience-form.experienceUpdateSuccess')
            : t('create-experience-form.experienceCreateSuccess'),
        life: 3000
      })
      await router.push({ name: 'ExperienceList' })
    } else {
      throw new Error('Unexpected status')
    }
  } catch (err) {
    console.error(err)
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: err.response?.data?.message || err.message || t('common.unknownError'),
      life: 5000
    })
  }
}
</script>

<template>
  <div class="fixed flex items-center justify-center">
    <div class="rounded-lg relative form-container">
      <div class="form-title">
        <h2>{{ $t('create-experience-form.title') }}</h2>
        <button @click="close" class="button-close pi pi-times"></button>
      </div>
      <div class="separator mb-4"></div>
      <div class="form form-scroll">
        <form @submit.prevent="SaveExperience" class="form-fields form1">
          <Toast />
          <div class="field-group">
            <label for="title">{{ $t('create-experience-form.name') }}</label>
            <input
                id="title"
                v-model="title"
                type="text"
                :placeholder="$t('create-experience-form.name')"
                class="input"
                required
            />
          </div>

          <div class="field-group">
            <label for="description">{{ $t('create-experience-form.description') }}</label>
            <textarea
                id="description"
                v-model="description"
                :placeholder="$t('create-experience-form.description')"
                class="input no-resize"
                rows="4"
                maxlength="800"
            ></textarea>
          </div>

          <div class="field-group">
            <label for="location">{{ $t('create-experience-form.location') }}</label>
            <input
                id="location"
                v-model="location"
                type="text"
                :placeholder="$t('create-experience-form.location')"
                class="input"
                required
            />
          </div>

          <div class="field-group">
            <label for="duration">{{ $t('create-experience-form.hour') }}</label>
            <input
                id="duration"
                v-model="duration"
                type="number"
                min="1"
                step="1"
                :placeholder="$t('create-experience-form.hour')"
                class="input"
            />
          </div>

          <div class="field-group">
            <label for="price">{{ $t('create-experience-form.price') }}</label>
            <input
                id="price"
                v-model="price"
                type="number"
                min="0"
                step="0.1"
                :placeholder="$t('create-experience-form.price')"
                class="input"
            />
          </div>
          <div class="field-group">
            <label for="frequencies">{{ $t('create-experience-form.frequencies') }}</label>
            <pv-input-select
                v-model="frequencies"
                :options="frecuencias"
                option-label="label"
                :placeholder="$t('create-experience-form.frequencies')"
                class="w-full custom-multiselect"
            />
          </div>
          <div class="field-group">
            <label for="schedules">{{ $t('create-experience-form.schedules') }}</label>
            <pv-multi-select
                v-model="schedules"
                :options="horariosDisponibles"
                option-label="label"
                :placeholder="$t('create-experience-form.schedules')"
                class="custom-multiselect"
            />
          </div>
          <div class="field-group">
            <label for="category">{{ $t('create-experience-form.category') }}</label>
            <pv-input-select
                v-model="category"
                :options="categories"
                option-label="description"
                option-value="id"
                :placeholder="$t('create-experience-form.category')"
                class="w-full custom-multiselect"
            />
          </div>
          <div class="field-group includes-section">
            <label for="includes">{{ $t('create-experience-form.include') }}</label>
            <div class="includes-input-wrapper">
              <input
                  id="includes"
                  v-model="newInclude"
                  type="text"
                  class="input include-input"
                  :placeholder="$t('create-experience-form.include')"
              />
              <button
                  type="button"
                  class="include-add-button"
                  @click="addInclude"
                  :disabled="includes.length >= 3 || !newInclude"
              >
                <i class="pi pi-plus mr-1"></i>
                {{ $t('create-experience-form.include-button') }}
              </button>
            </div>
            <div class="include-chip-wrapper">
              <div
                  class="include-chip"
                  v-for="(item, idx) in includes"
                  :key="idx"
              >
                {{ item }}
                <button
                    type="button"
                    class="include-chip-remove pi pi-times"
                    @click="removeInclude(idx)"
                ></button>
              </div>
            </div>
          </div>
          <div class="field-group">
            <label for="imageUrl">{{ $t('create-experience-form.imageUrlLabel') }}</label>
            <input
                id="imageUrl"
                v-model="imageUrl"
                type="text"
                :placeholder="$t('create-experience-form.img')"
                class="input mt-2"
            />
            <button
                type="button"
                @click="addImageByUrl"
                class="button-add-image"
            >
              {{ $t('create-experience-form.img-button') }}
            </button>
          </div>

          <div class="field-group">
            <label>{{ $t('create-experience-form.addedImagesLabel') }}</label>
            <div class="mt-2 grid grid-cols-3 gap-2">
              <div
                  v-for="(img, i) in images"
                  :key="i"
                  class="border p-1 rounded"
              >
                <img
                    :src="img.url"
                    :alt="$t('create-experience-form.imageAltText')"
                    class="w-full h-32 object-cover rounded"
                />
                <p class="text-xs mt-1 break-all">{{ img.name }}</p>
              </div>
            </div>
          </div>
          <p v-if="formInvalid" class="alert">
            {{ $t('create-experience-form.alert') }}
          </p>
          <button type="submit" class="button-add-experience">
            {{ $t('create-experience-form.save') }}
          </button>
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