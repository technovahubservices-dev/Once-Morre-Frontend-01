import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getBlogImageUrl = (image) => {
  if (!image) return ''

  try {
    const url = new URL(image)

    if (url.hostname.includes('drive.google.com')) {
      const fileId = url.searchParams.get('id')

      if (fileId) {
        return `${API_URL}/google-drive/image/${fileId}`
      }
    }
  } catch (_) {}

  return image
}

export default function Blogs() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs`)
        const result = await response.json()

        if (result.success) {
          setBlogs(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <section id="blogs" className="bg-cream">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-2 pb-6 md:pt-4 md:pb-8">
        <div className="text-center mb-5 md:mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EFEB] border border-[#E7DFD3] mb-4">
            <span className="material-symbols-outlined text-[#1A5642] text-[18px]">
              menu_book
            </span>

            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#114232]">
              FROM OUR KITCHEN
            </span>
          </div>

          <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-tight font-bold text-[#081E17]">
            Blogs &amp; <span className="italic text-[#1A5642]">Recipes</span>
          </h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#C99742]" />

          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-[15px] leading-relaxed text-[#566761]">
            Tips, recipes, and stories from our dairy kitchen to yours.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1150px] grid-cols-1 gap-5 px-0 sm:px-2 md:grid-cols-3 md:gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog._id}`}
              className="group bg-white border border-line rounded-xl overflow-hidden shadow-[0_6px_24px_rgba(15,82,56,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_14px_32px_rgba(15,82,56,0.10)]"
            >
              <div className="aspect-[16/10] bg-white overflow-hidden">
                <img
                  src={getBlogImageUrl(blog.image)}
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
                  {blog.description}
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



