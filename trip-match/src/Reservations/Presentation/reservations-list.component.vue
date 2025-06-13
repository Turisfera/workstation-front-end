<script setup>
import ReservationListItem from '@/Reservations/Presentation/reservations-list-item.component.vue';

defineProps({
  reservations: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="reservations-list">
    <ReservationListItem
        v-for="reservation in reservations"
        :key="reservation.id"
        :reservation="reservation"
    />
  </div>
</template>

<style scoped>
.reservations-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>