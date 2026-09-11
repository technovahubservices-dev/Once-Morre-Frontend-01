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
    <div className="min-h-[calc(100vh-82px)] flex items-center justify-center bg-[#F8F5F0] px-5 py-12">
      <div className="w-full max-w-[500px] rounded-2xl border border-[#E5DED3] bg-white shadow-[0_18px_50px_rgba(17,66,50,0.10)]">

        {/* Header */}
        <div className="px-8 pt-10 text-center md:px-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#D9C58F] bg-[#F8F3E7]">
            <span className="material-symbols-outlined text-[26px] text-[#C9A227]">
              person_add
            </span>
          </div>

          <h1 className="font-serif text-3xl font-bold tracking-wide text-[#114232]">
            Create Account
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#6B7772]">
            Join ONCE MORRE and discover the goodness
            <br />
            of pure dairy.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-8 mt-6 rounded-xl bg-[#FDECEC] p-4 text-sm text-[#B42318] md:mx-12">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 px-8 pb-9 pt-8 md:px-12"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[#315247]">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[#D8D3CB] bg-[#FBFAF8] px-4 py-3.5 text-sm text-[#253832] outline-none transition-all duration-200 placeholder:text-[#A1A8A4] focus:border-[#C9A227] focus:bg-white focus:ring-4 focus:ring-[#C9A227]/10"
              placeholder="Your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[#315247]">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#D8D3CB] bg-[#FBFAF8] px-4 py-3.5 text-sm text-[#253832] outline-none transition-all duration-200 placeholder:text-[#A1A8A4] focus:border-[#C9A227] focus:bg-white focus:ring-4 focus:ring-[#C9A227]/10"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[#315247]">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[#D8D3CB] bg-[#FBFAF8] px-4 py-3.5 text-sm text-[#253832] outline-none transition-all duration-200 placeholder:text-[#A1A8A4] focus:border-[#C9A227] focus:bg-white focus:ring-4 focus:ring-[#C9A227]/10"
              placeholder="At least 6 characters"
              required
              minLength={6}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 flex w-full items-center justify-center rounded-xl bg-[#114232] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_8px_20px_rgba(17,66,50,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#185640] hover:shadow-[0_12px_25px_rgba(17,66,50,0.24)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Sign In */}
        <div className="border-t border-[#EEE9E2] px-8 py-6 text-center">
          <p className="text-sm text-[#6B7772]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#114232] transition-colors hover:text-[#C9A227]"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
