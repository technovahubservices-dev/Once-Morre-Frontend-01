import { Link } from 'react-router-dom'

const blogs = [
  {
    id: 1,
    title: 'The Secret to Perfect Curd: Temperature & Time',
    excerpt: 'Learn how the right temperature and fermentation time can make all the difference in achieving that perfect creamy curd at home.',
    image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=600&h=400&fit=crop',
    date: 'Aug 12, 2024',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Why Bilona Ghee is Worth Every Penny',
    excerpt: 'Discover the ancient bilona method of making ghee and why it preserves more nutrients and flavor than modern alternatives.',
    image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=600&h=400&fit=crop',
    date: 'Aug 5, 2024',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'Paneer vs Paneer: What Makes Malai Paneer Special',
    excerpt: 'Not all paneer is created equal. Find out what sets malai paneer apart and why it is the secret to restaurant-quality curries.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=400&fit=crop',
    date: 'Jul 28, 2024',
    readTime: '4 min read',
  },
]

export default function Blogs() {
  return (
    <section id="blogs" className="bg-cream">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-12">
        <div className="text-center mb-8">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-gold mb-4 block">
            From Our Kitchen
          </span>
          <h2 className="font-headline-lg text-2xl md:text-3xl font-semibold text-deep-emerald mb-2">
            Blogs & Recipes
          </h2>
          <div className="h-[1px] w-12 bg-gold mx-auto mb-6" />
          <p className="font-body-md text-body-md text-muted max-w-2xl mx-auto">
            Tips, recipes, and stories from our dairy kitchen to yours.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.id}`}
              className="group bg-white border border-line rounded-xl overflow-hidden shadow-[0_6px_24px_rgba(15,82,56,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_14px_32px_rgba(15,82,56,0.10)]"
            >
              <div className="aspect-[4/3] bg-white overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted mb-3">
                  <span>{blog.date}</span>
                  <span>·</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-gold transition-colors">
                  {blog.title}
                </h3>
                <p className="font-body-md text-body-md text-muted leading-relaxed mb-4">
                  {blog.excerpt}
                </p>
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary border-b border-primary pb-1 group-hover:text-gold group-hover:border-gold transition-colors">
                  Read More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}





