import { useState, useEffect } from 'react'
import ProductCard from '../components/product/ProductCard.jsx'
import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import Pagination from '../components/common/Pagination.jsx'
import { api } from '../services/api.js'

export default function Offers() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    api.getOffers().then(setProducts)
  }, [])

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Offers' },
  ]

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-[120px]">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant pb-6">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-emerald">Special Offers</h1>
            <p className="text-on-surface-variant mt-2 max-w-2xl">Take advantage of our limited-time offers and exclusive deals on premium dairy products.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 px-4 md:px-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <Pagination currentPage={currentPage} totalPages={Math.max(1, Math.ceil(products.length / 8))} onPageChange={setCurrentPage} />
            </>
          ) : (
            <div className="text-center py-24">
              <p className="font-body-md text-body-md text-on-surface-variant">No offers available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
