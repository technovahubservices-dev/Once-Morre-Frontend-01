import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE } from '../services/apiConfig.js'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [otpData, setOtpData] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      setSuccess('OTP sent to your email. Please check your inbox.')
      setOtpData(data.data)
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <div className="bg-surface-white border border-surface-container-highest p-8 rounded">
        <h1 className="font-headline-lg text-headline-lg text-deep-emerald mb-2 text-center">Forgot Password?</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8 text-center">
          Enter your email and we'll send you an OTP to reset your password.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-error-container text-error rounded text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded text-sm">
            {success}
            {otpData?.otp && (
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                <strong>Development Mode:</strong> Your OTP is <span className="font-mono text-lg">{otpData.otp}</span>
              </div>
            )}
            <div className="mt-4">
              <Link to={`/verify-otp?email=${encodeURIComponent(email)}`} className="text-deep-emerald hover:text-regal-gold transition-colors font-medium">
                Click here to verify OTP →
              </Link>
            </div>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-body-md text-body-md text-deep-emerald mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold"
                placeholder="you@example.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded hover:bg-deep-emerald/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        <p className="font-body-md text-body-md text-on-surface-variant mt-6 text-center">
          Remember your password?{' '}
          <Link to="/login" className="text-deep-emerald hover:text-regal-gold transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
