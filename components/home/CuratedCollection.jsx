import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard.jsx'
import { api } from '../../services/api.js'

const tabs = [
  { key: 'everyday', label: 'Everyday', filter: (p) => p.tags?.includes('Daily') || p.collection === 'Daily Essentials' },
  { key: 'premium', label: 'Premium', filter: (p) => p.tags?.includes('Premium') || p.collection === 'Premium Range' },
  { key: 'healthy', label: 'Healthy', filter: (p) => p.tags?.includes('Healthy') || p.tags?.includes('Low Fat') },
  { key: 'festive', label: 'Festive', filter: (p) => p.tags?.includes('Festive') || p.tags?.includes('Sweets') },
]

export default function CuratedCollection() {
  const [activeTab, setActiveTab] = useState('everyday')
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.getProducts().then(setProducts)
  }, [])

  const currentTab = tabs.find((t) => t.key === activeTab) || tabs[0]
  const filtered = products.filter(currentTab.filter)

  return (
    <section className="bg-surface-white">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
        <div className="text-center mb-10">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-regal-gold mb-4 block">
            Curated For You
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-emerald mb-4">
            Shop by Occasion
          </h2>
          <div className="h-[1px] w-12 bg-regal-gold mx-auto" />
        </div>
        <div className="flex justify-center gap-2 md:gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`font-label-caps text-label-caps uppercase tracking-widest px-6 py-3 border transition-all duration-300 ${
                activeTab === tab.key
                  ? 'border-deep-emerald bg-deep-emerald text-surface-white'
                  : 'border-outline-variant text-on-surface-variant hover:border-deep-emerald hover:text-deep-emerald'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* // Root cause of congestion: 4 columns on lg screens makes curated cards cramped.
            // Fix: cap grid at 3 columns for a more spacious, premium layout. */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
            {filtered.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-body-md text-body-md text-on-surface-variant">No products found for this occasion.</p>
          </div>
        )}
        <div className="text-center mt-12">
          <Link
            to="/collections"
            className="inline-block border-b border-deep-emerald text-deep-emerald font-label-caps text-label-caps uppercase tracking-widest pb-1 hover:text-regal-gold hover:border-regal-gold transition-colors"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  )
}
