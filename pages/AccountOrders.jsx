import { Link } from 'react-router-dom'
import RecentOrders from '../components/account/RecentOrders.jsx'

export default function AccountOrders() {
  return (
    <>
      <header className="mb-4">
        <h1 className="font-display-lg text-display-lg text-deep-emerald">My Orders</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
          View and track all your orders in one place.
        </p>
      </header>
      {/* // Reuse the existing RecentOrders component to display order history. */}
      <RecentOrders />
    </>
  )
}
