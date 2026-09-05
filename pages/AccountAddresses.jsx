import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

const emptyAddress = {
  fullName: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'India',
  isDefault: false,
}

export default function AccountAddresses() {
  const { user, addAddress, updateAddress, deleteAddress } = useAuth()
  const addresses = user?.addresses || []
  const [modalOpen, setModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [form, setForm] = useState(emptyAddress)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const openCreateModal = () => {
    setEditingAddress(null)
    setForm(emptyAddress)
    setError('')
    setModalOpen(true)
  }

  const openEditModal = (address) => {
    setEditingAddress(address)
    setForm({
      fullName: address.fullName || '',
      phone: address.phone || '',
      street: address.street || '',
      city: address.city || '',
      state: address.state || '',
      zipCode: address.zipCode || '',
      country: address.country || 'India',
      isDefault: address.isDefault || false,
    })
    setError('')
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      if (editingAddress) {
        await updateAddress(editingAddress._id, form)
      } else {
        await addAddress(form)
      }
      setModalOpen(false)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (addressId) => {
    if (!confirm('Are you sure you want to delete this address?')) return
    try {
      await deleteAddress(addressId)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
  }

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display-lg text-display-lg text-deep-emerald">Addresses</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
            Manage your delivery addresses.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-6 py-3 bg-deep-emerald text-white rounded font-body-md hover:bg-opacity-90 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Address
        </button>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-error-container text-error rounded text-sm">{error}</div>
      )}

      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">No addresses saved yet.</p>
          <p className="font-body-md text-body-md text-on-surface-variant">Add an address during checkout to see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div key={addr._id} className="bg-surface-white border border-outline-variant rounded p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline-md text-headline-md text-deep-emerald">
                  {addr.isDefault ? 'Default Address' : 'Address'}
                </h3>
                {addr.isDefault && (
                  <span className="font-label-caps text-label-caps uppercase tracking-widest text-regal-gold border border-regal-gold px-2 py-0.5 rounded text-xs">
                    Default
                  </span>
                )}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                {addr.fullName}<br />
                {addr.phone}<br />
                {addr.street}<br />
                {addr.city} - {addr.zipCode}<br />
                {addr.state}, {addr.country}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(addr)}
                  className="p-2 text-on-surface-variant hover:text-deep-emerald transition-colors"
                  title="Edit"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  onClick={() => handleDelete(addr._id)}
                  className="p-2 text-on-surface-variant hover:text-error transition-colors"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-surface-white rounded shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-outline-variant flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-deep-emerald">
                {editingAddress ? 'Edit Address' : 'Add Address'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-on-surface-variant hover:text-deep-emerald">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="p-4 bg-error-container text-error rounded font-body-md text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateForm('fullName', e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateForm('phone', e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Street *</label>
                  <input
                    type="text"
                    value={form.street}
                    onChange={(e) => updateForm('street', e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">City *</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => updateForm('city', e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">State *</label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => updateForm('state', e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Zip Code *</label>
                  <input
                    type="text"
                    value={form.zipCode}
                    onChange={(e) => updateForm('zipCode', e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Country</label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => updateForm('country', e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
                  />
                </div>
                <div className="sm:col-span-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={form.isDefault}
                    onChange={(e) => updateForm('isDefault', e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant text-deep-emerald focus:ring-regal-gold"
                  />
                  <label htmlFor="isDefault" className="font-body-md text-body-md text-deep-emerald">
                    Set as default address
                  </label>
                </div>
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
                  disabled={saving}
                  className="px-6 py-3 bg-deep-emerald text-white rounded font-body-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingAddress ? 'Update Address' : 'Add Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
