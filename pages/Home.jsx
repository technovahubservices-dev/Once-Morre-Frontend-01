import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/home/Hero.jsx'
import ButtermilkVariants from '../components/home/ButtermilkVariants.jsx'
import ProductGrid from '../components/product/ProductGrid.jsx'
import PureMilkGoodness from '../components/home/PureMilkGoodness.jsx'
import DairyQualityGuide from '../components/home/DairyQualityGuide.jsx'
import StorySection from '../components/home/StorySection.jsx'
import Subscription from '../components/home/Subscription.jsx'
import CustomerReviews from '../components/home/CustomerReviews.jsx'
import Blogs from '../components/home/Blogs.jsx'
import { api } from '../services/api.js'

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api.getProducts().then(setProducts)
    api.getCategories().then(setCategories)
  }, [])

  const featuredProducts = products

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Slow Moving Images */}
      

      {/* 3. Buttermilk Variants */}
      <div className="reveal-on-scroll"><ButtermilkVariants /></div>

      {/* 4. Featured Products */}
      <section id="products" className="bg-surface reveal-on-scroll">
        <div className="max-w-container-max mx-auto px-2 md:px-4 py-6 md:py-8">
          <div className="text-center mb-10 md:mb-12">
            <span className="mb-3 inline-flex items-center gap-3 font-label-caps text-xs font-bold uppercase tracking-[0.25em] text-regal-gold">
              <span className="h-px w-8 bg-regal-gold" />
              Handpicked For You
              <span className="h-px w-8 bg-regal-gold" />
            </span>

            <h2 className="font-headline-lg text-4xl font-bold leading-tight text-deep-emerald md:text-5xl lg:text-6xl">
              Featured Products
            </h2>

            <div className="mx-auto mt-4 flex items-center justify-center gap-2">
              <span className="h-1 w-1 rounded-full bg-regal-gold" />
              <span className="h-1 w-14 rounded-full bg-regal-gold" />
              <span className="h-1 w-1 rounded-full bg-regal-gold" />
            </div>
          </div>

          {featuredProducts.length > 0 ? (
            <ProductGrid products={featuredProducts} />
          ) : (
            <div className="text-center py-12">
              <p className="font-body-md text-body-md text-on-surface-variant">Discover our most loved dairy products.</p>
            </div>
            
          )}
        </div>
        
      </section>

      <section className="bg-surface-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-3 md:pb-4">
          <div className="text-center">
            <Link
              to="/collections"
              className="inline-block bg-deep-emerald text-surface-white font-label-caps text-label-caps uppercase tracking-widest py-3 px-8 rounded hover:bg-deep-emerald/90 transition-colors"
            >
              Explore All Products
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose ONCE MORRE */}
      <div className="reveal-on-scroll"><DairyQualityGuide /></div>

      {/* 6. Dairy Journey */}
      <div className="reveal-on-scroll"><StorySection /></div>

      {/* 7. Blogs */}
      <div className="reveal-on-scroll"><Blogs /></div>

      {/* 8. Subscription */}
      <div className="reveal-on-scroll"><Subscription /></div>

      {/* 9. Customer Reviews */}
      <div className="reveal-on-scroll"><CustomerReviews /></div>

      {/* 10. Pure Milk Goodness */}
      <div className="reveal-on-scroll"><PureMilkGoodness /></div>
    </>
  )
}












