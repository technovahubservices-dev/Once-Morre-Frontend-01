import { useState, useEffect, useMemo } from 'react'
import ProductCard from '../components/product/ProductCard.jsx'
import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import Pagination from '../components/common/Pagination.jsx'
import SidebarFilters from '../components/common/SidebarFilters.jsx'
import { api } from '../services/api.js'


const getDisplayPrice = (product) => {
  if (product.variants && product.variants.length > 0) {
    return Math.max(
      ...product.variants.map((variant) => Number(variant.price) || 0)
    )
  }

  return Number(product.price) || 0
}

export default function Collections() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('Recommended')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const ITEMS_PER_PAGE = 8

  useEffect(() => {
    api.getProducts().then(setProducts)
  }, [])

  const categories = useMemo(() => {
    const uniqueCategories = new Set()

    products.forEach((product) => {
      if (!product.category) return

      const categoryName =
        typeof product.category === 'string'
          ? product.category
          : product.category.name

      if (categoryName) {
        uniqueCategories.add(categoryName)
      }
    })

    return Array.from(uniqueCategories)
  }, [products])

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => {
        const categoryName =
          typeof product.category === 'string'
            ? product.category
            : product.category?.name

        return selectedCategories.includes(categoryName)
      })
    }

    // Minimum price
    if (minPrice !== '') {
      result = result.filter(
        (product) => getDisplayPrice(product) >= Number(minPrice)
      )
    }

    // Maximum price
    if (maxPrice !== '') {
      result = result.filter(
        (product) => getDisplayPrice(product) <= Number(maxPrice)
      )
    }

    // Sorting
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => getDisplayPrice(a) - getDisplayPrice(b))
    }

    if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => getDisplayPrice(b) - getDisplayPrice(a))
    }

    if (sortBy === 'New Arrivals') {
      result.sort((a, b) => {
        const aNew = String(a.badge || '').toLowerCase() === 'new'
        const bNew = String(b.badge || '').toLowerCase() === 'new'

        if (aNew === bNew) return 0
        return aNew ? -1 : 1
      })
    }

    return result
  }, [
    products,
    selectedCategories,
    minPrice,
    maxPrice,
    sortBy,
  ])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategories, minPrice, maxPrice, sortBy])

  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setMinPrice('')
    setMaxPrice('')
    setSortBy('Recommended')
    setCurrentPage(1)
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Dairy Products' },
  ]

  const showingFrom =
    filteredAndSortedProducts.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1

  const showingTo = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredAndSortedProducts.length
  )

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-[120px]">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="mb-12">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 border-b border-outline-variant pb-8">

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-regal-gold"></span>
              <span className="text-xs uppercase tracking-[0.28em] text-regal-gold font-semibold">
                Our Collection
              </span>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-deep-emerald mb-4">
              Premium Dairy Collection
            </h1>

            <p className="text-on-surface-variant text-base max-w-2xl leading-relaxed">
              Discover our exquisite range of farm-fresh dairy products,
              crafted with tradition and delivered with care.
            </p>
          </div>

          <div className="flex items-center gap-5 flex-shrink-0">
            <span className="text-on-surface-variant text-sm whitespace-nowrap">
              Showing {showingFrom}-{showingTo} of{' '}
              {filteredAndSortedProducts.length} Items
            </span>

            <div className="relative">
              <select
                className="appearance-none bg-surface-white border border-outline-variant py-3 pl-4 pr-11 text-sm focus:outline-none focus:ring-1 focus:ring-deep-emerald focus:border-deep-emerald cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Recommended">Sort by: Recommended</option>
                <option value="Price: Low to High">
                  Price: Low to High
                </option>
                <option value="Price: High to Low">
                  Price: High to Low
                </option>
                <option value="New Arrivals">New Arrivals</option>
              </select>

              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                expand_more
              </span>
            </div>
          </div>

        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <SidebarFilters
          categories={categories}
          selectedCategories={selectedCategories}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onCategoryChange={handleCategoryChange}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onClear={clearFilters}
        />

        <div className="flex-1">
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center py-24">
              <p className="font-body-md text-body-md text-on-surface-variant">
                No products match your filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-4 text-deep-emerald font-semibold underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}






