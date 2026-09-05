import { Link } from 'react-router-dom'
import curdImage from '../../assets/images/curd.png'
import buttermilkImage from '../../assets/images/butter milk.png'
import palkovaImage from '../../assets/images/palkova.png'
import gheeImage from '../../assets/images/ghee.png'
import paneerImage from '../../assets/images/paneer.png'

const categories = [
  { name: 'Fresh Curd', image: curdImage, link: '/category/Curd' },
  { name: 'Buttermilk', image: buttermilkImage, link: '/category/Buttermilk' },
  { name: 'Ghee', image: gheeImage, link: '/category/Ghee' },
  { name: 'Sweets', image: palkovaImage, link: '/category/Sweets' },
  { name: 'Paneer', image: paneerImage, link: '/category/Paneer' },
  { name: 'Premium', image: gheeImage, link: '/collections' },
]

export default function DairyDiscovery() {
  return (
    <section className="bg-soft-cream">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
        <div className="text-center mb-12">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-regal-gold mb-4 block">
            Discover
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-emerald mb-4">
            Find Your Dairy
          </h2>
          <div className="h-[1px] w-12 bg-regal-gold mx-auto mb-6" />
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Explore our curated dairy categories and find the perfect product for every meal and occasion.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative aspect-[3/4] bg-surface-white rounded-sm overflow-hidden border border-outline-variant hover:border-regal-gold/50 transition-all duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="font-headline-md text-headline-md text-surface-white group-hover:text-regal-gold transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
