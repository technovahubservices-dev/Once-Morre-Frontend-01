import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      {/* Main About Section */}
      <section className="bg-surface-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">

            {/* Images */}
            <div className="relative">
              <div className="aspect-[4/5] bg-surface-container-low rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=1000&fit=crop"
                  alt="Our dairy farm"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 w-48 h-48 md:w-64 md:h-64 bg-soft-cream rounded-sm overflow-hidden border-4 border-surface-white shadow-lg hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=400&h=400&fit=crop"
                  alt="Fresh dairy products"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="max-w-lg">
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-regal-gold mb-4 block">
                Our Legacy
              </span>

              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-emerald mb-6 leading-tight">
                Our Story
              </h2>

              <div className="h-[1px] w-12 bg-regal-gold mb-6" />

              <h3 className="font-headline-md text-headline-md text-deep-emerald mb-4">
                About ONCE MORRE
              </h3>

              <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                For over three generations, ONCE MORRE has been synonymous with
                purity and quality. Our dairy products are crafted using
                traditional methods passed down through our family, ensuring
                the richest taste and highest nutritional value.
              </p>

              <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
                From the gentle hand-churning of butter to the slow
                fermentation of curd, every step is performed with care and
                respect for nature's goodness.
              </p>

              <Link
                to="/about"
                className="inline-block border-b border-deep-emerald text-deep-emerald font-label-caps text-label-caps uppercase tracking-widest pb-1 hover:text-regal-gold hover:border-regal-gold transition-colors"
              >
                Discover Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story / Values Section */}
      <section className="bg-surface-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">

          {/* Section Heading */}
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-regal-gold mb-4 block">
              Our Story
            </span>

            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-emerald mb-2">
              About ONCE MORRE
            </h2>

            <div className="h-[1px] w-12 bg-regal-gold mx-auto mb-6" />

            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              Fresh dairy goodness crafted with purity, care, and tradition.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Farm Fresh */}
            <div className="bg-surface-white border border-outline-variant rounded-lg p-8 text-center">
              <span className="material-symbols-outlined text-regal-gold text-[48px] mb-4">
                agriculture
              </span>

              <h3 className="font-headline-md text-headline-md text-deep-emerald mb-2">
                Farm Fresh
              </h3>

              <p className="font-body-md text-body-md text-on-surface-variant">
                Sourced directly from trusted farms to ensure the highest
                quality dairy.
              </p>
            </div>

            {/* Traditional Methods */}
            <div className="bg-surface-white border border-outline-variant rounded-lg p-8 text-center">
              <span className="material-symbols-outlined text-regal-gold text-[48px] mb-4">
                local_fire_department
              </span>

              <h3 className="font-headline-md text-headline-md text-deep-emerald mb-2">
                Traditional Methods
              </h3>

              <p className="font-body-md text-body-md text-on-surface-variant">
                Crafted using time-honored techniques that preserve natural
                goodness.
              </p>
            </div>

            {/* Sustainable */}
            <div className="bg-surface-white border border-outline-variant rounded-lg p-8 text-center">
              <span className="material-symbols-outlined text-regal-gold text-[48px] mb-4">
                eco
              </span>

              <h3 className="font-headline-md text-headline-md text-deep-emerald mb-2">
                Sustainable
              </h3>

              <p className="font-body-md text-body-md text-on-surface-variant">
                Committed to eco-friendly practices from farm to doorstep.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}