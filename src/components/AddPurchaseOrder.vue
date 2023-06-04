<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <form @submit.prevent="savePurchaseOrder" enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-6 py-2">
            <div class="form-group py-2">
              <label for="priority">Favorite:</label>
              <input
                type="text"
                class="form-control"
                id="priority"
                v-model="purchase_order.priority"
                required
              />
            </div>
            <div class="form-group py-2">
              <label for="order_reference">Product:</label>
              <select
                class="form-control"
                id="order_reference"
                v-model="purchase_order.order_reference"
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
              <select class="form-control" id="vendor" v-model="purchase_order.vendor" required>
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
                v-model="purchase_order.purchase_representative"
                required
              />
            </div>
            <div class="form-group py-2 py-2">
              <label for="order_deadline">Order Deadline:</label>
              <input
                type="date"
                id="order_deadline"
                class="ml-2"
                v-model="purchase_order.order_deadline"
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
                v-model="purchase_order.activities"
                required
              />
            </div>
            <div class="form-group py-2">
              <label for="total">Total:</label>
              <input
                type="number"
                class="form-control"
                id="total"
                v-model="purchase_order.total"
                required
              />
            </div>
            <div class="form-group py-2">
              <label for="status">Status:</label>
              <input
                type="text"
                class="form-control"
                id="status"
                v-model="purchase_order.status"
                required
              />
            </div>
            <div class="form-group py-2">
              <label for="source_document">File Submitted:</label>
              <input
                type="file"
                class="form-control"
                id="source_document"
                ref="sourceDocument"
                @change="handleFileChange"
              />
            </div>
          </div>
        </div>
        <br />
        <div class="mx-auto">
          <button @click="savePurchaseOrder" type="submit" class="btn btn-primary">Submit</button>
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
import type PurchaseOrder from '@/types/PurchaseOrder.js'
import type ResponseData from '@/types/ResponseData'
import PurchaseOrderDataService from '@/services/PurchaseOrderDataService'
import ProductDataService from '@/services/ProductDataService'
import VendorDataService from '@/services/VendorDataService'
import type Product from '@/types/Product'
import type Vendor from '@/types/Product'

export default defineComponent({
  name: 'add-purchase-order',
  data() {
    return {
      currentPurchaseOrderDetail: {
        order_reference: '',
        source_document: ''
      } as unknown as PurchaseOrder,
      products: [] as Product[],
      vendors: [] as Vendor[],
      date: '',
      message: '',
      purchase_order: {
        id: null,
        priority: '',
        order_reference: '',
        vendor: '',
        purchase_representative: '',
        order_deadline: '',
        activities: '',
        source_document: '',
        total: '',
        status: ''
      } as unknown as PurchaseOrder,
      submitted: false
    }
  },
  methods: {
    handleFileChange(event: any) {
      const file = event.target.files[0]
      this.currentPurchaseOrderDetail.source_document = file
    },
    handleDateChange() {
      // Get the selected date from the input
      const selectedDate = new Date(this.purchase_order.order_deadline)

      // Format the date as 'YYYY-MM-DD'
      const formattedDate = selectedDate.toISOString().substr(0, 10)

      // Update the 'order_deadline' property with the formatted date
      this.date = formattedDate

      console.log('Date changed:', this.date)
    },

    async getProducts() {
      try {
        const response = await ProductDataService.getAll()
        this.products = response.data as Product[]
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message) // Access the error message from the server
      }
    },
    async getVendors() {
      try {
        const response = await VendorDataService.getAll()
        this.vendors = response.data as Vendor[]
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message) // Access the error message from the server
      }
    },

    async savePurchaseOrder() {
      try {
        const formData = new FormData()

        // Append form fields to the FormData object
        formData.append('priority', this.purchase_order.priority)
        formData.append('order_reference', String(this.purchase_order.order_reference))
        formData.append('vendor', this.purchase_order.vendor.toString())
        formData.append('purchase_representative', this.purchase_order.purchase_representative)
        formData.append('order_deadline', this.date)
        formData.append('activities', this.purchase_order.activities)
        formData.append('total', this.purchase_order.total.toString())
        formData.append('status', this.purchase_order.status)

        // Get the file input element
        const fileInput = this.$refs.sourceDocument as HTMLInputElement

        // Check if a file is selected
        if (fileInput && fileInput.files!.length > 0) {
          // Get the first file from the FileList
          const file = fileInput.files![0]
          // Append the file to the FormData object
          formData.append('source_document', file, file.name)
        }

        const response = await PurchaseOrderDataService.create(formData)
        this.purchase_order.id = response.data.id
        console.log('response.data', response.data)
        this.submitted = true
      } catch (error: any) {
        console.log(error)
        this.message = 'Cannot Purchase same product, please select another product' // Access the error message from the server
      }
    },

    newProduct() {
      this.getProducts()
      this.getVendors()
      this.submitted = false
      this.purchase_order = {} as PurchaseOrder
    }
  },

  mounted() {
    this.getProducts()
    this.getVendors()
    this.message = ''
  }
})
</script>

<style></style>
