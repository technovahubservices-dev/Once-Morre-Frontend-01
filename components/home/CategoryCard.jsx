import { Link } from 'react-router-dom'

export default function CategoryCard({ category }) {
  const slug = category.slug || category.name
  return (
    <Link to={`/category/${encodeURIComponent(slug)}`} className="group cursor-pointer relative overflow-hidden h-[400px] md:h-[500px] block">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        data-alt={category.name}
        style={{ backgroundImage: `url('${category.image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-8 left-8 text-surface-white">
        <h3 className="font-headline-md text-headline-md mb-2">{category.name}</h3>
        <p className="font-label-caps text-label-caps uppercase tracking-widest flex items-center">
          Shop Now <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
        </p>
      </div>
    </Link>
  )
}
