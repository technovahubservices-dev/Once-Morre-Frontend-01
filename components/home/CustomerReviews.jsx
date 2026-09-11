import { useEffect, useState } from 'react'

const reviews = [
  {
    id: 1,
    name: 'Priya',
    location: 'puducherry',
    rating: 5,
    text: 'The best curd I have ever tasted! So creamy and fresh. My whole family loves it. Delivery is always ontime and the packaging is perfect.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    text: 'Pure ghee with an amazing aroma. You can tell it is made using the traditional bilona method. Worth every rupee. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Anita Patel',
    location: 'Bangalore',
    rating: 5,
    text: 'I subscribe to the family pack and it has made our lives so easy. Fresh paneer, curd, and buttermilk every single day without fail.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Pune',
    rating: 5,
    text: 'The palkova is divine! It reminds me of my grandmother\'s recipe. ONCE MORRE has truly preserved the authentic taste of traditional dairy.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  },
]

export default function CustomerReviews() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-white">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-6 pb-10 md:pt-8 md:pb-12">

        {/* HEADER */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EFEB] border border-[#E7DFD3] mb-4">
            <span className="material-symbols-outlined text-[#1A5642] text-[18px]">
              favorite
            </span>

            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#114232]">
              TESTIMONIALS
            </span>
          </div>

          <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-tight font-bold text-[#081E17]">
            What Our Customers
            <br />
            <span className="italic text-[#1A5642]">
              Say
            </span>
          </h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#C99742]" />
        </div>

        {/* DESKTOP AUTO-SCROLLING REVIEWS */}
        <div className="hidden md:block overflow-hidden px-3">
          <div className="flex gap-6 animate-testimonial-scroll w-max">

            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="w-[320px] shrink-0 bg-white border border-line rounded-xl p-6 shadow-[0_6px_24px_rgba(15,82,56,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_14px_32px_rgba(15,82,56,0.10)]"
              >
                {/* STARS */}
                <div className="flex items-center gap-1 text-gold mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="material-symbols-outlined text-[18px]"
                    >
                      star
                    </span>
                  ))}
                </div>

                {/* REVIEW */}
                <p className="font-body-md text-body-md text-muted mb-6 leading-relaxed">
                  "{review.text}"
                </p>

                {/* CUSTOMER */}
                <div className="flex items-center gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border border-line"
                  />

                  <div>
                    <p className="font-body-md text-sm font-semibold text-primary">
                      {review.name}
                    </p>

                    <p className="font-body-md text-xs text-muted">
                      {review.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* MOBILE REVIEW */}
        <div className="md:hidden">
          <div className="bg-white border border-line rounded-xl p-6 shadow-[0_6px_24px_rgba(15,82,56,0.06)]">

            <div className="flex items-center gap-1 text-gold mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="material-symbols-outlined text-[18px]"
                >
                  star
                </span>
              ))}
            </div>

            <p className="font-body-md text-body-md text-muted mb-6 leading-relaxed">
              "{reviews[activeIndex].text}"
            </p>

            <div className="flex items-center gap-4">
              <img
                src={reviews[activeIndex].avatar}
                alt={reviews[activeIndex].name}
                className="w-12 h-12 rounded-full object-cover border border-line"
              />

              <div>
                <p className="font-body-md text-sm font-semibold text-primary">
                  {reviews[activeIndex].name}
                </p>

                <p className="font-body-md text-xs text-muted">
                  {reviews[activeIndex].location}
                </p>
              </div>
            </div>

          </div>

          {/* MOBILE DOTS */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-8 bg-primary'
                    : 'w-3 bg-outline-variant hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* AUTO-SCROLL ANIMATION */}
      <style>{`
        @keyframes testimonial-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 12px));
          }
        }

        .animate-testimonial-scroll {
          animation: testimonial-scroll 28s linear infinite;
        }

        .animate-testimonial-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

    </section>
  )
}


