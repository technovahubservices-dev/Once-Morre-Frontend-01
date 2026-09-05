import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AccountSidebar from '../components/account/AccountSidebar.jsx'
import LoyaltyCard from '../components/account/LoyaltyCard.jsx'
import PersonalInfo from '../components/account/PersonalInfo.jsx'
import WishlistPreview from '../components/account/WishlistPreview.jsx'
import RecentOrders from '../components/account/RecentOrders.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { subscriptionApi } from '../services/subscriptionApi.js'

export default function Account() {
  const { user, token } = useAuth()
  const [subscription, setSubscription] = useState(null)
  const [subscriptionLoading, setSubscriptionLoading] = useState(true)

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!token) return
      try {
        const data = await subscriptionApi.getActiveSubscription(token)
        setSubscription(data)
      } catch (err) {
        console.error('Failed to fetch subscription', err)
      } finally {
        setSubscriptionLoading(false)
      }
    }
    fetchSubscription()
  }, [token])

  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <>
      <header className="mb-4">
        <h1 className="font-display-lg text-display-lg text-deep-emerald">Welcome Back, {firstName}.</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
          Manage your personal details, view orders, and track your loyalty status.
        </p>
      </header>

      <LoyaltyCard />

      {!subscriptionLoading && subscription && (
        <section className="bg-surface-white p-8 border border-outline-variant rounded shadow-sm mb-8">
          <h3 className="font-headline-md text-headline-md text-deep-emerald mb-4">Active Subscription</h3>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                <span className="font-medium text-deep-emerald">{subscription.plan}</span> · Qty: {subscription.quantity}
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Offer Price: <span className="font-medium text-deep-emerald">₹{subscription.offerPrice?.toLocaleString()}</span>
                {subscription.originalPrice > subscription.offerPrice && (
                  <span className="line-through ml-2 text-on-surface-variant">₹{subscription.originalPrice?.toLocaleString()}</span>
                )}
              </p>
              <p className="text-sm text-on-surface-variant mt-1">
                Status: <span className="font-medium text-green-600">{subscription.status}</span>
              </p>
              <p className="text-sm text-on-surface-variant">
                Activated: {new Date(subscription.activatedAt).toLocaleString()}
              </p>
              <p className="text-sm text-on-surface-variant">
                Next Billing: {new Date(subscription.nextBillingAt).toLocaleDateString()}
              </p>
            </div>
            <Link
              to="/subscription"
              className="bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-3 px-6 rounded hover:bg-deep-emerald/90 transition-colors"
            >
              View Plans
            </Link>
          </div>
        </section>
      )}

      {!subscriptionLoading && !subscription && (
        <section className="bg-surface-white p-8 border border-outline-variant rounded shadow-sm mb-8">
          <h3 className="font-headline-md text-headline-md text-deep-emerald mb-2">No Active Subscription</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">
            You don't have an active subscription plan. Subscribe now for daily milk delivery.
          </p>
          <Link
            to="/subscription"
            className="bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-3 px-6 rounded hover:bg-deep-emerald/90 transition-colors"
          >
            View Plans
          </Link>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PersonalInfo />
        <WishlistPreview />
      </div>

      <RecentOrders />
    </>
  )
}
