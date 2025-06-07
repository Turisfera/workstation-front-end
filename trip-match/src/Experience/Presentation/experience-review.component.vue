<template>
  <div class="review-item">
    <div class="review-header">
      <div class="user-avatar">
        <img v-if="avatarUrl" :src="avatarUrl" alt="User Avatar">
        <div v-else class="avatar-placeholder">{{ userInitials }}</div>
      </div>
      
      <div class="user-info">
        <h4 class="user-name">{{ username }}</h4>
        <div class="review-date">{{ formattedDate }}</div>
      </div>
      
      <div class="review-rating">
        <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= rating }">★</span>
      </div>
    </div>
    
    <p class="review-comment">{{ comment }}</p>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  username: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const userInitials = computed(() => {
  if (!props.username) return '?';
  return props.username
    .split(' ')
    .slice(0, 2)
    .map(name => name.charAt(0).toUpperCase())
    .join('');
});

const formattedDate = computed(() => {
  try {
    const date = new Date(props.date);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return props.date;
  }
});
</script>

<style scoped>
.review-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  margin-right: 0.8rem;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background-color: #99D3D2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
}

.user-info {
  flex: 1;
}

.user-name {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.review-date {
  font-size: 0.8rem;
  color: #777;
}

.review-rating {
  font-size: 0.9rem;
}

.star {
  color: #ddd;
}

.star.filled {
  color: #FFD700;
}

.review-comment {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}
</style>
