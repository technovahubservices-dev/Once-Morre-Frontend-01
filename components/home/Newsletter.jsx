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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-[#E9C47E]/40 mb-4">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#E9C47E]">
              STAY CONNECTED
            </span>
          </div>
          <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-tight font-bold text-white mb-4">
            Join the <span className="italic text-[#E9C47E]">ONCE MORRE Family</span>
          </h2>
          <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-[#C99742]" />
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





