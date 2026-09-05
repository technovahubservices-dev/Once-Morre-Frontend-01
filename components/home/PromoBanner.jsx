import { Link } from 'react-router-dom'

export default function PromoBanner() {
  return (
    <section className="w-full bg-surface-white py-12">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-soft-cream border border-surface-container-highest overflow-hidden">
          <div className="p-12 md:p-20 flex flex-col justify-center">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-regal-gold mb-4">
              Farm Fresh Offer
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-emerald mb-6">
              The Heritage Collection
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md">
              Celebrate tradition with our finest dairy selection. Pure ghee, artisanal sweets, and farm-fresh curd - perfect for your festive table.
            </p>
            <Link
              className="self-start border-b border-deep-emerald text-deep-emerald font-label-caps text-label-caps uppercase tracking-widest pb-1 hover:text-regal-gold hover:border-regal-gold transition-colors"
              to="/collections"
            >
              View Collection
            </Link>
          </div>
          <div className="h-[400px] md:h-auto relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              data-alt="Fresh dairy products beautifully arranged on a rustic wooden table. Golden ghee, creamy curd, and traditional sweets displayed with care. Natural sunlight creates a warm, inviting atmosphere."
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=800&h=600&fit=crop')" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
