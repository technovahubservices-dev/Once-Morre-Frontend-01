import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { adminApi } from '../../services/adminApi.js'

const roleColors = {
  admin: 'bg-red-50 text-red-700 border-red-200',
  user: 'bg-blue-50 text-blue-700 border-blue-200',
}

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', role: 'user', isActive: true })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const { token } = useAuth()

  const fetchUsers = async () => {
    try {
      const data = await adminApi.getUsers(token)
      setUsers(data.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchUsers()
    }
  }, [token])

  const openEditModal = (user) => {
    setEditingUser(user)
    setForm({
      name: user.name || '',
      phone: user.phone || '',
      role: user.role || 'user',
      isActive: user.isActive ?? true,
    })
    setFormError('')
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFormError('')

    try {
      await adminApi.updateUser(token, editingUser._id, form)
      setModalOpen(false)
      fetchUsers()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to deactivate this user?')) return
    try {
      await adminApi.deleteUser(token, id)
      fetchUsers()
    } catch (err) {
      setError(err.message)
    }
  }

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="p-6 md:p-10">
        <h1 className="font-display-lg text-display-lg text-deep-emerald mb-6">Users</h1>
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
        <h1 className="font-display-lg text-display-lg text-deep-emerald">Users</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
          Manage registered users and their roles.
        </p>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-error-container border border-error text-error rounded font-body-md">
          {error}
        </div>
      )}

      <div className="bg-[#fffdf8] border border-outline-variant rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider">
                <th className="pb-4 font-semibold px-4">User</th>
                <th className="pb-4 font-semibold px-4">Email</th>
                <th className="pb-4 font-semibold px-4">Role</th>
                <th className="pb-4 font-semibold px-4">Status</th>
                <th className="pb-4 font-semibold text-right px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-container-low rounded-full flex items-center justify-center border border-outline-variant/30 flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px] text-on-surface-variant">person</span>
                      </div>
                      <div>
                        <p className="font-medium text-deep-emerald">{user.name}</p>
                        <p className="text-xs text-on-surface-variant">{user.phone || 'No phone'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-on-surface">{user.email}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${roleColors[user.role] || roleColors.user}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${
                      user.isActive
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-2 text-on-surface-variant hover:text-deep-emerald transition-colors"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 text-on-surface-variant hover:text-error transition-colors"
                        title="Deactivate"
                      >
                        <span className="material-symbols-outlined text-[18px]">person_remove</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-on-surface-variant">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#fffdf8] rounded shadow-xl w-full max-w-lg">
            <div className="p-6 border-b border-outline-variant flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-deep-emerald">Edit User</h2>
              <button onClick={() => setModalOpen(false)} className="text-on-surface-variant hover:text-deep-emerald">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {formError && (
                <div className="p-4 bg-error-container border border-error text-error rounded font-body-md text-sm">
                  {formError}
                </div>
              )}

              <div>
                <label className="block font-body-md text-body-md text-deep-emerald mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-body-md text-body-md text-deep-emerald mb-2">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateForm('phone', e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-body-md text-body-md text-deep-emerald mb-2">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => updateForm('role', e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={form.isActive}
                  onChange={(e) => updateForm('isActive', e.target.checked)}
                  className="w-4 h-4 rounded border-outline-variant text-deep-emerald focus:ring-regal-gold"
                />
                <label htmlFor="isActive" className="font-body-md text-body-md text-deep-emerald">
                  Active
                </label>
              </div>

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-3 border border-outline-variant rounded font-body-md hover:bg-surface-container-low transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-deep-emerald text-white rounded font-body-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Update User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

