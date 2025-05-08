<script setup>
import LanguageSwitcher from '@/Shared/Presentation/language-switcher.component.vue'
</script>

<template>
  <div class="header-container">
    <h2 class="subtitle"> {{ $t('sidevar.home')}}</h2>
    <LanguageSwitcher/>
  </div>
</template>

<style scoped>
  .subtitle {
    color: black;
    font-weight: 600;
    font-size: 20px;
  }
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    height: 85px;
    border-bottom: 3px solid #ddd;
  }
</style>