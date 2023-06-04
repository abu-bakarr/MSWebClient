import type Product from './Product'
import type Vendor from './Vendor'

export default interface PurchaseOrder {
  id: string
  priority: string
  order_reference: Product
  vendor: Vendor
  purchase_representative: string
  order_deadline: Date
  activities: string
  source_document: File
  total: number
  status: string
}
