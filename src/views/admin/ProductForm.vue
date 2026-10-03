<template>
  <div>
    <div class="admin-heading">
      <div><span class="eyebrow">MENU MANAGEMENT</span><h1>{{ editing ? 'Edit product' : 'Add product' }}</h1></div>
      <RouterLink to="/admin/products" class="back-link">← Products</RouterLink>
    </div>

    <form class="admin-form" @submit.prevent="save">
      <label>Product name<input v-model="form.name" required /></label>
      <label>Description<textarea v-model="form.description" rows="4"></textarea></label>

      <div class="form-two">
        <label>Price<input v-model.number="form.price" type="number" min="0" required /></label>
        <label>Category<select v-model="form.category"><option v-for="category in categories" :key="category">{{ category }}</option></select></label>
      </div>

      <label>Image URL<input v-model="form.image" type="url" placeholder="https://..." /></label>

      <label class="checkbox-option">
        <input v-model="form.available" type="checkbox" />
        Product is available
      </label>

      <div class="form-actions">
        <RouterLink to="/admin/products" class="btn btn-light">Cancel</RouterLink>
        <button class="btn btn-primary">Save product</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../../stores/products'

const route = useRoute()
const router = useRouter()
const store = useProductsStore()
const editing = computed(() => !!route.params.id)
const existing = editing.value ? store.getProduct(route.params.id) : null

const categories = ['Breakfast', 'Meals', 'Snacks', 'Drinks', 'Desserts']
const form = reactive(existing ? { ...existing } : {
  name: '', description: '', price: 0, category: 'Meals',
  image: '', available: true
})

function save() {
  if (editing.value) store.updateProduct(route.params.id, form)
  else store.addProduct(form)
  router.push('/admin/products')
}
</script>