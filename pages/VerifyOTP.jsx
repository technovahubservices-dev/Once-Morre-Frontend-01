import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { API_BASE } from '../services/apiConfig.js'

export default function VerifyOTP() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resetToken, setResetToken] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password')
    }
  }, [email, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Invalid OTP')
      }

      setResetToken(data.data.resetToken)
      navigate(`/reset-password?token=${encodeURIComponent(data.data.resetToken)}`)
    } catch (err) {
      setError(err.message || 'Failed to verify OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!email) {
    return null
  }

  return (
    <div className="max-w-md mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <div className="bg-surface-white border border-surface-container-highest p-8 rounded">
        <h1 className="font-headline-lg text-headline-lg text-deep-emerald mb-2 text-center">Verify OTP</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8 text-center">
          Enter the 6-digit OTP sent to <strong>{email}</strong>
        </p>

        {error && (
          <div className="mb-6 p-4 bg-error-container text-error rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-body-md text-body-md text-deep-emerald mb-2">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full bg-surface-container-low border-none rounded px-4 py-3 focus:ring-1 focus:ring-regal-gold text-center text-2xl tracking-widest"
              placeholder="000000"
              required
              maxLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-4 px-10 rounded hover:bg-deep-emerald/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <p className="font-body-md text-body-md text-on-surface-variant mt-6 text-center">
          Didn't receive OTP?{' '}
          <Link to="/forgot-password" className="text-deep-emerald hover:text-regal-gold transition-colors">
            Resend
          </Link>
        </p>
      </div>
    </div>
  )
}
