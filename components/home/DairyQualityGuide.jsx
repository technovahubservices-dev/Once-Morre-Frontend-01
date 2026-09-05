import { Link } from 'react-router-dom'

const qualityPoints = [
  {
    id: 'freshness',
    title: 'Freshness',
    subtitle: 'Daily Delivery',
    description: 'Our dairy products are delivered within hours of production to lock in maximum freshness, nutrients, and natural taste.',
    icon: 'local_fire_department',
    link: '/category/Curd',
  },
  {
    id: 'purity',
    title: 'Purity',
    subtitle: 'No Additives',
    description: 'We use absolutely no preservatives, artificial flavors, or chemicals. Just pure milk and traditional ingredients.',
    icon: 'verified',
    link: '/category/Ghee',
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    subtitle: 'Rich in Goodness',
    description: 'Packed with essential proteins, calcium, and vitamins. Our products support a healthy, active lifestyle for the whole family.',
    icon: 'fitness_center',
    link: '/category/Paneer',
  },
  {
    id: 'tradition',
    title: 'Tradition',
    subtitle: 'Time-Tested Methods',
    description: 'Crafted using age-old techniques like bilona method for ghee and natural fermentation for curd, ensuring authentic taste.',
    icon: 'auto_awesome',
    link: '/category/Sweets',
  },
]

export default function DairyQualityGuide() {
  return (
    <section id="quality" className="bg-cream">
      <div className="mx-auto max-w-container-max px-margin-mobile py-12 md:px-margin-desktop md:py-16">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="mb-4 block font-label-caps text-label-caps uppercase tracking-[0.18em] text-gold">
            Our Promise
          </span>

          <h2 className="mb-4 font-headline-lg text-headline-lg-mobile text-primary md:text-headline-lg">
            The ONCE MORRE Standard
          </h2>

          <div className="mx-auto mb-6 h-px w-14 bg-gold" />

          <p className="mx-auto font-body-md text-body-md leading-relaxed text-muted">
            Four pillars that guarantee every product you receive meets the highest standards of quality, taste, and nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {qualityPoints.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_14px_32px_rgba(15,82,56,0.10)]"
            >
              <div className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />

              <span className="material-symbols-outlined mb-5 block text-4xl text-gold transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </span>

              <h3 className="mb-1 font-headline-md text-headline-md font-semibold text-primary">
                {item.title}
              </h3>

              <p className="mb-4 font-label-caps text-label-caps uppercase tracking-widest text-muted">
                {item.subtitle}
              </p>

              <p className="font-body-md text-body-md leading-relaxed text-muted">
                {item.description}
              </p>

              <span className="mt-auto pt-5 font-label-caps text-xs uppercase tracking-widest text-primary transition-colors group-hover:text-gold">
                Explore
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

