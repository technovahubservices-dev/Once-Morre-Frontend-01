import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

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

export default function BlogDetail() {
  const { id } = useParams()

  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`${API_URL}/blogs/${id}`)
        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Failed to load blog')
        }

        setBlog(result.data)
      } catch (err) {
        console.error('Failed to fetch blog:', err)
        setError(err.message || 'Failed to load blog')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchBlog()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-cream">
        <p className="text-muted">Loading blog...</p>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-cream px-6">
        <p className="text-red-600 mb-4">
          {error || 'Blog not found'}
        </p>

        <Link
          to="/blogs"
          className="text-primary font-semibold hover:text-gold"
        >
          Back to Blogs
        </Link>
      </div>
    )
  }

  return (
    <main className="bg-cream min-h-screen">
      <article className="max-w-4xl mx-auto px-6 py-10 md:py-16">
        <Link
          to="/blogs"
          className="inline-block mb-8 text-sm font-semibold text-primary hover:text-gold"
        >
          ← Back to Blogs
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-muted mb-4">
            <span>{blog.date}</span>
            <span>·</span>
            <span>{blog.readTime}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#081E17] leading-tight">
            {blog.title}
          </h1>
        </div>

        {blog.image && (
          <div className="w-full aspect-[16/9] overflow-hidden rounded-xl mb-10">
            <img
              src={getBlogImageUrl(blog.image)}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {blog.description && (
          <p className="text-lg md:text-xl text-muted leading-relaxed mb-8">
            {blog.description}
          </p>
        )}

        <div className="text-base md:text-lg leading-8 text-[#33443D] whitespace-pre-line">
          {blog.content}
        </div>
      </article>
    </main>
  )
}
