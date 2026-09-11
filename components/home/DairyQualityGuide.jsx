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
      <div className="mx-auto max-w-container-max px-margin-mobile py-6 md:px-margin-desktop md:py-8">
        <div className="mx-auto mb-5 max-w-4xl text-center">
          <span className="mb-2 inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 font-label-caps text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Our Promise
          </span>

          <h2 className="mt-3 mb-2 font-serif text-[27px] sm:text-[32px] md:text-[38px] font-bold leading-tight text-[#081E17]">
            The ONCE MORRE Standard
          </h2>

          <div className="mx-auto mt-3 mb-3 h-[2px] w-14 rounded-full bg-[#C99742]" />

          <p className="mx-auto max-w-[560px] text-sm md:text-[15px] leading-relaxed text-[#566761]">
            Four pillars that guarantee every product you receive meets the highest standards of quality, taste, and nutrition.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {qualityPoints.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E7DFD3] bg-white p-6 text-center shadow-[0_4px_16px_rgba(11,38,29,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C99742]/50 hover:shadow-[0_16px_36px_-6px_rgba(11,38,29,0.18)]"
            >
              <div className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-[#C99742] transition-transform duration-300 group-hover:scale-x-100" />

              <span className="material-symbols-outlined mb-5 block text-4xl text-gold transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </span>

              <h3 className="mb-1 font-serif text-[22px] font-bold leading-tight text-[#081E17]">
                {item.title}
              </h3>

              <p className="mb-4 font-label-caps text-[10px] font-bold uppercase tracking-[0.16em] text-[#566761]">
                {item.subtitle}
              </p>

              <p className="text-sm leading-relaxed text-[#566761]">
                {item.description}
              </p>

              <span className="mt-auto pt-5 font-label-caps text-[10px] font-bold uppercase tracking-[0.16em] text-[#114232] transition-colors group-hover:text-[#C99742]">
                Explore
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}







