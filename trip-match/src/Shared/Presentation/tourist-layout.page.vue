<template>
  <div class="default-layout">
    <AgencySidebarComponent :is-collapsed="isSidebarCollapsed" @toggle="toggleSidebar"/>
    <div class="content-wrapper">
      <TheHeader/>
      <main class="main-content">
        <RouterView/>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TheHeader from '@/Shared/Presentation/the-header.component.vue';
import AgencySidebarComponent from "@/Shared/Presentation/tourist-sidebar.component.vue";
const isSidebarCollapsed = ref(false);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>

<style>
.default-layout {
  display: flex;
  height: 100vh;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>