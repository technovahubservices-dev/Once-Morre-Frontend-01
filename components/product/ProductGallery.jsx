import { useWishlist } from '../../context/WishlistContext.jsx'
import { getImageUrl } from '../../utils/imageUrl.js'

export default function ProductGallery({ images, badge, product }) {

  const { toggleWishlist, isInWishlist } = useWishlist()

  return (
    <div className="md:col-span-7 flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="hidden md:flex w-20 flex-shrink-0 flex-col gap-4">
        {images.map((src, index) => (
          <button
            key={index}
            type="button"
            className={`aspect-square w-full overflow-hidden rounded-lg bg-white p-1 transition-colors ${
              index === 0
                ? 'border-2 border-regal-gold'
                : 'border border-outline-variant hover:border-regal-gold'
            }`}
          >
            <img
              className="h-full w-full rounded object-cover"
              src={getImageUrl(src)}
              alt={`Thumbnail ${index + 1}`}
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative min-w-0 flex-1 overflow-hidden rounded-xl bg-black shadow-sm">
        {badge && (
          <div className="absolute left-4 top-4 z-10 rounded-full border border-outline-variant bg-white/90 px-3 py-1 text-xs font-label-caps text-primary backdrop-blur-sm">
            {badge}
          </div>
        )}

        {product && (
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={`Add ${product.name} to wishlist`}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2.5 text-on-surface-variant shadow-sm backdrop-blur-sm transition-colors hover:text-regal-gold"
          >
            <span
              className={`material-symbols-outlined ${
                isInWishlist(product._id || product.id)
                  ? 'icon-fill text-regal-gold'
                  : ''
              }`}
            >
              favorite
            </span>
          </button>
        )}

        <img
          src={getImageUrl(images[0])}
          alt="Product main image"
          className="block h-auto max-h-[650px] min-h-[500px] w-full object-cover"
        />

        {/* Mobile dots */}
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2 px-4 md:hidden">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === 0 ? 'bg-regal-gold' : 'bg-outline-variant'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}



