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
    <main className="min-h-[calc(100vh-180px)] bg-cream px-4 py-12 sm:px-6 md:py-20">
      <div className="mx-auto flex max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-line bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:grid-cols-2">

          {/* Brand Panel */}
          <div className="relative hidden min-h-[620px] overflow-hidden bg-primary md:flex md:flex-col md:justify-between p-10 lg:p-14">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold/30"></div>
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-gold/20"></div>

            <div className="relative z-10">
              <div className="mb-10 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-white/10 p-1">
                  <img
                    src="/assets/images/logonew.png"
                    alt="ONCE MORRE"
                    className="h-full w-full rounded-full object-contain"
                  />
                </div>

                <div>
                  <p className="font-headline-md text-xl font-bold tracking-wide text-white">
                    ONCE
                    <span className="text-gold"> ✦ </span>
                    MORRE
                  </p>
                  <p className="font-label-caps text-[10px] uppercase tracking-[0.25em] text-white/70">
                    Premium Dairy
                  </p>
                </div>
              </div>

              <div className="max-w-md">
                <span className="mb-5 inline-flex rounded-full border border-gold/40 bg-white/5 px-4 py-2 font-label-caps text-[10px] uppercase tracking-[0.2em] text-gold-soft">
                  Welcome Back
                </span>

                <h2 className="font-headline-lg text-4xl font-semibold leading-tight text-white lg:text-5xl">
                  Pure goodness,
                  <br />
                  <span className="text-gold-soft">delivered to you.</span>
                </h2>

                <p className="mt-6 max-w-sm font-body-md text-base leading-7 text-white/70">
                  Sign in to continue your journey with ONCE MORRE and enjoy
                  fresh, natural dairy products delivered from our farms to your home.
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3 border-t border-white/10 pt-6">
              <span className="material-symbols-outlined text-gold-soft">
                verified
              </span>
              <span className="font-label-caps text-xs uppercase tracking-widest text-white/70">
                Pure & Fresh · Since Generations
              </span>
            </div>
          </div>

          {/* Login Form */}
          <div className="flex min-h-[620px] flex-col justify-center px-6 py-10 sm:px-10 md:px-12 lg:px-16">
            <div className="mx-auto w-full max-w-md">

              {/* Mobile Brand */}
              <div className="mb-8 flex items-center justify-center gap-3 md:hidden">
                <img
                  src="/assets/images/logonew.png"
                  alt="ONCE MORRE"
                  className="h-12 w-12 rounded-full object-contain"
                />
                <p className="font-headline-md text-xl font-bold tracking-wide text-primary">
                  ONCE
                  <span className="text-gold"> ✦ </span>
                  MORRE
                </p>
              </div>

              <div className="mb-8">
                <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-gold">
                  Account Access
                </span>

                <h1 className="mt-3 font-headline-lg text-3xl font-semibold text-primary md:text-4xl">
                  Welcome Back
                </h1>

                <p className="mt-3 font-body-md text-sm leading-6 text-muted">
                  Sign in to your ONCE MORRE account to continue.
                </p>
              </div>

              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <span className="material-symbols-outlined text-[20px]">
                    error
                  </span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-label-caps text-xs uppercase tracking-widest text-primary"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-muted">
                      mail
                    </span>

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-line bg-cream py-3.5 pl-12 pr-4 font-body-md text-sm text-primary outline-none transition-all placeholder:text-muted/70 focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/10"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="font-label-caps text-xs uppercase tracking-widest text-primary"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="font-body-md text-xs font-medium text-muted transition-colors hover:text-gold"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-muted">
                      lock
                    </span>

                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-line bg-cream py-3.5 pl-12 pr-12 font-body-md text-sm text-primary outline-none transition-all placeholder:text-muted/70 focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/10"
                      placeholder="Enter your password"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted transition-colors hover:text-primary"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <span className="material-symbols-outlined text-[21px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Sign In */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-label-caps text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[20px]">
                        progress_activity
                      </span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <span className="material-symbols-outlined text-[19px]">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-line"></div>
                <span className="font-label-caps text-[10px] uppercase tracking-widest text-muted">
                  New to ONCE MORRE?
                </span>
                <div className="h-px flex-1 bg-line"></div>
              </div>

              {/* Register */}
              <Link
                to="/register"
                className="flex w-full items-center justify-center rounded-xl border border-primary bg-white py-3.5 font-label-caps text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream hover:shadow-md"
              >
                Create an Account
              </Link>

              <p className="mt-6 text-center font-body-md text-xs text-muted">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-primary transition-colors hover:text-gold"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
