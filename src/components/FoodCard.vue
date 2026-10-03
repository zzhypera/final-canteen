<template>
  <article class="food-card">
    <RouterLink :to="`/menu/${product.id}`" class="food-image-wrap">
      <img :src="product.image" :alt="product.name" class="food-image" />
      <span v-if="!product.available" class="sold-out">Sold out</span>
    </RouterLink>

    <div class="food-card-body">
      <div class="food-category">{{ product.category }}</div>
      <RouterLink :to="`/menu/${product.id}`" class="food-name">{{ product.name }}</RouterLink>
      <p>{{ product.description }}</p>

      <div class="food-bottom">
        <span class="price">₱{{ product.price }}</span>
        <button class="add-button" :disabled="!product.available" @click="add">
          {{ product.available ? '+ Add' : 'Unavailable' }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const props = defineProps({ product: Object })
const cart = useCartStore()

function add() {
  cart.addToCart(props.product)
}
</script>