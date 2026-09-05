import { useCart } from '../context/CartContext.jsx'
import { Link } from 'react-router-dom'
import CartItem from '../components/cart/CartItem.jsx'
import OrderSummary from '../components/cart/OrderSummary.jsx'

export default function Cart() {
  const { items, cartTotal } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  if (items.length === 0) {
    return (
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 text-center">
        <h1 className="font-headline-lg text-headline-lg text-deep-emerald mb-4">Your Dairy Basket</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8">
          Looks like you haven't added any dairy products to your basket yet.
        </p>
        <Link
          to="/collections"
          className="inline-block bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded hover:bg-deep-emerald/90 transition-colors"
        >
          Explore Products
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
      <div className="mb-12">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-emerald mb-4">Your Dairy Basket</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">{itemCount} Items</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-gutter">
        <div className="w-full lg:w-2/3 space-y-8">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="w-full lg:w-1/3">
          <OrderSummary cartTotal={cartTotal} itemCount={itemCount} />
        </div>
      </div>
    </main>
  )
}
