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
        <label>ID number<input v-model="idNumber" type="text" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" placeholder="e.g., 18101" autocomplete="username" required @input="onlyDigits" /></label>
        <label>Password
          <span class="password-field">
            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" autocomplete="current-password" required />
            <button type="button" class="toggle-password" :aria-label="showPassword ? 'Hide password' : 'Show password'" :aria-pressed="showPassword" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
              <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.9 5.2A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 4.4-1" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /><path d="m2 2 20 20" /></svg>
            </button>
          </span>
        </label>
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
const showPassword = ref(false)
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