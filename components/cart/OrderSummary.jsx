import { Link } from 'react-router-dom'

export default function OrderSummary({ cartTotal, itemCount }) {
  const makingCharges = 150
  const tax = cartTotal > 0 ? Math.round(cartTotal * 0.06) : 0
  const delivery = cartTotal > 500 ? 0 : 50
  const total = cartTotal + makingCharges + tax + delivery

  return (
    <div className="bg-surface-white border border-outline-variant p-8 shadow-sm sticky top-32">
      <h2 className="font-headline-md text-headline-md text-deep-emerald border-b border-outline-variant pb-4 mb-6">Order Summary</h2>
      <div className="space-y-4 mb-6 font-body-md text-body-md">
        {/* // Fix: consistent ₹ currency and tabular-nums for aligned price columns. */}
        <div className="flex justify-between">
          <span className="text-on-surface-variant">Subtotal ({itemCount} Items)</span>
          <span className="font-body-md text-body-md text-on-surface tabular-nums">₹ {cartTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-on-surface-variant">Making Charges</span>
          <span className="font-body-md text-body-md text-on-surface tabular-nums">₹ {makingCharges.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-on-surface-variant">Tax</span>
          <span className="font-body-md text-body-md text-on-surface tabular-nums">₹ {tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-on-surface-variant">Delivery</span>
          <span className="text-primary font-semibold tabular-nums">{delivery === 0 ? 'Free' : `₹ ${delivery}`}</span>
        </div>
      </div>

      {/* Coupon Input */}
      <div className="mb-6 border-t border-b border-outline-variant py-6">
        <div className="flex">
          <input
            className="w-full bg-soft-cream border-t border-l border-b border-outline-variant px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-deep-emerald focus:ring-0"
            placeholder="Enter Coupon Code"
            type="text"
          />
          <button className="bg-surface-white border border-outline-variant px-6 font-label-caps text-label-caps text-deep-emerald hover:bg-surface-container-low transition-colors">
            APPLY
          </button>
        </div>
      </div>

      {/* // Fix: consistent ₹ currency and tabular-nums for aligned total. */}
      <div className="flex justify-between items-center mb-8">
        <span className="font-headline-md text-headline-md text-deep-emerald">Total</span>
        <span className="font-body-md text-body-md text-on-surface tabular-nums">₹ {total.toLocaleString()}</span>
      </div>
      <Link
        to="/checkout"
        className="block w-full bg-deep-emerald text-white font-label-caps text-label-caps py-4 tracking-widest hover:bg-opacity-90 transition-opacity text-center"
      >
        PROCEED TO CHECKOUT
      </Link>
      <div className="mt-6 flex items-center justify-center space-x-2 text-on-surface-variant text-sm">
        <span className="material-symbols-outlined text-lg">lock</span>
        <span>Secure Checkout</span>
      </div>
    </div>
  )
}



