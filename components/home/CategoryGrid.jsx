import CategoryCard from './CategoryCard.jsx'

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
      {categories.length > 0 && (
        <div className="md:col-span-8">
          <CategoryCard category={categories[0]} />
        </div>
      )}
      {categories.length > 1 && (
        <div className="md:col-span-4 flex flex-col gap-gutter h-[400px] md:h-[500px]">
          {categories.slice(1).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  )
}
