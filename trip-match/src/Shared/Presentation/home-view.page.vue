<script setup>
 const user="Marcia Melgarejo";
</script>

<template>
  <div class="home-view">
    <main class="main-content">
      <h3 class="greetings">{{ $t('home.greeting',{ user }) }}</h3>
      <p class="welcome-message">{{ $t("home.greetingSubtitle") }}</p>
    </main>
  </div>
</template>

<style scoped>
.home-view {
  color: black ;
}

.main-content {
}

.greetings {
  font-size: 36px;
  font-weight: 700;
}

.welcome-message {
  font-size: 1.2rem;
  margin-top: 0.5rem;
}
</style>