import { createWebHistory, createRouter } from 'vue-router'
import { type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/products',
    name: 'products',
    component: () => import('@/components/ProductsList.vue')
  },
  {
    path: '/products/:id',
    name: 'product-details',
    component: () => import('@/components/ProductDetails.vue')
  },
  {
    path: '/add-product',
    name: 'add-product',
    component: () => import('@/components/AddProduct.vue')
  },
  {
    path: '/vendors',
    alias: '/vendors',
    name: 'vendors',
    component: () => import('@/components/VendorList.vue')
  },
  {
    path: '/vendors/:id',
    name: 'vendor-details',
    component: () => import('@/components/VendorDetails.vue')
  },
  {
    path: '/add-vendor',
    name: 'add-vendor',
    component: () => import('@/components/AddVendor.vue')
  },
  {
    path: '/purchase-orders',
    alias: '/purchase-orders',
    name: 'purchase-orders',
    component: () => import('@/components/PurchaseOrderList.vue')
  },
  {
    path: '/purchase-orders/:id',
    name: 'purchase-order-details',
    component: () => import('@/components/PurchaseOrderDetails.vue')
  },
  {
    path: '/add-purchase-order',
    name: 'add-purchase-order',
    component: () => import('@/components/AddPurchaseOrder.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
