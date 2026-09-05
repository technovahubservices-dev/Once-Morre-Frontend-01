import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { adminApi } from '../../services/adminApi.js'

const emptyCategory = {
  name: '',
  description: '',
  image: '',
}

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [form, setForm] = useState(emptyCategory)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const { token } = useAuth()

  const fetchCategories = async () => {
    try {
      const data = await adminApi.getCategories(token)
      setCategories(data.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchCategories()
    }
  }, [token])

  const openCreateModal = () => {
    setEditingCategory(null)
    setForm(emptyCategory)
    setFormError('')
    setModalOpen(true)
  }

  const openEditModal = (category) => {
    setEditingCategory(category)
    setForm({
      name: category.name || '',
      description: category.description || '',
      image: category.image || '',
    })
    setFormError('')
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFormError('')

    try {
      if (editingCategory) {
        await adminApi.updateCategory(token, editingCategory._id, form)
      } else {
        await adminApi.createCategory(token, form)
      }

      setModalOpen(false)
      fetchCategories()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    try {
      await adminApi.deleteCategory(token, id)
      fetchCategories()
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
        <h1 className="font-display-lg text-display-lg text-deep-emerald mb-6">Categories</h1>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
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
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display-lg text-display-lg text-deep-emerald">Categories</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Organize your products into categories.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-deep-emerald text-white rounded font-body-md hover:bg-opacity-90 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Category
        </button>
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
                <th className="pb-4 font-semibold px-4">Name</th>
                <th className="pb-4 font-semibold px-4">Slug</th>
                <th className="pb-4 font-semibold px-4">Description</th>
                <th className="pb-4 font-semibold text-right px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {categories.map((category) => (
                <tr key={category._id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-medium text-deep-emerald">{category.name}</p>
                  </td>
                  <td className="py-4 px-4 text-on-surface-variant font-mono text-sm">{category.slug}</td>
                  <td className="py-4 px-4 text-on-surface">{category.description || '—'}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(category)}
                        className="p-2 text-on-surface-variant hover:text-deep-emerald transition-colors"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="p-2 text-on-surface-variant hover:text-error transition-colors"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-on-surface-variant">
                    No categories found.
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
              <h2 className="font-headline-md text-headline-md text-deep-emerald">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>
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
                <label className="block font-body-md text-body-md text-deep-emerald mb-2">Category Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-body-md text-body-md text-deep-emerald mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateForm('description', e.target.value)}
                  rows="3"
                  className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-body-md text-body-md text-deep-emerald mb-2">Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => updateForm('image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                />
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
                  {submitting ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

