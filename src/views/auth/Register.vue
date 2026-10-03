<template>
  <div class="auth-page">
    <div class="auth-brand">
      <RouterLink to="/" class="brand"><span class="brand-mark">C</span> Campus<span>Canteen</span></RouterLink>
    </div>

    <div class="auth-card">
      <span class="eyebrow">JOIN THE CAMPUS</span>
      <h1>Create your account.</h1>
      <p class="auth-subtitle">Order faster and keep track of your canteen orders.</p>

      <form @submit.prevent="submit">
        <label>Full name<input v-model="name" type="text" placeholder="Juan Dela Cruz" required /></label>
        <label>ID number<input v-model="idNumber" type="text" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" placeholder="18101" autocomplete="username" required @input="onlyDigits" /></label>
        <label>Password<input v-model="password" type="password" placeholder="At least 6 characters" minlength="6" autocomplete="new-password" required /></label>
        <p v-if="error" class="error-message">{{ error }}</p>
        <button class="btn btn-primary full-button">Create account</button>
      </form>

      <p class="auth-footer">Already have an account? <RouterLink to="/login">Log in</RouterLink></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const name = ref('')
const idNumber = ref('')
const password = ref('')
const error = ref('')

function onlyDigits() {
  idNumber.value = idNumber.value.replace(/\D/g, '').slice(0, 5)
}

function submit() {
  try {
    auth.register(name.value, idNumber.value, password.value)
    router.push('/menu')
  } catch (err) {
    error.value = err.message
  }
}
</script>