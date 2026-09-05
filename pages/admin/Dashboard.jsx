import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { adminApi } from '../../services/adminApi.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
  BarElement,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
  BarElement,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  shipped: 'bg-purple-100 text-purple-800 border-purple-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { token } = useAuth()

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSales: 0,
    totalCustomers: 0,
    pendingOrders: 0,
  })
  const [monthlyRevenue, setMonthlyRevenue] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [lowStockAlerts, setLowStockAlerts] = useState([])
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, productsRes, usersRes, lowStockRes] = await Promise.all([
          adminApi.getAllOrders(token),
          adminApi.getProducts(token, 1, 100, ''),
          adminApi.getUsers(token),
          adminApi.getLowStock(token),
        ])

        const orders = ordersRes.data?.orders || []
        const products = productsRes.data?.products || []
        const users = usersRes.data || []
        const lowStock = lowStockRes.data || []

        setLowStockAlerts(lowStock.slice(0, 5))
        setRecentOrders(orders.slice(0, 5))

        const totalRevenue = orders
          .filter((o) => ['delivered', 'confirmed', 'processing', 'shipped'].includes(o.orderStatus))
          .reduce((sum, o) => sum + (o.total || 0), 0)

        const pendingOrders = orders.filter((o) => o.orderStatus === 'pending').length

        setStats({
          totalRevenue,
          totalSales: orders.length,
          totalCustomers: users.length,
          pendingOrders,
        })

        const monthMap = {}
        orders.forEach((order) => {
          const date = new Date(order.createdAt)
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
          if (!monthMap[monthKey]) {
            monthMap[monthKey] = 0
          }
          if (['delivered', 'confirmed', 'processing', 'shipped'].includes(order.orderStatus)) {
            monthMap[monthKey] += order.total || 0
          }
        })

        const sortedMonths = Object.keys(monthMap).sort()
        const revenueData = sortedMonths.map((month) => {
          const [year, monthNum] = month.split('-')
          const date = new Date(Number(year), Number(monthNum) - 1)
          return {
            label: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            value: monthMap[month],
          }
        })

        setMonthlyRevenue(revenueData)

        const categoryMap = {}
        products.forEach((product) => {
          const catName = product.category?.name || product.category?.slug || 'Uncategorized'
          categoryMap[catName] = (categoryMap[catName] || 0) + 1
        })

        const categoryChartData = Object.entries(categoryMap).map(([name, count]) => ({
          name,
          count,
        }))

        setCategoryData(categoryChartData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchDashboardData()
    }
  }, [token])

  const revenueChartData = {
    labels: monthlyRevenue.map((d) => d.label),
    datasets: [
      {
        label: 'Revenue',
        data: monthlyRevenue.map((d) => d.value),
        borderColor: '#002147',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 300)
          gradient.addColorStop(0, 'rgba(0, 33, 71, 0.1)')
          gradient.addColorStop(1, 'rgba(0, 33, 71, 0)')
          return gradient
        },
        borderWidth: 2,
        pointBackgroundColor: '#f9f9f7',
        pointBorderColor: '#002147',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#002147',
        titleFont: { family: 'Montserrat', size: 12 },
        bodyFont: { family: 'Montserrat', size: 14, weight: 'bold' },
        padding: 10, /* Adjusted for better spacing in tooltip */
        displayColors: false,
        callbacks: {
          label: (context) => '₹ ' + context.parsed.y.toLocaleString(),
        },
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { font: { family: 'Montserrat', size: 12 }, color: '#44474e' },
      },
      y: {
        grid: { color: '#e2e3e1', drawBorder: false, borderDash: [5, 5] },
        ticks: {
          font: { family: 'Montserrat', size: 12 },
          color: '#44474e',
          callback: (value) => '₹' + value.toLocaleString(),
        },
        beginAtZero: true,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  const categoryChartData = {
    labels: categoryData.map((d) => d.name),
    datasets: [
      {
        data: categoryData.map((d) => d.count),
        backgroundColor: ['#002147', '#6e634f', '#bdf1a8', '#d3c5ac'],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  }

  const categoryChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: { family: 'Montserrat', size: 12 },
          color: '#44474e',
          usePointStyle: true,
          padding: 8, /* Adjusted for better spacing between legend items */
        },
      },
        tooltip: {
          backgroundColor: '#002147',
          bodyFont: { family: 'Montserrat', size: 14 },
          callbacks: {
            label: (context) => ' ' + context.label + ': ' + context.parsed + ' products',
          },
        },
    },
  }

  if (loading) {
    return (
      <div className="p-margin-mobile md:p-margin-desktop">
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-primary m-0 mb-4">Dashboard Overview</h2>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-xl p-6 animate-pulse">
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
      <div className="p-margin-mobile md:p-margin-desktop">
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-primary m-0 mb-4">Dashboard Overview</h2>
        <div className="bg-error-container border border-error text-error rounded p-4 font-body-md">{error}</div>
      </div>
    )
  }

  return (
    <div className="p-margin-mobile md:p-margin-desktop">
      {/* Page Title */}
      <div className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-primary m-0">Dashboard Overview</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Welcome back. Here's what's happening with ONCE MORRE today.</p>
        </div>
        {/* Quick Actions */}
        <div className="flex gap-3">
          <button className="flex items-center justify-center px-4 py-2 bg-surface text-primary border border-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors shadow-sm">
            <span className="material-symbols-outlined mr-2 text-[18px]">download</span>
            Export Report
          </button>
          <button
            onClick={() => navigate('/admin/products')}
            className="flex items-center justify-center px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined mr-2 text-[18px]">add</span>
            New Product
          </button>
        </div>
      </div>

      {/* Bento Grid: Key Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg">
        {/* Total Revenue */}
        <div className="bg-[#fffdf8] rounded-xl p-6 shadow-md border border-[#e5e3de] transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[64px] text-primary">account_balance_wallet</span>
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="font-label-md text-label-md text-on-surface-variant">Total Revenue</h3>
            <span className="flex items-center text-tertiary-fixed-dim bg-tertiary-container px-2 py-1 rounded-full font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span>
              Live
            </span>
          </div>
          <p className="font-headline-md text-headline-md text-primary font-semibold relative z-10">₹ {stats.totalRevenue.toLocaleString()}</p>
          <p className="font-label-sm text-label-sm text-outline mt-1 relative z-10">From all orders</p>
        </div>

        {/* Total Sales */}
        <div className="bg-[#fffdf8] rounded-xl p-6 shadow-md border border-[#e5e3de] transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[64px] text-primary">shopping_cart</span>
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="font-label-md text-label-md text-on-surface-variant">Total Sales</h3>
            <span className="flex items-center text-tertiary-fixed-dim bg-tertiary-container px-2 py-1 rounded-full font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span>
              Live
            </span>
          </div>
          <p className="font-headline-md text-headline-md text-primary font-semibold relative z-10">{stats.totalSales.toLocaleString()}</p>
          <p className="font-label-sm text-label-sm text-outline mt-1 relative z-10">Total orders</p>
        </div>

        {/* Total Customers */}
        <div className="bg-[#fffdf8] rounded-xl p-6 shadow-md border border-[#e5e3de] transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[64px] text-primary">group</span>
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="font-label-md text-label-md text-on-surface-variant">Total Customers</h3>
            <span className="flex items-center text-outline bg-surface-variant px-2 py-1 rounded-full font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px] mr-1">trending_flat</span>
              Stable
            </span>
          </div>
          <p className="font-headline-md text-headline-md text-primary font-semibold relative z-10">{stats.totalCustomers.toLocaleString()}</p>
          <p className="font-label-sm text-label-sm text-outline mt-1 relative z-10">Registered users</p>
        </div>

        {/* Pending Orders */}
        <div className="bg-[#fffdf8] rounded-xl p-6 shadow-md border border-[#e5e3de] transition-all relative overflow-hidden group border-l-4 border-error">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[64px] text-error">pending_actions</span>
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="font-label-md text-label-md text-on-surface-variant">Pending Orders</h3>
            <span className="flex items-center text-error bg-error-container px-2 py-1 rounded-full font-label-sm text-label-sm">
              Requires Action
            </span>
          </div>
          <p className="font-headline-md text-headline-md text-primary font-semibold relative z-10">{stats.pendingOrders}</p>
          <p className="font-label-sm text-label-sm text-outline mt-1 relative z-10">Awaiting processing</p>
        </div>
      </div>

      {/* Complex Layout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-stack-lg">
        {/* Main Chart Canvas (2/3 width) */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-6 shadow-soft">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-sm text-headline-sm text-primary m-0">Monthly Revenue Trend</h3>
            <select className="bg-surface border-surface-variant text-on-surface-variant font-label-sm text-label-sm rounded-md focus:ring-primary focus:border-primary">
              <option>All Time</option>
              <option>Last 6 Months</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-72 w-full relative">
            <Chart type="line" data={revenueChartData} options={revenueChartOptions} />
          </div>
        </div>

        {/* Secondary Visuals / Alerts (1/3 width) */}
        <div className="flex flex-col gap-gutter">
          {/* Pie Chart */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-soft flex-1">
            <h3 className="font-headline-sm text-headline-sm text-primary m-0 mb-4">Sales by Category</h3>
            <div className="h-48 w-full relative flex items-center justify-center">
              <Chart type="doughnut" data={categoryChartData} options={categoryChartOptions} />
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-soft border-t-4 border-error">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline-sm text-headline-sm text-primary m-0 flex items-center">
                <span className="material-symbols-outlined text-error mr-2">warning</span>
                Low Stock Alerts
              </h3>
            </div>
            <div className="space-y-4">
              {lowStockAlerts.length === 0 ? (
                <p className="font-body-md text-body-md text-on-surface-variant">No low stock alerts.</p>
              ) : (
                lowStockAlerts.map((item) => {
                  const product = item.product || {}
                  return (
                    <div key={item._id} className="flex items-center justify-between border-b border-surface-variant pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-label-md text-label-md text-primary">{product.name || 'Unknown Product'}</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">SKU: {product.sku || '—'}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-headline-sm text-headline-sm text-error block leading-none">{item.stockQuantity}</span>
                        <span className="font-label-sm text-label-sm text-outline">Units left</span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
            <button
              onClick={() => navigate('/admin/inventory')}
              className="w-full mt-4 py-2 border border-surface-variant text-primary font-label-md text-label-md rounded-lg hover:bg-surface-container transition-colors"
            >
              Manage Inventory
            </button>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-soft overflow-hidden">
        <div className="p-6 border-b border-surface-variant flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm text-primary m-0">Recent Orders</h3>
          <button
            onClick={() => navigate('/admin/orders')}
            className="text-primary font-label-md text-label-md hover:underline"
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer Name</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant font-body-md text-body-md">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-on-surface-variant">No orders found.</td>
                </tr>
              ) : (
                recentOrders.map((order) => {
                  const status = order.orderStatus || 'pending'
                  return (
                    <tr key={order._id} className="hover:bg-surface/50 transition-colors">
                      <td className="p-4 text-primary font-medium">#{order._id?.toString().slice(-8).toUpperCase()}</td>
                      <td className="p-4">{order.user?.name || 'Guest'}</td>
                      <td className="p-4 text-on-surface-variant">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="p-4">₹ {order.total?.toLocaleString()}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm ${
                            statusColors[status] || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => (window.location.href = `/admin/orders`)}
                          className="text-surface-tint hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined">more_horiz</span>
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


