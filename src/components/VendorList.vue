<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="d-flex justify-content-start mb-3">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search by vendor name"
            v-model="name"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="searchVendor">
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center mb-3">
        <button class="btn btn-primary">
          <router-link to="/add-vendor" class="nav-link">Add Vendor</router-link>
        </button>
      </div>
    </div>
    <div class="col-md-6 p-2">
      <h4>Vendors List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(vendor, index) in vendors"
          :key="index"
          @click="setActiveVendor(vendor, index)"
        >
          {{ vendor.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6 p-2">
      <div v-if="currentVendor.id">
        <h4>Vendor Info</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentVendor.name }}
        </div>
        <div>
          <label><strong>Street:</strong></label>
          {{ currentVendor.street }}
        </div>
        <div>
          <label><strong>Related Company:</strong></label>
          {{ currentVendor.related_company }}
        </div>
        <div>
          <label><strong>City:</strong></label>
          {{ currentVendor.city }}
        </div>
        <div>
          <label><strong>Country:</strong></label>
          {{ currentVendor.country }}
        </div>
        <button class="btn btn-warning">
          <router-link :to="'/vendors/' + currentVendor.id">
            <i class="fas fa-edit"></i> Edit
          </router-link>
        </button>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Vendor...</p>
      </div>
    </div>
  </div>
  <p>{{ message }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VendorDataService from '@/services/VendorDataService'
import type Vendor from '@/types/Vendor'

export default defineComponent({
  name: 'vendors-list',
  data() {
    return {
      vendors: [] as Vendor[],
      currentVendor: {} as Vendor,
      currentIndex: -1,
      name: '',
      message: ''
    }
  },
  methods: {
    async retrieveVendors() {
      try {
        const response = await VendorDataService.getAll()
        this.vendors = response.data
        console.log(response.data)
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message) // Access the error message from the server
      }
    },
    async searchVendor() {
      try {
        const response = await VendorDataService.findByVendorName(this.name)
        this.vendors = response.data
        console.log(response.data)
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message) // Access the error message from the server
      }
    },
    refreshList() {
      this.retrieveVendors()
      this.currentVendor = {} as Vendor
      this.currentIndex = -1
    },
    setActiveVendor(vendor: Vendor, index = -1) {
      this.currentVendor = vendor
      this.currentIndex = index
    }
  },

  mounted() {
    this.retrieveVendors()
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
