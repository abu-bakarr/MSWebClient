import http from '@/http-common'

class VendorDataService {
  async getAll(): Promise<any> {
    return await http.get('/vendors/')
  }

  async get(id: any): Promise<any> {
    return await http.get(`/vendors/${id}/`)
  }

  async create(data: any): Promise<any> {
    return await http.post('/vendors/', data)
  }

  async update(id: any, data: any): Promise<any> {
    return await http.put(`/vendors/${id}/`, data)
  }

  async delete(id: any): Promise<any> {
    return await http.delete(`/vendors/${id}/`)
  }

  async findByVendorName(name: string): Promise<any> {
    return await http.get(`search-by-vendor-name/?name=${name}`)
  }
}

export default new VendorDataService()
