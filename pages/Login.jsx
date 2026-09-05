import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/account'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const userData = await login(email, password, from.startsWith('/admin'))
      if (userData.role === 'admin') {
        const target = from && from.startsWith('/admin') ? from : '/admin'
        navigate(target, { replace: true })
      } else {
        const target = from && !from.startsWith('/admin') ? from : '/account'
        navigate(target, { replace: true })
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <div className="bg-surface-white border border-surface-container-highest p-8 rounded">
        <h1 className="font-headline-lg text-headline-lg text-deep-emerald mb-2 text-center">Welcome Back</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8 text-center">
          Sign in to your ONCE MORRE account to continue.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-error-container text-error rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded px-4 py-3 pr-12 focus:ring-1 focus:ring-regal-gold"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-deep-emerald transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <span className="material-symbols-outlined text-[22px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded hover:bg-deep-emerald/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="font-body-md text-body-md text-on-surface-variant mt-4 text-center">
          <Link to="/forgot-password" className="text-deep-emerald hover:text-regal-gold transition-colors">
            Forgot password?
          </Link>
        </p>

        <p className="font-body-md text-body-md text-on-surface-variant mt-6 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-deep-emerald hover:text-regal-gold transition-colors">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

