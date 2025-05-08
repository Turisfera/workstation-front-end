<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]" aria-label="Main Navigation">
    <div class="logoCompany">
      <img src="@/assets/img/logo-TripMatch.png" alt="Logo" class="logo-img" width="40px" height="40px" />
      <h1>{{ $t('sidevar.logo')}}</h1>
    </div>
    <nav v-if="!isCollapsed" class="content-nav">
      <ul>
        <li v-for="(item, index) in links" :key="index">
          <RouterLink :to="item.href">
            <i :class="item.icon" style="margin-right: 0.5rem;"></i>
            {{ $t(item.label) }}</RouterLink>
        </li>
      </ul>
    </nav>
    <button class="toggle-button" @click="$emit('toggle')">
      {{ isCollapsed ? $t('sidevar.show') : $t('sidevar.hide') }}
    </button>
  </aside>
</template>

<script setup>
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import 'primeicons/primeicons.css'

defineProps({
  isCollapsed: Boolean
})

const { t } = useI18n()

const links = [
  { label: 'sidevar.home', href: '/', icon: 'pi pi-home'},
  { label: 'sidevar.experienceManager', href: '/manageExperience', icon: 'pi pi-objects-column' },
  { label: 'sidevar.reservations', href: '/reservations' , icon: 'pi pi-pen-to-square'},
  { label: 'sidevar.queries', href: '/queries' , icon: 'pi pi-objects-column'},
  { label: 'sidevar.agencyProfile', href: '/agency-profile', icon: 'pi pi-objects-column' }
]
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: white;
  padding: 1rem;
  border-right: 3px solid #ddd;
  height: 100vh;
  box-sizing: border-box;
  color: black;
  display: flex;
  flex-direction: column;

}

.sidebar.collapsed {
  width: 50px;
}

.toggle-button {
  background: #2196f3;
  color: #fff;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  width: 100%;
}
.logoCompany{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 4rem 0;
}

.sidebar a {
  text-decoration: none;
  color: black;
  padding: 0.5rem 1rem;
  display: block;
  border-radius: 6px;
}

.content-nav {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar a.router-link-active {
  background-color: #99D3D2;
  font-weight: bold;
  color: black;
}

i{
  background-color: transparent !important;
}

</style>