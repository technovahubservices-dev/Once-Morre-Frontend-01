import { useState } from 'react'

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for reaching out. Our team will get back to you shortly.')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <h1 className="font-display-lg text-display-lg text-deep-emerald mb-4">Contact Us</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
        Have a question about our dairy products? Fill out the form below.
      </p>
      <form onSubmit={handleSubmit} className="bg-surface-white border border-outline-variant rounded p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-body-md text-body-md text-deep-emerald mb-2">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block font-body-md text-body-md text-deep-emerald mb-2">Email Address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label className="block font-body-md text-body-md text-deep-emerald mb-2">Subject</label>
          <input
            type="text"
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
            placeholder="How can we help?"
          />
        </div>
        <div>
          <label className="block font-body-md text-body-md text-deep-emerald mb-2">Message</label>
          <textarea
            required
            rows="5"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
            placeholder="Tell us more..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded hover:bg-deep-emerald/90 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}
