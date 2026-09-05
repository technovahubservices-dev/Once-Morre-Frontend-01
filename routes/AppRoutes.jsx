import { Routes, Route, useLocation } from 'react-router-dom'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import Home from '../pages/Home.jsx'
import Cart from '../pages/Cart.jsx'
import Checkout from '../pages/Checkout.jsx'
import Account from '../pages/Account.jsx'
import ProductDetail from '../pages/ProductDetail.jsx'
import Collections from '../pages/Collections.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import StoreLocator from '../pages/StoreLocator.jsx'
import Wishlist from '../pages/Wishlist.jsx'
import CategoryPage from '../pages/CategoryPage.jsx'
import NewArrivals from '../pages/NewArrivals.jsx'
import Offers from '../pages/Offers.jsx'
import Blogs from '../pages/Blogs.jsx'
import Subscription from '../pages/Subscription.jsx'
import About from '../pages/About.jsx'
import Search from '../pages/Search.jsx'
import PrivacyPolicy from '../pages/PrivacyPolicy.jsx'
import TermsOfService from '../pages/TermsOfService.jsx'
import AccountLayout from '../pages/AccountLayout.jsx'
import AccountOrders from '../pages/AccountOrders.jsx'
import AccountAddresses from '../pages/AccountAddresses.jsx'
import AccountSettings from '../pages/AccountSettings.jsx'
import Support from '../pages/Support.jsx'
import ContactUs from '../pages/ContactUs.jsx'
import FAQ from '../pages/FAQ.jsx'
import ForgotPassword from '../pages/ForgotPassword.jsx'
import VerifyOTP from '../pages/VerifyOTP.jsx'
import ResetPassword from '../pages/ResetPassword.jsx'
import ProtectedRoute from '../components/common/ProtectedRoute.jsx'
import AdminRoute from '../components/common/AdminRoute.jsx'
import AdminLayout from '../components/admin/AdminLayout.jsx'
import Dashboard from '../pages/admin/Dashboard.jsx'
import AdminProducts from '../pages/admin/AdminProducts.jsx'
import AdminCategories from '../pages/admin/AdminCategories.jsx'
import AdminOrders from '../pages/admin/AdminOrders.jsx'
import AdminInventory from '../pages/admin/AdminInventory.jsx'
import AdminUsers from '../pages/admin/AdminUsers.jsx'
import Charts from '../pages/admin/Charts.jsx'

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="charts" element={<Charts />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    )
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* // Nested account routes: /account shows dashboard, /account/orders, /account/addresses, /account/settings render inside AccountLayout. */}
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="orders" element={<ProtectedRoute><AccountOrders /></ProtectedRoute>} />
            <Route path="addresses" element={<ProtectedRoute><AccountAddresses /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
          </Route>
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/store-locator" element={<StoreLocator />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* // Footer support routes */}
          <Route path="/support" element={<Support />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppContent />
    </div>
  )
}
