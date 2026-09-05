import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { adminApi } from '../../services/adminApi.js'
import Pagination from '../../components/common/Pagination.jsx'

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: 'schedule' },
  confirmed: { label: 'Confirmed', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: 'check_circle' },
  processing: { label: 'Processing', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: 'sync' },
  shipped: { label: 'Shipped', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: 'local_shipping' },
  delivered: { label: 'Delivered', color: 'bg-green-50 text-green-700 border-green-200', icon: 'home' },
  cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200', icon: 'cancel' },
}

const orderStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const { token } = useAuth()

  const fetchOrders = async () => {
    try {
      const data = await adminApi.getOrders(token, page, 20)
      let filteredOrders = data.data?.orders || []
      if (statusFilter) {
        filteredOrders = filteredOrders.filter((o) => o.orderStatus === statusFilter)
      }
      setOrders(filteredOrders)
      setTotalPages(data.data?.pagination?.pages || 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token, page, statusFilter])

  const handleStatusUpdate = async (orderId, newStatus) => {
    setSubmitting(true)
    try {
      await adminApi.updateOrderStatus(token, orderId, newStatus)
      fetchOrders()
      setSelectedOrder(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 md:p-10">
        <h1 className="font-display-lg text-display-lg text-deep-emerald mb-6">Orders</h1>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-[#fffdf8] border border-outline-variant rounded p-4 animate-pulse">
              <div className="h-6 bg-surface-container-low rounded w-1/3 mb-2" />
              <div className="h-4 bg-surface-container-low rounded w-1/4" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10">
      <header className="mb-8">
        <h1 className="font-display-lg text-display-lg text-deep-emerald">Orders</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
          View and manage customer orders.
        </p>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-error-container border border-error text-error rounded font-body-md">
          {error}
        </div>
      )}

      <div className="bg-[#fffdf8] border border-outline-variant rounded shadow-sm overflow-hidden">
        <div className="p-4 border-b border-outline-variant">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className="bg-surface-container-low border border-outline-variant rounded px-4 py-2 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
          >
            <option value="">All Statuses</option>
            {orderStatuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider">
                <th className="pb-4 font-semibold px-4">Order ID</th>
                <th className="pb-4 font-semibold px-4">Customer</th>
                <th className="pb-4 font-semibold px-4">Date</th>
                <th className="pb-4 font-semibold px-4">Total</th>
                <th className="pb-4 font-semibold px-4">Status</th>
                <th className="pb-4 font-semibold text-right px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {orders.map((order) => {
                const status = statusConfig[order.orderStatus] || statusConfig.pending
                const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })

                return (
                  <tr key={order._id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="py-4 px-4 font-mono text-sm text-deep-emerald">
                      #{order._id?.toString().slice(-8).toUpperCase()}
                    </td>
                    <td className="py-4 px-4 text-on-surface">
                      {order.user?.name || 'Guest'}
                      <p className="text-xs text-on-surface-variant">{order.user?.email || '—'}</p>
                    </td>
                    <td className="py-4 px-4 text-on-surface">{orderDate}</td>
                    <td className="py-4 px-4 text-on-surface tabular-nums">₹ {order.total?.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${status.color}`}>
                        <span className="material-symbols-outlined text-[14px]">{status.icon}</span>
                        {status.label}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1 px-4 py-2 bg-surface-container-low border border-outline-variant rounded font-body-md text-sm hover:bg-surface-container-high transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        Update
                      </button>
                    </td>
                  </tr>
                )
              })}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-on-surface-variant">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-outline-variant">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>

      {/* Status Update Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#fffdf8] rounded shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-outline-variant flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-deep-emerald">Update Order Status</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-on-surface-variant hover:text-deep-emerald">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Order #{selectedOrder._id?.toString().slice(-8).toUpperCase()} —{' '}
                {selectedOrder.user?.name || 'Guest'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {orderStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(selectedOrder._id, status)}
                    disabled={submitting}
                    className={`px-4 py-3 rounded border font-body-md text-sm capitalize transition-colors disabled:opacity-50 ${
                      selectedOrder.orderStatus === status
                        ? 'border-deep-emerald bg-deep-emerald text-white'
                        : 'border-outline-variant hover:border-deep-emerald hover:text-deep-emerald'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

