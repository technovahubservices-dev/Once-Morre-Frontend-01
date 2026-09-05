import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <h1 className="font-headline-lg text-headline-lg text-deep-emerald mb-8">Privacy Policy</h1>
      <div className="bg-surface-white border border-outline-variant rounded p-8">
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">
          At ONCE MORRE, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or place an order for our dairy products.
        </p>
        <h2 className="font-headline-md text-headline-md text-deep-emerald mt-6 mb-2">Information We Collect</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">
          We collect information you provide directly to us, such as your name, email address, delivery address, and payment information when you place an order or create an account with us.
        </p>
        <h2 className="font-headline-md text-headline-md text-deep-emerald mt-6 mb-2">How We Use Your Information</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">
          We use your information to process orders, communicate with you about your dairy deliveries, and improve our services. We do not sell or share your personal information with third parties for marketing purposes.
        </p>
        <h2 className="font-headline-md text-headline-md text-deep-emerald mt-6 mb-2">Contact Us</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">
          If you have any questions about this Privacy Policy, please contact us at privacy@oncemorre.com.
        </p>
        <Link to="/" className="text-deep-emerald hover:text-regal-gold transition-colors mt-8 inline-block">
          &larr; Back to Home
        </Link>
      </div>
    </main>
  )
}
