import http from '@/http-mutipart'
import http2 from '@/http-common'

class PurchaseOrderDataService {
  async getAll(): Promise<any> {
    return await http.get('/purchase-orders/')
  }

  async get(id: any): Promise<any> {
    return await http.get(`/purchase-orders/${id}/`)
  }

  async create(data: any): Promise<any> {
    return await http.post('/purchase-orders/', data)
  }

  async update(id: any, data: any): Promise<any> {
    return await http2.put(`/purchase-orders/${id}/`, data)
  }

  async delete(id: any): Promise<any> {
    return await http2.delete(`/purchase-orders/${id}/`)
  }

  async SearchByOrderName(name: string): Promise<any> {
    return await http.get(`search-by-order-name/?order=${name}`)
  }
}

export default new PurchaseOrderDataService()
