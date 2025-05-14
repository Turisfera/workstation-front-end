<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  people: {
    type: Number,
    required: true,
  },
  totalPaid: {
    type: Number,
    required: true,
  }
})
</script>

<template>
  <div class="reservations-list-container">
    <div class="reservations-info-container">
      <div class="reservations-info-profile">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwrlmv2j_7cRIEHVtQvB8A7P65LIYogeqlGA&s" alt="Foto" class="profile-photo" />
        <h1>{{ name }}</h1>
      </div>
      <div class="reservations-info-total">
        <div>
          <h2>{{ $t("reservation-info.date") }}</h2>
          <h3>{{ date }}</h3>
        </div>
        <div>
          <h2>{{ $t("reservation-info.experience") }}</h2>
          <h3>{{ experience }}</h3>
        </div>
        <div>
          <h2>{{ $t("reservation-info.people") }}</h2>
          <h3>{{ people }}</h3>
        </div>
        <div>
          <h2>{{ $t("reservation-info.total-paid") }}</h2>
          <h3>S/ {{ totalPaid }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reservations-info-container {
  width: 100%;
  border-color: black;
  border-style: solid;
  border-radius: 10px;
  padding: 2rem;
}

.reservations-list-container {
  text-align: center;
  padding: 1rem 4rem;
}

.reservations-info-profile {
  text-align: left;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.5rem;
  padding-left: 2rem;
}

.reservations-info-total {
  padding: 1rem 4rem 1rem 2rem;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  text-align: center;
}

h1 {
  font-size: 1.5rem;
}

h2 {
  color: #00606C;
  font-size: 1.2rem;
}

h3 {
  padding-top: 1rem;
  text-align: center;
  font-size: 1.2rem;
}

.profile-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
}

</style>