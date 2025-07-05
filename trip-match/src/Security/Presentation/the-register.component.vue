<template>
  <div class="login-container">
    <div class="login-box">
      <h2>{{ $t('register.title') }}</h2>
      <p class="subtitle">{{ $t('register.subtitle') }}</p>

      <form @submit.prevent="onRegister">
        <label for="name">{{ $t('register.nameLabel') }}</label>
        <pv-input-text
            id="name"
            v-model="name"
            class="input"
            :placeholder="$t('register.namePlaceholder')"
            required
        />

        <label for="email">{{ $t('register.emailLabel') }}</label>
        <pv-input-text
            id="email"
            v-model="email"
            type="email"
            class="input"
            :placeholder="$t('register.emailPlaceholder')"
            required
        />

        <label for="number">{{ $t('register.numberLabel') }}</label>
        <pv-input-text
            id="number"
            v-model="number"
            type="tel"
            class="input"
            :placeholder="$t('register.numberPlaceholder')"
            required
        />

        <label for="password">{{ $t('register.passwordLabel') }}</label>
        <pv-input-text
            id="password"
            v-model="password"
            type="password"
            class="input"
            :placeholder="$t('register.passwordPlaceholder')"
            required
        />

        <label for="confirm">{{ $t('register.confirmPasswordLabel') }}</label>
        <pv-input-text
            id="confirm"
            v-model="confirmPassword"
            type="password"
            class="input"
            :placeholder="$t('register.confirmPasswordPlaceholder')"
            required
        />

        <label>{{ $t('register.accountTypeLabel') }}</label>
        <div class="radio-group">
          <label>
            <input type="radio" :value="false" v-model="isAgency" />
            {{ $t('register.userType') }}
          </label>
          <label>
            <input type="radio" :value="true" v-model="isAgency" />
            {{ $t('register.agencyType') }}
          </label>
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <pv-button
            class="login-button"
            type="submit"
            :disabled="!canSubmit"
        >
          {{ $t('register.registerButton') }}
        </pv-button>
      </form>

      <p class="create">
        {{ $t('register.alreadyHaveAccount') }}
        <a @click.prevent="$router.push('/login')">{{ $t('register.loginLink') }}</a>
      </p>
    </div>
    <div class="agency-img-wrapper">
      <img src="/Register-TripMatch.png" :alt="$t('register.travelerImageAlt')" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter }     from 'vue-router'
import { UserService }   from '@/Security/Application/user.service.js'
import { useI18n } from 'vue-i18n';

const name            = ref('')
const email           = ref('')
const password        = ref('')
const confirmPassword = ref('')
const isAgency        = ref(false)
const error           = ref('')
const number = ref('')

const userService = new UserService()
const router      = useRouter()
const { t } = useI18n();

const canSubmit = computed(() => {
  return (
      name.value.trim() &&
      email.value.trim() &&
      password.value &&
      confirmPassword.value &&
      password.value === confirmPassword.value
  )
})

async function onRegister() {
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = t('error.passwordsMismatch')
    return
  }
  try {
    const resp = await userService.register({
      name:            name.value,
      email:           email.value,
      password:        password.value,
      number:   number.value,
      isAgency:        isAgency.value
    })
    if (resp.status === 201 || resp.status === 200) {
      alert(t('register.accountCreatedSuccess'))
      router.push('/login')
    } else {
      error.value = t('error.accountCreationFailure')
    }
  } catch (err) {
    console.error(err)
    error.value = t('error.accountCreationFailure')
  }
}
</script>

<style scoped>
/* Estilos sin cambios */
.login-container {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}
.login-box {
  width: 50%;
  padding: 40px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.login-box h2 {
  color: #047e77;
  font-size: 32px;
  margin-bottom: 8px;
}
.subtitle {
  font-size: 14px;
  margin-bottom: 24px;
  color: #666;
}
label {
  display: block;
  margin-top: 12px;
  font-weight: 500;
}
.input {
  margin-top: 4px;
  margin-bottom: 16px;
  width: 100%;
  border-radius: 12px;
  padding: .75rem;
}
.radio-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 16px;
}
.error {
  color: red;
  margin-bottom: 12px;
}
.login-button {
  width: 100%;
  background-color: #047e77;
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-weight: bold;
  font-size: 16px;
  margin-top: 8px;
}
.create {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
}
.create a {
  color: #047e77;
  text-decoration: none;
  font-weight: bold;
}
.login-banner {
  width: 50%;
  background: linear-gradient(135deg,#00b8a9,#00796b);
}
.agency-img-wrapper {
  width: 50%;
  height: 100%;
  background: linear-gradient(#00C2C0,#00333A);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.agency-img-wrapper img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  background-color: transparent;
}
</style>