export default function ProductSpecifications({ specifications }) {
  if (!specifications || Object.keys(specifications).length === 0) return null

  return (
    <div className="mb-24">
      <h2 className="font-headline-md text-headline-md text-primary text-center mb-12">Product Details</h2>
      <div className="bg-surface-white/60 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-6 md:p-12 shadow-sm max-w-4xl mx-auto">
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 text-center leading-relaxed">
          A timeless classic, this solitaire ring is crafted in 18kt yellow gold featuring a brilliant round cut diamond. The elegant six-prong setting maximizes light performance, ensuring your diamond sparkles from every angle.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {Object.values(specifications).map((section) => (
            <div key={section.title}>
              <h3 className="font-headline-md text-lg text-primary border-b border-outline-variant/30 pb-2 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-regal-gold text-xl">{section.icon}</span>
                {section.title}
              </h3>
              <ul className="space-y-3 font-body-md text-sm text-on-surface-variant">
                {section.items.map((item) => (
                  <li key={item.label} className="flex justify-between">
                    <span>{item.label}</span>
                    <span className="font-medium text-primary">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
