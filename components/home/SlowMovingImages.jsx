const offers = [
  '🥛 Free home delivery on orders above ₹500',
  '🧀 Fresh paneer - Buy 1 Get 1 Free this week!',
  '🎯 Pure ghee - Flat 15% off on premium range',
  '🥛 Farm fresh curd - 20% off on first order',
  '✨ Use code ONCE50 for ₹50 off on orders above ₹300',
  '📦 Subscribe & Save - Get 15% off on recurring deliveries',
  '🌿 100% pure and natural dairy products',
  '🚚 Express delivery available in your city',
]

export default function OfferTicker() {
  const duplicatedOffers = [...offers, ...offers]

  return (
    <section
      aria-label="Current offers"
      className="w-full overflow-hidden border-y border-line bg-primary py-3"
    >
      <div
        className="flex w-max whitespace-nowrap"
        style={{
          animation: 'tickerScroll 30s linear infinite',
        }}
      >
        {duplicatedOffers.map((offer, index) => (
          <span
            key={index}
            className="mx-6 inline-flex items-center gap-2 font-body-md text-sm text-white md:text-base"
          >
            <span
              aria-hidden="true"
              className="text-gold-soft"
            >
              ◆
            </span>
            {offer}
          </span>
        ))}
      </div>
    </section>
  )
}
