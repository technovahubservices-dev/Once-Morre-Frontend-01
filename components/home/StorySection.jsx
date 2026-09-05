import { Link } from 'react-router-dom'

export default function StorySection() {
  return (
    <section id="about" className="bg-white">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="relative flex justify-center">
            <div className="aspect-[4/5] w-full max-w-lg overflow-hidden rounded-xl border border-line bg-white shadow-[0_8px_28px_rgba(15,82,56,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=1000&fit=crop"
                alt="Our dairy farm"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-40 md:h-40 bg-cream rounded-sm overflow-hidden border-4 border-white shadow-lg hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=400&h=400&fit=crop"
                alt="Fresh dairy products"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="max-w-lg">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-gold mb-3 block">
              Our Legacy
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4 leading-tight">
              Our Story
            </h2>
            <div className="h-[1px] w-10 bg-regal-gold mb-4" />
            <h3 className="font-headline-md text-headline-md text-primary mb-3">About ONCE MORRE</h3>
            <p className="font-body-md text-body-md text-muted mb-5 leading-relaxed">
              For over three generations, ONCE MORRE has been synonymous with purity and quality. Our dairy products are crafted using traditional methods passed down through our family, ensuring the richest taste and highest nutritional value.
            </p>
            <p className="font-body-md text-body-md text-muted mb-6 leading-relaxed">
              From the gentle hand-churning of butter to the slow fermentation of curd, every step is performed with care and respect for nature's goodness.
            </p>
            <Link
              to="/about"
              className="inline-block border-b border-primary text-primary font-label-caps text-label-caps uppercase tracking-widest pb-1 hover:text-gold hover:border-gold transition-colors"
            >
              Discover Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}








