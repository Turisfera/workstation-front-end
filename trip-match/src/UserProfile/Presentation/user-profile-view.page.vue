<script setup>
import { ref, onMounted } from 'vue';
import { UserProfileApiService } from '../Application/user-profile-api.service.js';
import UserProfileForm from './user-profile-form.component.vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

const userProfileApi = new UserProfileApiService();
const user = ref({});
const isEditing = ref(false);
const isLoading = ref(true);
const { t } = useI18n();

onMounted(async () => {
  const userId = localStorage.getItem('token');
  if (!userId) {
    console.error(t('error.userIdNotFound'));
    isLoading.value = false;
    return;
  }

  try {
    const response = await userProfileApi.getProfile(userId);
    user.value = response.data;
  } catch (error) {
    console.error(t('error.fetchProfileError'), error);
  } finally {
    isLoading.value = false;
  }
});

const handleSave = async (updatedUserData) => {
  try {
    const response = await userProfileApi.updateProfile(updatedUserData.id, updatedUserData);
    user.value = response.data;
    localStorage.setItem('name', user.value.name);
    localStorage.setItem('avatar', user.value.avatarUrl);
    isEditing.value = false;
    alert(t('userProfile.updateSuccessAlert'));
  } catch (error) {
    console.error(t('error.updateProfileError'), error);
    alert(t('userProfile.updateFailedAlert'));
  }
};
</script>

<template>
  <div v-if="!isLoading" class="profile-page">
    <div class="profile-card">

      <header class="profile-header">
        <h1>{{ $t('userProfile.title') }}</h1>
        <Button :label="$t('userProfile.editButton')" icon="pi pi-pencil" @click="isEditing = true" />
      </header>

      <div class="profile-content">
        <div class="avatar-wrapper">
          <img
              v-if="user.avatarUrl"
              :src="user.avatarUrl"
              :alt="$t('userProfile.avatarAlt')"
              class="profile-avatar"
              @error="user.avatarUrl = ''"
          />
          <div v-else class="avatar-fallback">
            <i class="pi pi-user"></i>
          </div>
        </div>

        <div class="profile-details">
          <h2>{{ user.name }}</h2>
          <div class="detail-item">
            <i class="pi pi-envelope"></i>
            <span>{{ user.email }}</span>
          </div>
          <div class="detail-item" v-if="user.phone">
            <i class="pi pi-phone"></i>
            <span>{{ user.phone }}</span>
          </div>
          <div class="detail-item" v-if="user.country">
            <i class="pi pi-globe"></i>
            <span>{{ user.country }}</span>
          </div>
        </div>
      </div>

    </div>

    <Dialog
        v-model:visible="isEditing"
        modal
        :header="$t('userProfile.editModalHeader')"
        :style="{ width: '40rem' }"
    >
      <UserProfileForm
          :user="user"
          @save="handleSave"
          @cancel="isEditing = false"
      />
    </Dialog>
  </div>

  <div v-else class="loading-state">
    {{ $t('userProfile.loadingProfile') }}
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
}
.profile-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  overflow: hidden;
}
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}
.profile-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}
.profile-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2.5rem;
}
.avatar-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
}
.profile-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
}
.avatar-fallback {
  width: 100%;
  height: 100%;
  background-color: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #94a3b8;
  border: 4px solid white;
}
.profile-details h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}
.detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #475569;
  margin-bottom: 0.5rem;
}
.detail-item i {
  color: #94a3b8;
}
.loading-state {
  text-align: center;
  padding: 4rem;
  color: #64748b;
}
</style>