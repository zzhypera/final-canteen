<template>
  <div>
    <div class="admin-heading">
      <div><span class="eyebrow">MENU MANAGEMENT</span><h1>Products</h1></div>
      <RouterLink to="/admin/products/create" class="btn btn-primary">+ Add product</RouterLink>
    </div>

    <div class="admin-panel">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr v-for="product in products.products" :key="product.id">
              <td><div class="table-product"><img :src="product.image" /><span>{{ product.name }}</span></div></td>
              <td>{{ product.category }}</td>
              <td>₱{{ product.price }}</td>
              <td><span class="status-pill completed">{{ product.available ? 'Available' : 'Sold out' }}</span></td>
              <td class="table-actions">
                <RouterLink :to="`/admin/products/${product.id}/edit`">Edit</RouterLink>
                <button @click="remove(product.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from '../../stores/products'
const products = useProductsStore()

function remove(id) {
  if (confirm('Delete this product?')) products.deleteProduct(id)
}
</script>