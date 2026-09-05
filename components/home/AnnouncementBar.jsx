import { Link } from 'react-router-dom'

export default function AnnouncementBar() {
  return (
    <div className="bg-deep-emerald text-surface-white text-center py-2.5 px-4 font-body-md text-xs md:text-sm tracking-wide">
      <span className="hidden md:inline">Free home delivery on orders above ₹500 ·</span>
      <span className="md:ml-2">Explore our Fresh Dairy Collection</span>
      <Link to="/collections" className="underline underline-offset-2 ml-2 font-semibold hover:text-regal-gold transition-colors">
        Shop Now
      </Link>
    </div>
  )
}
