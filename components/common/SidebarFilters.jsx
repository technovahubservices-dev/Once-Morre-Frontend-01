import { useState } from 'react'

export default function SidebarFilters({
  categories = [],
  selectedCategories = [],
  minPrice = '',
  maxPrice = '',
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClear,
}) {
  const [openSections, setOpenSections] = useState({
    price: true,
    category: true,
  })

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8 md:block">
      {/* Price */}
      <div>
        <h3
          className="font-headline-md text-sm font-semibold text-charcoal-text uppercase tracking-widest mb-4 border-b border-outline-variant pb-2 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('price')}
        >
          Price
          <span className="material-symbols-outlined text-[18px]">
            {openSections.price ? 'remove' : 'add'}
          </span>
        </h3>

        {openSections.price && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                placeholder="Min ?"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                className="w-1/2 border border-outline-variant px-3 py-2 text-sm focus:outline-none focus:border-deep-emerald"
              />

              <input
                type="number"
                min="0"
                placeholder="Max ?"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                className="w-1/2 border border-outline-variant px-3 py-2 text-sm focus:outline-none focus:border-deep-emerald"
              />
            </div>
          </div>
        )}
      </div>

      {/* Category */}
      <div>
        <h3
          className="font-headline-md text-sm font-semibold text-charcoal-text uppercase tracking-widest mb-4 border-b border-outline-variant pb-2 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('category')}
        >
          Category
          <span className="material-symbols-outlined text-[18px]">
            {openSections.category ? 'remove' : 'add'}
          </span>
        </h3>

        {openSections.category && (
          <div className="space-y-3">
            {categories.map((category) => {
              const categoryName =
                typeof category === 'string'
                  ? category
                  : category.name

              return (
                <label
                  key={categoryName}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(categoryName)}
                    onChange={() => onCategoryChange(categoryName)}
                    className="form-checkbox h-4 w-4 text-deep-emerald border-outline-variant rounded-none focus:ring-deep-emerald"
                  />

                  <span className="text-on-surface-variant group-hover:text-charcoal-text transition-colors">
                    {categoryName}
                  </span>
                </label>
              )
            })}
          </div>
        )}
      </div>

      <button
        onClick={onClear}
        className="w-full py-3 bg-surface border border-outline-variant text-charcoal-text text-sm font-semibold hover:bg-surface-variant transition-colors mt-8"
      >
        CLEAR ALL FILTERS
      </button>
    </aside>
  )
}
