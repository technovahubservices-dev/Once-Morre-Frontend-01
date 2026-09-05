import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(name, email, password)
      navigate('/account', { replace: true })
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <div className="bg-surface-white border border-surface-container-highest p-8 rounded">
        <h1 className="font-headline-lg text-headline-lg text-deep-emerald mb-2 text-center">Create Account</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8 text-center">
          Join ONCE MORRE and discover the goodness of pure dairy.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-error-container text-error rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-body-md text-body-md text-deep-emerald mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label className="block font-body-md text-body-md text-deep-emerald mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block font-body-md text-body-md text-deep-emerald mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
              placeholder="At least 6 characters"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded hover:bg-deep-emerald/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="font-body-md text-body-md text-on-surface-variant mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-deep-emerald hover:text-regal-gold transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
