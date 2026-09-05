import { createContext, useContext, useState, useEffect } from 'react'
import { API_BASE } from '../services/apiConfig.js'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  const isAuthenticated = !!user && !!token

  const checkAuth = async () => {
    const storedToken = localStorage.getItem('token')
    if (!storedToken) {
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
        credentials: 'include',
      })

      if (res.ok) {
        const data = await res.json()
        setUser(data.data)
        setToken(storedToken)
      } else {
        localStorage.removeItem('token')
        setUser(null)
        setToken(null)
      }
    } catch {
      localStorage.removeItem('token')
      setUser(null)
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Login failed')
    }

    const { token: newToken, user: userData } = data.data

    localStorage.setItem('token', newToken)
    setToken(newToken)
    setUser(userData)

    return userData
  }

  const register = async (name, email, password) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    // Auto-login after successful registration
    return login(email, password)
  }

  const logout = async () => {
    try {
      if (token) {
        await fetch(`${API_BASE}/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        })
      }
    } catch {
      // ignore network errors during logout
    } finally {
      localStorage.removeItem('token')
      setUser(null)
      setToken(null)
    }
  }

  const updateUser = (userData) => {
    setUser(userData)
  }

  const changePassword = async (currentPassword, newPassword) => {
    const res = await fetch(`${API_BASE}/auth/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ currentPassword, newPassword }),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to change password')
    }

    return data
  }

  const addAddress = async (addressData) => {
    const res = await fetch(`${API_BASE}/auth/addresses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(addressData),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to add address')
    }

    return data
  }

  const updateAddress = async (addressId, addressData) => {
    const res = await fetch(`${API_BASE}/auth/addresses/${addressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(addressData),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to update address')
    }

    return data
  }

  const deleteAddress = async (addressId) => {
    const res = await fetch(`${API_BASE}/auth/addresses/${addressId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to delete address')
    }

    return data
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, loading, login, register, logout, updateUser, checkAuth, changePassword, addAddress, updateAddress, deleteAddress }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
