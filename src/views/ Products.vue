<template>
  <div>
    <h1>Products</h1>
    <ProductsList />
  </div>
</template>

<script lang="ts">
import ProductsList from '@/components/ProductsList.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'products',
  components: {
    ProductsList
  }
}
</script>
