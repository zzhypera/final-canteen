<template>
  <div class="auth-page">
    <div class="auth-brand">
      <RouterLink to="/" class="brand"><span class="brand-mark">C</span> Campus<span>Canteen</span></RouterLink>
    </div>

    <div class="auth-card">
      <span class="eyebrow">WELCOME BACK</span>
      <h1>Log in to order.</h1>
      <p class="auth-subtitle">Use your ID number to continue.</p>

      <form @submit.prevent="submit">
        <label>ID number<input v-model="idNumber" type="text" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" placeholder="18101" autocomplete="username" required @input="onlyDigits" /></label>
        <label>Password<input v-model="password" type="password" placeholder="••••••••" autocomplete="current-password" required /></label>
        <p v-if="error" class="error-message">{{ error }}</p>
        <button class="btn btn-primary full-button">Login</button>
      </form>

      <p class="auth-footer">Don't have an account? <RouterLink to="/register">Create one</RouterLink></p>
      <RouterLink to="/" class="back-link center-link">← Back to home</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const idNumber = ref('')
const password = ref('')
const error = ref('')

function onlyDigits() {
  idNumber.value = idNumber.value.replace(/\D/g, '').slice(0, 5)
}

function submit() {
  try {
    const user = auth.login(idNumber.value, password.value)
    const redirect = route.query.redirect
    // Admins can't be sent into student-only pages by accident, students can't open /admin
    if (typeof redirect === 'string' && redirect.startsWith('/') && (user.role === 'admin' || !redirect.startsWith('/admin'))) {
      router.push(redirect)
    } else {
      router.push(user.role === 'admin' ? '/admin' : '/menu')
    }
  } catch (err) {
    error.value = err.message
  }
}
</script>