import { Link } from 'react-router-dom'

export default function Support() {
  return (
    <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <h1 className="font-display-lg text-display-lg text-deep-emerald mb-4">Support</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
        We are here to help. Browse our resources or reach out to us directly.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/contact-us" className="bg-surface-white border border-outline-variant rounded p-8 hover:border-deep-emerald transition-colors">
          <h3 className="font-headline-md text-headline-md text-deep-emerald mb-2">Contact Us</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Get in touch with our dairy support team.</p>
        </Link>
        <Link to="/faq" className="bg-surface-white border border-outline-variant rounded p-8 hover:border-deep-emerald transition-colors">
          <h3 className="font-headline-md text-headline-md text-deep-emerald mb-2">FAQ</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Find answers to commonly asked questions about our dairy products.</p>
        </Link>
      </div>
    </div>
  )
}
