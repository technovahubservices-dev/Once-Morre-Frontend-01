import { useEffect, useState } from 'react'
import { subscriptionApi } from '../../services/subscriptionApi.js'
import { useAuth } from '../../context/AuthContext.jsx'

const emptyPlan = {
  duration: '',
  originalPrice: '',
  offerPrice: '',
  popular: false,
  active: true,
}

export default function AdminSubscriptions() {
  const { token } = useAuth()

  const [subscriptions, setSubscriptions] = useState([])
  const [plans, setPlans] = useState([])
  const [stats, setStats] = useState({})
  const [statusFilter, setStatusFilter] = useState('ALL')

  const [loading, setLoading] = useState(true)
  const [plansLoading, setPlansLoading] = useState(true)

  const [editing, setEditing] = useState(null)
  const [planEditing, setPlanEditing] = useState(null)
  const [planForm, setPlanForm] = useState(emptyPlan)
  const [planFormOpen, setPlanFormOpen] = useState(false)

  const [saving, setSaving] = useState(false)
  const [planSaving, setPlanSaving] = useState(false)

  const [message, setMessage] = useState('')
  const [planMessage, setPlanMessage] = useState('')

  const loadSubscriptions = async () => {
    try {
      const [list, summary] = await Promise.all([
        subscriptionApi.getAllAdmin(token, { status: '' }),
        subscriptionApi.getStatsAdmin(token),
      ])

      setSubscriptions(list?.subscriptions || [])
      setStats(summary || {})
    } catch (err) {
      console.error('Failed to load subscriptions:', err)
      setMessage(err.message || 'Failed to load subscriptions')
    } finally {
      setLoading(false)
    }
  }

  const loadPlans = async () => {
    try {
      setPlansLoading(true)
      const result = await subscriptionApi.getPlansAdmin(token)
      setPlans(Array.isArray(result) ? result : [])
    } catch (err) {
      console.error('Failed to load subscription plans:', err)
      setPlanMessage(err.message || 'Failed to load subscription plans')
    } finally {
      setPlansLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      loadSubscriptions()
      loadPlans()
    }
  }, [token])

  const startEdit = (subscription) => {
    setEditing({
      ...subscription,
      plan: subscription.plan,
      quantity: subscription.quantity,
      originalPrice: subscription.originalPrice,
      offerPrice: subscription.offerPrice,
      status: subscription.status,
    })
    setMessage('')
  }

  const saveEdit = async () => {
    if (!editing) return

    setSaving(true)
    setMessage('')

    try {
      await subscriptionApi.updateAdmin(token, editing._id, {
        plan: editing.plan,
        quantity: Number(editing.quantity),
        originalPrice: Number(editing.originalPrice),
        offerPrice: Number(editing.offerPrice),
        status: editing.status,
      })

      setMessage('Subscription updated successfully')
      setEditing(null)
      await loadSubscriptions()
    } catch (err) {
      setMessage(err.message || 'Failed to update subscription')
    } finally {
      setSaving(false)
    }
  }

  const startCreatePlan = () => {
    setPlanEditing(null)
    setPlanForm(emptyPlan)
    setPlanFormOpen(true)
    setPlanMessage('')
  }

  const startEditPlan = (plan) => {
    setPlanEditing(plan)
    setPlanFormOpen(true)
    setPlanForm({
      duration: plan.duration || '',
      originalPrice: plan.originalPrice ?? '',
      offerPrice: plan.offerPrice ?? '',
      popular: plan.popular ?? false,
      active: plan.active ?? true,
    })
    setPlanMessage('')
  }

  const cancelPlanEdit = () => {
    setPlanEditing(null)
    setPlanForm(emptyPlan)
    setPlanFormOpen(false)
    setPlanMessage('')
  }

  const savePlan = async () => {
  console.log('CREATE PLAN CLICKED', planForm)
    if (!planForm.duration.trim()) {
      setPlanMessage('Duration is required')
      return
    }

    const originalPrice = Number(planForm.originalPrice)
    const offerPrice = Number(planForm.offerPrice)

    if (
      Number.isNaN(originalPrice) ||
      Number.isNaN(offerPrice) ||
      originalPrice < 0 ||
      offerPrice < 0
    ) {
      setPlanMessage('Please enter valid prices')
      return
    }

    if (offerPrice > originalPrice) {
      setPlanMessage('Offer price cannot be greater than original price')
      return
    }

    setPlanSaving(true)
    setPlanMessage('')

    const payload = {
      duration: planForm.duration.trim(),
      originalPrice,
      offerPrice,
      popular: Boolean(planForm.popular),
      active: Boolean(planForm.active),
    }

    try {
      if (planEditing) {
        await subscriptionApi.updatePlanAdmin(
          token,
          planEditing._id,
          payload
        )
        setPlanMessage('Subscription plan updated successfully')
      } else {
        await subscriptionApi.createPlanAdmin(token, payload)
        setPlanMessage('Subscription plan created successfully')
      }

      setPlanEditing(null)
      setPlanForm(emptyPlan)
      setPlanFormOpen(false)
      await loadPlans()
    } catch (err) {
      setPlanMessage(
        err.message ||
          (planEditing
            ? 'Failed to update subscription plan'
            : 'Failed to create subscription plan')
      )
    } finally {
      setPlanSaving(false)
    }
  }

  const deletePlan = async (plan) => {
    const confirmed = window.confirm(
      `Delete the "${plan.duration}" subscription plan?`
    )

    if (!confirmed) return

    setPlanSaving(true)
    setPlanMessage('')

    try {
      await subscriptionApi.deletePlanAdmin(token, plan._id)
      setPlanMessage('Subscription plan deleted successfully')

      if (planEditing?._id === plan._id) {
        setPlanEditing(null)
        setPlanForm(emptyPlan)
      }

      await loadPlans()
    } catch (err) {
      setPlanMessage(
        err.message || 'Failed to delete subscription plan'
      )
    } finally {
      setPlanSaving(false)
    }
  }

  const filteredSubscriptions =
    statusFilter === 'ALL'
      ? subscriptions
      : subscriptions.filter(
          (subscription) => subscription.status === statusFilter
        )

  if (loading) {
    return <div className="p-6">Loading subscriptions...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Subscriptions</h1>

      {message && (
        <div className="p-3 rounded-lg border">
          {message}
        </div>
      )}

      {/* SUBSCRIPTION STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border">
          <p>Active</p>
          <p className="text-2xl font-bold">
            {stats.totalActive || 0}
          </p>
        </div>

        <div className="p-4 rounded-lg border">
          <p>Paused</p>
          <p className="text-2xl font-bold">
            {stats.totalPaused || 0}
          </p>
        </div>

        <div className="p-4 rounded-lg border">
          <p>Cancelled</p>
          <p className="text-2xl font-bold">
            {stats.totalCancelled || 0}
          </p>
        </div>

        <div className="p-4 rounded-lg border">
          <p>Expired</p>
          <p className="text-2xl font-bold">
            {stats.totalExpired || 0}
          </p>
        </div>
      </div>

      {/* SUBSCRIPTION PLAN MANAGEMENT */}
      <div className="border rounded-lg p-5 space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">
              Subscription Plans
            </h2>
            <p className="text-sm text-gray-500">
              Manage the plans shown to customers.
            </p>
          </div>

          {!planEditing && (
            <button
              type="button"
              onClick={startCreatePlan}
              className="px-4 py-2 rounded-lg bg-black text-white"
              disabled={planSaving}
            >
              Add Plan
            </button>
          )}
        </div>

        {planMessage && (
          <div className="p-3 rounded-lg border">
            {planMessage}
          </div>
        )}

        {/* CREATE / EDIT PLAN */}
        {planFormOpen && (
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold">
              {planEditing ? 'Edit Subscription Plan' : 'Add Subscription Plan'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">
                  Duration
                </label>

                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  value={planForm.duration}
                  onChange={(e) =>
                    setPlanForm({
                      ...planForm,
                      duration: e.target.value,
                    })
                  }
                  placeholder="e.g. 30 DAYS"
                />
              </div>

              <div>
                <label className="block mb-1">
                  Original Price
                </label>

                <input
                  type="number"
                  min="0"
                  className="w-full border rounded-lg p-2"
                  value={planForm.originalPrice}
                  onChange={(e) =>
                    setPlanForm({
                      ...planForm,
                      originalPrice: e.target.value,
                    })
                  }
                  placeholder="2100"
                />
              </div>

              <div>
                <label className="block mb-1">
                  Offer Price
                </label>

                <input
                  type="number"
                  min="0"
                  className="w-full border rounded-lg p-2"
                  value={planForm.offerPrice}
                  onChange={(e) =>
                    setPlanForm({
                      ...planForm,
                      offerPrice: e.target.value,
                    })
                  }
                  placeholder="1800"
                />
              </div>

              <div className="flex items-center gap-6 pt-7">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={planForm.popular}
                    onChange={(e) =>
                      setPlanForm({
                        ...planForm,
                        popular: e.target.checked,
                      })
                    }
                  />
                  Popular
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={planForm.active}
                    onChange={(e) =>
                      setPlanForm({
                        ...planForm,
                        active: e.target.checked,
                      })
                    }
                  />
                  Active
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={cancelPlanEdit}
                disabled={planSaving}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={savePlan}
                disabled={planSaving}
                className="px-4 py-2 rounded-lg bg-black text-white"
              >
                {planSaving
                  ? 'Saving...'
                  : planEditing
                    ? 'Update Plan'
                    : 'Create Plan'}
              </button>
            </div>
          </div>
        )}

        {/* PLAN LIST */}
        {plansLoading ? (
          <div className="p-4 border rounded-lg">
            Loading subscription plans...
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Duration</th>
                  <th className="p-3 text-left">Original Price</th>
                  <th className="p-3 text-left">Offer Price</th>
                  <th className="p-3 text-left">Popular</th>
                  <th className="p-3 text-left">Active</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {plans.map((plan) => (
                  <tr key={plan._id} className="border-b">
                    <td className="p-3 font-medium">
                      {plan.duration}
                    </td>

                    <td className="p-3">
                      &#8377;{Number(plan.originalPrice || 0).toLocaleString()}
                    </td>

                    <td className="p-3">
                      &#8377;{Number(plan.offerPrice || 0).toLocaleString()}
                    </td>

                    <td className="p-3">
                      {plan.popular ? 'Yes' : 'No'}
                    </td>

                    <td className="p-3">
                      {plan.active ? 'Yes' : 'No'}
                    </td>

                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEditPlan(plan)}
                          disabled={planSaving}
                          className="px-3 py-1 border rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => deletePlan(plan)}
                          disabled={planSaving}
                          className="px-3 py-1 border border-red-300 text-red-600 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!plans.length && (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-6 text-center"
                    >
                      No subscription plans found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EDIT CUSTOMER SUBSCRIPTION */}
      {editing && (
        <div className="border rounded-lg p-5 space-y-4">
          <h2 className="text-lg font-semibold">
            Edit Subscription
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Plan</label>

              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={editing.plan}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    plan: e.target.value,
                  })
                }
                placeholder="e.g. 30 DAYS"
              />
            </div>

            <div>
              <label className="block mb-1">Quantity</label>

              <input
                type="number"
                min="1"
                className="w-full border rounded-lg p-2"
                value={editing.quantity}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    quantity: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-1">
                Original Price
              </label>

              <input
                type="number"
                min="0"
                className="w-full border rounded-lg p-2"
                value={editing.originalPrice}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    originalPrice: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-1">
                Offer Price
              </label>

              <input
                type="number"
                min="0"
                className="w-full border rounded-lg p-2"
                value={editing.offerPrice}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    offerPrice: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-1">Status</label>

              <select
                className="w-full border rounded-lg p-2"
                value={editing.status}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    status: e.target.value,
                  })
                }
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="PAUSED">PAUSED</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="EXPIRED">EXPIRED</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="px-4 py-2 border rounded-lg"
              onClick={() => setEditing(null)}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-black text-white"
              onClick={saveEdit}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* CUSTOMER SUBSCRIPTIONS */}
      <div className="flex flex-wrap gap-2">
        {['ALL', 'ACTIVE', 'PAUSED', 'CANCELLED', 'EXPIRED'].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg border ${
              statusFilter === status
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            {status === 'ALL'
              ? 'All'
              : status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Plan</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Offer Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Next Billing</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredSubscriptions.map((subscription) => (
              <tr
                key={subscription._id}
                className="border-b"
              >
                <td className="p-3">
                  {subscription.user?.name ||
                    subscription.user?.email ||
                    '-'}
                </td>

                <td className="p-3">
                  {subscription.plan}
                </td>

                <td className="p-3">
                  {subscription.quantity}
                </td>

                <td className="p-3">
                  &#8377;{Number(subscription.offerPrice || 0).toLocaleString()}
                </td>

                <td className="p-3">
                  {subscription.status}
                </td>

                <td className="p-3">
                  {subscription.nextBillingAt
                    ? new Date(
                        subscription.nextBillingAt
                      ).toLocaleDateString()
                    : '-'}
                </td>

                <td className="p-3">
                  <button
                    type="button"
                    className="px-3 py-1 border rounded-lg"
                    onClick={() =>
                      startEdit(subscription)
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}

            {!subscriptions.length && (
              <tr>
                <td
                  colSpan="7"
                  className="p-6 text-center"
                >
                  No subscriptions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
