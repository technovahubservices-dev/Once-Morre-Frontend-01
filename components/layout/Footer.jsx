import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-soft-cream dark:bg-primary w-full border-t border-outline-variant dark:border-primary-container">
      <div className="max-w-[1280px] mx-auto px-12 md:px-12 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Link className="text-headline-lg font-headline-lg text-deep-emerald dark:text-primary-fixed mb-4 inline-block hover:opacity-80 transition-opacity" to="/">
              Morre Premium Dairy
            </Link>
            <p className="text-on-surface-variant font-body-md text-sm leading-relaxed mb-6 max-w-sm">
              Pure dairy goodness delivered from our farms to your home. Fresh, natural, and crafted with care since generations.
            </p>
            <p className="text-on-surface-variant font-body-md text-sm">© 2026 Morre Premium Dairy. All Rights Reserved.</p>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-headline-md text-base text-primary mb-4">QUICK LINKS</h4>
            <ul className="flex flex-col space-y-3">
              <li><Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-sm" to="/">HOME</Link></li>
              <li><Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-sm" to="/about">ABOUT</Link></li>
              <li><Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-sm" to="/subscription">SUBSCRIPTION</Link></li>
              <li><Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-sm" to="/blogs">BLOGS</Link></li>
              <li><Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-sm" to="/offers">OFFER</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-headline-md text-base text-primary mb-4">SUPPORT</h4>
            <ul className="flex flex-col space-y-3">
              <li><Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-sm" to="/contact-us">Contact</Link></li>
              <li><Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-sm" to="/faq">FAQ</Link></li>
              <li><Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-sm" to="#">Shipping Policy</Link></li>
              <li><Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-sm" to="#">Returns</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-headline-md text-base text-primary mb-4">CONNECTED</h4>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                className="w-full border-b border-outline-variant bg-transparent px-0 py-2 focus:outline-none focus:border-primary font-body-md text-sm placeholder-on-surface-variant/50"
                placeholder="Customer Name"
                type="text"
              />
              <input
                className="w-full border-b border-outline-variant bg-transparent px-0 py-2 focus:outline-none focus:border-primary font-body-md text-sm placeholder-on-surface-variant/50"
                placeholder="Email Address"
                type="email"
              />
              <textarea
                className="w-full border-b border-outline-variant bg-transparent px-0 py-2 focus:outline-none focus:border-primary font-body-md text-sm placeholder-on-surface-variant/50"
                placeholder="Your Message"
                rows="2"
              />
              <button
                type="submit"
                className="mt-2 bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest px-6 py-3 rounded hover:bg-deep-emerald/90 transition-colors"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
