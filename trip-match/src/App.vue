<script setup>
import { useRoute } from 'vue-router'
import DefaultLayout from '@/Shared/Presentation/default-layout.page.vue'
const route = useRoute()
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="route.meta.layout === 'auth' ? Component : DefaultLayout">
      <component :is="Component" />
    </component>
  </router-view>
</template>

<style>
* {
  background-color: white;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
