import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import logoImage from '../../assets/images/logo.jpeg'

export default function Header() {
  const { cartCount } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) =>
    location.pathname === path
      ? 'border-b-2 border-regal-gold pb-1 text-primary'
      : ''

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return

    const sectionId = decodeURIComponent(location.hash.slice(1))
    const element = document.getElementById(sectionId)

    if (!element) return

    const timer = window.setTimeout(() => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 0)

    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash])

  const handleSearch = (e) => {
    e.preventDefault()

    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const sectionLinkClass =
    'relative pb-2 font-label-caps text-label-caps text-on-surface-variant transition-colors duration-300 hover:text-primary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-regal-gold after:transition-transform after:duration-300 hover:after:scale-x-100'

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 hidden border-b border-line bg-[#fcf9f8] shadow-sm backdrop-blur-md md:block">
        <div className="mx-auto flex min-h-[76px] w-full max-w-container-max items-center justify-between gap-6 px-margin-desktop">
          <Link
            className="flex flex-shrink-0 items-center gap-3"
            to="/"
            aria-label="ONCE MORRE home"
          >
            <img
              src={logoImage}
              alt="ONCE MORRE logo"
              className="h-12 w-12 rounded-full border border-line bg-white object-contain p-1"
            />
            <span className="font-display-lg text-[26px] font-semibold tracking-wide text-primary transition-opacity duration-300 hover:opacity-80">
              ONCE MORRE
            </span>
          </Link>

          <nav
            className="flex items-center gap-5 lg:gap-7"
            aria-label="Main navigation"
          >
            <Link to="/#home" className={sectionLinkClass}>
              Home
            </Link>
            <Link to="/#about" className={sectionLinkClass}>
              About
            </Link>
            <Link to="/#subscription" className={sectionLinkClass}>
              Subscription
            </Link>
            <Link to="/#blogs" className={sectionLinkClass}>
              Blogs
            </Link>
            <Link to="/offers" className={sectionLinkClass}>
              Offers
            </Link>
          </nav>

          <div className="flex items-center gap-2 text-primary">
            <form
              onSubmit={handleSearch}
              className="relative hidden xl:block"
              role="search"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="h-10 w-44 rounded-full border border-line bg-white px-4 pr-10 text-sm text-ink outline-none transition-all duration-300 placeholder:text-muted focus:border-regal-gold focus:ring-2 focus:ring-gold-soft/50"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:bg-gold-soft/40 hover:text-primary"
              >
                <span className="material-symbols-outlined text-[19px]">
                  search
                </span>
              </button>
            </form>

            <Link
              to="/collections"
              aria-label="View all dairy products"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition-all duration-300 hover:bg-green/50 hover:text-primary"
            >
              <span className="material-symbols-outlined text-[23px]">
                storefront
              </span>
            </Link>

            <Link
              to="/wishlist"
              aria-label="View wishlist"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition-all duration-300 hover:bg-green/50 hover:text-primary"
            >
              <span className="material-symbols-outlined text-[23px]">
                favorite
              </span>

              {wishlistItems.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-regal-gold px-1 text-[10px] font-bold text-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/account"
                  aria-label="My account"
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition-all duration-300 hover:bg-green/50 ${isActive('/account')}`}
                >
                  <span className="material-symbols-outlined text-[23px]">
                    person
                  </span>
                </Link>

                <span className="hidden max-w-[100px] truncate text-sm text-muted xl:block">
                  Hi, {user?.name?.split(' ')[0]}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden rounded-full border border-line px-3 py-2 text-xs font-semibold uppercase tracking-widest text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white lg:block"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/account"
                aria-label="My account"
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition-all duration-300 hover:bg-green/50 ${isActive('/account')}`}
              >
                <span className="material-symbols-outlined text-[23px]">
                  person
                </span>
              </Link>
            )}

            <Link
              to="/cart"
              aria-label="Open cart"
              className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition-all duration-300 hover:bg-green/50 ${isActive('/cart')}`}
            >
              <span className="material-symbols-outlined text-[23px]">
                shopping_bag
              </span>

              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-regal-gold px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex min-h-[68px] items-center justify-between border-b border-line bg-[#fcf9f8] px-4 shadow-sm backdrop-blur-md md:hidden">
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-green/50"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        <Link
          className="flex flex-shrink-0 items-center gap-2"
          to="/"
          aria-label="ONCE MORRE home"
        >
          <img
            src={logoImage}
            alt="ONCE MORRE logo"
            className="h-9 w-9 rounded-full border border-line bg-white object-contain p-0.5"
          />
          <span className="font-display-lg text-[20px] tracking-wide text-primary">
            ONCE MORRE
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden rounded-full px-2 py-2 text-[10px] font-semibold uppercase tracking-widest text-primary sm:block"
            >
              Sign Out
            </button>
          )}

          <Link
            to="/cart"
            aria-label="Open cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-green/50"
          >
            <span className="material-symbols-outlined text-[22px]">
              shopping_bag
            </span>

            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-regal-gold px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#fcf9f8] md:hidden">
          <div className="flex min-h-screen flex-col">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-display-lg text-xl text-primary">
                Menu
              </span>

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-green/50"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <nav
              className="flex flex-col px-6 py-8"
              aria-label="Mobile navigation"
            >
              <Link
                to="/#home"
                onClick={closeMobileMenu}
                className="border-b border-line py-4 text-lg font-medium text-primary transition-colors hover:text-regal-gold"
              >
                Home
              </Link>

              <Link
                to="/#about"
                onClick={closeMobileMenu}
                className="border-b border-line py-4 text-lg font-medium text-primary transition-colors hover:text-regal-gold"
              >
                About
              </Link>

              <Link
                to="/#subscription"
                onClick={closeMobileMenu}
                className="border-b border-line py-4 text-lg font-medium text-primary transition-colors hover:text-regal-gold"
              >
                Subscription
              </Link>

              <Link
                to="/#blogs"
                onClick={closeMobileMenu}
                className="border-b border-line py-4 text-lg font-medium text-primary transition-colors hover:text-regal-gold"
              >
                Blogs
              </Link>

              
              <Link
                to="/offers"
                onClick={closeMobileMenu}
                className="border-b border-line py-4 text-lg font-medium text-primary transition-colors hover:text-regal-gold"
              >
                Offers
              </Link>
              <Link
                to="/search"
                onClick={closeMobileMenu}
                className="border-b border-line py-4 text-lg font-medium text-primary transition-colors hover:text-regal-gold"
              >
                Search
              </Link>

              <Link
                to="/account"
                onClick={closeMobileMenu}
                className="border-b border-line py-4 text-lg font-medium text-primary transition-colors hover:text-regal-gold"
              >
                Account
              </Link>

              <Link
                to="/wishlist"
                onClick={closeMobileMenu}
                className="border-b border-line py-4 text-lg font-medium text-primary transition-colors hover:text-regal-gold"
              >
                Wishlist
              </Link>

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="py-4 text-left text-lg font-medium text-primary transition-colors hover:text-regal-gold"
                >
                  Sign Out
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}












