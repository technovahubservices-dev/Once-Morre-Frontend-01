import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { API_BASE } from '../services/apiConfig.js'

export default function AccountSettings() {
  const { user, token, updateUser, changePassword } = useAuth()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  const handleSaveProfile = async () => {
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
        throw new Error(data.message || 'Failed to update settings')
      }

      updateUser(data.data)
      setSuccess('Profile updated successfully')
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match')
      return
    }

    setSaving(true)

    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword)
      setPasswordSuccess('Password changed successfully')
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setPasswordError(err.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <header className="mb-4">
        <h1 className="font-display-lg text-display-lg text-deep-emerald">Account Settings</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
          Update your preferences and security settings.
        </p>
      </header>

      {error && <div className="mb-6 p-4 bg-error-container text-error rounded text-sm">{error}</div>}
      {success && <div className="mb-6 p-4 bg-green-50 text-green-700 rounded text-sm">{success}</div>}

      <div className="bg-surface-white border border-outline-variant rounded p-8 shadow-sm space-y-8">
        <div>
          <h3 className="font-headline-md text-headline-md text-deep-emerald mb-6">Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-body-md text-body-md text-deep-emerald mb-2">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
              />
            </div>
            <div>
              <label className="block font-body-md text-body-md text-deep-emerald mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full bg-surface-container-low border-none rounded px-4 py-3 text-on-surface-variant cursor-not-allowed"
              />
              <p className="text-xs text-on-surface-variant mt-1">Email cannot be changed.</p>
            </div>
            <div>
              <label className="block font-body-md text-body-md text-deep-emerald mb-2">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-3 px-6 rounded hover:bg-deep-emerald/90 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-headline-md text-headline-md text-deep-emerald mb-6">Security</h3>
          {passwordError && <div className="mb-4 p-3 bg-error-container text-error rounded text-sm">{passwordError}</div>}
          {passwordSuccess && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded text-sm">{passwordSuccess}</div>}
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            <div>
              <label className="block font-body-md text-body-md text-deep-emerald mb-2">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
                required
              />
            </div>
            <div>
              <label className="block font-body-md text-body-md text-deep-emerald mb-2">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block font-body-md text-body-md text-deep-emerald mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-3 px-6 rounded hover:bg-deep-emerald/90 transition-colors disabled:opacity-50"
            >
              {saving ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
