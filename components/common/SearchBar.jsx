export default function SearchBar({ placeholder = 'Search products...' }) {
  return (
    <div className="relative">
      <input
        className="w-full bg-surface-container-low border-none rounded py-2 pl-4 pr-10 text-sm focus:ring-1 focus:ring-regal-gold"
        placeholder={placeholder}
        type="text"
      />
      <span className="material-symbols-outlined absolute right-3 top-2 text-outline">search</span>
    </div>
  )
}

