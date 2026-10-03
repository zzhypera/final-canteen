<template>
  <header class="navbar">
    <RouterLink to="/" class="brand">
      <span class="brand-mark">CC</span>
      <span>Campus<span>Canteen</span></span>
    </RouterLink>

    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/menu">Menu</RouterLink>
      <RouterLink to="/orders">Orders</RouterLink>
      <RouterLink v-if="auth.isAdmin" to="/admin">Admin</RouterLink>
    </nav>

    <div class="nav-actions">
      <RouterLink to="/cart" class="cart-button">
        Cart <span>{{ cart.totalItems }}</span>
      </RouterLink>
      <RouterLink v-if="!auth.isAuthenticated" to="/login" class="btn btn-dark">Login</RouterLink>
      <RouterLink v-else to="/profile" class="profile-dot">{{ auth.user?.name?.charAt(0) }}</RouterLink>
    </div>
  </header>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const cart = useCartStore()
const auth = useAuthStore()
</script>
