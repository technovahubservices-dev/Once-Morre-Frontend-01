import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { adminApi } from '../../services/adminApi.js'
import Pagination from '../../components/common/Pagination.jsx'

const emptyInventory = {
  product: '',
  stockQuantity: '',
  lowStockThreshold: 10,
}

const adjustmentTypes = [
  { value: 'add', label: 'Add Stock', icon: 'add_circle', color: 'text-green-700' },
  { value: 'reduce', label: 'Reduce Stock', icon: 'remove_circle', color: 'text-orange-700' },
  { value: 'adjust', label: 'Set Stock', icon: 'edit', color: 'text-blue-700' },
  { value: 'out_of_stock', label: 'Mark Out of Stock', icon: 'cancel', color: 'text-red-700' },
]

export default function AdminInventory() {
  const [inventory, setInventory] = useState([])
  const [lowStock, setLowStock] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingInventory, setEditingInventory] = useState(null)
  const [form, setForm] = useState(emptyInventory)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [tab, setTab] = useState('all')
  const [adjustModalOpen, setAdjustModalOpen] = useState(false)
  const [adjustingItem, setAdjustingItem] = useState(null)
  const [adjustForm, setAdjustForm] = useState({ adjustmentType: 'add', quantityChange: '', reason: '' })
  const [adjustSubmitting, setAdjustSubmitting] = useState(false)
  const [adjustError, setAdjustError] = useState('')
  const [adjustSuccess, setAdjustSuccess] = useState('')
  const [history, setHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)
  const { token } = useAuth()

  const fetchInventory = async () => {
    try {
      const [invData, lowData, prodData] = await Promise.all([
        adminApi.getInventory(token),
        adminApi.getLowStock(token),
        adminApi.getProducts(token, 1, 100),
      ])
      setInventory(invData.data || [])
      setLowStock(lowData.data || [])
      setProducts(prodData.data?.products || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchHistory = async (productId) => {
    setHistoryLoading(true)
    try {
      const data = await adminApi.getStockAdjustments(token, productId)
      setHistory(data.data || [])
    } catch {
      setHistory([])
    } finally {
      setHistoryLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchInventory()
    }
  }, [token])

  const openCreateModal = () => {
    setEditingInventory(null)
    setForm(emptyInventory)
    setFormError('')
    setModalOpen(true)
  }

  const openEditModal = (item) => {
    setEditingInventory(item)
    setForm({
      product: item.product?._id || item.product || '',
      stockQuantity: item.stockQuantity || 0,
      lowStockThreshold: item.lowStockThreshold || 10,
    })
    setFormError('')
    setModalOpen(true)
  }

  const openAdjustModal = (item) => {
    setAdjustingItem(item)
    setAdjustForm({ adjustmentType: 'add', quantityChange: '', reason: '' })
    setAdjustError('')
    setAdjustSuccess('')
    setAdjustModalOpen(true)
    fetchHistory(item.product?._id || item.product)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFormError('')

    try {
      const inventoryData = {
        product: form.product,
        stockQuantity: Number(form.stockQuantity),
        lowStockThreshold: Number(form.lowStockThreshold),
      }

      if (editingInventory) {
        await adminApi.updateInventory(token, editingInventory.product?._id || editingInventory.product, inventoryData)
      } else {
        await adminApi.createInventory(token, inventoryData)
      }

      setModalOpen(false)
      fetchInventory()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleAdjustSubmit = async (e) => {
    e.preventDefault()
    setAdjustSubmitting(true)
    setAdjustError('')
    setAdjustSuccess('')

    try {
      const productId = adjustingItem.product?._id || adjustingItem.product
      const quantityChange = adjustForm.adjustmentType === 'out_of_stock' ? 0 : Number(adjustForm.quantityChange)

      if (adjustForm.adjustmentType !== 'out_of_stock' && (isNaN(quantityChange) || quantityChange <= 0)) {
        setAdjustError('Please enter a valid quantity')
        setAdjustSubmitting(false)
        return
      }

      const result = await adminApi.adjustStock(token, productId, {
        quantityChange,
        adjustmentType: adjustForm.adjustmentType,
        reason: adjustForm.reason || '',
      })

      setAdjustSuccess(`Stock adjusted successfully. New stock: ${result.data.stockQuantity}`)
      setAdjustModalOpen(false)
      fetchInventory()
    } catch (err) {
      setAdjustError(err.message || 'Failed to adjust stock')
    } finally {
      setAdjustSubmitting(false)
    }
  }

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const updateAdjustForm = (field, value) => {
    setAdjustForm((prev) => ({ ...prev, [field]: value }))
  }

  const getAdjustmentLabel = (type) => {
    const found = adjustmentTypes.find((t) => t.value === type)
    return found ? found.label : type
  }

  const getAdjustmentIcon = (type) => {
    const found = adjustmentTypes.find((t) => t.value === type)
    return found ? found.icon : 'help'
  }

  if (loading) {
    return (
      <div className="p-6 md:p-10">
        <h1 className="font-display-lg text-display-lg text-deep-emerald mb-6">Inventory</h1>
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

  const displayInventory = tab === 'low' ? lowStock : inventory

  return (
    <div className="p-6 md:p-10">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display-lg text-display-lg text-deep-emerald">Inventory</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Track stock levels and manage inventory.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-deep-emerald text-white rounded font-body-md hover:bg-opacity-90 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Inventory
        </button>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-error-container border border-error text-error rounded font-body-md">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('all')}
          className={`px-4 py-2 rounded font-body-md text-sm transition-colors ${
            tab === 'all'
              ? 'bg-deep-emerald text-white'
              : 'bg-[#fffdf8] border border-outline-variant text-on-surface-variant hover:text-deep-emerald'
          }`}
        >
          All Inventory ({inventory.length})
        </button>
        <button
          onClick={() => setTab('low')}
          className={`px-4 py-2 rounded font-body-md text-sm transition-colors ${
            tab === 'low'
              ? 'bg-deep-emerald text-white'
              : 'bg-[#fffdf8] border border-outline-variant text-on-surface-variant hover:text-deep-emerald'
          }`}
        >
          Low Stock ({lowStock.length})
        </button>
      </div>

      <div className="bg-[#fffdf8] border border-outline-variant rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider">
                <th className="pb-4 font-semibold px-4">Product</th>
                <th className="pb-4 font-semibold px-4">SKU</th>
                <th className="pb-4 font-semibold px-4">Stock</th>
                <th className="pb-4 font-semibold px-4">Threshold</th>
                <th className="pb-4 font-semibold px-4">Status</th>
                <th className="pb-4 font-semibold text-right px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {displayInventory.map((item) => {
                const product = item.product || {}
                const isLowStock = item.stockQuantity <= item.lowStockThreshold

                return (
                  <tr key={item._id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-surface-container-low rounded overflow-hidden border border-outline-variant/30 flex-shrink-0">
                          {product.images?.[0] && (
                            <img className="w-full h-full object-cover" src={product.images[0]} alt={product.name} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-deep-emerald">{product.name || 'Unknown Product'}</p>
                          <p className="text-xs text-on-surface-variant">₹ {product.price?.toLocaleString() || '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant font-mono text-sm">{product.sku || '—'}</td>
                    <td className="py-4 px-4 text-on-surface tabular-nums">{item.stockQuantity?.toLocaleString()}</td>
                    <td className="py-4 px-4 text-on-surface tabular-nums">{item.lowStockThreshold?.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${
                        isLowStock
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-green-50 text-green-700 border-green-200'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${isLowStock ? 'bg-red-500' : 'bg-green-500'}`} />
                        {isLowStock ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openAdjustModal(item)}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-deep-emerald/10 text-deep-emerald border border-deep-emerald/20 rounded font-body-md text-sm hover:bg-deep-emerald/20 transition-colors"
                          title="Adjust Stock"
                        >
                          <span className="material-symbols-outlined text-[16px]">swap_vert</span>
                          Adjust
                        </button>
                        <button
                          onClick={() => openEditModal(item)}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-surface-container-low border border-outline-variant rounded font-body-md text-sm hover:bg-surface-container-high transition-colors"
                          title="Edit Threshold"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                          Threshold
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {displayInventory.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-on-surface-variant">
                    No inventory items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {adjustModalOpen && adjustingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#fffdf8] rounded shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-outline-variant flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-deep-emerald">Adjust Stock</h2>
              <button onClick={() => setAdjustModalOpen(false)} className="text-on-surface-variant hover:text-deep-emerald">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <div className="p-6">
              {adjustError && (
                <div className="mb-4 p-4 bg-error-container border border-error text-error rounded font-body-md text-sm">
                  {adjustError}
                </div>
              )}
              {adjustSuccess && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded font-body-md text-sm">
                  {adjustSuccess}
                </div>
              )}

              <div className="flex items-center gap-4 mb-6 p-4 bg-surface-container-low rounded-lg">
                <div className="w-12 h-12 bg-[#fffdf8] rounded overflow-hidden border border-outline-variant/30 flex-shrink-0">
                  {(adjustingItem.product?.images?.[0] || adjustingItem.product?.image) && (
                    <img className="w-full h-full object-cover" src={adjustingItem.product.images?.[0] || adjustingItem.product.image} alt={adjustingItem.product?.name} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-deep-emerald">{adjustingItem.product?.name || 'Unknown Product'}</p>
                  <p className="text-sm text-on-surface-variant">SKU: {adjustingItem.product?.sku || '—'}</p>
                  <p className="text-sm text-on-surface-variant">Current Stock: <span className="font-medium text-deep-emerald">{adjustingItem.stockQuantity?.toLocaleString()}</span></p>
                </div>
              </div>

              <form onSubmit={handleAdjustSubmit} className="space-y-6">
                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Adjustment Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {adjustmentTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => updateAdjustForm('adjustmentType', type.value)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                          adjustForm.adjustmentType === type.value
                            ? 'border-deep-emerald bg-deep-emerald/5'
                            : 'border-outline-variant hover:border-outline-variant/60'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[24px] ${type.color}`}>{type.icon}</span>
                        <span className="font-body-md text-sm text-deep-emerald">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {adjustForm.adjustmentType !== 'out_of_stock' && (
                  <div>
                    <label className="block font-body-md text-body-md text-deep-emerald mb-2">Quantity</label>
                    <input
                      type="number"
                      value={adjustForm.quantityChange}
                      onChange={(e) => updateAdjustForm('quantityChange', e.target.value)}
                      placeholder="Enter quantity"
                      className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                      required
                      min="1"
                    />
                    <p className="text-xs text-on-surface-variant mt-1">
                      New stock will be: {adjustingItem.stockQuantity + (Number(adjustForm.quantityChange) || 0)}
                    </p>
                  </div>
                )}

                {adjustForm.adjustmentType === 'out_of_stock' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded">
                    <p className="font-body-md text-red-700">
                      This will set stock to <strong>0</strong> and mark the product as out of stock.
                    </p>
                  </div>
                )}

                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Reason (optional)</label>
                  <textarea
                    value={adjustForm.reason}
                    onChange={(e) => updateAdjustForm('reason', e.target.value)}
                    rows="2"
                    placeholder="e.g. Damaged goods, new shipment received"
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t border-outline-variant">
                  <button
                    type="button"
                    onClick={() => setAdjustModalOpen(false)}
                    className="px-6 py-3 border border-outline-variant rounded font-body-md hover:bg-surface-container-low transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={adjustSubmitting}
                    className="px-6 py-3 bg-deep-emerald text-white rounded font-body-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
                  >
                    {adjustSubmitting ? 'Adjusting...' : 'Confirm Adjustment'}
                  </button>
                </div>
              </form>

              {/* History */}
              <div className="mt-8 pt-6 border-t border-outline-variant">
                <h3 className="font-headline-md text-headline-md text-deep-emerald mb-4">Stock Adjustment History</h3>
                {historyLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-12 bg-surface-container-low rounded animate-pulse" />
                    ))}
                  </div>
                ) : history.length === 0 ? (
                  <p className="font-body-md text-body-md text-on-surface-variant">No adjustments recorded yet.</p>
                ) : (
                  <div className="space-y-3">
                    {history.map((record) => (
                      <div key={record._id} className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[20px] text-on-surface-variant">{getAdjustmentIcon(record.adjustmentType)}</span>
                          <div>
                            <p className="font-body-md text-sm text-deep-emerald">
                              {getAdjustmentLabel(record.adjustmentType)}
                              {record.quantityChange > 0 && <span className="text-green-700 ml-2">+{record.quantityChange}</span>}
                              {record.quantityChange < 0 && <span className="text-red-700 ml-2">{record.quantityChange}</span>}
                            </p>
                            <p className="text-xs text-on-surface-variant">
                              {record.previousStock} → {record.newStock}
                            </p>
                            {record.reason && <p className="text-xs text-on-surface-variant mt-1">Reason: {record.reason}</p>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-on-surface-variant">
                            {new Date(record.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#fffdf8] rounded shadow-xl w-full max-w-lg">
            <div className="p-6 border-b border-outline-variant flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-deep-emerald">
                {editingInventory ? 'Update Inventory' : 'Add Inventory'}
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
                <label className="block font-body-md text-body-md text-deep-emerald mb-2">Product *</label>
                <select
                  value={form.product}
                  onChange={(e) => updateForm('product', e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                  required
                  disabled={!!editingInventory}
                >
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Stock Quantity *</label>
                  <input
                    type="number"
                    value={form.stockQuantity}
                    onChange={(e) => updateForm('stockQuantity', e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block font-body-md text-body-md text-deep-emerald mb-2">Low Stock Threshold *</label>
                  <input
                    type="number"
                    value={form.lowStockThreshold}
                    onChange={(e) => updateForm('lowStockThreshold', e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 font-body-md focus:ring-1 focus:ring-regal-gold focus:outline-none"
                    required
                    min="0"
                  />
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
                  {submitting ? 'Saving...' : editingInventory ? 'Update Inventory' : 'Create Inventory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

