import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import logoImage from '../../assets/images/logonew.png'

export default function Header() {
  const { cartCount } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const handleSectionClick = (e, sectionId) => {
  e.preventDefault()
  setMobileMenuOpen(false)

  if (location.pathname !== "/") {
    navigate("/")
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 500)
    return
  }

  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}
const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) =>
    location.pathname === path
      ? 'border-b-2 border-regal-gold pb-1 text-primary'
      : ''

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
    'relative rounded-full px-4 py-2.5 font-label-caps text-label-caps font-semibold tracking-wide text-[#53635D] transition-all duration-300 hover:bg-[#F3EEE8] hover:text-[#114232] hover:shadow-[0_4px_12px_rgba(17,66,50,0.08)]'

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 hidden border-b border-[#E7DFD3] bg-[#FCF9F7]/95 shadow-[0_6px_28px_rgba(17,66,50,0.10)] backdrop-blur-xl md:block before:absolute before:left-0 before:right-0 before:top-0 before:h-[2px] before:bg-[#C9A227]">
        <div className="flex min-h-[88px] w-full items-center justify-between gap-8 pl-8 pr-7 lg:pl-10 lg:pr-9">
          <Link
            className="group flex flex-shrink-0 items-center gap-4"
            to="/"
            aria-label="ONCE MORRE home"
          >
            <img
              src={logoImage}
              alt="ONCE MORRE logo"
              className="h-[72px] w-[150px] object-contain object-left transition-all duration-300 group-hover:scale-[1.03]"
            />
          </Link>

          <nav
            className="flex items-center gap-1.5 rounded-full border border-[#E7DFD3] bg-white/70 p-1.5 shadow-[0_3px_14px_rgba(17,66,50,0.05)] lg:gap-2"
            aria-label="Main navigation"
          >
            <Link to="/" onClick={(e) => handleSectionClick(e, "home")} className={sectionLinkClass}>
              Home
            </Link>
            <Link to="/" onClick={(e) => handleSectionClick(e, "about")} className={sectionLinkClass}>
              About
            </Link>
            <Link to="/collections" className={sectionLinkClass}>
              Products
            </Link>
            <Link to="/" onClick={(e) => handleSectionClick(e, "subscription")} className={sectionLinkClass}>
              Subscription
            </Link>
            <Link to="/" onClick={(e) => handleSectionClick(e, "blogs")} className={sectionLinkClass}>
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
                className="absolute right-1 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#53635D] transition-all duration-300 hover:bg-[#F3EEE8] hover:text-[#114232]"
              >
                <span className="material-symbols-outlined text-[19px]">
                  search
                </span>
              </button>
            </form><Link
              to="/wishlist"
              aria-label="View wishlist"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[#114232] transition-all duration-300 hover:bg-[#F3EEE8] hover:text-[#C99742] hover:scale-105"
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
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-[#114232] transition-all duration-300 hover:bg-[#F3EEE8] hover:text-[#C99742] hover:scale-105 ${isActive('/account')}`}
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
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-[#114232] transition-all duration-300 hover:bg-[#F3EEE8] hover:text-[#C99742] hover:scale-105 ${isActive('/account')}`}
              >
                <span className="material-symbols-outlined text-[23px]">
                  person
                </span>
              </Link>
            )}

            <Link
              to="/cart"
              aria-label="Open cart"
              className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[#114232] transition-all duration-300 hover:bg-[#F3EEE8] hover:text-[#C99742] hover:scale-105 ${isActive('/cart')}`}
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
            className="h-12 w-[105px] object-contain object-left"
          />
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
                to="/" onClick={(e) => handleSectionClick(e, "home")}
                className="border-b border-line py-4 text-lg font-medium text-primary transition-colors hover:text-regal-gold"
              >
                Home
              </Link>

              <Link
                to="/" onClick={(e) => handleSectionClick(e, "about")}
                className="border-b border-line py-4 text-lg font-medium text-primary transition-colors hover:text-regal-gold"
              >
                About
              </Link>

              <Link
                to="/collections"
                onClick={closeMobileMenu}
                className="border-b border-line py-4 text-lg font-medium text-primary transition-colors hover:text-regal-gold"
              >
                Products
              </Link>

              <Link to="/" onClick={(e) => handleSectionClick(e, "subscription")}
                className="border-b border-line py-4 text-lg font-medium text-primary transition-colors hover:text-regal-gold"
              >
                Subscription
              </Link>

              <Link
                to="/" onClick={(e) => handleSectionClick(e, "blogs")}
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




































































