import { useWishlist } from '../context/WishlistContext.jsx'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid.jsx'

export default function Wishlist() {
  const { items } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 text-center">
        <h1 className="font-headline-lg text-headline-lg text-deep-emerald mb-4">Your Wishlist is Empty</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8">
          Save your favorite dairy products to view them here.
        </p>
        <Link
          to="/collections"
          className="inline-block bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded hover:bg-deep-emerald/90 transition-colors"
        >
          Explore Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <h1 className="font-headline-lg-mobile md:font-headline-lg text-3xl md:text-4xl font-bold text-deep-emerald mb-12">My Wishlist</h1>
      <ProductGrid products={items} />
    </div>
  )
}
