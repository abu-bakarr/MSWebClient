<template>
  <div v-if="currentProduct.id" class="edit-form container">
    <h4>Product</h4>

    <form @submit.prevent="updateProduct">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="favorite">Favorite:</label>
            <input
              type="text"
              class="form-control"
              id="favorite"
              v-model="currentProduct.favorite"
              required
            />
          </div>
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="currentProduct.name"
              :readonly="true"
              required
            />
          </div>
          <div class="form-group">
            <label for="internal_reference">Internal Reference:</label>
            <input
              type="text"
              class="form-control"
              id="internal_reference"
              v-model="currentProduct.internal_reference"
              required
            />
          </div>
          <div class="form-group">
            <label for="responsible">Responsible:</label>
            <input
              type="text"
              class="form-control"
              id="responsible"
              v-model="currentProduct.responsible"
              required
            />
          </div>
          <div class="form-group">
            <label for="barcode">Barcode:</label>
            <input
              type="text"
              class="form-control"
              id="barcode"
              v-model="currentProduct.barcode"
              required
            />
          </div>
          <div class="form-group">
            <label for="sales_price">Sales Price:</label>
            <input
              type="number"
              class="form-control"
              id="sales_price"
              v-model="currentProduct.sales_price"
              required
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="cost">Cost:</label>
            <input
              type="number"
              class="form-control"
              id="cost"
              v-model="currentProduct.cost"
              required
            />
          </div>
          <div class="form-group">
            <label for="product_category">Product Category:</label>
            <input
              type="text"
              class="form-control"
              id="product_category"
              v-model="currentProduct.product_category"
              required
            />
          </div>
          <div class="form-group">
            <label for="product_type">Product Type:</label>
            <input
              type="text"
              class="form-control"
              id="product_type"
              v-model="currentProduct.product_type"
              required
            />
          </div>
          <div class="form-group">
            <label for="quantity_on_hand">Quantity on Hand:</label>
            <input
              type="number"
              class="form-control"
              id="quantity_on_hand"
              v-model="currentProduct.quantity_on_hand"
              required
            />
          </div>
          <div class="form-group">
            <label for="forecasted_quantity">Forecasted Quantity:</label>
            <input
              type="number"
              class="form-control"
              id="forecasted_quantity"
              v-model="currentProduct.forecasted_quantity"
              required
            />
          </div>
          <div class="form-group">
            <label for="activity_exception_decoration">Activity Exception Decoration:</label>
            <input
              type="text"
              class="form-control"
              id="activity_exception_decoration"
              v-model="currentProduct.activity_exception_decoration"
              required
            />
          </div>
        </div>
      </div>
      <br />
      <div class="mx-auto text-center">
        <button class="btn btn-danger" @click="deleteProduct">Delete</button>
        <button type="submit" class="btn pb-2 btn-success" @click="updateProduct">Update</button>
      </div>
    </form>
    <div>
      <button class="btn btn-primary" @click="goBack">Back</button>
    </div>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Success ...</p>
    <button class="btn btn-primary">
      <router-link to="/products" class="nav-link">Go to Products</router-link>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductDataService from '@/services/ProductDataService.js'
import type Product from '@/types/Product.js'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'product',
  data() {
    return {
      currentProduct: {} as Product,
      message: ''
    }
  },
  methods: {
    async getProduct(id: any) {
      try {
        const response = await ProductDataService.get(id)
        this.currentProduct = response.data
        console.log(response.data)
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message)
      }
    },

    goBack() {
      this.$router.push('/products')
    },

    async updateProduct() {
      try {
        const response = await ProductDataService.update(
          this.currentProduct.id,
          this.currentProduct
        )
        console.log(response.data)
        this.message = 'The Product was updated successfully!'
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message)
      }
    },

    async deleteProduct() {
      try {
        const response = await ProductDataService.delete(this.currentProduct.id)
        console.log(response.data)
        this.$router.push('/products')
        this.message = 'The Product was deleted successfully!'
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message)
      }
    }
  },
  mounted() {
    this.message = ''
    const productId = this.$route.params.id
    this.getProduct(productId)
  }
})
</script>

<style>
/* .edit-form {
  max-width: 300px;
  margin: auto;
} */
</style>
