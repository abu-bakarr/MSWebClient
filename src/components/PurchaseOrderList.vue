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
          <router-link to="/add-purchase-order" class="nav-link">Add Purchase Order</router-link>
        </button>
      </div>
    </div>
    <div class="col-md-6 p-2">
      <h4>Purchase Order List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(purchaseOrder, index) in purchaseOrders"
          :key="index"
          @click="setActivePurchaseOrder(purchaseOrder, index)"
        >
          {{ purchaseOrder.order_reference }}
        </li>
      </ul>
    </div>
    <div class="col-md-6 p-2">
      <div v-if="currentPurchaseOrder.id">
        <h4>Product Info</h4>
        <div>
          <label><strong>Order Reference:</strong></label>
          {{ currentPurchaseOrder.order_reference }}
        </div>
        <div>
          <label><strong>Priority:</strong></label>
          {{ currentPurchaseOrder.priority }}
        </div>
        <div>
          <label><strong>Order Deadline:</strong></label>
          {{ currentPurchaseOrder.order_deadline }}
        </div>
        <div>
          <label><strong>Purchase Representative:</strong></label>
          {{ currentPurchaseOrder.purchase_representative }}
        </div>
        <div>
          <label><strong>Order Deadline:</strong></label>
          {{ currentPurchaseOrder.order_deadline }}
        </div>
        <div>
          <label><strong>Total:</strong></label>
          {{ currentPurchaseOrder.total }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentPurchaseOrder.status }}
        </div>
        <button class="btn btn-warning">
          <router-link :to="'/purchase-orders/' + currentPurchaseOrder.id">
            <i class="fas fa-edit"></i> Edit
          </router-link>
        </button>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Purchase Order...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PurchaseOrderDataService from '@/services/PurchaseOrderDataService'
import type PurchaseOrder from '@/types/PurchaseOrder'
import type ResponseData from '@/types/ResponseData'

export default defineComponent({
  name: 'purchase-orders',
  data() {
    return {
      purchaseOrders: [] as PurchaseOrder[],
      currentPurchaseOrder: {} as PurchaseOrder,
      vendoInfo: '',
      currentIndex: -1,
      title: ''
    }
  },
  methods: {
    async retrievePurchaseOrder() {
      try {
        const response = await PurchaseOrderDataService.getAll()
        this.purchaseOrders = response.data

        console.log('her', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async refreshList() {
      await this.retrievePurchaseOrder()
      this.currentPurchaseOrder = {} as PurchaseOrder
      console.log('currentPurchaseOrder', this.currentPurchaseOrder)
      this.currentIndex = -1
    },

    async setActivePurchaseOrder(PurchaseOrder: PurchaseOrder, index = -1) {
      this.currentPurchaseOrder = PurchaseOrder
      this.currentIndex = index
    },

    async searchProduct() {
      await PurchaseOrderDataService.SearchByOrderName(this.title)
        .then((response: ResponseData) => {
          this.purchaseOrders = response.data
          console.log(response.data)
        })
        .catch((e: Error) => {
          console.log(e)
        })
    }
  },
  mounted() {
    this.retrievePurchaseOrder()
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
