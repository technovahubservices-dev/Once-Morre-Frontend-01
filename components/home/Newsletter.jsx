import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      alert('Thank you for subscribing!')
      setEmail('')
    }
  }

  return (
    <section className="bg-primary">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-12">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-2xl md:text-3xl font-semibold text-white">
            Stay Connected
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-4">
            Join the ONCE MORRE Family
          </h2>
          <div className="h-[1px] w-12 bg-gold mx-auto mb-6" />
          <p className="font-body-md text-body-md text-white/80 mb-6">
            Subscribe to receive exclusive updates on new dairy products, special offers, farm stories, and health tips.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-white border border-line rounded-xl px-6 py-4 font-body-md text-body-md text-primary placeholder-muted/50 focus:ring-1 focus:ring-gold"
            />
            <button
              type="submit"
              className="bg-gold text-white shadow-sm font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded-xl hover:bg-gold/90 hover:-translate-y-0.5 transition-all duration-300 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}


