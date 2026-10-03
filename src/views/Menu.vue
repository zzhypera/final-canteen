<template>
  <section class="page-section">
    <div class="page-heading">
      <div>
        <span class="eyebrow">THE CANTEEN MENU</span>
        <h1>Find something delicious.</h1>
      </div>
      <SearchBar v-model="search" />
    </div>

    <CategoryFilter v-model="category" :categories="store.categories" />

    <div v-if="filteredProducts.length" class="food-grid menu-grid">
      <FoodCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">⌕</div>
      <h2>No food found</h2>
      <p>Try a different search or category.</p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useProductsStore } from '../stores/products'
import FoodCard from '../components/FoodCard.vue'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'

const store = useProductsStore()
const search = ref('')
const category = ref('All')

const filteredProducts = computed(() => {
  return store.products.filter(product => {
    const matchesCategory = category.value === 'All' || product.category === category.value
    const query = search.value.toLowerCase()
    const matchesSearch = !query || `${product.name} ${product.description}`.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })
})
</script>