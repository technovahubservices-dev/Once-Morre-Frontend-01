import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { API_BASE } from '../../services/apiConfig.js'

const getImageUrl = (src) => {
  if (!src) return ''
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return src
  const backendBase = API_BASE.replace('/api', '')
  return backendBase + (src.startsWith('/') ? src : '/' + src)
}

export default function WishlistPreview() {
  const { items } = useWishlist()
  const displayItems = items.slice(0, 2)

  return (
    <div className="bg-surface-white p-8 border border-outline-variant rounded shadow-sm flex-1">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline-md text-headline-md text-deep-emerald">Recent Wishlist</h3>
        <Link className="font-label-caps text-label-caps text-regal-gold hover:text-deep-emerald uppercase transition-colors" to="/wishlist">
          View All
        </Link>
      </div>
      {displayItems.length === 0 ? (
        <p className="font-body-md text-body-md text-on-surface-variant text-center py-8">
          Your wishlist is empty. Browse products and save your favorites.
        </p>
      ) : (
        <div className="flex gap-4">
          {displayItems.map((item) => (
            <div key={item.id} className="w-1/2 flex flex-col gap-2 group cursor-pointer">
              <div className="aspect-square bg-surface-container-low overflow-hidden rounded relative border border-transparent group-hover:border-outline-variant transition-colors">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  src={getImageUrl(item.image || item.images?.[0])}
                  alt={item.name}
                />
              </div>
              <p className="font-body-md text-sm text-on-surface line-clamp-1 group-hover:text-regal-gold transition-colors">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


