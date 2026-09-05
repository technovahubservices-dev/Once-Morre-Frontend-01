import { useWishlist } from '../../context/WishlistContext.jsx'
import { API_BASE } from '../../services/apiConfig.js'

export default function ProductGallery({ images, badge, product }) {
  const getImageUrl = (src) => {
    if (!src) return ''
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return src
    const backendBase = API_BASE.replace('/api', '')
    return backendBase + (src.startsWith('/') ? src : '/' + src)
  }
  const { toggleWishlist, isInWishlist } = useWishlist()

  return (
    <div className="md:col-span-7 flex flex-col md:flex-row gap-4 h-full">
      <div className="hidden md:flex flex-col gap-4 w-24 flex-shrink-0">
        {images.map((src, index) => (
          <button
            key={index}
            className={`w-full aspect-square bg-surface-white rounded-lg overflow-hidden p-1 transition-colors ${
              index === 0 ? 'border-2 border-regal-gold' : 'border border-outline-variant hover:border-regal-gold'
            }`}
          >
            <img className="w-full h-full object-cover rounded" src={getImageUrl(src)} alt={`Thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
      <div className="flex-grow bg-surface-white rounded-xl overflow-hidden shadow-sm relative group aspect-square md:aspect-[4/5]">
        {badge && (
          <div className="absolute top-4 left-4 z-10 bg-surface-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-label-caps text-primary border border-outline-variant">
            {badge}
          </div>
        )}
        {product && (
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-4 right-4 z-10 p-2 bg-surface-white/80 backdrop-blur-sm rounded-full text-on-surface-variant hover:text-error transition-colors shadow-sm"
          >
            <span className={`material-symbols-outlined ${isInWishlist(product.id) ? 'icon-fill text-regal-gold' : ''}`}>favorite</span>
          </button>
        )}
        <img
          className="w-full h-full object-cover img-hover-zoom"
          src={getImageUrl(images[0])}
          alt="Product main image"
        />
        <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 z-10">
          {images.map((_, index) => (
            <div key={index} className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-regal-gold' : 'bg-outline-variant'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

