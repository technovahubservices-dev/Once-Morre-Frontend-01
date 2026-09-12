import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { GoogleDriveProvider, useGoogleDrive } from '../../context/GoogleDriveContext.jsx'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/admin' },
  { label: 'Charts', icon: 'bar_chart', href: '/admin/charts' },
  { label: 'Products', icon: 'shopping_bag', href: '/admin/products' },
  { label: 'Categories', icon: 'category', href: '/admin/categories' },
  { label: 'Orders', icon: 'receipt_long', href: '/admin/orders' },
  { label: 'Subscriptions', icon: 'autorenew', href: '/admin/subscriptions' },
  { label: 'Inventory', icon: 'inventory_2', href: '/admin/inventory' },
  { label: 'Users', icon: 'people', href: '/admin/users' },
  { label: 'Blogs', icon: 'article', href: '/admin/blogs' },
  { label: 'Settings', icon: 'settings', href: '/admin/settings' },
]

const driveLabels = {
  checking: 'Checking...',
  connecting: 'Connecting...',
  disconnecting: 'Disconnecting...',
  connected: 'Connected',
  disconnected: 'Not Connected',
  error: 'Connection Error',
}

function DriveStatus({ compact = false }) {
  const { status } = useGoogleDrive()
  const color = status === 'connected' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : status === 'checking' || status === 'connecting' || status === 'disconnecting' ? 'bg-regal-gold animate-pulse' : 'bg-on-surface-variant'

  return (
    <span className={`inline-flex items-center gap-1.5 ${compact ? 'text-xs' : 'text-sm'} text-on-surface-variant`}>
      <span className={`w-2 h-2 rounded-full ${color}`} aria-hidden="true" />
      {driveLabels[status]}
    </span>
  )
}

function GoogleDrivePopover({ onClose, sidebar = false }) {
  const { status, connection, message, refreshStatus, connect, disconnect } = useGoogleDrive()
  const popoverRef = useRef(null)
  const isConnected = status === 'connected'
  const isBusy = status === 'checking' || status === 'connecting' || status === 'disconnecting'
  const email = connection.email || connection.account?.email
  const name = connection.name || connection.displayName || connection.account?.name
  const storage = connection.storage || connection.storageInfo

  useEffect(() => {
    const handleOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose()
      }
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <div ref={popoverRef} className={`absolute z-[60] mt-2 min-w-0 box-border max-h-[calc(100vh-32px)] overflow-x-hidden overflow-y-auto rounded-lg border border-outline-variant bg-[#fffdf8] p-5 shadow-xl text-left ${sidebar ? 'left-0 top-full w-full max-w-full' : 'right-0 top-full w-[min(20rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)]'}`} role="dialog" aria-label="Google Drive connection">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-deep-emerald">Google Drive</h2>
          <DriveStatus />
        </div>
        <button type="button" onClick={onClose} aria-label="Close Google Drive connection" className="text-on-surface-variant hover:text-deep-emerald">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {message && <p className="mt-3 text-sm text-error">{message}</p>}

      {isConnected ? (
        <div className="mt-4 space-y-3 text-sm">
          {email && <p className="text-on-surface"><span className="font-medium text-deep-emerald">Account:</span> {email}</p>}
          {name && <p className="text-on-surface"><span className="font-medium text-deep-emerald">Display name:</span> {name}</p>}
          {storage && <p className="text-on-surface"><span className="font-medium text-deep-emerald">Storage:</span> {typeof storage === 'string' ? storage : 'Available'}</p>}
          <div className="flex gap-2 pt-1">
            <button type="button" disabled title="Drive management will be available when file upload is enabled." className="flex-1 rounded border border-outline-variant px-3 py-2 text-center font-medium text-on-surface-variant opacity-60 cursor-not-allowed">Manage Drive</button>
            <button type="button" onClick={disconnect} disabled={isBusy} className="rounded border border-error px-3 py-2 font-medium text-error hover:bg-error-container disabled:opacity-50">{status === 'disconnecting' ? 'Disconnecting...' : 'Disconnect'}</button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <p className="min-w-0 break-words text-sm leading-5 text-on-surface-variant">Connect your Google Drive to manage website images and videos.</p>
          <button type="button" onClick={connect} disabled={isBusy} className="mt-4 w-full max-w-full box-border whitespace-normal rounded bg-deep-emerald px-4 py-2.5 font-medium text-white transition-colors hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
            {status === 'connecting' ? 'Connecting...' : 'Connect Google Drive'}
          </button>
        </div>
      )}

      <button type="button" onClick={refreshStatus} className="mt-3 text-xs font-medium text-deep-emerald hover:underline">Refresh status</button>
    </div>
  )
}

function AdminLayoutContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [drivePopover, setDrivePopover] = useState(null)
  const { logout } = useAuth()
  const { refreshStatus } = useGoogleDrive()
  const navigate = useNavigate()

  const toggleDrivePopover = (source) => {
    const next = drivePopover === source ? null : source
    setDrivePopover(next)
    if (next) refreshStatus()
  }

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
      <nav style={{ overflowX: 'clip', backgroundColor: '#eeeeec', opacity: 1 }} className={`fixed md:sticky inset-y-0 left-0 z-50 flex h-dvh w-64 max-w-full bg-surface-container shadow-md md:shadow-lg flex-col p-stack-md pt-6 space-y-unit transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:flex`}>
        {/* Header */}
        <div className="flex items-center space-x-3 mb-stack-lg px-2 mt-1">
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden">
            <span className="material-symbols-outlined text-secondary text-[24px]">admin_panel_settings</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary m-0 p-0">Admin Portal</h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant m-0 p-0">Management Console</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 min-h-0 space-y-4 overflow-y-auto pr-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.href === '/admin'}
              onClick={() => { setSidebarOpen(false); setDrivePopover(null) }}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-on-surface-variant hover:bg-surface-container-highest hover:translate-x-1'
                }`
              }
            >
              <span className="material-symbols-outlined mr-4">{item.icon}</span>
              <span className="font-label-md text-label-md">{item.label}</span>
            </NavLink>
          ))}
          <div className="relative min-w-0 max-w-full">
            <button
              type="button"
              onClick={() => toggleDrivePopover('sidebar')}
              aria-expanded={drivePopover === 'sidebar'}
              className="flex w-full items-center px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-highest hover:translate-x-1 transition-all duration-200"
            >
              <span className="material-symbols-outlined mr-4">cloud</span>
              <span className="min-w-0 text-left">
                <DriveStatus compact />
              </span>
            </button>
            {drivePopover === 'sidebar' && <GoogleDrivePopover sidebar onClose={() => setDrivePopover(null)} />}
          </div>
        </div>

        {/* Footer area of SideNav */}
        <div className="mt-auto shrink-0 pt-4 border-t border-surface-variant">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-error hover:bg-error-container rounded-lg w-full transition-colors duration-200"
          >
            <span className="material-symbols-outlined mr-4">logout</span>
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
          <div className="relative min-w-0 max-w-full">
            <button type="button" onClick={() => toggleDrivePopover('mobile')} aria-label="Open Google Drive connection" className="w-8 h-8 rounded-full bg-secondary-container overflow-hidden flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[18px]">cloud</span>
            </button>
            {drivePopover === 'mobile' && <GoogleDrivePopover onClose={() => setDrivePopover(null)} />}
          </div>
        </header>

        <header className="hidden md:flex items-center justify-end px-6 py-3 bg-surface border-b border-surface-variant">
          <div className="relative min-w-0 max-w-full">
            <button type="button" onClick={() => toggleDrivePopover('header')} aria-expanded={drivePopover === 'header'} className="flex items-center gap-2 rounded-lg px-3 py-2 text-on-surface-variant hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-[20px]">cloud</span>
              <DriveStatus />
            </button>
            {drivePopover === 'header' && <GoogleDrivePopover onClose={() => setDrivePopover(null)} />}
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

export default function AdminLayout() {
  return <GoogleDriveProvider><AdminLayoutContent /></GoogleDriveProvider>
}