import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const navItems = [
  { label: 'Profile Overview', icon: 'person', href: '/account', active: true },
  { label: 'My Orders', icon: 'shopping_basket', href: '/account/orders' },
  { label: 'Wishlist', icon: 'favorite', href: '/wishlist' },
  { label: 'Addresses', icon: 'location_on', href: '/account/addresses' },
  { label: 'Account Settings', icon: 'settings', href: '/account/settings' },
]

export default function AccountSidebar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-32">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-regal-gold font-semibold mb-2">Account</p>
          <h2 className="font-headline-md text-headline-md text-deep-emerald">My Account</h2>
        </div>

        <nav className="flex flex-col gap-1 font-body-md text-body-md bg-surface-white border border-outline-variant rounded-sm p-2 shadow-sm">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded transition-all ${
                item.active
                  ? 'bg-surface-white text-deep-emerald font-bold border border-outline-variant shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-white hover:text-deep-emerald'
              }`}
            >
              <span className={`material-symbols-outlined ${item.active ? 'text-regal-gold' : ''}`}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container hover:text-error rounded transition-all mt-6">
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </nav>
      </div>
    </aside>
  )
}

