import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/admin' },
  { label: 'Charts', icon: 'bar_chart', href: '/admin/charts' },
  { label: 'Products', icon: 'shopping_bag', href: '/admin/products' },
  { label: 'Categories', icon: 'category', href: '/admin/categories' },
  { label: 'Orders', icon: 'receipt_long', href: '/admin/orders' },
  { label: 'Inventory', icon: 'inventory_2', href: '/admin/inventory' },
  { label: 'Users', icon: 'people', href: '/admin/users' },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SideNavBar */}
      <nav className={`fixed md:sticky inset-y-0 left-0 z-50 w-64 bg-surface-container shadow-lg flex-col p-stack-md space-y-unit transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:flex`}>
        {/* Header */}
        <div className="flex items-center space-x-3 mb-stack-lg px-2">
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden">
            <span className="material-symbols-outlined text-secondary text-[24px]">admin_panel_settings</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary m-0 p-0">Admin Portal</h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant m-0 p-0">Management Console</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 space-y-2 overflow-y-auto pr-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.href === '/admin'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-highest hover:translate-x-1'
                }`
              }
            >
              <span className="material-symbols-outlined mr-3">{item.icon}</span>
              <span className="font-label-md text-label-md">{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Footer area of SideNav */}
        <div className="mt-auto pt-4 border-t border-surface-variant">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-error hover:bg-error-container rounded-lg w-full transition-colors duration-200"
          >
            <span className="material-symbols-outlined mr-3">logout</span>
            <span className="font-label-md text-label-md font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header (Visible only on mobile) */}
        <header className="md:hidden flex items-center justify-between p-margin-mobile bg-surface sticky top-0 z-40 border-b border-surface-variant">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-primary p-2 -ml-2"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary m-0">Admin Portal</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-secondary-container overflow-hidden flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-[18px]">admin_panel_settings</span>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-surface">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

