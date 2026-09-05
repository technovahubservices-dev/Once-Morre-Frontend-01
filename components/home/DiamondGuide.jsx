import { Link } from 'react-router-dom'

const fourCs = [
  {
    id: 'carat',
    title: 'Carat',
    subtitle: 'Weight',
    description: 'A diamond\'s weight, measured in carats. Each carat is divided into 100 points, allowing precise measurement to the hundredth decimal place.',
    icon: 'diamond',
    link: '/category/Diamond',
  },
  {
    id: 'cut',
    title: 'Cut',
    subtitle: 'Proportion',
    description: 'The cut determines a diamond\'s brilliance and fire. A well-cut diamond reflects light with dazzling sparkle from every angle.',
    icon: 'auto_awesome',
    link: '/category/Diamond',
  },
  {
    id: 'colour',
    title: 'Colour',
    subtitle: 'Hue',
    description: 'Diamonds are graded from D (colourless) to Z (light yellow or brown). The less colour, the rarer and more valuable the diamond.',
    icon: 'palette',
    link: '/category/Diamond',
  },
  {
    id: 'clarity',
    title: 'Clarity',
    subtitle: 'Purity',
    description: 'Clarity measures the presence of inclusions or blemishes. The finest diamonds are flawless, with no visible imperfections under 10x magnification.',
    icon: 'visibility',
    link: '/category/Diamond',
  },
]

export default function DiamondGuide() {
  return (
    <section className="bg-soft-cream">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-regal-gold mb-4 block">
            Knowledge
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-emerald mb-4">
            The 4Cs of Diamonds
          </h2>
          <div className="h-[1px] w-12 bg-regal-gold mx-auto mb-6" />
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Understanding the 4Cs—Carat, Cut, Colour, and Clarity—helps you choose a diamond of exceptional quality and beauty.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {fourCs.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group bg-surface-white border border-outline-variant p-8 rounded-sm hover:border-regal-gold/50 transition-all duration-300 text-center"
            >
              <span className="material-symbols-outlined text-4xl text-regal-gold mb-4 block group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </span>
              <h3 className="font-headline-md text-headline-md text-deep-emerald mb-1">{item.title}</h3>
              <p className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant text-xs mb-4">{item.subtitle}</p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{item.description}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/category/Diamond"
            className="inline-block bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded hover:bg-deep-emerald/90 transition-colors"
          >
            Explore Our Dairy Products
          </Link>
        </div>
      </div>
    </section>
  )
}

