<template>
  <section v-if="product" class="detail-page">
    <RouterLink to="/menu" class="back-link">← Back to menu</RouterLink>

    <div class="detail-grid">
      <div class="detail-image">
        <img :src="product.image" :alt="product.name" />
      </div>

      <div class="detail-copy">
        <span class="eyebrow">{{ product.category }}</span>
        <h1>{{ product.name }}</h1>
        <div class="detail-price">₱{{ product.price }}</div>
        <p>{{ product.description }}</p>

        <div class="quantity-label">Quantity</div>
        <div class="quantity-control large">
          <button @click="quantity = Math.max(1, quantity - 1)">−</button>
          <span>{{ quantity }}</span>
          <button @click="quantity++">+</button>
        </div>

        <button class="btn btn-primary full-button" :disabled="!product.available" @click="add">
          {{ product.available ? `Add ${quantity} to cart · ₱${product.price * quantity}` : 'Unavailable' }}
        </button>

        <p v-if="added" class="success-message">Added to cart successfully.</p>
      </div>
    </div>
  </section>

  <div v-else class="empty-state">
    <h2>Food not found</h2>
    <RouterLink to="/menu" class="btn btn-primary">Back to menu</RouterLink>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const products = useProductsStore()
const cart = useCartStore()
const product = products.getProduct(route.params.id)
const quantity = ref(1)
const added = ref(false)

function add() {
  cart.addToCart(product, quantity.value)
  added.value = true
  setTimeout(() => (added.value = false), 1800)
}
</script>