<template>
  <div class="category-list">
    <button
      v-for="category in categories"
      :key="category"
      :class="{ active: modelValue === category }"
      @click="$emit('update:modelValue', category)"
    >
      {{ category }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: 'All' },
  categories: { type: Array, default: () => [] }
})

defineEmits(['update:modelValue'])
</script>
