const API_BASE = 'http://localhost:5000/api'

const request = async (url) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  const result = await response.json()
  return result.data
}

export const api = {
  getProducts: async () => {
    const data = await request(`${API_BASE}/products`)
    return data.products || []
  },

  getProductById: async (id) => {
    const data = await request(`${API_BASE}/products/${id}`)
    return data
  },

  getCategories: async () => {
    const data = await request(`${API_BASE}/categories`)
    return data.categories || data
  },

  getProductsByCategory: async (category) => {
    const data = await request(
      `${API_BASE}/products?category=${encodeURIComponent(category)}`
    )
    return data.products || []
  },

  getProductsByTag: async (tag) => {
    const products = await api.getProducts()
    return products.filter((product) =>
      product.tags?.includes(tag)
    )
  },

  getNewArrivals: async () => {
    const products = await api.getProducts()
    return products.filter((product) => product.badge === 'New')
  },

  getOffers: async () => {
    const products = await api.getProducts()
    return products.filter((product) =>
      product.originalPrice && product.originalPrice > product.price
    )
  },

  searchProducts: async (query) => {
    const data = await request(
      `${API_BASE}/products?search=${encodeURIComponent(query)}`
    )
    return data.products || []
  },
}
