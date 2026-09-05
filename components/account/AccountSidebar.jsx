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
      <div className="sticky top-32 space-y-2">
        <h2 className="font-headline-md text-headline-md text-deep-emerald mb-6 pb-2 border-b border-outline-variant">My Account</h2>
        <nav className="flex flex-col gap-2 font-body-md text-body-md">
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
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container hover:text-error rounded transition-all mt-8">
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </nav>
      </div>
    </aside>
  )
}
