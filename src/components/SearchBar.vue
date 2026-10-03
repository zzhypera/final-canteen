<template>
  <div class="search-box">
    <span>⌕</span>
    <input
      :value="modelValue"
      placeholder="Search food..."
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' }
})

defineEmits(['update:modelValue'])
</script>
