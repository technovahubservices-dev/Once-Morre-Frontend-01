import { useState } from 'react'
import { subscriptionApi } from '../../services/subscriptionApi.js'
import { useAuth } from '../../context/AuthContext.jsx'

const plans = [
  {
    id: '30-days',
    duration: '30 DAYS',
    regularPrice: '₹2,100',
    offerPrice: '₹1,800',
    savings: 'SAVE ₹300',
    productId: '6a9a93e19ca81ce3900178fd',
    originalPrice: 2100,
    offerPriceValue: 1800,
    popular: false,
  },
  {
    id: '90-days',
    duration: '90 DAYS',
    regularPrice: '₹5,600',
    offerPrice: '₹4,999',
    savings: 'SAVE ₹601',
    productId: '6a9a93e19ca81ce3900178fd',
    originalPrice: 5600,
    offerPriceValue: 4999,
    popular: true,
  },
  {
    id: '180-days',
    duration: '180 DAYS',
    regularPrice: '₹11,600',
    offerPrice: '₹8,999',
    savings: 'SAVE ₹2,601',
    productId: '6a9a93e19ca81ce3900178fd',
    originalPrice: 11600,
    offerPriceValue: 8999,
    popular: false,
  },
]

export default function Subscription() {
  const { token } = useAuth()
  const [loading, setLoading] = useState({})
  const [message, setMessage] = useState({})

  const handleActivate = async (plan) => {
    if (!token) {
      setMessage({ [plan.id]: 'Please login to activate subscription' })
      return
    }

    setLoading((prev) => ({ ...prev, [plan.id]: true }))
    setMessage({})

    try {
      await subscriptionApi.activate(token, {
        productId: plan.productId,
        plan: plan.duration,
        quantity: 1,
        offerPrice: plan.offerPriceValue,
        originalPrice: plan.originalPrice,
      })

      setMessage({ [plan.id]: 'Subscription activated successfully!' })
    } catch (err) {
      setMessage({
        [plan.id]: err.message || 'Failed to activate subscription',
      })
    } finally {
      setLoading((prev) => ({ ...prev, [plan.id]: false }))
    }
  }

  return (
    <section
      id="subscription"
      className="bg-[#FAF7F2] py-10 md:py-14"
      style={{
        backgroundImage:
          'radial-gradient(#E2D9CA 0.75px, transparent 0.75px)',
        backgroundSize: '16px 16px',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* HEADER */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EFEB] border border-[#E7DFD3] mb-4">
            <span className="material-symbols-outlined text-[#1A5642] text-[18px]">
              verified
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#114232]">
              SUBSCRIPTION PLAN
            </span>
          </div>

          <h2 className="font-serif text-[27px] sm:text-[32px] md:text-[38px] leading-tight font-bold text-[#081E17]">
            1 Litre Per Day
            <br />
            <span className="italic text-[#1A5642]">
              Subscription Plan
            </span>
          </h2>

          <p className="mt-3 max-w-[560px] mx-auto text-sm md:text-[15px] leading-relaxed text-[#566761]">
            Fresh dairy delivered straight to your doorstep every morning
            for effortless daily nourishment.
          </p>
        </div>

        {/* PLANS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">

          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`relative overflow-hidden rounded-2xl bg-white flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'border-2 border-[#C99742] shadow-[0_16px_36px_-6px_rgba(11,38,29,0.25)] lg:scale-[1.03]'
                  : 'border border-[#E7DFD3] shadow-[0_4px_16px_rgba(11,38,29,0.06)]'
              }`}
            >

              {/* MOST POPULAR */}
              {plan.popular && (
                <div className="absolute top-3 right-3 z-20 bg-[#0B261D] text-[#E9C47E] px-3 py-1 rounded-full text-[9px] font-extrabold tracking-[0.14em] uppercase flex items-center gap-1 border border-[#E9C47E]/40 shadow-sm">
                  <span className="material-symbols-outlined text-[12px]">
                    stars
                  </span>
                  Most Popular
                </div>
              )}

              {/* CARD HEADER */}
              <div
                className={`relative ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#D9A74E] via-[#F2D08E] to-[#D9A74E] text-[#081E17]'
                    : 'bg-[#114232] text-white'
                }`}
              >
                <div className="px-5 py-5">
                  <div className="flex items-center justify-between gap-3">

                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                          plan.popular
                            ? 'bg-[#0B261D] text-[#E9C47E]'
                            : 'bg-white/10 border border-white/15 text-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[21px]">
                          calendar_month
                        </span>
                      </div>

                      <div>
                        <p
                          className={`text-[10px] font-bold uppercase tracking-[0.16em] mb-1 ${
                            plan.popular
                              ? 'text-[#0B261D]/70'
                              : 'text-white/70'
                          }`}
                        >
                          Plan Duration
                        </p>

                        <h3
                          className={`font-serif text-[22px] font-bold leading-none ${
                            plan.popular
                              ? 'text-[#081E17]'
                              : 'text-white'
                          }`}
                        >
                          {plan.duration}
                        </h3>
                      </div>
                    </div>

                    {/* SAVE BADGE � ONLY ONCE */}
                    <span
                      className={`shrink-0 px-2.5 py-1.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${
                        plan.popular
                          ? 'bg-[#0B261D]/15 border border-[#0B261D]/20 text-[#081E17]'
                          : 'bg-white/10 border border-white/20 text-white'
                      } ${
                        plan.popular ? 'mr-24 sm:mr-28' : ''
                      }`}
                    >
                      {plan.savings}
                    </span>
                  </div>
                </div>

                {/* WAVE */}
                <div className="w-full h-5 overflow-hidden leading-none">
                  <svg
                    className="w-full h-5 block fill-white"
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 120"
                  >
                    <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z" />
                  </svg>
                </div>
              </div>

              {/* CARD BODY */}
              <div className="p-5 flex flex-col flex-1 bg-white">

                {/* OFFER + REGULAR PRICE */}
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[30px] font-bold leading-none text-[#081E17]">
                    {plan.offerPrice}
                  </span>

                  <span className="text-[14px] text-[#566761]/70 line-through">
                    {plan.regularPrice}
                  </span>
                </div>

                <div className="mt-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#566761] mb-1">
                    Regular Price
                  </p>

                  <p className="text-[14px] text-[#566761]">
                    {plan.regularPrice}
                  </p>
                </div>

                {/* SINGLE SAVE BADGE */}
                <div className="mt-3">
                  <span className="inline-flex px-3 py-1 rounded-full bg-[#F5EFEB] text-[#114232] text-[10px] font-extrabold uppercase tracking-widest">
                    {plan.savings}
                  </span>
                </div>

                {/* BUTTON */}
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => handleActivate(plan)}
                    disabled={loading[plan.id]}
                    className={`w-full h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-[13.5px] tracking-wide transition-all active:scale-[0.99] disabled:opacity-50 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#D9A74E] via-[#F2D08E] to-[#D9A74E] text-[#081E17] shadow-md hover:brightness-105'
                        : 'bg-[#0B261D] text-white shadow-sm hover:bg-[#1A5642]'
                    }`}
                  >
                    <span>
                      {loading[plan.id]
                        ? 'Activating...'
                        : 'Activate Plan'}
                    </span>

                    {!loading[plan.id] && (
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                    )}
                  </button>

                  {message[plan.id] && (
                    <p
                      className={`mt-2 text-xs text-center ${
                        message[plan.id].includes('successfully')
                          ? 'text-[#114232]'
                          : 'text-red-600'
                      }`}
                    >
                      {message[plan.id]}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* DELIVERY PROMISE */}
        <div className="mt-6 md:mt-8">
          <div className="w-full bg-[#0B261D] rounded-2xl p-4 md:p-5 text-white border border-[#C99742]/25 shadow-sm flex items-center justify-between gap-4">

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-[#E9C47E] border border-[#E9C47E]/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[25px]">
                  local_shipping
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-serif text-[14px] sm:text-[15px] font-bold tracking-wide text-white uppercase leading-snug">
                  100% FREE HOME DELIVERY
                </span>

                <span className="text-[10px] sm:text-[11px] text-[#E9C47E] font-medium tracking-wide uppercase mt-1">
                  ON TIME, EVERY DAY
                </span>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#E9C47E]/80 shrink-0">
              <span className="material-symbols-outlined text-[18px]">
                verified
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}


