<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="d-flex justify-content-start mb-3">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search by title" v-model="title" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="searchProduct">
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center mb-3">
        <button class="btn btn-primary">
          <router-link to="/add-product" class="nav-link">Add Product</router-link>
        </button>
      </div>
    </div>
    <div class="col-md-6 p-2">
      <h4>Products List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(product, index) in products"
          :key="index"
          @click="setActiveProduct(product, index)"
        >
          {{ product.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6 p-2">
      <div v-if="currentProduct.id">
        <h4>Product Info</h4>
        <div>
          <label><strong>Favorite:</strong></label> {{ currentProduct.favorite }}
        </div>
        <div>
          <label><strong>Name:</strong></label>
          {{ currentProduct.name }}
        </div>
        <div>
          <label><strong>Responsible:</strong></label>
          {{ currentProduct.responsible }}
        </div>
        <div>
          <label><strong>Cost:</strong></label>
          {{ currentProduct.cost }}
        </div>
        <div>
          <label><strong>Product Type:</strong></label>
          {{ currentProduct.product_type }}
        </div>
        <button class="btn btn-warning">
          <router-link :to="'/products/' + currentProduct.id">
            <i class="fas fa-edit"></i> Edit
          </router-link>
        </button>
      </div>

      <div v-else>
        <br />
        <p>Please click on a Product...</p>
      </div>
    </div>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductDataService from '@/services/ProductDataService'
import type Product from '@/types/Product'

export default defineComponent({
  name: 'products-list',
  data() {
    return {
      products: [] as Product[],
      currentProduct: {} as Product,
      currentIndex: -1,
      title: '',
      message: ''
    }
  },
  methods: {
    async retrieveProducts() {
      try {
        const response = await ProductDataService.getAll()
        this.products = response.data
        console.log(response.data)
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message)
      }
    },

    refreshList() {
      this.retrieveProducts()
      this.currentProduct = {} as Product
      this.currentIndex = -1
    },

    setActiveProduct(product: Product, index = -1) {
      this.currentProduct = product
      this.currentIndex = index
    },

    async searchProduct() {
      try {
        const response = await ProductDataService.SearchByProductName(this.title)
        this.products = response.data
        console.log(response.data)
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message)
      }
    }
  },

  mounted() {
    this.retrieveProducts()
  }
})
</script>

<style>
.list {
  text-align: left;
  max-width: 950px;
  margin: auto;
}
</style>
