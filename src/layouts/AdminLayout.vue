<template>
  <div class="admin-shell">
    <aside class="admin-sidebar">
      <RouterLink class="admin-brand" to="/admin">
        <span class="brand-mark">C</span>
        <span>Campus Canteen</span>
      </RouterLink>

      <nav>
        <RouterLink to="/admin">Dashboard</RouterLink>
        <RouterLink to="/admin/orders">Orders</RouterLink>
        <RouterLink to="/admin/products">Products</RouterLink>
        <RouterLink to="/admin/categories">Categories</RouterLink>
        <RouterLink to="/admin/customers">Customers</RouterLink>
      </nav>

      <RouterLink class="back-link" to="/menu">← Back to store</RouterLink>
    </aside>

    <main class="admin-main">
      <RouterView />
    </main>
  </div>
</template>