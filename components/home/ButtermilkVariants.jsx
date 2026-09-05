import plainMilkImage from '../../assets/images/plain-milk.png.png'
import masalaMilkImage from '../../assets/images/masala-milk.png.png'
import turmericMilkImage from '../../assets/images/turmeric-milk.png.png'
import variantsImage from '../../assets/images/variants.webp'

const variants = [
  {
    name: 'Plain Buttermilk',
    image: plainMilkImage,
    badge: 'CLASSIC',
    icon: 'water_drop',
    headerClass:
      'bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#2563EB]',
    iconClass: 'bg-white/10 border border-white/15 text-white',
    badgeClass: 'bg-white/10 border border-white/20 text-white',
    cardClass:
      'border border-[#E7DFD3] shadow-[0_6px_20px_rgba(11,38,29,0.07)]',
    description: [
      'உடலுக்கு புத்துணர்ச்சியையும் நீர்ச்சத்தையும் வழங்க உதவும்.',
      'செரிமானத்திற்கு இலகுவான பானம்.',
      'கோடைக்காலத்தில் உடலை குளிர்ச்சியாக வைத்திருக்க உதவும்.',
    ],
  },
  {
    name: 'Masala Buttermilk',
    image: masalaMilkImage,
    badge: 'POPULAR',
    icon: 'local_fire_department',
    headerClass:
      'bg-gradient-to-r from-[#7CBF2F] via-[#A8D84E] to-[#7CBF2F]',
    iconClass: 'bg-[#0B261D] text-[#E9C47E]',
    badgeClass:
      'bg-[#0B261D]/15 border border-[#0B261D]/20 text-[#081E17]',
    cardClass:
      'border-2 border-[#C99742] shadow-[0_16px_36px_-6px_rgba(11,38,29,0.20)] lg:scale-[1.03]',
    description: [
      'சீரகம், இஞ்சி போன்ற மசாலா சேர்வதால் சுவையும் மணமும் அதிகரிக்கும்.',
      'உணவுக்குப் பிறகு புத்துணர்ச்சியாக பருகலாம்.',
      'லேசான மசாலா சுவையுடன் தினசரி குடிக்க ஏற்றது.',
    ],
  },
  {
    name: 'Turmeric Buttermilk',
    image: turmericMilkImage,
    badge: 'SPECIAL',
    icon: 'spa',
    headerClass:
      'bg-gradient-to-r from-[#E6A928] via-[#FFD766] to-[#E6A928]',
    iconClass: 'bg-white/10 border border-white/15 text-[#E9C47E]',
    badgeClass: 'bg-white/10 border border-white/20 text-white',
    cardClass:
      'border border-[#E7DFD3] shadow-[0_6px_20px_rgba(11,38,29,0.07)]',
    description: [
      'மஞ்சளின் இயற்கையான சேர்க்கையுடன் தயாரிக்கப்படுகிறது.',
      'புத்துணர்ச்சியான, லேசான பானமாக பருகலாம்.',
      'பாரம்பரிய மஞ்சள் சுவையுடன் தனித்துவமான அனுபவம் தரும்.',
      'தினசரி உணவுடன் சேர்த்துப் பருக ஏற்றது.',
    ],
  },
]

export default function ButtermilkVariants() {
  return (
    <section
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
              OUR VARIANTS
            </span>
          </div>

          <h2 className="font-serif text-[27px] sm:text-[32px] md:text-[38px] leading-tight font-bold text-[#081E17]">
            Available Buttermilk
            <br />
            <span className="italic text-[#1A5642]">
              Variants
            </span>
          </h2>

          <div className="h-[1px] w-12 bg-[#C99742] mx-auto mt-5 mb-5" />

          <p className="max-w-[560px] mx-auto text-sm md:text-[15px] leading-relaxed text-[#566761] font-medium">
            ஒவ்வொரு துளியிலும் இயற்கையின் புத்துணர்ச்சி!
          </p>
        </div>

        {/* VARIANT CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {variants.map((variant) => (
            <article
              key={variant.name}
              className={`group relative overflow-hidden rounded-2xl bg-white flex flex-col transition-all duration-300 hover:-translate-y-1 ${variant.cardClass}`}
            >

              {/* SPECIAL BADGE */}
              <div className="absolute top-3 right-3 z-20">
                <span
                  className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold tracking-[0.14em] uppercase ${variant.badgeClass}`}
                >
                  {variant.badge}
                </span>
              </div>

              {/* CARD HEADER */}
              <div className={`relative ${variant.headerClass}`}>
                <div className="px-5 py-5">
                  <div className="flex items-center gap-3 pr-16">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${variant.iconClass}`}
                    >
                      <span className="material-symbols-outlined text-[21px]">
                        {variant.icon}
                      </span>
                    </div>

                    <div>
                      <p
                        className={`text-[10px] font-bold uppercase tracking-[0.16em] mb-1 ${
                          variant.badge === 'POPULAR'
                            ? 'text-[#0B261D]/70'
                            : 'text-white/70'
                        }`}
                      >
                        Buttermilk Variant
                      </p>

                      <h3
                        className={`font-serif text-[21px] font-bold leading-tight ${
                          variant.badge === 'POPULAR'
                            ? 'text-[#081E17]'
                            : 'text-white'
                        }`}
                      >
                        {variant.name}
                      </h3>
                    </div>
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
              <div className="p-4 md:p-5 flex flex-col flex-1 bg-white">

                {/* IMAGE */}
                <div className="h-32 w-full flex items-center justify-center mb-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD3] overflow-hidden">
                  <img
                    src={variant.image}
                    alt={variant.name}
                    className="h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-3">
                  {variant.description.map((text, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2.5 text-sm md:text-[14px] leading-relaxed text-[#566761]"
                    >
                      <span className="material-symbols-outlined text-[#C99742] text-[17px] mt-0.5 shrink-0">
                        check_circle
                      </span>

                      <p>{text}</p>
                    </div>
                  ))}
                </div>

                {/* BOTTOM LINE */}
                <div className="mt-6 pt-4 border-t border-[#E7DFD3]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#566761]">
                      Fresh &amp; Natural
                    </span>

                    <span className="material-symbols-outlined text-[#C99742] text-[20px]">
                      verified
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* EXISTING VARIANTS IMAGE */}
        <div className="mt-8 md:mt-10">
          <div className="w-full overflow-hidden rounded-2xl border border-[#E7DFD3] bg-white p-2 shadow-[0_8px_28px_rgba(15,82,56,0.08)]">
            <img
              src={variantsImage}
              alt="Plain, masala, and turmeric variants"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        </div>

      </div>
    </section>
  )
}





