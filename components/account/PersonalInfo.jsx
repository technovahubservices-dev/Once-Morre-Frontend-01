import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { API_BASE } from '../../services/apiConfig.js'

export default function PersonalInfo() {
  const { user, token, updateUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  })

  const defaultAddress = user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0]

  const handleSave = async () => {
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile')
      }

      updateUser(data.data)
      setSuccess('Profile updated successfully')
      setEditing(false)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="bg-surface-white p-8 border border-outline-variant rounded shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline-md text-headline-md text-deep-emerald">Personal Information</h3>
        {!editing && (
          <button onClick={() => setEditing(true)} className="text-on-surface-variant hover:text-deep-emerald transition-colors">
            <span className="material-symbols-outlined">edit</span>
          </button>
        )}
      </div>

      {error && <div className="mb-4 p-3 bg-error-container text-error rounded text-sm">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded text-sm">{success}</div>}

      <div className="space-y-6 font-body-md text-body-md">
        <div>
          <p className="text-sm text-on-surface-variant mb-1">Full Name</p>
          {editing ? (
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
            />
          ) : (
            <p className="text-on-surface font-medium">{user?.name || 'Not provided'}</p>
          )}
        </div>

        <div>
          <p className="text-sm text-on-surface-variant mb-1">Email Address</p>
          <p className="text-on-surface font-medium">{user?.email || 'Not provided'}</p>
        </div>

        <div>
          <p className="text-sm text-on-surface-variant mb-1">Phone Number</p>
          {editing ? (
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
            />
          ) : (
            <p className="text-on-surface font-medium">{user?.phone || 'Not provided'}</p>
          )}
        </div>

        <div>
          <p className="text-sm text-on-surface-variant mb-1">Default Shipping Address</p>
          {defaultAddress ? (
            <p className="text-on-surface font-medium">
              {defaultAddress.fullName}<br />
              {defaultAddress.street}<br />
              {defaultAddress.city} - {defaultAddress.zipCode}<br />
              {defaultAddress.state}, {defaultAddress.country}
            </p>
          ) : (
            <p className="text-on-surface font-medium">No address saved</p>
          )}
        </div>

        {editing && (
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-3 px-6 rounded hover:bg-deep-emerald/90 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={() => { setEditing(false); setError(''); setSuccess('') }}
              className="border border-outline-variant text-on-surface-variant font-label-caps text-label-caps uppercase tracking-widest py-3 px-6 rounded hover:bg-surface-container-low transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
