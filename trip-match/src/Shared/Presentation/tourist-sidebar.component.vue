<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]" aria-label="Main Navigation">
    <div class="logoCompany">
      <img
          src="@/assets/img/logo-TripMatch.png"
          alt="Logo"
          class="logo-img"
          width="40"
          height="40"
      />
      <h1 v-if="!isCollapsed">{{ t('sidevar.logo') }}</h1>
    </div>

    <nav v-if="!isCollapsed" class="content-nav">
      <ul>
        <li v-for="link in touristLinks" :key="link.path">
          <RouterLink :to="link.path" class="menu-item">
            <i :class="link.icon" style="margin-right:0.5rem"></i>
            <span>{{ t(link.label) }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <nav v-else class="content-nav">
      <ul>
        <li v-for="link in touristLinks" :key="link.path">
          <RouterLink :to="link.path" class="menu-item">
            <i :class="link.icon"></i>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <button class="toggle-button" @click="emit('toggle')">
      {{ isCollapsed ? '›' : '‹' }}
    </button>
  </aside>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps({ isCollapsed: Boolean })
const emit = defineEmits(['toggle'])
const { t } = useI18n()
const touristLinks = [
  { label: 'sidevar.home',        path: '/', icon: 'pi pi-home' },
  { label: 'sidevar.favorites',   path: '/favorites',   icon: 'pi pi-heart' },
  { label: 'sidevar.itineraries', path: '/itineraries', icon: 'pi pi-map' },
  { label: 'sidevar.userProfile', path: '/profile',     icon: 'pi pi-user' }
];
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #fff;
  border-right: 3px solid #ddd;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  transition: width 0.3s ease;
}
.sidebar.collapsed {
  width: 80px;
}

.logoCompany {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.content-nav {
  flex-grow: 1;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  margin: 1rem 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: .75rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  color: #000;
  transition: background-color 0.2s;
  white-space: nowrap;
}
.menu-item:hover {
  background: #f0f0f0;
}
.menu-item.router-link-exact-active {
  background: #99D3D2;
  font-weight: bold;
}

.sidebar.collapsed .menu-item span {
  display: none;
}
.sidebar.collapsed .menu-item {
  justify-content: center;
}
.sidebar.collapsed .menu-item i {
  margin-right: 0;
}

.toggle-button {
  background: #2c8a8a;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: .5rem;
  cursor: pointer;
  width: 100%;
  margin-top: auto;
}
</style>