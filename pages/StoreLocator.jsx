import { Link } from 'react-router-dom'

export default function StoreLocator() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <div className="text-center mb-16">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-emerald mb-2">
          Store Locator
        </h1>
        <div className="h-[1px] w-12 bg-regal-gold mx-auto mb-6" />
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
          Visit our boutiques and experience our collections in person.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { city: 'Mumbai', address: '123 Marine Drive, Nariman Point', phone: '+91 22 1234 5678' },
          { city: 'Delhi', address: '456 Connaught Place, New Delhi', phone: '+91 11 1234 5678' },
          { city: 'Bangalore', address: '789 MG Road, Bangalore', phone: '+91 80 1234 5678' },
        ].map((store) => (
          <div key={store.city} className="bg-surface-white border border-surface-container-highest p-8 rounded">
            <h3 className="font-headline-md text-headline-md text-deep-emerald mb-2">{store.city}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-2">{store.address}</p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">{store.phone}</p>
          <Link
            to="/store-locator"
            className="inline-block border-b border-deep-emerald text-deep-emerald font-label-caps text-label-caps uppercase tracking-widest pb-1 hover:text-regal-gold hover:border-regal-gold transition-colors"
          >
            Get Directions
          </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
