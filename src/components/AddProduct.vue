<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <form @submit.prevent="saveProduct">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="favorite">Favorite:</label>
              <input
                type="text"
                class="form-control"
                id="favorite"
                v-model="product.favorite"
                required
              />
            </div>
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" class="form-control" id="name" v-model="product.name" required />
            </div>
            <div class="form-group">
              <label for="internal_reference">Internal Reference:</label>
              <input
                type="text"
                class="form-control"
                id="internal_reference"
                v-model="product.internal_reference"
                required
              />
            </div>
            <div class="form-group">
              <label for="responsible">Responsible:</label>
              <input
                type="text"
                class="form-control"
                id="responsible"
                v-model="product.responsible"
                required
              />
            </div>
            <div class="form-group">
              <label for="barcode">Barcode:</label>
              <input
                type="text"
                class="form-control"
                id="barcode"
                v-model="product.barcode"
                required
              />
            </div>
            <div class="form-group">
              <label for="sales_price">Sales Price:</label>
              <input
                type="number"
                class="form-control"
                id="sales_price"
                v-model="product.sales_price"
                required
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="cost">Cost:</label>
              <input type="number" class="form-control" id="cost" v-model="product.cost" required />
            </div>
            <div class="form-group">
              <label for="product_category">Product Category:</label>
              <input
                type="text"
                class="form-control"
                id="product_category"
                v-model="product.product_category"
                required
              />
            </div>
            <div class="form-group">
              <label for="product_type">Product Type:</label>
              <input
                type="text"
                class="form-control"
                id="product_type"
                v-model="product.product_type"
                required
              />
            </div>
            <div class="form-group">
              <label for="quantity_on_hand">Quantity on Hand:</label>
              <input
                type="number"
                class="form-control"
                id="quantity_on_hand"
                v-model="product.quantity_on_hand"
                required
              />
            </div>
            <div class="form-group">
              <label for="forecasted_quantity">Forecasted Quantity:</label>
              <input
                type="number"
                class="form-control"
                id="forecasted_quantity"
                v-model="product.forecasted_quantity"
                required
              />
            </div>
            <div class="form-group">
              <label for="activity_exception_decoration">Activity Exception Decoration:</label>
              <input
                type="text"
                class="form-control"
                id="activity_exception_decoration"
                v-model="product.activity_exception_decoration"
                required
              />
            </div>
          </div>
        </div>
        <br />
        <div class="mx-auto">
          <button @click="saveProduct" type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
      <p>{{ message }}</p>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newProduct">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductDataService from '@/services/ProductDataService.js'
import type Product from '@/types/Product.js'

export default defineComponent({
  name: 'add-product',
  data() {
    return {
      product: {
        id: null,
        favorite: '',
        name: '',
        internal_reference: '',
        responsible: '',
        barcode: '',
        sales_price: 0,
        cost: 0,
        product_category: '',
        product_type: '',
        quantity_on_hand: 0,
        forecasted_quantity: 0,
        activity_exception_decoration: ''
      } as Product,
      message: '',
      submitted: false
    }
  },
  methods: {
    async saveProduct() {
      try {
        let data = {
          favorite: this.product.favorite,
          name: this.product.name,
          internal_reference: this.product.internal_reference,
          responsible: this.product.responsible,
          barcode: this.product.barcode,
          sales_price: this.product.sales_price,
          cost: this.product.cost,
          product_category: this.product.product_category,
          product_type: this.product.product_type,
          quantity_on_hand: this.product.quantity_on_hand,
          forecasted_quantity: this.product.forecasted_quantity,
          activity_exception_decoration: this.product.activity_exception_decoration
        }

        console.log('data: ' + JSON.stringify(data))
        this.message = ''
        const response = await ProductDataService.create(data)
        this.product.id = response.data.id
        console.log(response.data)
        this.submitted = true
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message) // Access the error message from the server
      }
    },

    newProduct() {
      this.submitted = false
      this.product = {} as Product
    }
  }
})
</script>

<style></style>
