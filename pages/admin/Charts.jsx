import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { adminApi } from '../../services/adminApi.js'

export default function Charts() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { token } = useAuth()

  const [ordersByStatus, setOrdersByStatus] = useState({})
  const [productsByCategory, setProductsByCategory] = useState({})
  const [stockData, setStockData] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const [ordersRes, productsRes, inventoryRes] = await Promise.all([
          adminApi.getOrders(token, 1, 100),
          adminApi.getProducts(token, 1, 100, ''),
          adminApi.getInventory(token),
        ])

        const orders = ordersRes.data?.orders || []
        const products = productsRes.data?.products || []
        const inventory = inventoryRes.data || []

        setAllOrders(orders)
        setAllProducts(products)
        setStockData(inventory)

        const statusCounts = {}
        orders.forEach((order) => {
          const status = order.orderStatus || 'unknown'
          statusCounts[status] = (statusCounts[status] || 0) + 1
        })
        setOrdersByStatus(statusCounts)

        const categoryCounts = {}
        products.forEach((product) => {
          const catName = product.category?.name || product.category?.slug || 'Uncategorized'
          categoryCounts[catName] = (categoryCounts[catName] || 0) + 1
        })
        setProductsByCategory(categoryCounts)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchChartData()
    }
  }, [token])

  const statusLabels = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  }

  const statusColors = {
    pending: 'bg-yellow-400',
    confirmed: 'bg-blue-400',
    processing: 'bg-blue-500',
    shipped: 'bg-purple-400',
    delivered: 'bg-green-400',
    cancelled: 'bg-red-400',
  }

  const maxOrderCount = Math.max(...Object.values(ordersByStatus), 1)
  const maxCategoryCount = Math.max(...Object.values(productsByCategory), 1)
  const maxStock = Math.max(...stockData.map((i) => i.stockQuantity || 0), 1)

  if (loading) {
    return (
      <div className="p-6 md:p-10">
        <h1 className="font-display-lg text-display-lg text-deep-emerald mb-6">Charts</h1>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-[#fffdf8] border border-outline-variant rounded p-6 animate-pulse">
              <div className="h-6 bg-surface-container-low rounded w-1/3 mb-4" />
              <div className="h-40 bg-surface-container-low rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 md:p-10">
        <h1 className="font-display-lg text-display-lg text-deep-emerald mb-6">Charts</h1>
        <div className="bg-error-container border border-error text-error rounded p-4 font-body-md">{error}</div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10">
      <header className="mb-8">
        <h1 className="font-display-lg text-display-lg text-deep-emerald">Charts</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
          Visual overview of your store performance.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Status */}
        <div className="bg-[#fffdf8] border border-outline-variant rounded p-6 shadow-sm">
          <h3 className="font-headline-md text-headline-md text-deep-emerald mb-6">Orders by Status</h3>
          {Object.keys(ordersByStatus).length === 0 ? (
            <p className="text-on-surface-variant text-sm">No order data available.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(ordersByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center gap-4">
                  <span className="w-24 text-sm font-body-md text-on-surface-variant capitalize truncate">
                    {statusLabels[status] || status}
                  </span>
                  <div className="flex-1 bg-surface-container-low rounded-full h-8 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${statusColors[status] || 'bg-gray-400'} transition-all duration-500`}
                      style={{ width: `${(count / maxOrderCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-sm font-body-md text-deep-emerald tabular-nums">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Products by Category */}
        <div className="bg-[#fffdf8] border border-outline-variant rounded p-6 shadow-sm">
          <h3 className="font-headline-md text-headline-md text-deep-emerald mb-6">Products by Category</h3>
          {Object.keys(productsByCategory).length === 0 ? (
            <p className="text-on-surface-variant text-sm">No product data available.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(productsByCategory).map(([category, count]) => (
                <div key={category} className="flex items-center gap-4">
                  <span className="w-32 text-sm font-body-md text-on-surface-variant truncate">
                    {category}
                  </span>
                  <div className="flex-1 bg-surface-container-low rounded-full h-8 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-deep-emerald transition-all duration-500"
                      style={{ width: `${(count / maxCategoryCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-sm font-body-md text-deep-emerald tabular-nums">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stock Overview */}
        <div className="bg-[#fffdf8] border border-outline-variant rounded p-6 shadow-sm lg:col-span-2">
          <h3 className="font-headline-md text-headline-md text-deep-emerald mb-6">Stock Overview</h3>
          {stockData.length === 0 ? (
            <p className="text-on-surface-variant text-sm">No inventory data available.</p>
          ) : (
            <div className="space-y-4">
              {stockData.map((item) => {
                const product = item.product || {}
                const stock = item.stockQuantity || 0
                const threshold = item.lowStockThreshold || 0
                const percentage = maxStock > 0 ? (stock / maxStock) * 100 : 0
                const isLow = stock <= threshold

                return (
                  <div key={item._id} className="flex items-center gap-4">
                    <span className="w-48 text-sm font-body-md text-on-surface truncate">
                      {product.name || 'Unknown Product'}
                    </span>
                    <div className="flex-1 bg-surface-container-low rounded-full h-8 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isLow ? 'bg-red-400' : 'bg-regal-gold'
                        }`}
                        style={{ width: `${Math.max(percentage, 2)}%` }}
                      />
                    </div>
                    <span className="w-16 text-right text-sm font-body-md text-deep-emerald tabular-nums">
                      {stock.toLocaleString()}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

