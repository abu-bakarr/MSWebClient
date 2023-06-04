import http from '@/http-common'

class ProductDataService {
  async getAll(): Promise<any> {
    return await http.get('/products/')
  }

  async get(id: any): Promise<any> {
    return await http.get(`/products/${id}/`)
  }

  async create(data: any): Promise<any> {
    return await http.post('/products/', data)
  }

  async update(id: any, data: any): Promise<any> {
    return await http.put(`/products/${id}/`, data)
  }

  async delete(id: any): Promise<any> {
    return await http.delete(`/products/${id}/`)
  }

  async SearchByProductName(title: string): Promise<any> {
    return await http.get(`search-by-product-name/?name=${title}`)
  }
  async findByProductName(name: string): Promise<any> {
    return await http.get(`product/${name}/`)
  }
}

export default new ProductDataService()
