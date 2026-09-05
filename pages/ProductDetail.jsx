import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { api } from '../services/api.js'
import Breadcrumbs from '../components/common/Breadcrumbs.jsx'
import ProductGallery from '../components/product/ProductGallery.jsx'
import SizeSelector from '../components/product/SizeSelector.jsx'
import DeliveryCheck from '../components/product/DeliveryCheck.jsx'
import TrustSignals from '../components/product/TrustSignals.jsx'
import ProductSpecifications from '../components/product/ProductSpecifications.jsx'
import ProductCard from '../components/product/ProductCard.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    api.getProductById(id).then(setProduct)
  }, [id])

  if (!product) {
    return (
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 text-center">
        <p className="font-body-md text-body-md text-on-surface-variant">Loading...</p>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Dairy Products', href: '/collections' },
    { label: product.category?.name, href: '/collections' },
    { label: product.name },
  ]

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-16">
      <Breadcrumbs items={breadcrumbItems} />

      {/* Product Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-24">
        <ProductGallery images={product.images || [product.image]} badge={product.badge} product={product} />

        <div className="md:col-span-5 flex flex-col justify-center px-2 md:px-6 py-4 md:py-0">
          <div className="mb-2">
            <span className="text-xs font-label-caps tracking-widest text-on-surface-variant uppercase">{product.category?.name}</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">{product.name}</h1>

          {/* Ratings & SKU */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-outline-variant/30">
            <div className="flex items-center gap-1 text-regal-gold">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`material-symbols-outlined text-lg ${star <= Math.floor(product.rating || 0) ? 'filled' : ''}`}
                >
                  {star <= Math.floor(product.rating || 0) ? 'star' : 'star_half'}
                </span>
              ))}
              <span className="text-sm font-body-md text-on-surface-variant ml-2">({product.reviews || 0} Reviews)</span>
            </div>
            <span className="text-sm font-body-md text-on-surface-variant">SKU: {product.sku || ''}</span>
          </div>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-baseline gap-4">
              {/* // Fix: add tabular-nums and tracking-tight for consistent price alignment and premium look. */}
              <span className="font-body-md text-body-md text-on-surface tabular-nums">₹ {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="font-body-md text-body-md text-on-surface-variant tabular-nums line-through">₹ {product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm font-bold text-surface-tint bg-primary-fixed/30 px-2 py-1 rounded">{product.discount}% OFF</span>
                </>
              )}
            </div>
            <p className="text-xs text-on-surface-variant mt-1">Inclusive of all taxes</p>
          </div>

          {/* Size Selector */}
          <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSelect={setSelectedSize} />

          {/* Actions */}
          <div className="flex flex-col gap-4 mb-8">
            <button
              onClick={() => addItem(product)}
              className="w-full bg-deep-emerald text-white py-4 rounded-lg font-label-caps text-label-caps uppercase hover:bg-surface-tint transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">shopping_bag</span>
              Add to Cart
            </button>
            <button
              onClick={() => { addItem(product); navigate('/cart') }}
              className="w-full bg-transparent text-deep-emerald border border-outline py-4 rounded-lg font-label-caps text-label-caps uppercase hover:bg-surface-container-low transition-colors"
            >
              Buy Now
            </button>
          </div>

          {/* Delivery Check */}
          <DeliveryCheck />

          {/* Trust Signals */}
          <TrustSignals />
        </div>
      </div>

      {/* Product Specifications */}
      <ProductSpecifications specifications={product.specifications} />

      {/* Similar Products */}
      {product.similarProducts && product.similarProducts.length > 0 && (
        <div>
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-headline-md text-headline-md text-primary">You May Also Like</h2>
            <Link className="text-sm font-label-caps uppercase text-surface-tint hover:text-primary transition-colors flex items-center gap-1 border-b border-transparent hover:border-primary" to="/collections">
              View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {product.similarProducts.map((similarProduct) => (
              <ProductCard key={similarProduct.id} product={similarProduct} variant="compact" />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}


