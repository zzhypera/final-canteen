<template>
  <RouterLink :to="`/orders/${order.id}`" class="order-card">
    <div>
      <span class="order-number">{{ order.id }}</span>
      <h3>{{ order.items.map(item => `${item.name} × ${item.quantity}`).join(', ') }}</h3>
      <p>{{ new Date(order.createdAt).toLocaleString() }}</p>
    </div>
    <div class="order-card-right">
      <span class="status-pill" :class="order.status">{{ order.status }}</span>
      <strong>₱{{ order.total }}</strong>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({
  order: { type: Object, required: true }
})
</script>
