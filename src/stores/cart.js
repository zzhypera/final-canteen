import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('canteen_cart') || '[]'))

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  function save() {
    localStorage.setItem('canteen_cart', JSON.stringify(items.value))
  }

  function addToCart(product, quantity = 1) {
    const existing = items.value.find(item => item.productId === product.id)

    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      })
    }

    save()
  }

  function increaseQuantity(item) {
    item.quantity++
    save()
  }

  function decreaseQuantity(item) {
    if (item.quantity > 1) item.quantity--
    else removeFromCart(item.productId)
    save()
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(item => item.productId !== productId)
    save()
  }

  function clearCart() {
    items.value = []
    save()
  }

  return { items, totalItems, totalPrice, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }
})