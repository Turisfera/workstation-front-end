<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Crear cuenta</h2>
      <p class="subtitle">Regístrate para empezar</p>

      <form @submit.prevent="onRegister">
        <label for="name">Nombre completo</label>
        <pv-input-text
            id="name"
            v-model="name"
            class="input"
            placeholder="Tu nombre"
            required
        />

        <label for="email">Email</label>
        <pv-input-text
            id="email"
            v-model="email"
            type="email"
            class="input"
            placeholder="usuario@ejemplo.com"
            required
        />

        <label for="password">Contraseña</label>
        <pv-input-text
            id="password"
            v-model="password"
            type="password"
            class="input"
            placeholder="••••••••"
            required
        />

        <label for="confirm">Confirmar contraseña</label>
        <pv-input-text
            id="confirm"
            v-model="confirmPassword"
            type="password"
            class="input"
            placeholder="••••••••"
            required
        />

        <label>Tipo de cuenta</label>
        <div class="radio-group">
          <label>
            <input type="radio" :value="false" v-model="isAgency" />
            Usuario
          </label>
          <label>
            <input type="radio" :value="true" v-model="isAgency" />
            Agencia
          </label>
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <pv-button
            label="Registrarme"
            class="login-button"
            type="submit"
            :disabled="!canSubmit"
        />
      </form>

      <p class="create">
        ¿Ya tienes cuenta?
        <a @click.prevent="$router.push('/login')">Inicia sesión</a>
      </p>
    </div>
    <div class="login-banner"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter }     from 'vue-router'
import { UserService }   from '@/Security/Application/user.service.js'

const name            = ref('')
const email           = ref('')
const password        = ref('')
const confirmPassword = ref('')
const isAgency        = ref(false)
const error           = ref('')

const userService = new UserService()
const router      = useRouter()
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
    error.value = 'Las contraseñas no coinciden'
    return
  }
  try {
    const resp = await userService.register({
      name:            name.value,
      email:           email.value,
      password:        password.value,
      isAgency:        isAgency.value
    })
    if (resp.status === 201) {
      alert('Cuenta creada, ya puedes iniciar sesión.')
      router.push('/login')
    }
  } catch (err) {
    console.error(err)
    error.value = 'No se pudo crear la cuenta. Intenta de nuevo.'
  }
}
</script>

<style scoped>
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
</style>
