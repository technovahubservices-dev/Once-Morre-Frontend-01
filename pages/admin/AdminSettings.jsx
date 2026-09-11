import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { adminApi } from '../../services/adminApi.js'

export default function AdminSettings() {
  const { token } = useAuth()
  const [contactEmail, setContactEmail] = useState('')
  const [announcements, setAnnouncements] = useState([])
  const [newAnnouncement, setNewAnnouncement] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savingAnnouncements, setSavingAnnouncements] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await adminApi.getSiteSettings(token)

        setContactEmail(data.data?.contactEmail || '')
        setAnnouncements(
          Array.isArray(data.data?.announcements)
            ? data.data.announcements
            : []
        )
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchSettings()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    try {
      const data = await adminApi.updateSiteSettings(token, {
        contactEmail,
        announcements,
      })

      setContactEmail(data.data?.contactEmail || contactEmail)
      setAnnouncements(
        Array.isArray(data.data?.announcements)
          ? data.data.announcements
          : announcements
      )

      setMessage('Contact email updated successfully')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleAddAnnouncement = () => {
    const text = newAnnouncement.trim()

    if (!text) return

    setAnnouncements((prev) => [...prev, text])
    setNewAnnouncement('')
    setMessage('')
    setError('')
  }

  const handleEditAnnouncement = (index, value) => {
    setAnnouncements((prev) =>
      prev.map((announcement, i) =>
        i === index ? value : announcement
      )
    )
  }

  const handleDeleteAnnouncement = (index) => {
    setAnnouncements((prev) =>
      prev.filter((_, i) => i !== index)
    )
  }

  const handleSaveAnnouncements = async () => {
    setSavingAnnouncements(true)
    setMessage('')
    setError('')

    try {
      const cleanedAnnouncements = announcements
        .map((announcement) => announcement.trim())
        .filter(Boolean)

      const data = await adminApi.updateSiteSettings(token, {
        contactEmail,
        announcements: cleanedAnnouncements,
      })

      setAnnouncements(
        Array.isArray(data.data?.announcements)
          ? data.data.announcements
          : cleanedAnnouncements
      )

      setMessage('Announcements updated successfully')
    } catch (err) {
      setError(err.message)
    } finally {
      setSavingAnnouncements(false)
    }
  }

  if (loading) {
    return <div className="p-6 md:p-10">Loading settings...</div>
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <header className="mb-8">
        <h1 className="font-display-lg text-display-lg text-deep-emerald">
          Settings
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
          Manage the email address and announcement bar content.
        </p>
      </header>

      {message && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-error-container border border-error text-error rounded">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-[#fffdf8] border border-outline-variant rounded p-6 shadow-sm"
      >
        <label className="block font-body-md text-body-md text-deep-emerald mb-2">
          Contact Email
        </label>

        <input
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="admin@example.com"
          className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold focus:outline-none"
        />

        <p className="text-sm text-on-surface-variant mt-2">
          Contact Us messages will be addressed to this email.
        </p>

        <button
          type="submit"
          disabled={saving}
          className="mt-6 px-6 py-3 bg-deep-emerald text-white rounded hover:bg-opacity-90 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Email'}
        </button>
      </form>

      <section className="mt-8 bg-[#fffdf8] border border-outline-variant rounded p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="font-display-md text-deep-emerald text-xl font-semibold">
            Announcement Bar
          </h2>

          <p className="text-sm text-on-surface-variant mt-1">
            Add, edit, or delete the messages displayed in the announcement bar.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddAnnouncement()
              }
            }}
            placeholder="Enter announcement text"
            className="flex-1 bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold focus:outline-none"
          />

          <button
            type="button"
            onClick={handleAddAnnouncement}
            className="px-6 py-3 bg-deep-emerald text-white rounded hover:bg-opacity-90 transition-colors"
          >
            Add
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {announcements.length === 0 ? (
            <p className="text-sm text-on-surface-variant py-4">
              No announcements added.
            </p>
          ) : (
            announcements.map((announcement, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 rounded border border-outline-variant bg-white p-3 sm:flex-row sm:items-center"
              >
                <input
                  type="text"
                  value={announcement}
                  onChange={(e) =>
                    handleEditAnnouncement(index, e.target.value)
                  }
                  className="flex-1 bg-surface-container-low border border-outline-variant rounded px-4 py-2.5 focus:ring-1 focus:ring-regal-gold focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => handleDeleteAnnouncement(index)}
                  className="px-4 py-2.5 border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={handleSaveAnnouncements}
          disabled={savingAnnouncements}
          className="mt-6 px-6 py-3 bg-deep-emerald text-white rounded hover:bg-opacity-90 transition-colors disabled:opacity-50"
        >
          {savingAnnouncements ? 'Saving...' : 'Save Announcements'}
        </button>
      </section>
    </div>
  )
}
