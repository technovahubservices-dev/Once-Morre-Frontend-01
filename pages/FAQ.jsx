const faqs = [
  {
    question: 'How fresh are your dairy products?',
    answer: 'All our dairy products are delivered within hours of production. We source milk daily from our partner farms and process it the same day to ensure maximum freshness and nutritional value.',
  },
  {
    question: 'Do you use preservatives in your products?',
    answer: 'No, we do not use any artificial preservatives, colors, or flavors in our products. Our dairy items are preserved naturally through proper pasteurization and packaging.',
  },
  {
    question: 'What is your delivery area?',
    answer: 'We currently deliver across major cities in India. Enter your pincode on the product page to check if we deliver to your location and the expected delivery time.',
  },
  {
    question: 'What is your return policy for dairy products?',
    answer: 'Due to the perishable nature of dairy products, we cannot accept returns. However, if you receive a damaged or incorrect product, please contact us within 24 hours for a replacement or refund.',
  },
  {
    question: 'Are your cows grass-fed?',
    answer: 'Yes, our partner farms follow ethical practices with grass-fed cows. This ensures the highest quality milk with superior nutritional profile and taste.',
  },
  {
    question: 'Do you offer subscription services?',
    answer: 'Yes, we offer flexible subscription plans for daily essentials like curd, buttermilk, and paneer. Subscribe and get 10% off on all recurring deliveries.',
  },
]

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <h1 className="font-display-lg text-display-lg text-deep-emerald mb-4">Frequently Asked Questions</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
        Quick answers to the most common questions about ONCE MORRE dairy products.
      </p>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-surface-white border border-outline-variant rounded p-6 shadow-sm">
            <h3 className="font-headline-md text-headline-md text-deep-emerald mb-3">{faq.question}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
