import { Link } from 'react-router-dom'

const stores = [
  { city: 'Mumbai', address: '123 Marine Drive, Nariman Point', phone: '+91 22 1234 5678', image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=600&h=400&fit=crop' },
  { city: 'Delhi', address: '456 Connaught Place, New Delhi', phone: '+91 11 1234 5678', image: 'https://images.unsplash.com/photo-1583232282138-38145b3ad60e?w=600&h=400&fit=crop' },
  { city: 'Bangalore', address: '789 MG Road, Bangalore', phone: '+91 80 1234 5678', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=400&fit=crop' },
]

export default function StoreLocator() {
  return (
    <section className="bg-surface-white border-t border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
        <div className="text-center mb-12">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-regal-gold mb-4 block">
            Visit Us
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-emerald mb-4">
            Our Dairy Outlets
          </h2>
          <div className="h-[1px] w-12 bg-regal-gold mx-auto mb-6" />
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Visit our outlets to experience the freshness of ONCE MORRE dairy products in person.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stores.map((store) => (
            <div key={store.city} className="group bg-surface-white border border-outline-variant rounded-sm overflow-hidden hover:border-regal-gold/50 transition-all duration-300">
              <div className="aspect-[4/3] bg-surface-container-low overflow-hidden">
                <img
                  src={store.image}
                  alt={store.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="font-headline-md text-headline-md text-deep-emerald mb-2">{store.city}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-1">{store.address}</p>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">{store.phone}</p>
                <Link
                  to="/store-locator"
                  className="inline-block border-b border-deep-emerald text-deep-emerald font-label-caps text-label-caps uppercase tracking-widest pb-1 hover:text-regal-gold hover:border-regal-gold transition-colors"
                >
                  Get Directions
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/store-locator"
            className="inline-block border-b border-deep-emerald text-deep-emerald font-label-caps text-label-caps uppercase tracking-widest pb-1 hover:text-regal-gold hover:border-regal-gold transition-colors"
          >
            View All Stores
          </Link>
        </div>
      </div>
    </section>
  )
}
