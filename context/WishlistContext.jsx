import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext.jsx'
import { API_BASE } from '../services/apiConfig.js'

const WishlistContext = createContext()

function normalizeProduct(p) {
  if (!p) return null
  return {
    id: p._id ? p._id.toString() : p.id,
    name: p.name,
    price: p.price,
    image: p.image || p.images?.[0] || '',
    images: p.images || [],
    sku: p.sku,
    badge: p.badge,
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([])
  const { user, token, isAuthenticated } = useAuth()

  const saveLocal = (newItems) => {
    setItems(newItems)
    localStorage.setItem('wishlist', JSON.stringify(newItems))
  }

  const loadLocal = () => {
    try {
      const stored = localStorage.getItem('wishlist')
      if (stored) setItems(JSON.parse(stored))
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    loadLocal()
  }, [])

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchBackendWishlist()
    } else if (!isAuthenticated) {
      loadLocal()
    }
  }, [isAuthenticated, token])

  const fetchBackendWishlist = async () => {
    if (!token) return
    try {
      const res = await fetch(`${API_BASE}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        const backendProducts = (data.data?.products || []).map(normalizeProduct).filter(Boolean)
        saveLocal(backendProducts)
      }
    } catch {
      // keep local state on network error
    }
  }

  const addItem = async (product) => {
    if (isAuthenticated && token) {
      try {
        const productId = product._id || product.id
        const res = await fetch(`${API_BASE}/wishlist/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
          body: JSON.stringify({ productId }),
        })
        if (res.ok) {
          const data = await res.json()
          const backendProducts = (data.data?.products || []).map(normalizeProduct).filter(Boolean)
          saveLocal(backendProducts)
          return
        }
      } catch {
        // fall through to local update
      }
    }
    setItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev
      const next = [...prev, product]
      localStorage.setItem('wishlist', JSON.stringify(next))
      return next
    })
  }

  const removeItem = async (productId) => {
    if (isAuthenticated && token) {
      try {
        const res = await fetch(`${API_BASE}/wishlist/remove/${productId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        })
        if (res.ok) {
          const data = await res.json()
          const backendProducts = (data.data?.products || []).map(normalizeProduct).filter(Boolean)
          saveLocal(backendProducts)
          return
        }
      } catch {
        // fall through to local update
      }
    }
    setItems((prev) => {
      const next = prev.filter((item) => item.id !== productId)
      localStorage.setItem('wishlist', JSON.stringify(next))
      return next
    })
  }

  const clearWishlist = async () => {
    if (isAuthenticated && token) {
      try {
        await fetch(`${API_BASE}/wishlist/clear`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        })
      } catch {
        // ignore
      }
    }
    saveLocal([])
  }

  const isInWishlist = (productId) => items.some((item) => item.id === productId)

  const toggleWishlist = async (product) => {
    if (isInWishlist(product.id)) {
      await removeItem(product.id)
    } else {
      await addItem(product)
    }
  }

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}



