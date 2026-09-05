import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'

export default function CartIcon() {
  const { cartCount } = useCart()

  return (
    <Link
      to="/cart"
      className="hover:text-regal-gold transition-colors scale-95 duration-200 ease-in-out relative"
    >
      <span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-regal-gold text-surface-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
          {cartCount}
        </span>
      )}
    </Link>
  )
}
