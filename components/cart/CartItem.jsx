import { useCart } from '../../context/CartContext.jsx'
import { useWishlist } from '../../context/WishlistContext.jsx'

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()
  const { toggleWishlist } = useWishlist()

  return (
    <div className="bg-surface-white border border-outline-variant p-6 flex flex-col sm:flex-row gap-6 relative shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full sm:w-48 h-48 bg-soft-cream flex-shrink-0">
        <img
          className="w-full h-full object-cover"
          src={item.image?.startsWith("http") || item.image?.startsWith("data:") ? item.image : `http://localhost:5000${item.image || item.images?.[0] || ""}`}
          alt={item.name}
        />
      </div>
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-headline-md text-headline-md text-deep-emerald">{item.name}</h3>
            {/* // Fix: consistent ₹ currency and tabular-nums for aligned price digits in cart. */}
            <p className="font-body-md text-body-md text-on-surface tabular-nums">₹ {item.price.toLocaleString()}</p>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-1">SKU: {item.sku || item.id}</p>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">
            {item.description || `${item.category} - Premium quality`}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between border-t border-outline-variant pt-4 gap-4">
          <div className="flex items-center border border-outline-variant px-3 py-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="text-on-surface hover:text-deep-emerald p-1"
            >
              <span className="material-symbols-outlined text-sm">remove</span>
            </button>
            <span className="mx-4 font-body-md text-body-md tabular-nums">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="text-on-surface hover:text-deep-emerald p-1"
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => toggleWishlist(item)}
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-regal-gold transition-colors flex items-center"
            >
              <span className="material-symbols-outlined text-sm mr-1">favorite</span>
              Move to Wishlist
            </button>
            <button
              onClick={() => removeItem(item.id)}
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-error transition-colors flex items-center"
            >
              <span className="material-symbols-outlined text-sm mr-1">delete</span>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}






