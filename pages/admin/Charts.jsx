import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { adminApi } from '../../services/adminApi.js'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function Charts() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { token } = useAuth()

  const [ordersByStatus, setOrdersByStatus] = useState({})
  const [productsByCategory, setProductsByCategory] = useState({})
  const [stockData, setStockData] = useState([])

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

        setStockData(inventory)

        const statusCounts = {}

        orders.forEach((order) => {
          const status = order.orderStatus || 'unknown'
          statusCounts[status] = (statusCounts[status] || 0) + 1
        })

        setOrdersByStatus(statusCounts)

        const categoryCounts = {}

        products.forEach((product) => {
          const catName =
            product.category?.name ||
            product.category?.slug ||
            'Uncategorized'

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

  const chartColors = [
  '#0f5238',
  '#2f6f52',
  '#5f9278',
  '#a8e7c5',
  '#795b00',
  '#a88432',
  '#d1b96f',
  '#b85c5c',
]

  const ordersPieData = Object.entries(ordersByStatus).map(
    ([status, count]) => ({
      name: statusLabels[status] || status,
      value: count,
    })
  )

  const productsPieData = Object.entries(productsByCategory).map(
    ([category, count]) => ({
      name: category,
      value: count,
    })
  )

  const stockPieData = stockData
    .filter((item) => (item.stockQuantity || 0) > 0)
    .map((item) => ({
      name: item.product?.name || 'Unknown Product',
      value: item.stockQuantity || 0,
    }))

  if (loading) {
    return (
      <div className="p-6 md:p-10">
        <h1 className="font-display-lg text-display-lg text-deep-emerald mb-6">
          Charts
        </h1>

        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[#fffdf8] border border-outline-variant rounded p-6 animate-pulse"
            >
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
        <h1 className="font-display-lg text-display-lg text-deep-emerald mb-6">
          Charts
        </h1>

        <div className="bg-error-container border border-error text-error rounded p-4 font-body-md">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10">
      <header className="mb-8">
        <h1 className="font-display-lg text-display-lg text-deep-emerald">
          Charts
        </h1>

        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
          Visual overview of your store performance.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Orders by Status */}
        <div className="bg-[#fffdf8] border border-outline-variant rounded p-6 shadow-sm">
          <h3 className="font-headline-md text-headline-md text-deep-emerald mb-6">
            Orders by Status
          </h3>

          {ordersPieData.length === 0 ? (
            <p className="text-on-surface-variant text-sm">
              No order data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={ordersPieData}
                  cx="50%"
                  cy="45%"
                  outerRadius={110}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {ordersPieData.map((_, index) => (
                    <Cell
                      key={`order-cell-${index}`}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Products by Category */}
        <div className="bg-[#fffdf8] border border-outline-variant rounded p-6 shadow-sm">
          <h3 className="font-headline-md text-headline-md text-deep-emerald mb-6">
            Products by Category
          </h3>

          {productsPieData.length === 0 ? (
            <p className="text-on-surface-variant text-sm">
              No product data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={productsPieData}
                  cx="50%"
                  cy="45%"
                  outerRadius={110}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {productsPieData.map((_, index) => (
                    <Cell
                      key={`category-cell-${index}`}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Stock Overview */}
        <div className="bg-[#fffdf8] border border-outline-variant rounded p-6 shadow-sm lg:col-span-2">
          <h3 className="font-headline-md text-headline-md text-deep-emerald mb-6">
            Stock Overview
          </h3>

          {stockPieData.length === 0 ? (
            <p className="text-on-surface-variant text-sm">
              No inventory data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={450}>
              <PieChart>
                <Pie
                  data={stockPieData}
                  cx="50%"
                  cy="45%"
                  outerRadius={140}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {stockPieData.map((_, index) => (
                    <Cell
                      key={`stock-cell-${index}`}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </div>
  )
}

