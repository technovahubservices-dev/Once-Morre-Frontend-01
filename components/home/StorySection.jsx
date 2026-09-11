import { Link } from 'react-router-dom'

export default function StorySection() {
  return (
    <section id="about" className="bg-white">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.08fr_0.92fr] gap-4 md:gap-6 items-center">
          <div className="relative flex justify-center">
            <div className="aspect-[4/5] w-full max-w-lg overflow-hidden rounded-xl border border-line bg-white shadow-[0_8px_28px_rgba(15,82,56,0.08)]">
              <img
                src="/assets/images/about%20image.png"
                alt="Our dairy farm"
                className="h-full w-full object-cover"
              />
            </div>

          </div>
          <div className="max-w-lg relative px-4 md:px-0 lg:-ml-20">

            <div className="absolute -left-5 top-1 hidden md:block h-20 w-[2px] bg-regal-gold" />

            <span className="font-label-caps text-lg md:text-xl uppercase tracking-[0.35em] text-gold mb-3 block font-semibold">
              Our Legacy
            </span>

            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-headline-lg text-4xl md:text-5xl text-primary leading-[1.05] tracking-tight">
                Our Story
              </h2>
              <span className="hidden sm:block h-[2px] w-16 bg-regal-gold" />
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="h-2.5 w-2.5 rounded-full bg-regal-gold shadow-[0_0_0_4px_rgba(180,140,45,0.12)]" />
              <span className="h-[2px] w-14 bg-regal-gold" />
            </div>

            <div className="border-l-2 border-regal-gold/30 pl-5 md:pl-6 mb-7">
              <h3 className="font-headline-md text-xl md:text-2xl text-primary mb-4 font-semibold tracking-wide">
                About ONCE MORRE
              </h3>

              <p className="font-body-md text-base md:text-lg text-muted mb-5 leading-relaxed">
                For over three generations, ONCE MORRE has been synonymous with purity and quality. Our dairy products are crafted using traditional methods passed down through our family, ensuring the richest taste and highest nutritional value.
              </p>

              <p className="font-body-md text-base md:text-lg text-muted leading-relaxed">
                From the gentle hand-churning of butter to the slow fermentation of curd, every step is performed with care and respect for nature's goodness.
              </p>
            </div>

            <Link
              to="/about"
              className="group inline-flex items-center gap-3 text-primary font-label-caps text-base md:text-lg uppercase tracking-[0.2em] transition-colors hover:text-gold"
            >
              <span>Discover Our Story</span>
              <span className="h-[1px] w-8 bg-primary transition-all duration-300 group-hover:w-12 group-hover:bg-gold" />
            </Link>

          </div>
        </div>
      </div>
    </section>
  )
}

















