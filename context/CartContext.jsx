import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext.jsx'
import { API_BASE } from '../services/apiConfig.js'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const { token, isAuthenticated } = useAuth()

  const saveLocal = (newItems) => {
    setItems(newItems)

    const storageItems = newItems.map((item) => ({
      _id: item._id,
      id: item._id,
      name: item.name || '',
      price: item.price || 0,
      quantity: item.quantity || 1,
      size: item.size,
    }))

    localStorage.setItem('cart', JSON.stringify(storageItems))
  }

  const loadLocal = () => {
    try {
      const stored = localStorage.getItem('cart')

      if (!stored) {
        setItems([])
        return
      }

      const parsed = JSON.parse(stored)

      const validItems = Array.isArray(parsed)
        ? parsed.filter((item) => {
            const productId = item?._id || item?.id
            return typeof productId === 'string' && productId.length === 24
          })
        : []

      setItems(validItems)

      if (validItems.length !== parsed.length) {
        const storageItems = validItems.map((item) => ({
          _id: item._id || item.id,
          id: item._id || item.id,
          name: item.name || '',
          price: item.price || 0,
          quantity: item.quantity || 1,
          size: item.size,
        }))

        localStorage.setItem('cart', JSON.stringify(storageItems))
      }
    } catch {
      localStorage.removeItem('cart')
      setItems([])
    }
  }

  useEffect(() => {
    if (isAuthenticated && token) {
      loadBackendCart()
    } else if (!isAuthenticated) {
      loadLocal()
    }
  }, [isAuthenticated, token])

  const loadBackendCart = async () => {
    if (!token) return

    try {
      const res = await fetch(`${API_BASE}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      })

      if (!res.ok) return

      const data = await res.json()

      const backendItems = (data.data?.items || [])
        .map((item) => {
          const productId = item.product?._id?.toString()

          if (!productId) return null

          return {
            _id: productId,
            id: productId,
            name: item.product?.name || item.name,
            price: item.product?.price ?? item.price ?? 0,
            image: item.product?.image || item.product?.images?.[0] || item.image || item.images?.[0] || '',
            images: item.product?.images || [],
            sku: item.product?.sku || item.sku,
            quantity: item.quantity || 1,
            size: item.size,
            category: item.product?.category,
            description: item.product?.description,
            badge: item.product?.badge,
            rating: item.product?.rating,
            reviews: item.product?.reviews,
            discount: item.product?.discount,
            originalPrice: item.product?.originalPrice,
            tags: item.product?.tags || [],
            collection: item.product?.collection,
            _backendItemId: item._id?.toString(),
          }
        })
        .filter(Boolean)

      saveLocal(backendItems)
    } catch {
      // Keep current local cart if backend request fails.
    }
  }

  const syncToBackend = async () => {
    if (!token || !isAuthenticated) return false

    try {
      await fetch(`${API_BASE}/cart/clear`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      })
    } catch {
      // Continue and attempt to add items.
    }

    for (const item of items) {
      const productId = item._id

      // Never send numeric legacy IDs to MongoDB.
      if (!productId || productId.length !== 24) continue

      try {
        await fetch(`${API_BASE}/cart/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
          body: JSON.stringify({
            productId,
            quantity: item.quantity || 1,
            size: item.size,
          }),
        })
      } catch {
        // Continue with next item.
      }
    }

    await loadBackendCart()
    return true
  }

  const addItem = (product) => {
    // Products must come from MongoDB.
    const productId = product?._id?.toString()

    if (!productId || productId.length !== 24) {
      console.error('Cannot add product without a valid MongoDB _id:', product)
      return
    }

    setItems((prev) => {
      const existing = prev.find(
        (item) => item._id === productId
      )

      if (existing) {
        const next = prev.map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity: (item.quantity || 0) + 1,
              }
            : item
        )

        saveLocal(next)
        return next
      }

      const next = [
        ...prev,
        {
          ...product,
          _id: productId,
          id: productId,
          quantity: 1,
        },
      ]

      saveLocal(next)
      return next
    })
  }

  const removeItem = (productId) => {
    setItems((prev) => {
      const next = prev.filter(
        (item) => item._id !== productId
      )

      saveLocal(next)
      return next
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setItems((prev) => {
      const next = prev.map((item) =>
        item._id === productId
          ? { ...item, quantity }
          : item
      )

      saveLocal(next)
      return next
    })
  }

  const clearCart = () => {
    saveLocal([])
  }

  const cartCount = items.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  )

  const cartTotal = items.reduce(
    (sum, item) =>
      sum + (item.price || 0) * (item.quantity || 0),
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        loadBackendCart,
        syncToBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context
}













