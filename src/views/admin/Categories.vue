<template>
  <div>
    <div class="admin-heading">
      <div><span class="eyebrow">MENU ORGANIZATION</span><h1>Categories</h1></div>
      <button class="btn btn-primary" @click="addCategory">+ Add category</button>
    </div>

    <div class="category-admin-grid">
      <div v-for="category in categories" :key="category" class="category-admin-card">
        <span class="category-icon">◇</span>
        <h3>{{ category }}</h3>
        <p>{{ products.products.filter(p => p.category === category).length }} products</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from '../../stores/products'
const products = useProductsStore()
const categories = ['Breakfast', 'Meals', 'Snacks', 'Drinks', 'Desserts']

function addCategory() {
  alert('Category creation can be connected to your backend here.')
}
</script>