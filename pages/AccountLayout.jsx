import { Outlet } from 'react-router-dom'
import AccountSidebar from '../components/account/AccountSidebar.jsx'

export default function AccountLayout() {
  return (
    <div className="flex-grow flex w-full max-w-7xl mx-auto px-4 md:px-8 py-12 gap-8">
      {/* // AccountLayout wraps all account sub-pages with the persistent sidebar.
          // Using Outlet renders the matched child route (Orders, Addresses, Settings, or Dashboard). */}
      <AccountSidebar />
      <main className="flex-1 flex flex-col gap-12">
        <Outlet />
      </main>
    </div>
  )
}
