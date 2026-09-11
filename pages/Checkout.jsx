import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { API_BASE } from '../services/apiConfig.js'
import { getImageUrl } from '../utils/imageUrl.js'

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

  const itemCount = items.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  )

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

          const rawImage =
            product.image ||
            product.images?.[0] ||
            ''

          imageMap[productId] = getImageUrl(rawImage)
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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
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
      setError(
        err.message || 'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <p className="font-body-md text-body-md text-on-surface-variant">
          Redirecting to login...
        </p>
      </div>
    )
  }
  const handleShareWhatsApp = () => {
    const order = orderConfirmation
    const orderId = order._id?.toString().slice(-8).toUpperCase()

    const itemsText = items
      .map((item) => `${item.name} x ${item.quantity}`)
      .join("`n")

    const message = `Order Confirmation

Order #${orderId}

Items:
${itemsText}

Subtotal: Rs. ${order.subtotal?.toLocaleString()}
Tax: Rs. ${order.tax?.toLocaleString()}
Delivery: ${order.shipping === 0 ? "Free" : `Rs. ${order.shipping?.toLocaleString()}`}
Total: Rs. ${order.total?.toLocaleString()}

Delivery Address:
${order.shippingAddress?.fullName}
${order.shippingAddress?.street}
${order.shippingAddress?.city} - ${order.shippingAddress?.zipCode}
${order.shippingAddress?.state}, ${order.shippingAddress?.country}

Thank you for your order!`

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  /* =========================
     ORDER CONFIRMATION
  ========================== */

  if (orderConfirmation) {
    return (
      <div className="min-h-[75vh] bg-surface-container-low px-6 py-12 md:px-10 md:py-16">
        <div className="max-w-3xl mx-auto">

          <div className="bg-surface-white border border-outline-variant rounded-2xl p-8 md:p-12 text-center shadow-sm">

            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-green-600">
                check_circle
              </span>
            </div>

            <p className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-regal-gold mb-3">
              Thank You
            </p>

            <h1 className="font-headline-lg text-headline-lg text-deep-emerald mb-3">
              Order Confirmed!
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant mb-2">
              Your order has been placed successfully.
            </p>

            <p className="font-body-md text-body-md text-on-surface-variant mb-10">
              Order #
              {orderConfirmation._id?.toString().slice(-8).toUpperCase()}
            </p>

            <div className="bg-surface-container-low rounded-xl p-6 md:p-8 text-left">

              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-md text-headline-md text-deep-emerald">
                  Order Details
                </h3>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-sm font-medium">
                  <span className="material-symbols-outlined text-[15px]">
                    check_circle
                  </span>
                  {orderConfirmation.orderStatus}
                </span>
              </div>

              <div className="space-y-4 font-body-md text-body-md">

                <div className="flex justify-between">
                  <span className="text-on-surface-variant">
                    Subtotal ({itemCount} items)
                  </span>
                  <span className="text-on-surface tabular-nums">
                    &#8377;&nbsp;
                    {orderConfirmation.subtotal?.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-on-surface-variant">
                    Tax
                  </span>
                  <span className="text-on-surface tabular-nums">
                    &#8377;&nbsp;
                    {orderConfirmation.tax?.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-on-surface-variant">
                    Delivery
                  </span>

                  <span className="text-on-surface tabular-nums">
                    {orderConfirmation.shipping === 0 ? (
                      'Free'
                    ) : (
                      <>
                        <span>&#8377;</span>&nbsp;
                        {orderConfirmation.shipping?.toLocaleString()}
                      </>
                    )}
                  </span>
                </div>

                <div className="border-t border-outline-variant pt-4 flex justify-between">
                  <span className="font-headline-md text-headline-md text-deep-emerald">
                    Total
                  </span>

                  <span className="font-headline-md text-headline-md text-deep-emerald tabular-nums">
                    &#8377;&nbsp;
                    {orderConfirmation.total?.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-outline-variant">
                <p className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-3">
                  Shipping Address
                </p>

                <p className="font-body-md text-body-md text-deep-emerald">
                  {orderConfirmation.shippingAddress?.fullName},{' '}
                  {orderConfirmation.shippingAddress?.street},{' '}
                  {orderConfirmation.shippingAddress?.city} -{' '}
                  {orderConfirmation.shippingAddress?.zipCode}
                </p>

                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  {orderConfirmation.shippingAddress?.state},{' '}
                  {orderConfirmation.shippingAddress?.country}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-8 rounded-xl hover:bg-green-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    share
                  </span>
                  Share Order on WhatsApp
                </button>

              <Link
                to="/account/orders"
                className="inline-flex items-center justify-center gap-2 bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-8 rounded-xl hover:bg-deep-emerald/90 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  receipt_long
                </span>
                View Order History
              </Link>

              <Link
                to="/collections"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-outline-variant text-deep-emerald font-label-caps text-label-caps uppercase tracking-widest py-4 px-8 rounded-xl hover:bg-surface-container-low transition-colors"
              >
                Continue Shopping
              </Link>

            </div>
          </div>
        </div>
      </div>
    )
  }

  /* =========================
     EMPTY CART
  ========================== */

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">

          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-soft-cream flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-deep-emerald">
              shopping_bag
            </span>
          </div>

          <h1 className="font-headline-lg text-headline-lg text-deep-emerald mb-4">
            Your Dairy Basket is Empty
          </h1>

          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Add some delicious dairy products before checkout.
          </p>

          <Link
            to="/collections"
            className="inline-flex items-center gap-2 bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-8 rounded-xl hover:bg-deep-emerald/90 transition-colors"
          >
            Explore Products
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </Link>

        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface-container-low min-h-screen">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="border-b border-outline-variant bg-surface-white">
        <div className="max-w-container-max mx-auto px-6 md:px-10 lg:px-16 py-8 md:py-10">

          <p className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-regal-gold mb-2">
            Secure Checkout
          </p>

          <h1 className="font-headline-lg text-headline-lg text-deep-emerald">
            Checkout
          </h1>

          <div className="flex items-center gap-3 mt-6">

            <div
              className={`flex items-center gap-2 ${
                step >= 1
                  ? 'text-deep-emerald'
                  : 'text-on-surface-variant'
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold leading-none text-white ${
                  step >= 1
                    ? 'bg-deep-emerald text-surface-white'
                    : 'border border-outline-variant'
                }`}
              >
                1
              </span>

              <span className="hidden sm:block font-label-caps text-label-caps uppercase tracking-widest">
                Delivery
              </span>
            </div>

            <div className="w-10 md:w-20 h-px bg-outline-variant" />

            <div
              className={`flex items-center gap-2 ${
                step >= 2
                  ? 'text-deep-emerald'
                  : 'text-on-surface-variant'
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold leading-none text-white ${
                  step >= 2
                    ? 'bg-deep-emerald text-surface-white'
                    : 'border border-outline-variant'
                }`}
              >
                2
              </span>

              <span className="hidden sm:block font-label-caps text-label-caps uppercase tracking-widest">
                Review
              </span>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-14">

        {error && (
          <div className="mb-8 flex items-start gap-3 p-4 rounded-xl bg-error-container text-error border border-error/20">
            <span className="material-symbols-outlined text-[20px]">
              error
            </span>
            <p className="font-body-md text-body-md text-sm">
              {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.75fr] gap-8 lg:gap-12">

          {/* =========================
              LEFT SIDE
          ========================== */}

          <div>

            {step === 1 && (
              <div className="bg-surface-white border border-outline-variant rounded-2xl overflow-hidden shadow-sm">

                <div className="px-6 md:px-8 py-6 border-b border-outline-variant">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-soft-cream flex items-center justify-center">
                      <span className="material-symbols-outlined text-deep-emerald">
                        local_shipping
                      </span>
                    </div>

                    <div>
                      <h2 className="font-headline-md text-headline-md text-deep-emerald">
                        Delivery Information
                      </h2>

                      <p className="text-sm text-on-surface-variant mt-1">
                        Where should we deliver your order?
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setStep(2)
                  }}
                  className="p-6 md:p-8 space-y-6"
                >

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-medium text-deep-emerald mb-2">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className="w-full bg-surface-white border border-outline-variant rounded-xl px-4 py-3.5 outline-none focus:border-regal-gold focus:ring-2 focus:ring-regal-gold/10 transition"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-deep-emerald mb-2">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full bg-surface-white border border-outline-variant rounded-xl px-4 py-3.5 outline-none focus:border-regal-gold focus:ring-2 focus:ring-regal-gold/10 transition"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>

                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-emerald mb-2">
                      Street Address
                    </label>

                    <input
                      type="text"
                      name="street"
                      value={form.street}
                      onChange={handleChange}
                      className="w-full bg-surface-white border border-outline-variant rounded-xl px-4 py-3.5 outline-none focus:border-regal-gold focus:ring-2 focus:ring-regal-gold/10 transition"
                      placeholder="House number, street, area"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    <div>
                      <label className="block text-sm font-medium text-deep-emerald mb-2">
                        City
                      </label>

                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full bg-surface-white border border-outline-variant rounded-xl px-4 py-3.5 outline-none focus:border-regal-gold focus:ring-2 focus:ring-regal-gold/10 transition"
                        placeholder="City"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-deep-emerald mb-2">
                        State
                      </label>

                      <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full bg-surface-white border border-outline-variant rounded-xl px-4 py-3.5 outline-none focus:border-regal-gold focus:ring-2 focus:ring-regal-gold/10 transition"
                        placeholder="State"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-deep-emerald mb-2">
                        Zip Code
                      </label>

                      <input
                        type="text"
                        name="zipCode"
                        value={form.zipCode}
                        onChange={handleChange}
                        className="w-full bg-surface-white border border-outline-variant rounded-xl px-4 py-3.5 outline-none focus:border-regal-gold focus:ring-2 focus:ring-regal-gold/10 transition"
                        placeholder="Zip code"
                        required
                      />
                    </div>

                  </div>

                  <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl">
                    <span className="material-symbols-outlined text-regal-gold">
                      verified
                    </span>

                    <p className="text-sm text-on-surface-variant">
                      Your information is securely used only for order delivery.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded-xl hover:bg-deep-emerald/90 transition-colors"
                  >
                    Continue to Review
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  </button>

                </form>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">

                {/* SHIPPING ADDRESS */}

                <div className="bg-surface-white border border-outline-variant rounded-2xl overflow-hidden shadow-sm">

                  <div className="px-6 md:px-8 py-5 border-b border-outline-variant flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-deep-emerald">
                        location_on
                      </span>

                      <h2 className="font-headline-md text-headline-md text-deep-emerald">
                        Shipping Address
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm font-medium text-deep-emerald hover:text-regal-gold transition-colors"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="p-6 md:p-8">

                    <p className="font-body-md text-body-md text-deep-emerald font-medium">
                      {form.fullName}
                    </p>

                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      {form.street}
                    </p>

                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {form.city} - {form.zipCode}
                    </p>

                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {form.state}, {form.country}
                    </p>

                    <div className="flex items-center gap-2 mt-4 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[17px]">
                        phone
                      </span>
                      {form.phone}
                    </div>

                  </div>
                </div>

                {/* PAYMENT */}

                <div className="bg-surface-white border border-outline-variant rounded-2xl overflow-hidden shadow-sm">

                  <div className="px-6 md:px-8 py-5 border-b border-outline-variant">

                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-deep-emerald">
                        payments
                      </span>

                      <div>
                        <h2 className="font-headline-md text-headline-md text-deep-emerald">
                          Payment Method
                        </h2>

                        <p className="text-sm text-on-surface-variant mt-1">
                          Choose how you want to pay
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="p-6 md:p-8 space-y-3">

                    {PAYMENT_METHODS.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all ${
                          form.paymentMethod === method.id
                            ? 'border-deep-emerald bg-surface-container-low shadow-sm'
                            : 'border-outline-variant hover:border-deep-emerald/50'
                        }`}
                      >

                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={form.paymentMethod === method.id}
                          onChange={handleChange}
                          className="accent-deep-emerald w-4 h-4"
                        />

                        <div className="w-11 h-11 rounded-lg bg-soft-cream flex items-center justify-center">
                          <span className="material-symbols-outlined text-deep-emerald">
                            {method.icon}
                          </span>
                        </div>

                        <div className="flex-1">
                          <p className="font-medium text-deep-emerald">
                            {method.label}
                          </p>

                          <p className="text-xs text-on-surface-variant mt-1">
                            {method.id === 'card'
                              ? 'Pay securely using your card'
                              : method.id === 'upi'
                                ? 'Pay instantly using UPI'
                                : 'Pay when your order arrives'}
                          </p>
                        </div>

                        {form.paymentMethod === method.id && (
                          <span className="material-symbols-outlined text-deep-emerald">
                            check_circle
                          </span>
                        )}

                      </label>
                    ))}

                  </div>
                </div>

                {/* ORDER ITEMS */}

                <div className="bg-surface-white border border-outline-variant rounded-2xl overflow-hidden shadow-sm">

                  <div className="px-6 md:px-8 py-5 border-b border-outline-variant flex items-center justify-between">

                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-deep-emerald">
                        shopping_bag
                      </span>

                      <h2 className="font-headline-md text-headline-md text-deep-emerald">
                        Order Items
                      </h2>
                    </div>

                    <span className="text-sm text-on-surface-variant">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </span>

                  </div>

                  <div className="p-6 md:p-8 space-y-4">

                    {items.map((item) => {
                      const image =
                        productImages[item._id || item.id] ||
                        item.image ||
                        item.images?.[0] ||
                        ''

                      return (
                        <div
                          key={item._id || item.id}
                          className="flex items-center gap-4 p-3 rounded-xl border border-outline-variant bg-surface-container-low"
                        >

                          <div className="w-20 h-20 rounded-lg bg-soft-cream overflow-hidden flex-shrink-0">
                            <img
                              src={getImageUrl(image)}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">

                            <p className="font-medium text-deep-emerald truncate">
                              {item.name}
                            </p>

                            {item.variant?.name && (
                              <p className="text-xs text-on-surface-variant mt-1">
                                {item.variant.name}
                                {item.variant.quantity
                                  ? ` (${item.variant.quantity})`
                                  : ''}
                              </p>
                            )}

                            <p className="text-sm text-on-surface-variant mt-1">
                              Qty: {item.quantity || 1}
                            </p>

                          </div>

                          <p className="font-medium text-deep-emerald tabular-nums">
                            &#8377;&nbsp;
                            {(
                              (item.price || 0) *
                              (item.quantity || 1)
                            ).toLocaleString()}
                          </p>

                        </div>
                      )
                    })}

                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-3 bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-5 px-10 rounded-xl hover:bg-deep-emerald/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {loading ? 'progress_activity' : 'lock'}
                  </span>

                  {loading
                    ? 'Placing Order...'
                    : (
                      <>
                        Place Order
                        <span>&#8377;</span>
                        &nbsp;
                        {total.toLocaleString()}
                      </>
                    )}
                </button>

              </div>
            )}

          </div>

          {/* =========================
              ORDER SUMMARY
          ========================== */}

          <aside>

            <div className="bg-surface-white border border-outline-variant rounded-2xl shadow-sm lg:sticky lg:top-24 overflow-hidden">

              <div className="p-6 md:p-8">

                <div className="flex items-center justify-between mb-6">

                  <h2 className="font-headline-md text-headline-md text-deep-emerald">
                    Order Summary
                  </h2>

                  <span className="material-symbols-outlined text-on-surface-variant">
                    receipt_long
                  </span>

                </div>

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">
                      Subtotal
                    </span>

                    <span className="text-on-surface tabular-nums">
                      &#8377;&nbsp;
                      {cartTotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">
                      Tax <span className="text-xs">(6%)</span>
                    </span>

                    <span className="text-on-surface tabular-nums">
                      &#8377;&nbsp;
                      {tax.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">
                      Delivery
                    </span>

                    <span className="text-on-surface tabular-nums">
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">
                          Free
                        </span>
                      ) : (
                        <>
                          &#8377;&nbsp;
                          {shipping.toLocaleString()}
                        </>
                      )}
                    </span>
                  </div>

                </div>

                <div className="border-t border-outline-variant mt-6 pt-6 flex justify-between items-center">

                  <span className="font-headline-md text-headline-md text-deep-emerald">
                    Total
                  </span>

                  <span className="font-headline-md text-headline-md text-deep-emerald tabular-nums">
                    &#8377;&nbsp;
                    {total.toLocaleString()}
                  </span>

                </div>

                <div className="mt-6 p-4 rounded-xl bg-surface-container-low">

                  <div className="flex items-start gap-3">

                    <span className="material-symbols-outlined text-regal-gold text-[20px]">
                      local_shipping
                    </span>

                    <div>
                      <p className="text-sm font-medium text-deep-emerald">
                        Free delivery
                      </p>

                      <p className="text-xs text-on-surface-variant mt-1">
                        Delivery is free for orders above &#8377;500.
                        Standard delivery within 2-3 business days.
                      </p>
                    </div>

                  </div>

                </div>

                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-on-surface-variant">

                  <span className="material-symbols-outlined text-[16px]">
                    lock
                  </span>

                  Secure checkout

                </div>

              </div>

            </div>

          </aside>

        </div>
      </div>
    </div>
  )
}




