import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { API_BASE } from '../services/apiConfig.js'

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: 'credit_card' },
  { id: 'upi', label: 'UPI', icon: 'account_balance_wallet' },
  { id: 'cod', label: 'Cash on Delivery', icon: 'payments' },
]

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [orderConfirmation, setOrderConfirmation] = useState(null)
  const [productImages, setProductImages] = useState({})

  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0)

  useEffect(() => {
    const loadCheckoutImages = async () => {
      const imageMap = {}

      for (const item of items) {
        const productId = item._id || item.id

        if (!productId) continue

        try {
          const response = await fetch(`${API_BASE}/products/${productId}`)
          const data = await response.json()
          const product = data.data || data

          imageMap[productId] =
            product.image || product.images?.[0] || ''
        } catch {
          // Keep going if one product image fails.
        }
      }

      setProductImages(imageMap)
    }

    if (items.length > 0) {
      loadCheckoutImages()
    }
  }, [items])
  const tax = Math.round(cartTotal * 0.06)
  const shipping = cartTotal > 500 ? 0 : 50
  const total = cartTotal + tax + shipping

  const [form, setForm] = useState({
    fullName: user?.name || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    paymentMethod: 'card',
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          shippingAddress: form,
          paymentMethod: form.paymentMethod,
          items: items.map((item) => ({
            productId: item._id || item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity || 1,
            size: item.size,
            sku: item.sku,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to place order')
      }

      clearCart()
      setOrderConfirmation(data.data)
      setStep(3)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 text-center">
        <p className="font-body-md text-body-md text-on-surface-variant">Redirecting to login...</p>
      </div>
    )
  }

  if (orderConfirmation) {
    return (
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24">
        <div className="max-w-2xl mx-auto text-center">
          <span className="material-symbols-outlined text-6xl text-green-600 mb-6 block">check_circle</span>
          <h1 className="font-headline-lg text-headline-lg text-deep-emerald mb-4">Order Confirmed!</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-2">
            Thank you for your order.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Order #{orderConfirmation._id?.toString().slice(-8).toUpperCase()}
          </p>

          <div className="bg-surface-white border border-outline-variant rounded p-8 text-left mb-8">
            <h3 className="font-headline-md text-headline-md text-deep-emerald mb-4">Order Details</h3>
            <div className="space-y-3 font-body-md text-body-md">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal ({itemCount} items)</span>
                <span className="font-body-md text-body-md text-on-surface tabular-nums">₹ {orderConfirmation.subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Tax</span>
                <span className="font-body-md text-body-md text-on-surface tabular-nums">₹ {orderConfirmation.tax?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Delivery</span>
                <span className="font-body-md text-body-md text-on-surface tabular-nums">{orderConfirmation.shipping === 0 ? 'Free' : `₹ ${orderConfirmation.shipping?.toLocaleString()}`}</span>
              </div>
              <div className="border-t border-outline-variant pt-3 flex justify-between font-headline-md text-headline-md text-deep-emerald">
                <span>Total</span>
                <span className="font-body-md text-body-md text-on-surface tabular-nums">₹ {orderConfirmation.total?.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-outline-variant">
              <h4 className="font-headline-md text-headline-md text-deep-emerald mb-2">Shipping Address</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {orderConfirmation.shippingAddress?.fullName}, {orderConfirmation.shippingAddress?.street}, {orderConfirmation.shippingAddress?.city} - {orderConfirmation.shippingAddress?.zipCode}
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                {orderConfirmation.shippingAddress?.state}, {orderConfirmation.shippingAddress?.country}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="font-body-md text-body-md text-on-surface-variant">Status:</span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${
                orderConfirmation.orderStatus === 'confirmed'
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-outline-variant/20 text-on-surface-variant border-outline-variant/30'
              }`}>
                {orderConfirmation.orderStatus === 'confirmed' && (
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                )}
                {orderConfirmation.orderStatus}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/account/orders"
              className="bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded hover:bg-deep-emerald/90 transition-colors"
            >
              View Order History
            </Link>
            <Link
              to="/collections"
              className="bg-transparent border border-outline-variant text-deep-emerald font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded hover:bg-surface-container-low transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0 && step !== 3) {
    return (
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 text-center">
        <h1 className="font-headline-lg text-headline-lg text-deep-emerald mb-4">Your Dairy Basket is Empty</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8">
          Add some products before checkout.
        </p>
        <Link
          to="/collections"
          className="inline-block bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded hover:bg-deep-emerald/90 transition-colors"
        >
          Explore Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <h1 className="font-headline-lg text-headline-lg text-deep-emerald mb-12">Checkout</h1>

      {error && (
        <div className="mb-6 p-4 bg-error-container text-error rounded text-sm max-w-3xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          {step === 1 && (
            <div>
              <h2 className="font-headline-md text-headline-md text-deep-emerald mb-6">Delivery Information</h2>
              <form onSubmit={(e) => { e.preventDefault(); setStep(2) }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body-md text-body-md text-deep-emerald mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      className="w-full bg-surface-white border border-surface-container-highest rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold focus:border-regal-gold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-body-md text-body-md text-deep-emerald mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-surface-white border border-surface-container-highest rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold focus:border-regal-gold"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    className="w-full bg-surface-white border border-surface-container-highest rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold focus:border-regal-gold"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block font-body-md text-body-md text-deep-emerald mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full bg-surface-white border border-surface-container-highest rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold focus:border-regal-gold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-body-md text-body-md text-deep-emerald mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="w-full bg-surface-white border border-surface-container-highest rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold focus:border-regal-gold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-body-md text-body-md text-deep-emerald mb-2">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={form.zipCode}
                      onChange={handleChange}
                      className="w-full bg-surface-white border border-surface-container-highest rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold focus:border-regal-gold"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded hover:bg-deep-emerald/90 transition-colors"
                >
                  Continue to Review
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-headline-md text-headline-md text-deep-emerald mb-6">Review & Place Order</h2>

              <div className="mb-8">
                <h3 className="font-body-md text-sm uppercase tracking-widest text-on-surface-variant mb-4">Shipping Address</h3>
                <p className="font-body-md text-body-md text-deep-emerald">
                  {form.fullName}, {form.street}, {form.city} - {form.zipCode}
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {form.state}, {form.country}
                </p>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-label-caps text-label-caps text-deep-emerald border-b border-deep-emerald mt-2 pb-1 hover:text-regal-gold hover:border-regal-gold transition-colors"
                >
                  Edit Address
                </button>
              </div>

              <div className="mb-8">
                <h3 className="font-body-md text-sm uppercase tracking-widest text-on-surface-variant mb-4">Payment Method</h3>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 border rounded cursor-pointer transition-colors ${
                        form.paymentMethod === method.id
                          ? 'border-deep-emerald bg-surface-container-low'
                          : 'border-outline-variant hover:border-deep-emerald'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={form.paymentMethod === method.id}
                        onChange={handleChange}
                        className="accent-deep-emerald"
                      />
                      <span className="material-symbols-outlined text-deep-emerald">{method.icon}</span>
                      <span className="font-body-md text-body-md text-deep-emerald">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-body-md text-sm uppercase tracking-widest text-on-surface-variant mb-4">Order Items</h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-soft-cream rounded overflow-hidden flex-shrink-0">
                        <img src={productImages[item._id || item.id] || item.image || ""} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-body-md text-sm text-deep-emerald">{item.name}</p>
                        <p className="font-body-md text-xs text-on-surface-variant">Qty: {item.quantity || 1}</p>
                      </div>
                      <p className="font-body-md text-sm text-deep-emerald tabular-nums">
                        ₹ {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={loading}
                className="w-full bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded hover:bg-deep-emerald/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : `Place Order — ₹ ${total.toLocaleString()}`}
              </button>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="bg-surface-white border border-surface-container-highest p-8 rounded sticky top-24">
            <h3 className="font-headline-md text-headline-md text-deep-emerald mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6 font-body-md text-body-md">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal ({itemCount} Items)</span>
                <span className="font-body-md text-body-md text-on-surface tabular-nums">₹ {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Tax (6%)</span>
                <span className="font-body-md text-body-md text-on-surface tabular-nums">₹ {tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Delivery</span>
                <span className="font-body-md text-body-md text-on-surface tabular-nums">{shipping === 0 ? 'Free' : `₹ ${shipping}`}</span>
              </div>
              <div className="border-t border-outline-variant pt-4 flex justify-between font-headline-md text-headline-md text-deep-emerald">
                <span>Total</span>
                <span className="font-body-md text-body-md text-on-surface tabular-nums">₹ {total.toLocaleString()}</span>
              </div>
            </div>
            <p className="font-body-md text-xs text-on-surface-variant">
              Delivery is free for orders above ₹500. Standard delivery within 2-3 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}





