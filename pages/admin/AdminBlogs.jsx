import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { adminApi } from '../../services/adminApi.js'

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

const emptyForm = {
  title: '',
  date: '',
  readTime: '',
  description: '',
  content: '',
  image: '',
}
export default function AdminBlogs() {
  const { token } = useAuth()

  const [blogs, setBlogs] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState('')

  const loadBlogs = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await adminApi.getBlogs(token)
      setBlogs(data.data || [])
    } catch (err) {
      console.error('Failed to load blogs:', err)
      setError(err.message || 'Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      loadBlogs()
    }
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setImageFile(null)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.title || !form.date || !form.readTime || !form.description) {
      setError('Title, date, read time and description are required')
      return
    }

    try {
      setSaving(true)
      setError('')

      let imageUrl = form.image

      if (imageFile) {
        setUploadingImage(true)

        const uploadResponse = await adminApi.uploadBlogImage(token, imageFile)

        imageUrl =
          uploadResponse.data?.url ||
          uploadResponse.url ||
          ''

        if (!imageUrl) {
          throw new Error('Image upload succeeded but no image URL was returned')
        }

        setUploadingImage(false)
      }

      const blogData = {
        ...form,
        image: imageUrl,
      }

      if (editingId) {
        await adminApi.updateBlog(token, editingId, blogData)
      } else {
        await adminApi.createBlog(token, blogData)
      }

      resetForm()
      setImageFile(null)
      await loadBlogs()
    } catch (err) {
      console.error('Failed to save blog:', err)
      setError(err.message || 'Failed to save blog')
      setUploadingImage(false)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (blog) => {
    setEditingId(blog._id)

    setForm({
      title: blog.title || '',
      date: blog.date || '',
      readTime: blog.readTime || '',
      description: blog.description || '',
      content: blog.content || '',
      image: blog.image || '',
    })

    setImageFile(null)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this blog?'
    )

    if (!confirmed) return

    try {
      setError('')

      await adminApi.deleteBlog(token, id)

      if (editingId === id) {
        resetForm()
      }

      await loadBlogs()
    } catch (err) {
      console.error('Failed to delete blog:', err)
      setError(err.message || 'Failed to delete blog')
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Blog Management
          </h1>

          <p className="mt-2 text-sm text-muted">
            Create, edit and manage the blogs displayed on the website.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-xl border border-line bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary">
              {editingId ? 'Edit Blog' : 'Add Blog'}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-muted hover:text-primary"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-primary">
                Title
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Blog title"
                className="w-full rounded-lg border border-line px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-primary">
                Date
              </label>

              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                placeholder="Aug 12, 2024"
                className="w-full rounded-lg border border-line px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-primary">
                Read Time
              </label>

              <input
                name="readTime"
                value={form.readTime}
                onChange={handleChange}
                placeholder="5 min read"
                className="w-full rounded-lg border border-line px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-primary">
                Blog Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-lg border border-line px-4 py-3 outline-none focus:border-primary"
              />

              {imageFile && (
                <p className="mt-2 text-xs text-muted">
                  Selected: {imageFile.name}
                </p>
              )}

              {!imageFile && form.image && (
                <p className="mt-2 text-xs text-muted">
                  Current image will be kept unless you select a new image.
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-primary">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Short description shown on the blog cards"
                className="w-full rounded-lg border border-line px-4 py-3 outline-none focus:border-primary resize-y"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-primary">
                Content
              </label>

              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={8}
                placeholder="Full blog content"
                className="w-full rounded-lg border border-line px-4 py-3 outline-none focus:border-primary resize-y"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              {uploadingImage
                ? 'Uploading image...'
                : saving
                  ? 'Saving...'
                : editingId
                  ? 'Update Blog'
                  : 'Create Blog'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-line px-6 py-3 text-sm font-semibold text-primary"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="rounded-xl border border-line bg-white shadow-sm overflow-hidden">
          <div className="border-b border-line px-6 py-4">
            <h2 className="text-xl font-semibold text-primary">
              Existing Blogs
            </h2>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-muted">
              Loading blogs...
            </div>
          ) : blogs.length === 0 ? (
            <div className="p-6 text-sm text-muted">
              No blogs found.
            </div>
          ) : (
            <div className="divide-y divide-line">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="p-6 flex flex-col md:flex-row gap-5 md:items-center"
                >
                  {blog.image ? (
                    <img
                      src={getBlogImageUrl(blog.image)}
                      alt={blog.title}
                      className="w-full md:w-32 h-24 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full md:w-32 h-24 rounded-lg bg-cream flex items-center justify-center text-xs text-muted">
                      No image
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-primary">
                      {blog.title}
                    </h3>

                    <div className="mt-1 text-xs text-muted">
                      {blog.date} · {blog.readTime}
                    </div>

                    <p className="mt-2 text-sm text-muted line-clamp-2">
                      {blog.description}
                    </p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(blog)}
                      className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-primary hover:bg-cream"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(blog._id)}
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}







