import { Link } from 'react-router-dom'
import curdImage from '../../assets/images/curd.png'
import curdPackedImage from '../../assets/images/curd.png'
import buttermilkImage from '../../assets/images/butter milk.png'
import gheeImage from '../../assets/images/ghee.png'
import paneerImage from '../../assets/images/paneer.png'

const categories = [
  {
    id: 1,
    name: 'Fresh Curd',
    slug: 'Curd',
    image: curdImage,
  },
  {
    id: 2,
    name: 'Buttermilk',
    slug: 'Buttermilk',
    image: buttermilkImage,
  },
  {
    id: 3,
    name: 'Curd',
    slug: 'Curd',
    image: curdPackedImage,
    shape: 'square',
  },
  {
    id: 4,
    name: 'Ghee',
    slug: 'Ghee',
    image: gheeImage,
  },
  {
    id: 5,
    name: 'Paneer',
    slug: 'Paneer',
    image: paneerImage,
  },
]

export default function PureMilkGoodness() {
  return (
    <section className="relative bg-white overflow-hidden">
      <WavyBorder side="left" />
      <WavyBorder side="right" />

      <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-10 pb-10 md:pt-12 md:pb-12">
        <div className="text-center mb-8">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-gold mb-4 block">
            Our Range
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">
            Pure Milk Goodness
          </h2>
          <div className="h-[1px] w-12 bg-regal-gold mx-auto mb-6" />
          <p className="font-body-md text-body-md text-muted max-w-2xl mx-auto">
            From creamy curd to golden ghee, every product is a testament to the purity of milk and the art of traditional dairy-making.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${encodeURIComponent(category.slug || category.name)}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative mb-5">
                {category.shape === 'square' ? (
                  <div className="h-28 w-28 md:h-36 md:w-36 rounded-xl bg-white border border-line p-2 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-[0_0_0_8px_rgba(15,82,56,0.08)]">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full rounded object-cover"
                    />
                  </div>
                ) : (
                  <>
                    <div
                      className="h-28 w-28 md:h-36 md:w-36 rounded-full bg-cover bg-center border border-line transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-[0_0_0_8px_rgba(15,82,56,0.08)]"
                      style={{ backgroundImage: `url('${category.image}')` }}
                    />
                    <div className="absolute inset-0 rounded-full bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </>
                )}
              </div>
              <h3 className="font-headline-md text-headline-md text-primary group-hover:text-gold transition-colors duration-300">
                {category.name}
              </h3>
              <p className="font-label-caps text-label-caps uppercase tracking-widest text-muted mt-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Shop Now <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function WavyBorder({ side }) {
  const positionClass = side === 'left' ? 'left-0' : 'right-0 scale-x-[-1]'

  return (
    <svg
      className={`pointer-events-none absolute top-8 hidden h-[80%] w-12 text-gold/30 md:block ${positionClass}`}
      viewBox="0 0 48 420"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 4C34 36 34 68 18 100C2 132 2 164 18 196C34 228 34 260 18 292C2 324 2 356 18 416"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M31 34C40 62 38 88 27 112C15 139 15 167 27 194C39 221 39 249 27 276C15 303 15 331 27 392"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  )
}


