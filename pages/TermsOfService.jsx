import { Link } from 'react-router-dom'

export default function TermsOfService() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <h1 className="font-headline-lg text-headline-lg text-deep-emerald mb-8">Terms of Service</h1>
      <div className="bg-surface-white border border-outline-variant rounded p-8">
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">
          Welcome to ONCE MORRE. These Terms of Service govern your use of our website and dairy products. By accessing or using our website, you agree to be bound by these terms.
        </p>
        <h2 className="font-headline-md text-headline-md text-deep-emerald mt-6 mb-2">Use of Our Services</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">
          You must be at least 18 years old to place an order on our website. By using our services, you represent and warrant that you are of legal age to enter into a binding agreement for dairy product purchases.
        </p>
        <h2 className="font-headline-md text-headline-md text-deep-emerald mt-6 mb-2">Orders and Deliveries</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">
          All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason. Delivery times are estimates and may vary based on your location and product availability.
        </p>
        <h2 className="font-headline-md text-headline-md text-deep-emerald mt-6 mb-2">Contact Us</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">
          If you have any questions about these Terms of Service, please contact us at legal@oncemorre.com.
        </p>
        <Link to="/" className="text-deep-emerald hover:text-regal-gold transition-colors mt-8 inline-block">
          &larr; Back to Home
        </Link>
      </div>
    </main>
  )
}
