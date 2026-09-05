import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { API_BASE } from '../../services/apiConfig.js'

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: 'schedule' },
  confirmed: { label: 'Confirmed', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: 'check_circle' },
  processing: { label: 'Processing', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: 'sync' },
  shipped: { label: 'Shipped', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: 'local_shipping' },
  delivered: { label: 'Delivered', color: 'bg-green-50 text-green-700 border-green-200', icon: 'home' },
  cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200', icon: 'cancel' },
}

export default function RecentOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { token, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setLoading(false)
      return
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        })
        if (res.ok) {
          const data = await res.json()
          setOrders(data.data?.orders || [])
        }
      } catch {
        setError('Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [isAuthenticated, token])

  if (loading) {
    return (
      <section className="bg-surface-white p-8 border border-outline-variant rounded shadow-sm">
        <div className="text-center py-8">
          <p className="font-body-md text-body-md text-on-surface-variant">Loading your orders...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-surface-white p-8 border border-outline-variant rounded shadow-sm">
        <div className="text-center py-8">
          <p className="font-body-md text-body-md text-error">{error}</p>
        </div>
      </section>
    )
  }

  if (orders.length === 0) {
    return (
      <section className="bg-surface-white p-8 border border-outline-variant rounded shadow-sm">
        <div className="text-center py-8">
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">No orders yet.</p>
          <Link to="/collections" className="text-deep-emerald hover:text-regal-gold transition-colors">
            Start shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-surface-white p-8 border border-outline-variant rounded shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-headline-md text-headline-md text-deep-emerald">Recent Orders</h3>
        <Link className="font-label-caps text-label-caps text-regal-gold hover:text-deep-emerald uppercase transition-colors" to="/account">
          Order History
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-body-md text-body-md border-collapse">
          <thead>
            <tr className="border-b border-outline-variant text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider">
              <th className="pb-4 font-semibold w-1/3">Item</th>
              <th className="pb-4 font-semibold px-4">Order Date</th>
              <th className="pb-4 font-semibold px-4">Total</th>
              <th className="pb-4 font-semibold text-right pl-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/50">
            {orders.map((order) => {
              const firstItem = order.items?.[0]
              const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
              const status = statusConfig[order.orderStatus] || statusConfig.pending

              return (
                <tr key={order._id?.toString()} className="group hover:bg-surface-container-lowest transition-colors">
                  <td className="py-6 pr-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-surface-container-low rounded flex-shrink-0 overflow-hidden border border-outline-variant/30">
                        {firstItem?.image && (
                          <img className="w-full h-full object-cover" src={firstItem.image?.startsWith("http") || firstItem.image?.startsWith("data:") ? firstItem.image : `https://once-morre-backend.onrender.com${firstItem.image || firstItem.images?.[0] || ""}`} alt={firstItem.name} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-deep-emerald group-hover:text-regal-gold transition-colors">
                          {firstItem?.name || 'Order'}
                        </p>
                        <p className="text-sm text-on-surface-variant mt-1">
                          Order #{order._id?.toString().slice(-8).toUpperCase()}
                        </p>
                        {order.items?.length > 1 && (
                          <p className="text-xs text-on-surface-variant mt-1">+{order.items.length - 1} more item(s)</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-on-surface">{orderDate}</td>
                  <td className="py-6 px-4 text-on-surface tabular-nums">₹ {order.total?.toLocaleString()}</td>
                  <td className="py-6 pl-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${status.color}`}
                    >
                      <span className="material-symbols-outlined text-[14px]">{status.icon}</span>
                      {status.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

