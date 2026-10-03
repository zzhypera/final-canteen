import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/auth'
import MainLayout from '../layouts/MainLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import FoodDetails from '../views/FoodDetails.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import OrderSuccess from '../views/OrderSuccess.vue'
import Orders from '../views/Orders.vue'
import OrderDetails from '../views/OrderDetails.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

import Dashboard from '../views/admin/Dashboard.vue'
import AdminOrders from '../views/admin/Orders.vue'
import Products from '../views/admin/Products.vue'
import ProductForm from '../views/admin/ProductForm.vue'
import Categories from '../views/admin/Categories.vue'
import Customers from '../views/admin/Customers.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: Home },
      { path: 'menu', name: 'menu', component: Menu },
      { path: 'menu/:id', name: 'food-details', component: FoodDetails },
      { path: 'cart', name: 'cart', component: Cart },
      { path: 'checkout', name: 'checkout', component: Checkout, meta: { requiresAuth: true } },
      { path: 'order-success', name: 'order-success', component: OrderSuccess, meta: { requiresAuth: true } },
      { path: 'orders', name: 'orders', component: Orders, meta: { requiresAuth: true } },
      { path: 'orders/:id', name: 'order-details', component: OrderDetails, meta: { requiresAuth: true } },
      { path: 'profile', name: 'profile', component: Profile, meta: { requiresAuth: true } }
    ]
  },
  { path: '/login', name: 'login', component: Login, meta: { guestOnly: true } },
  { path: '/register', name: 'register', component: Register, meta: { guestOnly: true } },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', name: 'admin-dashboard', component: Dashboard },
      { path: 'orders', name: 'admin-orders', component: AdminOrders },
      { path: 'products', name: 'admin-products', component: Products },
      { path: 'products/create', name: 'admin-product-create', component: ProductForm },
      { path: 'products/:id/edit', name: 'admin-product-edit', component: ProductForm },
      { path: 'categories', name: 'admin-categories', component: Categories },
      { path: 'customers', name: 'admin-customers', component: Customers }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach(to => {
  const auth = useAuthStore()
  const needsAuth = to.matched.some(r => r.meta.requiresAuth)
  const needsAdmin = to.matched.some(r => r.meta.requiresAdmin)
  const guestOnly = to.matched.some(r => r.meta.guestOnly)

  if (needsAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (needsAdmin && !auth.isAdmin) return { name: 'menu' }
  if (guestOnly && auth.isAuthenticated) return { name: auth.isAdmin ? 'admin-dashboard' : 'menu' }
})

export default router
