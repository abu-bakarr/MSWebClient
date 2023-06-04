<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark py-4">
      <router-link to="/" class="navbar-brand">DIMA Ltd</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/products" class="nav-link">Product</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/vendors" class="nav-link">Vendor</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/purchase-orders" class="nav-link">Purchase Order</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
