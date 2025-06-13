<script setup>
defineProps({
  reservation: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="reservation-card">
    <div class="traveler-info">
      <img
          :src="reservation.traveler.avatarUrl"
          alt="Avatar viajero"
          class="profile-photo"
      />
      <span class="traveler-name">{{ reservation.traveler.name }}</span>
    </div>
    <div class="details-grid">
      <div class="detail-item">
        <label>Fecha de reserva</label>
        <span>{{ reservation.bookingDate }}</span>
      </div>
      <div class="detail-item">
        <label>Experiencia</label>
        <span>{{ reservation.experienceName }}</span>
      </div>
      <div class="detail-item">
        <label>Personas</label>
        <span>{{ reservation.pax }}</span>
      </div>
      <div class="detail-item">
        <label>Total pagado</label>
        <span class="total-paid">S/ {{ reservation.totalPaid.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reservation-card {
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}

.profile-photo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
}

.traveler-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.traveler-name {
  font-size: 1.125rem;
  font-weight: 600;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}
.detail-item label {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}
.detail-item span {
  font-weight: 500;
}
.total-paid {
  font-weight: 600;
}
</style>
