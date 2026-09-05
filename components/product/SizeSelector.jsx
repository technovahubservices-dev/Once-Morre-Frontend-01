import { useState } from 'react'

export default function SizeSelector({ sizes, selectedSize, onSelect }) {
  const [isOpen, setIsOpen] = useState(true)

  if (!sizes || sizes.length === 0) return null

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <label className="font-body-md font-semibold text-primary">Select Size</label>
        <button type="button" className="text-sm text-surface-tint underline underline-offset-2 hover:text-primary transition-colors">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onSelect(size)}
            className={`w-12 h-12 rounded-full border flex items-center justify-center font-body-md transition-colors ${
              selectedSize === size
                ? 'border-2 border-primary text-primary font-semibold bg-surface-container-lowest shadow-sm'
                : 'border-outline-variant text-on-surface-variant hover:border-regal-gold'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
