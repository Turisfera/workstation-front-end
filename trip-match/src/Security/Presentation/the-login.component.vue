<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Hello!</h2>
      <p class="subtitle">Sign in to your account</p>

      <form @submit.prevent="login">
        <label for="email">Email</label>
        <pv-input-text
            id="email"
            v-model="email"
            type="email"
            class="input"
            placeholder="example@email.com"
            required
        />

        <label for="password">Password</label>
        <pv-input-text
            id="password"
            v-model="password"
            type="password"
            class="input"
            placeholder="••••••••"
            required
        />

        <div class="forgot"><a href="#">Forgot your password?</a></div>
        <pv-button
            class="login-button"
            type="submit"
            style="background-color: #047e77; color: white; border: none"
        >
          Login
        </pv-button>
      </form>

      <div class="divider"><span>Or</span></div>

      <div class="social-icons">
        <button class="icon-btn"><i class="pi pi-google" /></button>
        <button class="icon-btn"><i class="pi pi-facebook" /></button>
        <button class="icon-btn"><i class="pi pi-apple" /></button>
      </div>

      <p class="create">
        New here?
        <RouterLink to="/register">Create an account</RouterLink>
      </p>
    </div>




    <div class="traveler-img-wrapper">
      <img src="/Login-TripMatch.png" alt="Traveler Image" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { UserService } from '@/Security/Application/user.service.js'

const email       = ref('')
const password    = ref('')
const userService = new UserService()
const router      = useRouter()

onMounted(() => {
  const stored = localStorage.getItem('email')
  if (stored) email.value = stored
})

async function login() {
  try {
    const { status, data } = await userService.login({
      email:    email.value,
      password: password.value
    })

    if (status === 200) {
      localStorage.setItem('token',     data.accessToken)
      localStorage.setItem('email',     data.email)
      localStorage.setItem('name',      data.name)
      localStorage.setItem('avatar',    data.avatar)
      localStorage.setItem('isAgency',  data.isAgency)
      if (data.isAgency) {
        router.push('/agency/home')
      } else {
        router.push('/user/home')
      }
    }
  } catch (err) {
    alert('Error de autenticación: revisa tus credenciales.')
    console.error(err)
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
}
.login-box h2 {
  color: #047e77;
  font-size: 32px;
  margin-bottom: 4px;
}
.subtitle {
  font-size: 14px;
  margin-bottom: 24px;
  color: #666;
}
label {
  font-weight: 500;
  margin-bottom: 6px;
}
.input {
  margin-bottom: 20px;
  width: 100%;
  border-radius: 12px;
  padding: 0.75rem;
}
.forgot {
  text-align: right;
  margin-top: -12px;
  margin-bottom: 20px;
  font-size: 13px;
}
.forgot a {
  color: #047e77;
  text-decoration: none;
}
.login-button {
  width: 100%;
  background-color: #047e77;
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 20px;
}
.divider {
  text-align: center;
  margin: 20px 0;
  position: relative;
}
.divider::before,
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: #ccc;
}
.divider::before { left: 0 }
.divider::after  { right: 0 }
.divider span {
  padding: 0 12px;
  color: #666;
  background: #fff;
  z-index: 1;
  position: relative;
}
.social-icons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 20px;
}
.icon-btn {
  width: 44px;
  height: 44px;
  border: 1px solid #ddd;
  border-radius: 50%;
  font-size: 20px;
  color: #333;
  background: white;
  cursor: pointer;
}
.icon-btn:hover { background: #f0f0f0; }
.create {
  text-align: center;
  font-size: 14px;
}
.create a {
  color: #047e77;
  text-decoration: none;
  font-weight: bold;
}
.traveler-img-wrapper {
  width: 50%;
  height: 100%;
  background: linear-gradient(#00C2C0,#00333A);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.traveler-img-wrapper img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  background-color: transparent; /* asegura transparencia */
}


</style>
