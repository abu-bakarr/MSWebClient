<template>
  <div v-if="currentVendor.id" class="edit-form container">
    <h4>Vendor Details</h4>

    <form>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="currentVendor.name"
              required
            />
          </div>

          <div class="form-group">
            <label for="related_company">Related Company:</label>
            <input
              type="text"
              class="form-control"
              id="related_company"
              v-model="currentVendor.related_company"
              required
            />
          </div>
          <div class="form-group">
            <label for="address_type">Address Type:</label>
            <input
              type="text"
              class="form-control"
              id="address_type"
              v-model="currentVendor.address_type"
              required
            />
          </div>
          <br />
          <div class="form-group my-2 mx-2">
            <label for="street"></label>
            Is Company:
            <input
              id="checkbox-1"
              v-model="currentVendor.is_company"
              name="checkbox-1"
              type="checkbox"
              value="company"
              unchecked-value="not_company"
            />
          </div>
          <div class="form-group">
            <label for="street">Street:</label>
            <input
              type="text"
              class="form-control"
              id="street"
              v-model="currentVendor.street"
              required
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="zip_code">Zip Code:</label>
            <input
              type="number"
              class="form-control"
              id="zip_code"
              v-model="currentVendor.zip_code"
              required
            />
          </div>
          <div class="form-group">
            <label for="city">City:</label>
            <input
              type="text"
              class="form-control"
              id="city"
              v-model="currentVendor.city"
              required
            />
          </div>
          <div class="form-group">
            <label for="state">State:</label>
            <input
              type="text"
              class="form-control"
              id="state"
              v-model="currentVendor.state"
              required
            />
          </div>
          <div class="form-group">
            <label for="country">Country:</label>
            <input
              type="text"
              class="form-control"
              id="country"
              v-model="currentVendor.country"
              required
            />
          </div>
        </div>
      </div>
      <br />
      <div class="mx-auto text-center">
        <button class="btn btn-danger mr-4" @click="deleteVendor">Delete</button>
        <button type="submit" class="btn pb-2 btn-success" @click="updateVendor">Update</button>
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
      <router-link to="/vendors" class="nav-link">Go to Vendor List</router-link>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VendorDataService from '@/services/VendorDataService.js'
import type Vendor from '@/types/Vendor.js'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'vendor-detail',
  data() {
    return {
      currentVendor: {} as Vendor,
      message: ''
    }
  },
  methods: {
    async getVendor(id: any) {
      try {
        const response = await VendorDataService.get(id)
        this.currentVendor = response.data
        console.log(response.data)
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message) // Access the error message from the server
      }
    },
    goBack() {
      // Replace "/back-url" with the actual URL you want to go back to
      this.$router.push('/vendors')
    },
    async updateVendor() {
      try {
        const response = await VendorDataService.update(this.currentVendor.id, this.currentVendor)
        console.log(response.data)
        this.message = 'The Vendor was updated successfully!'
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message) // Access the error message from the server
      }
    },
    async deleteVendor() {
      try {
        const response = await VendorDataService.delete(this.currentVendor.id)
        console.log(response.data)
        this.$router.push({ name: 'Vendors' })
        this.message = 'The Vendor was deleted successfully!'
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message) // Access the error message from the server
      }
    }
  },

  mounted() {
    this.message = ''
    const vendor = this.$route.params.id
    this.getVendor(vendor)
  }
})
</script>

<style>
/* .edit-form {
  max-width: 300px;
  margin: auto;
} */
</style>
