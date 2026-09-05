import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard.jsx'
import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import Pagination from '../components/common/Pagination.jsx'
import { api } from '../services/api.js'

export default function CategoryPage() {
  const { name } = useParams()
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    api.getProductsByCategory(name).then(setProducts)
  }, [name])

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: name },
  ]

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-[120px]">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant pb-6">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-emerald">{name}</h1>
            <p className="text-on-surface-variant mt-2 max-w-2xl">Discover our pure and fresh {name.toLowerCase()}, crafted with tradition and delivered with care.</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-on-surface-variant">Showing {products.length} Items</span>
          </div>
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
          ) : (
            <div className="text-center py-24">
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">No products found in this category.</p>
              <Link to="/collections" className="text-deep-emerald hover:text-regal-gold transition-colors">
                Browse all collections
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
