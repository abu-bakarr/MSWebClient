<template>
  <div v-if="currentPurchaseOrderDetail.id" class="edit-form container">
    <h4>Purchase Order</h4>

    <form @submit.prevent="updatePurchaseOrder">
      <div class="row">
        <div class="col-md-6 py-2">
          <div class="form-group py-2">
            <label for="priority">Favorite:</label>
            <input
              type="text"
              class="form-control"
              id="priority"
              v-model="currentPurchaseOrderDetail.priority"
              required
            />
          </div>
          <div class="form-group py-2">
            <label for="order_reference">Product:</label>
            <select
              class="form-control"
              id="order_reference"
              v-model="currentPurchaseOrderDetail.order_reference"
              required
            >
              <option value="" disabled>Select a product</option>
              <option v-for="product in products" :key="product.id!" :value="product.name">
                {{ product.name }}
              </option>
            </select>
          </div>
          <div class="form-group py-2">
            <label for="vendor">Vendor:</label>
            <select class="form-control" id="vendor" v-model="currentPurchaseOrderDetail.vendor">
              <option value="" disabled>Select a vendor</option>
              <option v-for="vendor in vendors" :key="vendor.id!" :value="vendor.id">
                {{ vendor.name }}
              </option>
            </select>
          </div>
          <div class="form-group py-2">
            <label for="purchase_representative">Purchase Representative:</label>
            <input
              type="text"
              class="form-control"
              id="purchase_representative"
              v-model="currentPurchaseOrderDetail.purchase_representative"
              required
            />
          </div>
          <div class="form-group py-2 py-2">
            <label for="order_deadline">Order Deadline:</label>
            <input
              type="date"
              id="order_deadline"
              class="ml-2"
              v-model="currentPurchaseOrderDetail.order_deadline"
              required
              @change="handleDateChange"
            />
          </div>
        </div>
        <div class="col-md-6 py-2">
          <div class="form-group py-2">
            <label for="activities">Activites:</label>
            <input
              type="text"
              class="form-control"
              id="activities"
              v-model="currentPurchaseOrderDetail.activities"
              required
            />
          </div>
          <div class="form-group py-2">
            <label for="total">Total:</label>
            <input
              type="decimal"
              class="form-control"
              id="total"
              v-model="currentPurchaseOrderDetail.total"
              required
            />
          </div>
          <div class="form-group py-2">
            <label for="status">Status:</label>
            <input
              type="text"
              class="form-control"
              id="status"
              v-model="currentPurchaseOrderDetail.status"
              required
            />
          </div>
          <div class="form-group py-2">
            <label for="source_document">File:</label>
            <input
              type="file"
              class="form-control"
              id="source_document"
              @change="handleFileChange"
            />
          </div>
        </div>
      </div>
      <br />
      <div class="mx-auto text-center">
        <button class="btn btn-danger" @click="deletePurchaseOrder">Delete</button>
        <button type="submit" class="btn pb-2 btn-success" @click="updatePurchaseOrder">
          Update
        </button>
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
      <router-link to="/purchase-orders" class="nav-link">Go to Purchase Order List</router-link>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PurchaseOrderDataService from '@/services/PurchaseOrderDataService.js'
import type PurchaseOrder from '@/types/PurchaseOrder.js'
import ProductDataService from '@/services/ProductDataService'
import VendorDataService from '@/services/VendorDataService'
import type Product from '@/types/Product'
import type Vendor from '@/types/Vendor'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'purchase-order',
  data() {
    return {
      currentPurchaseOrderDetail: {} as PurchaseOrder,
      products: [] as Product[],
      vendors: [] as Vendor[],
      date: '',
      message: ''
    }
  },
  methods: {
    handleFileChange(event: any) {
      const file = event.target.files[0]
      this.currentPurchaseOrderDetail.source_document = file
    },

    goBack() {
      this.$router.push('/purchase-orders')
    },

    async getProducts() {
      try {
        const response = await ProductDataService.getAll()
        this.products = response.data as Product[]
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message)
      }
    },

    handleDateChange() {
      const selectedDate = new Date(this.currentPurchaseOrderDetail.order_deadline)
      const formattedDate = selectedDate.toLocaleDateString('en-GB')
      this.date = formattedDate
      console.log('Date changed:', this.date)
    },

    async getVendors() {
      try {
        const response = await VendorDataService.getAll()
        this.vendors = response.data as Vendor[]
      } catch (error: any) {
        this.message = 'Select appropriate Vendo'
        console.log(error.response.data.message)
      }
    },

    async getPurchaseOrder(id: any) {
      try {
        const response = await PurchaseOrderDataService.get(id)
        this.currentPurchaseOrderDetail = response.data
        console.log('this.currentPurchaseOrderDetail', this.currentPurchaseOrderDetail.vendor)
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message)
      }
    },

    async updatePurchaseOrder() {
      try {
        const response = await PurchaseOrderDataService.update(
          this.currentPurchaseOrderDetail.id,
          this.currentPurchaseOrderDetail
        )
        console.log(response.data)
        this.message = 'The order was updated successfully!'
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message)
      }
    },

    async deletePurchaseOrder() {
      try {
        const response = await PurchaseOrderDataService.delete(this.currentPurchaseOrderDetail.id)
        console.log(response.data)
        this.message = 'Delete the order successfully!'
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message)
      }
    }
  },

  mounted() {
    this.getProducts()
    this.getVendors()
    this.message = ''
    const productId = this.$route.params.id
    this.getPurchaseOrder(productId)
  }
})
</script>

<style>
/* .edit-form {
  max-width: 300px;
  margin: auto;
} */
</style>
