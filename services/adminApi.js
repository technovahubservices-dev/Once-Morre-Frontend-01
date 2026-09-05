import { API_BASE } from './apiConfig.js'

export const adminApi = {
  uploadProductImage: async (token, file) => {
    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch(`${API_BASE}/products/upload-image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData,
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to upload image')
    return data
  },
  getDashboardStats: async (token) => {
    const [productsRes, categoriesRes, usersRes, ordersRes, inventoryRes, lowStockRes] = await Promise.all([
      fetch(`${API_BASE}/products?limit=1`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      }),
      fetch(`${API_BASE}/categories`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      }),
      fetch(`${API_BASE}/users`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      }),
      fetch(`${API_BASE}/orders/all?limit=1`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      }),
      fetch(`${API_BASE}/inventory`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      }),
      fetch(`${API_BASE}/inventory/low-stock`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      }),
    ])

    const productsData = await productsRes.json()
    const categoriesData = await categoriesRes.json()
    const usersData = await usersRes.json()
    const ordersData = await ordersRes.json()
    const inventoryData = await inventoryRes.json()
    const lowStockData = await lowStockRes.json()

    return {
      totalProducts: productsData.data?.pagination?.total || 0,
      totalCategories: categoriesData.data?.length || 0,
      totalUsers: usersData.data?.length || 0,
      totalOrders: ordersData.data?.pagination?.total || 0,
      totalInventory: inventoryData.data?.length || 0,
      lowStockCount: lowStockData.data?.length || 0,
    }
  },

  getProducts: async (token, page = 1, limit = 10, search = '') => {
    const url = new URL(`${API_BASE}/products`)
    url.searchParams.set('page', page)
    url.searchParams.set('limit', limit)
    if (search) url.searchParams.set('search', search)

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch products')
    return data
  },

  createProduct: async (token, productData) => {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(productData),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to create product')
    return data
  },

  updateProduct: async (token, id, productData) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(productData),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to update product')
    return data
  },

  deleteProduct: async (token, id) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to delete product')
    return data
  },

  getCategories: async (token) => {
    const res = await fetch(`${API_BASE}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch categories')
    return data
  },

  createCategory: async (token, categoryData) => {
    const res = await fetch(`${API_BASE}/categories`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(categoryData),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to create category')
    return data
  },

  updateCategory: async (token, id, categoryData) => {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(categoryData),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to update category')
    return data
  },

  deleteCategory: async (token, id) => {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to delete category')
    return data
  },

  getUsers: async (token) => {
    const res = await fetch(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch users')
    return data
  },

  updateUser: async (token, id, userData) => {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to update user')
    return data
  },

  deleteUser: async (token, id) => {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to delete user')
    return data
  },

  getOrders: async (token, page = 1, limit = 20) => {
    const url = new URL(`${API_BASE}/orders/all`)
    url.searchParams.set('page', page)
    url.searchParams.set('limit', limit)

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch orders')
    return data
  },

  updateOrderStatus: async (token, id, status) => {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ status }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to update order status')
    return data
  },

  getInventory: async (token) => {
    const res = await fetch(`${API_BASE}/inventory`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch inventory')
    return data
  },

  getLowStock: async (token) => {
    const res = await fetch(`${API_BASE}/inventory/low-stock`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch low stock')
    return data
  },

  getInventoryByProduct: async (token, productId) => {
    const res = await fetch(`${API_BASE}/inventory/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch inventory')
    return data
  },

  createInventory: async (token, inventoryData) => {
    const res = await fetch(`${API_BASE}/inventory`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(inventoryData),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to create inventory')
    return data
  },

  updateInventory: async (token, productId, inventoryData) => {
    const res = await fetch(`${API_BASE}/inventory/${productId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(inventoryData),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to update inventory')
    return data
  },

  adjustStock: async (token, productId, adjustmentData) => {
    const res = await fetch(`${API_BASE}/inventory/${productId}/adjust`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(adjustmentData),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to adjust stock')
    return data
  },

  getStockAdjustments: async (token, productId) => {
    const res = await fetch(`${API_BASE}/inventory/${productId}/adjustments`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch stock adjustments')
    return data
  },

  getAllOrders: async (token) => {
    const allOrders = []
    let page = 1
    const limit = 100

    while (true) {
      const url = new URL(`${API_BASE}/orders/all`)
      url.searchParams.set('page', page)
      url.searchParams.set('limit', limit)

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to fetch orders')

      const orders = data.data?.orders || []
      allOrders.push(...orders)

      const totalPages = data.data?.pagination?.pages || 1
      if (page >= totalPages) break
      page++
    }

    return { data: { orders: allOrders } }
  },

  getUsers: async (token) => {
    const res = await fetch(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch users')
    return data
  },
}

