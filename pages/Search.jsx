import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard.jsx'
import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import Pagination from '../components/common/Pagination.jsx'
import { api } from '../services/api.js'

export default function Search() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (initialQuery) {
      api.searchProducts(initialQuery).then(setProducts)
    } else {
      setProducts([])
    }
  }, [initialQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
    }
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: initialQuery ? `Search: ${initialQuery}` : 'Search' },
  ]

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-[120px]">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant pb-6">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-emerald">
              {initialQuery ? `Search Results for "${initialQuery}"` : 'Search'}
            </h1>
            <p className="text-on-surface-variant mt-2 max-w-2xl">
              {initialQuery ? `Found ${products.length} product${products.length !== 1 ? 's' : ''} matching your search.` : 'Enter a search term to find products.'}
            </p>
          </div>
          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, category, SKU..."
              className="w-full bg-surface-container-low border border-outline-variant rounded py-2 pl-4 pr-10 text-sm focus:ring-1 focus:ring-regal-gold"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination currentPage={currentPage} totalPages={Math.max(1, Math.ceil(products.length / 8))} onPageChange={setCurrentPage} />
            </>
          ) : initialQuery ? (
            <div className="text-center py-24">
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">No products found matching "{initialQuery}".</p>
              <p className="font-body-md text-body-md text-on-surface-variant">Try searching for curd, ghee, paneer, or sweets.</p>
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-body-md text-body-md text-on-surface-variant">Enter a search term to find products.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
