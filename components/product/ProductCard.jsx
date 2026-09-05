import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { useState } from 'react'
import { API_BASE } from '../../services/apiConfig.js'

const getImageUrl = (src) => {
  if (!src) return ''
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return src

  const backendBase = API_BASE.replace('/api', '')
  return backendBase + (src.startsWith('/') ? src : '/' + src)
}

export default function ProductCard({ product, variant = 'default' }) {
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [showQuickView, setShowQuickView] = useState(false)

  if (variant === 'compact') {
    return (
      <div className="group cursor-pointer">
        <div className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
          {product.badge && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-green px-3 py-1 text-[10px] font-label-caps uppercase tracking-widest text-primary">
              {product.badge}
            </span>
          )}

          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={`Add ${product.name} to wishlist`}
            className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-muted transition-colors hover:text-gold"
          >
            <span className={`material-symbols-outlined text-[20px] ${isInWishlist(product._id || product.id) ? 'icon-fill text-gold' : ''}`}>
              favorite
            </span>
          </button>

          <img
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            src={getImageUrl(product.images?.[0] || product.image || "")}
            alt={product.name}
          />
        </div>

        <div className="px-2 text-center">
          <Link to={`/product/${(product._id || product.id)}`}>
            <h3 className="mb-1 truncate font-body-md text-sm font-medium text-muted transition-colors group-hover:text-primary">
              {product.name}
            </h3>
          </Link>

          <p className="font-headline-md text-base font-semibold tracking-tight text-primary tabular-nums">
            Rs. {product.price.toLocaleString()}
          </p>
        </div>
      </div>
    )
  }

  const hasDiscount = Boolean(product.discount || product.originalPrice)

  return (
    <>
      <div
        className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
          hasDiscount
            ? 'border-gold/40 shadow-[0_8px_30px_rgba(121,91,0,0.08)]'
            : 'border-line'
        }`}
      >
        <div className="relative overflow-hidden bg-cream">
          <Link to={`/product/${(product._id || product.id)}`} className="block">
            <img
              src={getImageUrl(product.images?.[0] || product.image || "")}
              alt={product.name}
              className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[360px]"
            />
          </Link>

          {hasDiscount ? (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-gold px-3 py-1.5 text-[10px] font-label-caps font-bold uppercase tracking-widest text-white">
              {product.badge || `-${product.discount}%`}
            </span>
          ) : (
            product.badge && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-green px-3 py-1.5 text-[10px] font-label-caps font-bold uppercase tracking-widest text-primary">
                {product.badge}
              </span>
            )
          )}

          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={`Add ${product.name} to wishlist`}
            className="absolute right-4 top-4 z-10 rounded-full border border-line bg-white/90 p-2.5 text-muted shadow-sm backdrop-blur-sm transition-all hover:border-gold hover:text-gold"
          >
            <span className={`material-symbols-outlined ${isInWishlist(product._id || product.id) ? 'icon-fill text-gold' : ''}`}>
              favorite
            </span>
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex translate-y-2 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => addItem(product)}
              className="w-full rounded-lg bg-primary py-3 font-label-caps text-label-caps uppercase tracking-widest text-white shadow-lg transition-colors hover:bg-primary/90"
            >
              Add to Cart
            </button>

            <button
              type="button"
              onClick={() => setShowQuickView(true)}
              className="w-full rounded-lg border border-primary bg-white/95 py-3 font-label-caps text-label-caps uppercase tracking-widest text-primary shadow-lg transition-colors hover:bg-cream"
            >
              Quick View
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <Link
            to={`/category/${encodeURIComponent(product.category?.slug || product.category?.name || "")}`}
            className="mb-2 block font-label-caps text-xs uppercase tracking-widest text-muted transition-colors hover:text-gold"
          >
            {product.category?.name || product.category}
          </Link>

          <Link to={`/product/${(product._id || product.id)}`}>
            <h3 className="mb-2 font-headline-md text-headline-md font-semibold leading-tight text-primary transition-colors hover:text-gold">
              {product.name}
            </h3>
          </Link>

          <p className="mb-4 line-clamp-2 font-body-md text-body-md leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-auto flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-body-md text-body-md text-on-surface tabular-nums">
                Rs. {product.price.toLocaleString()}
              </p>

              {product.originalPrice && (
                <p className="font-body-md text-sm text-muted line-through tabular-nums">
                  Rs. {product.originalPrice.toLocaleString()}
                </p>
              )}

              {product.discount && (
                <span className="rounded-full bg-gold/10 px-2 py-1 text-xs font-label-caps font-bold uppercase tracking-widest text-gold">
                  -{product.discount}%
                </span>
              )}
            </div>

            <Link
              to={`/product/${(product._id || product.id)}`}
              className="self-start border-b border-primary pb-1 font-label-caps text-label-caps uppercase tracking-widest text-primary transition-colors hover:border-gold hover:text-gold"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>

      {showQuickView && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowQuickView(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-line bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <h2 className="font-headline-md text-headline-md font-semibold text-primary">
                  {product.name}
                </h2>

                <button
                  type="button"
                  onClick={() => setShowQuickView(false)}
                  aria-label="Close quick view"
                  className="rounded-full p-2 text-muted transition-colors hover:bg-cream hover:text-primary"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="overflow-hidden rounded-xl border border-line bg-cream">
                  <img
                    src={getImageUrl(product.images?.[0] || product.image || "")}
                    alt={product.name}
                    className="h-[360px] w-full object-cover md:h-[400px]"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="mb-2 font-label-caps text-xs uppercase tracking-widest text-muted">
                    {product.category?.name || product.category}
                  </p>

                  <h3 className="mb-3 font-headline-md text-headline-md font-semibold text-primary">
                    {product.name}
                  </h3>

                  <p className="mb-5 font-body-md text-body-md text-on-surface tabular-nums">
                    Rs. {product.price.toLocaleString()}
                  </p>

                  <p className="mb-6 font-body-md text-body-md leading-relaxed text-muted">
                    {product.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      addItem(product)
                      setShowQuickView(false)
                    }}
                    className="w-full rounded-lg bg-primary py-4 font-label-caps text-label-caps uppercase tracking-widest text-white transition-colors hover:bg-primary/90"
                  >
                    Add to Cart
                  </button>

                  <Link
                    to={`/product/${(product._id || product.id)}`}
                    onClick={() => setShowQuickView(false)}
                    className="mt-4 block w-full rounded-lg border border-primary py-4 text-center font-label-caps text-label-caps uppercase tracking-widest text-primary transition-colors hover:bg-cream"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}















