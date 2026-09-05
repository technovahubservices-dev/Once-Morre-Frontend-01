import { useState } from 'react'

export default function DeliveryCheck() {
  const [pincode, setPincode] = useState('')

  return (
    <div className="bg-surface-white p-4 rounded-lg border border-outline-variant/50 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-3 text-primary font-medium font-body-md">
        <span className="material-symbols-outlined text-surface-tint">local_shipping</span>
        Check Delivery Date
      </div>
      <div className="flex">
        <input
          className="flex-grow border-b border-outline-variant bg-transparent px-2 py-2 focus:outline-none focus:border-primary font-body-md placeholder-on-surface-variant/50"
          placeholder="Enter Pincode"
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <button type="button" className="text-surface-tint font-semibold font-label-caps uppercase px-4 hover:text-primary transition-colors">
          Check
        </button>
      </div>
    </div>
  )
}
