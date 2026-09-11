import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { useState } from 'react'
import { API_BASE } from '../../services/apiConfig.js'
import { getImageUrl } from '../../utils/imageUrl.js'

const getDisplayPrice = (product) => {
  if (product.variants && product.variants.length > 0) {
    return Math.max(
      ...product.variants.map((variant) => Number(variant.price) || 0)
    )
  }

  return Number(product.price) || 0
}

export default function ProductCard({ product, variant = 'default' }) {
  console.log('PRODUCT IMAGE:', product.name, product.images?.[0], product.image)
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [showQuickView, setShowQuickView] = useState(false)

  if (variant === 'compact') {
    return (
      <div className="group cursor-pointer">
        <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl border border-[#E7DFD3] bg-[#F8F4EF] shadow-[0_8px_25px_rgba(17,66,50,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C99742]/50 hover:shadow-[0_16px_35px_rgba(17,66,50,0.12)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-[#E9C47E]/10" />

          {product.badge && (
            <span className="absolute left-3 top-3 z-10 rounded-full border border-[#E9C47E]/30 bg-[#114232] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#F4D58A] shadow-sm">
              {product.badge}
            </span>
          )}

          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={`Add ${product.name} to wishlist`}
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E7DFD3] bg-white/90 text-[#66756F] shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C99742] hover:text-[#C99742]"
          >
            <span
              className={`material-symbols-outlined text-[19px] ${
                isInWishlist(product._id || product.id)
                  ? 'icon-fill text-[#C99742]'
                  : ''
              }`}
            >
              favorite
            </span>
          </button>

          <Link
            to={`/product/${product._id || product.id}`}
            className="flex h-full w-full items-center justify-center p-6"
          >
            <img
              className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
              src={getImageUrl(product.images?.[0] || product.image || '')}
              alt={product.name}
            />
          </Link>
        </div>

        <div className="px-2 text-center">
          <Link to={`/product/${product._id || product.id}`}>
            <h3 className="mb-1 truncate font-serif text-base font-semibold text-[#114232] transition-colors duration-300 group-hover:text-[#C99742]">
              {product.name}
            </h3>
          </Link>

          <p className="font-body-md text-base font-semibold tracking-tight text-[#1A5642] tabular-nums">
            Rs. {getDisplayPrice(product).toLocaleString()}
          </p>
        </div>
      </div>
    )
  }

  const hasDiscount = Boolean(product.discount || product.originalPrice)

  return (
    <>
      <div
        className={`group flex h-full flex-col overflow-hidden rounded-[22px] border bg-white shadow-[0_8px_30px_rgba(17,66,50,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_50px_rgba(17,66,50,0.13)] ${
          hasDiscount
            ? 'border-[#C99742]/35'
            : 'border-[#E7DFD3]'
        }`}
      >
        {/* IMAGE */}
        <div className="relative overflow-hidden bg-[#F7F2EC]">
          <Link
            to={`/product/${product._id || product.id}`}
            className="relative block"
          >
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#114232]/10 via-transparent to-white/10 opacity-70" />

            <img
              src={getImageUrl(product.images?.[0] || product.image || '')}
              alt={product.name}
              className="h-[300px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 md:h-[330px]"
            />
          </Link>

          {/* GOLD ACCENT */}
          <div className="absolute bottom-0 left-0 right-0 z-[2] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#C99742] via-[#E9C47E] to-[#C99742] transition-transform duration-500 group-hover:scale-x-100" />

          {/* BADGE */}
          {hasDiscount ? (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-[#C99742] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_5px_15px_rgba(121,91,0,0.22)]">
              {product.badge || `-${product.discount}%`}
            </span>
          ) : (
            product.badge && (
              <span className="absolute left-4 top-4 z-10 rounded-full border border-white/60 bg-[#114232]/95 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#F4D58A] shadow-lg backdrop-blur-sm">
                {product.badge}
              </span>
            )
          )}

          {/* WISHLIST */}
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={`Add ${product.name} to wishlist`}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#66756F] shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C99742] hover:text-[#C99742] hover:shadow-xl"
          >
            <span
              className={`material-symbols-outlined text-[21px] ${
                isInWishlist(product._id || product.id)
                  ? 'icon-fill text-[#C99742]'
                  : ''
              }`}
            >
              favorite
            </span>
          </button>

          {/* HOVER ACTIONS */}
          <div className="absolute bottom-5 left-5 right-5 z-10 flex translate-y-3 flex-col gap-2.5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => addItem(product)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#114232] py-3.5 font-label-caps text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_8px_22px_rgba(17,66,50,0.25)] transition-all duration-300 hover:bg-[#1A6A50] hover:shadow-[0_10px_26px_rgba(17,66,50,0.3)]"
            >
              <span className="material-symbols-outlined text-[18px]">
                shopping_bag
              </span>
              Add to Cart
            </button>

            <button
              type="button"
              onClick={() => setShowQuickView(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/80 bg-white/95 py-3.5 font-label-caps text-[11px] font-bold uppercase tracking-[0.16em] text-[#114232] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[#F8F4EF]"
            >
              <span className="material-symbols-outlined text-[18px]">
                visibility
              </span>
              Quick View
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <Link
            to={`/category/${encodeURIComponent(
              product.category?.slug || product.category?.name || ''
            )}`}
            className="mb-2.5 inline-flex w-fit items-center gap-1.5 font-label-caps text-[10px] font-bold uppercase tracking-[0.18em] text-[#C99742] transition-colors hover:text-[#114232]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C99742]" />
            {product.category?.name || product.category}
          </Link>

          <Link to={`/product/${product._id || product.id}`}>
            <h3 className="mb-2.5 font-serif text-[21px] font-bold leading-tight text-[#114232] transition-colors duration-300 hover:text-[#C99742]">
              {product.name}
            </h3>
          </Link>

          <p className="mb-5 line-clamp-2 font-body-md text-sm leading-relaxed text-[#66756F]">
            {product.description}
          </p>

          <div className="mt-auto">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <p className="font-serif text-lg font-bold text-[#114232] tabular-nums">
                Rs. {getDisplayPrice(product).toLocaleString()}
              </p>

              {product.originalPrice && (
                <p className="text-sm text-[#9A9A92] line-through tabular-nums">
                  Rs. {product.originalPrice.toLocaleString()}
                </p>
              )}

              {product.discount && (
                <span className="rounded-full bg-[#F5EBD9] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#9A721E]">
                  -{product.discount}%
                </span>
              )}
            </div>

            <Link
              to={`/product/${product._id || product.id}`}
              className="group/button inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#114232] bg-[#114232] px-5 py-3.5 font-label-caps text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C99742] hover:bg-[#C99742] hover:shadow-[0_8px_20px_rgba(121,91,0,0.18)]"
            >
              View Details
              <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover/button:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK VIEW */}
      {showQuickView && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#081E17]/65 p-4 backdrop-blur-md"
          onClick={() => setShowQuickView(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[24px] border border-[#E7DFD3] bg-[#FCF9F7] shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-9">
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <span className="mb-2 block font-label-caps text-[10px] font-bold uppercase tracking-[0.2em] text-[#C99742]">
                    Product Details
                  </span>

                  <h2 className="font-serif text-2xl font-bold text-[#114232] md:text-3xl">
                    {product.name}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowQuickView(false)}
                  aria-label="Close quick view"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E7DFD3] text-[#66756F] transition-all hover:border-[#114232] hover:bg-[#114232] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    close
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-[#E7DFD3] bg-[#F7F2EC]">
                  <img
                    src={getImageUrl(
                      product.images?.[0] || product.image || ''
                    )}
                    alt={product.name}
                    className="h-[360px] w-full object-cover md:h-[430px]"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="mb-2 font-label-caps text-[10px] font-bold uppercase tracking-[0.2em] text-[#C99742]">
                    {product.category?.name || product.category}
                  </p>

                  <h3 className="mb-4 font-serif text-2xl font-bold text-[#114232]">
                    {product.name}
                  </h3>

                  <p className="mb-5 font-serif text-2xl font-bold text-[#114232] tabular-nums">
                    Rs. {getDisplayPrice(product).toLocaleString()}
                  </p>

                  <div className="mb-6 h-px w-16 bg-[#C99742]" />

                  <p className="mb-7 text-sm leading-7 text-[#66756F]">
                    {product.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      addItem(product)
                      setShowQuickView(false)
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#114232] py-4 font-label-caps text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#C99742] hover:shadow-lg"
                  >
                    <span className="material-symbols-outlined text-[19px]">
                      shopping_bag
                    </span>
                    Add to Cart
                  </button>

                  <Link
                    to={`/product/${product._id || product.id}`}
                    onClick={() => setShowQuickView(false)}
                    className="mt-3 block w-full rounded-xl border border-[#114232] py-4 text-center font-label-caps text-[11px] font-bold uppercase tracking-[0.18em] text-[#114232] transition-all duration-300 hover:bg-[#F5EFEB]"
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








