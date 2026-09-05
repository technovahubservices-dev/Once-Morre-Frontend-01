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
}
