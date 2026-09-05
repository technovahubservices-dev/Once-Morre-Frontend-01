import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { adminApi } from '../../services/adminApi.js'
import { API_BASE } from '../../services/apiConfig.js'
import Pagination from '../../components/common/Pagination.jsx'

const emptyProduct = {
  name: '',
  category: '',
  price: '',
  description: '',
  images: [''],
  badge: '',
  rating: 0,
  reviews: 0,
  sku: '',
  sizes: [],
  isActive: true,
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [inventoryMap, setInventoryMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState(emptyProduct)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [previewUrls, setPreviewUrls] = useState([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  const { token } = useAuth()

  const fetchProducts = async () => {
    try {
      const data = await adminApi.getProducts(token, page, 10, search)
      const productsList = data.data?.products || []
      setProducts(productsList)
      setTotalPages(data.data?.pagination?.pages || 1)

      const productIds = productsList.map((p) => p._id).filter(Boolean)
      if (productIds.length > 0) {
        try {
          const invData = await adminApi.getInventory(token)
          const invList = invData.data || []
          const map = {}
          invList.forEach((inv) => {
            const pid = inv.product?._id || inv.product
            if (pid) {
              map[pid] = inv.stockQuantity ?? inv.stock ?? 0
            }
          })
          setInventoryMap(map)
        } catch {
          // ignore inventory fetch errors
        }
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await adminApi.getCategories(token)
      setCategories(data.data || [])
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    if (token) {
      fetchProducts()
      fetchCategories()
    }
  }, [token, page, search])

  const openCreateModal = () => {
    setEditingProduct(null)
    setForm(emptyProduct)
    setPreviewUrls([])
    setFormError('')
    setModalOpen(true)
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    const images = product.images?.length ? product.images : ['']
    setForm({
      name: product.name || '',
      category: product.category?._id || product.category || '',
      price: product.price || '',
      description: product.description || '',
      images,
      badge: product.badge || '',
      rating: product.rating || 0,
      reviews: product.reviews || 0,
      sku: product.sku || '',
      sizes: product.sizes || [],
      isActive: product.isActive ?? true,
    })
    setPreviewUrls(images.filter((img) => img && img.trim()))
    setFormError('')
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFormError('')

    try {
      const productData = {
        ...form,
        price: Number(form.price),
        images: form.images.filter((img) => img.trim()),
        sizes: form.sizes.map((s) => Number(s)).filter((s) => !isNaN(s)),
      }

      if (editingProduct) {
        await adminApi.updateProduct(token, editingProduct._id, productData)
      } else {
        await adminApi.createProduct(token, productData)
      }

      setModalOpen(false)
      fetchProducts()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      await adminApi.deleteProduct(token, id)
      fetchProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleToggleActive = async (product) => {
    try {
      await adminApi.updateProduct(token, product._id, {
        isActive: !product.isActive,
      })
      fetchProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const updateImage = (index, value) => {
    setForm((prev) => {
      const images = [...prev.images]
      images[index] = value
      return { ...prev, images }
    })
    setPreviewUrls((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const addImage = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ''] }))
    setPreviewUrls((prev) => [...prev, ''])
  }

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const setPrimaryImage = (index) => {
    setForm((prev) => {
      const images = [...prev.images]
      const [image] = images.splice(index, 1)
      images.unshift(image)
      return { ...prev, images }
    })
    setPreviewUrls((prev) => {
      const next = [...prev]
      const [url] = next.splice(index, 1)
      next.unshift(url)
      return next
    })
  }

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    setUploading(true)
    setFormError('')

    try {
      const uploadedImages = []

      for (const file of files) {
        if (!file.type.startsWith('image/')) continue

        const data = await adminApi.uploadProductImage(token, file)
        const imageUrl = data.data?.imageUrl

        if (imageUrl) {
          uploadedImages.push(
            imageUrl.startsWith('http')
              ? imageUrl
              : `${API_BASE.replace('/api', '')}${imageUrl}`
          )
        }
      }

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImages],
      }))

      setPreviewUrls((prev) => [...prev, ...uploadedImages])
    } catch (err) {
      setFormError(err.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }

    e.target.value = ''
  }

  const handleAddImageUrl = () => {
    const url = prompt('Enter image URL:')
    if (url && url.trim()) {
      setForm((prev) => ({ ...prev, images: [...prev.images, url.trim()] }))
      setPreviewUrls((prev) => [...prev, url.trim()])
    }
  }

  if (loading) {
    return (
      <div className="p-6 md:p-10">
        <h1 className="font-display-lg text-display-lg text-deep-emerald mb-6">Products</h1>
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
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display-lg text-display-lg text-deep-emerald">Products</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Manage your product catalog.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-deep-emerald text-white rounded font-body-md hover:bg-opacity-90 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Product
        </button>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-error-container border border-error text-error rounded font-body-md">
          {error}
        </div>
      )}

      <div className="bg-[#fffdf8] border border-outline-variant rounded shadow-sm overflow-hidden">
        <div className="p-4 border-b border-outline-variant flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="flex-1 bg-surface-container-low border border-outline-variant rounded px-4 py-2 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider">
                <th className="pb-4 font-semibold px-4">Product</th>
                <th className="pb-4 font-semibold px-4">Category</th>
                <th className="pb-4 font-semibold px-4">Price</th>
                <th className="pb-4 font-semibold px-4">SKU</th>
                <th className="pb-4 font-semibold px-4">Stock</th>
                <th className="pb-4 font-semibold px-4">Status</th>
                <th className="pb-4 font-semibold text-right px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {products.map((product) => {
                const stock = inventoryMap[product._id] ?? '—'
                const isOutOfStock = stock === 0 || stock === '—'

                return (
                  <tr key={product._id} className={`hover:bg-surface-container-lowest transition-colors ${!product.isActive ? 'opacity-60' : ''}`}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-surface-container-low rounded overflow-hidden border border-outline-variant/30 flex-shrink-0">
                          {product.images?.[0] && (
                            <img className="w-full h-full object-cover" src={product.images[0]} alt={product.name} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-deep-emerald">{product.name}</p>
                          <p className="text-xs text-on-surface-variant">{product.badge || 'No badge'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-on-surface">
                      {product.category?.name || product.category?.slug || '—'}
                    </td>
                    <td className="py-4 px-4 text-on-surface tabular-nums">₹ {product.price?.toLocaleString()}</td>
                    <td className="py-4 px-4 text-on-surface-variant font-mono text-sm">{product.sku || '—'}</td>
                    <td className="py-4 px-4 text-on-surface tabular-nums">
                      <span className={isOutOfStock ? 'text-red-600 font-medium' : ''}>
                        {stock === '—' ? '—' : stock.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${
                        product.isActive
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${product.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                        {product.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleActive(product)}
                          className={`p-2 transition-colors ${
                            product.isActive
                              ? 'text-on-surface-variant hover:text-red-600'
                              : 'text-on-surface-variant hover:text-green-600'
                          }`}
                          title={product.isActive ? 'Disable' : 'Enable'}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {product.isActive ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 text-on-surface-variant hover:text-deep-emerald transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-on-surface-variant hover:text-error transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-on-surface-variant">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-outline-variant">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#fffdf8] rounded shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-outline-variant flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-deep-emerald">
                {editingProduct ? 'Edit Product' : 'Add Product'}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => updateForm('category', e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => updateForm('price', e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">SKU</label>
                  <input
                    type="text"
                    value={form.sku}
                    onChange={(e) => updateForm('sku', e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Description *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateForm('description', e.target.value)}
                    rows="3"
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Images</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                    {previewUrls.map((src, index) => (
                      <div key={index} className="relative group aspect-square bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/30">
                        <img
                          src={src}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="20">image</text></svg>'
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {index !== 0 && (
                            <button
                              type="button"
                              onClick={() => setPrimaryImage(index)}
                              className="p-1 bg-[#fffdf8]/90 rounded text-deep-emerald hover:bg-[#fffdf8]"
                              title="Set as primary"
                            >
                              <span className="material-symbols-outlined text-[14px]">star</span>
                            </button>
                          )}
                          {index === 0 && (
                            <span className="px-1.5 py-0.5 bg-regal-gold text-surface-white text-[10px] font-label-caps rounded">Primary</span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-1 bg-[#fffdf8]/90 rounded text-error hover:bg-[#fffdf8]"
                            title="Remove image"
                          >
                            <span className="material-symbols-outlined text-[14px]">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline-variant rounded font-body-md text-sm hover:bg-surface-container-high transition-colors disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[16px]">upload</span>
                      {uploading ? 'Uploading...' : 'Upload Images'}
                    </button>
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline-variant rounded font-body-md text-sm hover:bg-surface-container-high transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">link</span>
                      Add Image URL
                    </button>
                  </div>
                  {previewUrls.length === 0 && (
                    <p className="text-xs text-on-surface-variant mt-2">No images added. Upload files or paste image URLs.</p>
                  )}
                </div>

                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Badge</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => updateForm('badge', e.target.value)}
                    placeholder="e.g. Best Seller, New"
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Status</label>
                  <select
                    value={form.isActive}
                    onChange={(e) => updateForm('isActive', e.target.value === 'true')}
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                  >
                    <option value="true">Active</option>
                    <option value="false">Disabled</option>
                  </select>
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
                  disabled={submitting}
                  className="px-6 py-3 bg-deep-emerald text-white rounded font-body-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


