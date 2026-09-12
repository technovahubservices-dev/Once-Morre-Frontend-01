import { API_BASE } from './apiConfig.js'

export const subscriptionApi = {
  activate: async (token, payload) => {
    const res = await fetch(`${API_BASE}/subscriptions/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to activate subscription')
    }
    return data.data
  },

  getMySubscriptions: async (token) => {
    const res = await fetch(`${API_BASE}/subscriptions/my-subscriptions`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch subscriptions')
    }
    return data.data
  },

  getActiveSubscription: async (token) => {
    const res = await fetch(`${API_BASE}/subscriptions/my-active-subscription`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch active subscription')
    }
    return data.data
  },

  cancel: async (token, subscriptionId) => {
    const res = await fetch(`${API_BASE}/subscriptions/${subscriptionId}/cancel`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to cancel subscription')
    }
    return data
  },

  pause: async (token, subscriptionId) => {
    const res = await fetch(`${API_BASE}/subscriptions/${subscriptionId}/pause`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to pause subscription')
    }
    return data
  },

  resume: async (token, subscriptionId) => {
    const res = await fetch(`${API_BASE}/subscriptions/${subscriptionId}/resume`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to resume subscription')
    }
    return data
  },
  getAllAdmin: async (token, params = {}) => {
    const query = new URLSearchParams(params).toString()
    const res = await fetch(`${API_BASE}/subscriptions/admin/all?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch subscriptions')
    return data.data
  },

  getStatsAdmin: async (token) => {
    const res = await fetch(`${API_BASE}/subscriptions/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch subscription stats')
    return data.data
  },

  getPlans: async () => {
    const res = await fetch(`${API_BASE}/subscriptions/plans`, {
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch subscription plans')
    }
    return data.data
  },
  getPlansAdmin: async (token) => {
    const res = await fetch(`${API_BASE}/subscriptions/admin/plans`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch subscription plans')
    }
    return data.data
  },

  createPlanAdmin: async (token, payload) => {
    const res = await fetch(`${API_BASE}/subscriptions/admin/plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to create subscription plan')
    }
    return data.data
  },

  updatePlanAdmin: async (token, planId, payload) => {
    const res = await fetch(`${API_BASE}/subscriptions/admin/plans/${planId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to update subscription plan')
    }
    return data.data
  },

  deletePlanAdmin: async (token, planId) => {
    const res = await fetch(`${API_BASE}/subscriptions/admin/plans/${planId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to delete subscription plan')
    }
    return data.data
  },
  updateAdmin: async (token, subscriptionId, payload) => {
    const res = await fetch(`${API_BASE}/subscriptions/admin/${subscriptionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to update subscription')
    return data.data
  },
}
