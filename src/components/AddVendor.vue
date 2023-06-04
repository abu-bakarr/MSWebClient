<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <form @submit.prevent="saveVendor">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" class="form-control" id="name" v-model="vendor.name" required />
            </div>

            <div class="form-group">
              <label for="related_company">Related Company:</label>
              <input
                type="text"
                class="form-control"
                id="related_company"
                v-model="vendor.related_company"
                required
              />
            </div>
            <div class="form-group">
              <label for="address_type">Address Type:</label>
              <input
                type="text"
                class="form-control"
                id="address_type"
                v-model="vendor.address_type"
                required
              />
            </div>
            <br />
            <div class="form-group my-2 mx-2">
              <label for="street"></label>
              Is Company:
              <input
                id="checkbox-1"
                v-model="vendor.is_company"
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
                v-model="vendor.street"
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
                v-model="vendor.zip_code"
                required
              />
            </div>
            <div class="form-group">
              <label for="city">City:</label>
              <input type="text" class="form-control" id="city" v-model="vendor.city" required />
            </div>
            <div class="form-group">
              <label for="state">State:</label>
              <input type="text" class="form-control" id="state" v-model="vendor.state" required />
            </div>
            <div class="form-group">
              <label for="country">Country:</label>
              <input
                type="text"
                class="form-control"
                id="country"
                v-model="vendor.country"
                required
              />
            </div>
          </div>
        </div>
        <br />
        <div class="mx-auto">
          <button @click="saveVendor" type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
      <p>{{ message }}</p>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newVendor">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VendorDataService from '@/services/VendorDataService.js'
import type Vendor from '@/types/Vendor'

export default defineComponent({
  name: 'add-vendor',
  data() {
    return {
      message: '',
      vendor: {
        id: null,
        name: '',
        is_company: false,
        related_company: '',
        address_type: '',
        street: '',
        zip_code: '',
        city: '',
        state: '',
        country: ''
      } as Vendor,
      submitted: false
    }
  },
  methods: {
    async saveVendor() {
      try {
        let data = {
          name: this.vendor.name,
          is_company: this.vendor.is_company,
          related_company: this.vendor.related_company,
          address_type: this.vendor.address_type,
          street: this.vendor.street,
          zip_code: this.vendor.zip_code,
          city: this.vendor.city,
          state: this.vendor.state,
          country: this.vendor.country
        }
        console.log('data: ' + JSON.stringify(data))

        const response = await VendorDataService.create(data)
        this.vendor.id = response.data.id
        console.log(response.data)
        this.submitted = true
      } catch (error: any) {
        this.message = error.response.data.message
        console.log(error.response.data.message)
      }
    },

    newVendor() {
      this.submitted = false
      this.vendor = {} as Vendor
    }
  }
})
</script>

<style></style>
