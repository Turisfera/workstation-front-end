<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { AgenciesApiService } from '@/Agency/Application/agencies-api.service.js';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();
const agenciesApi = new AgenciesApiService();
const userName = ref('');
const userAvatar = ref('');
const langMenu = ref();
const profileMenu = ref();
const profileMenuItems = ref([]);
onMounted(() => {
  const isAgency = localStorage.getItem('isAgency') === 'true';
  if (isAgency) {
    loadAgencyData();
    profileMenuItems.value = [
      { label: 'Perfil de Agencia', icon: 'pi pi-building', command: () => router.push({ name: 'AgencyProfile' }) },
      { separator: true },
      { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => logout() }
    ];
  } else {
    loadTouristData();
    profileMenuItems.value = [
      { label: 'Mi Perfil', icon: 'pi pi-user', command: () => router.push({ name: 'UserProfile' }) },
      { label: 'Mis Favoritos', icon: 'pi pi-heart', command: () => router.push({ name: 'Favorites' }) },
      { separator: true },
      { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => logout() }
    ];
  }
});

async function loadAgencyData() {
  try {
    const response = await agenciesApi.getProfile("1");
    userName.value = response.data.name;
    userAvatar.value = response.data.avatarUrl;
  } catch (error) {
    console.error("Header: No se pudo cargar el perfil de la agencia.", error);
  }
}

function loadTouristData() {
  userName.value = localStorage.getItem('name') || 'Viajero';
  userAvatar.value = localStorage.getItem('avatar') || '';
}
const titleKeyMap = {
  AgencyHome: 'home', TouristHome: 'home', ExperienceList: 'experienceManager',
  Reservations: 'reservations', Queries: 'queries', AgencyProfile: 'agencyProfile',
  Favorites: 'favorites', Itineraries: 'itineraries', UserProfile: 'userProfile'
};
const pageTitle = computed(() => {
  const key = titleKeyMap[route.name] || 'home';
  return t(`sidevar.${key}`);
});
const langMenuItems = ref([
  { label: 'English', command: () => { locale.value = 'en' } },
  { label: 'Español', command: () => { locale.value = 'es' } }
]);
const toggleLangMenu = (event) => { langMenu.value.toggle(event); };
const toggleProfileMenu = (event) => { profileMenu.value.toggle(event); };

const logout = () => {
  localStorage.clear();
  router.push('/login');
};
</script>

<template>
  <div class="header-container">
    <h2 class="page-title">{{ pageTitle }}</h2>

    <div class="right-section">
      <Button icon="pi pi-globe" text rounded aria-label="Cambiar idioma" @click="toggleLangMenu" />
      <Menu ref="langMenu" :model="langMenuItems" :popup="true" />

      <div class="separator"></div>

      <div class="profile-section" @click="toggleProfileMenu">
        <span class="profile-name">{{ userName }}</span>
        <img
          :src="userAvatar"
          alt="Avatar viajero"
          style="width:48px; height:48px; border-radius:50%; object-fit:cover;"
        />
      </div>
      <Menu ref="profileMenu" :model="profileMenuItems" :popup="true" />
    </div>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  height: 80px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}
.page-title {
  color: #1e293b;
  font-weight: 600;
  font-size: 1.25rem;
}
.right-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
:deep(.p-button.p-button-text) {
  color: #475569;
}
.separator {
  width: 1px;
  height: 24px;
  background-color: #e2e8f0;
  margin: 0 0.5rem;
}
.profile-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s;
}
.profile-section:hover {
  background-color: #f8fafc;
}
.profile-name {
  font-weight: 600;
  color: #334155;
}
:deep(.p-avatar) {
  border: 2px solid #f1f5f9;
}
</style>