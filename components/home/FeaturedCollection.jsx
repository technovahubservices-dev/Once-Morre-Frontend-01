import { Link } from 'react-router-dom'

export default function FeaturedCollection({ title, subtitle, description, image, link, cta = 'Explore Collection', reverse = false }) {
  return (
    <section className="bg-surface-white">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${reverse ? 'md:[&>:first-child]:order-2 md:[&>:last-child]:order-1' : ''}`}>
          <div className="relative">
            <div className="aspect-[4/5] bg-surface-container-low rounded-sm overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="max-w-lg">
            {subtitle && (
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-regal-gold mb-4 block">
                {subtitle}
              </span>
            )}
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-emerald mb-6 leading-tight">
              {title}
            </h2>
            <div className="h-[1px] w-12 bg-regal-gold mb-6" />
            <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
              {description}
            </p>
            <Link
              to={link}
              className="inline-block bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded hover:bg-deep-emerald/90 transition-colors"
            >
              {cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
