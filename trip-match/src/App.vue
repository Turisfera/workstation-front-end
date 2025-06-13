<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const layoutComponent = computed(() => {
  if (route.matched.length > 0 && route.matched[0].components.default) {
    return route.matched[0].components.default;
  }
  return null;
});
</script>

<template>
  <router-view v-slot="{ Component }">
    <template v-if="route.meta.layout === 'auth'">
      <component :is="Component" />
    </template>

    <template v-else>
      <component :is="layoutComponent">
        <component :is="Component" />
      </component>
    </template>
  </router-view>
</template>

<style>

body {
  background-color: white;
  margin: 0;
  padding: 0;
}

* {
  font-family: 'Montserrat', sans-serif;
  box-sizing: border-box;
}
</style>