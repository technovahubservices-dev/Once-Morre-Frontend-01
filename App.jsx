import AppRoutes from './routes/AppRoutes.jsx'
import WhatsAppButton from './components/common/WhatsAppButton.jsx'

export default function App() {
  return (
    <>
      <AppRoutes />
      {!window.location.pathname.startsWith('/admin') && <WhatsAppButton />}
    </>
  )
}

