import heroImage from '../../assets/images/heropage.jpeg'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-cream"
    >
      <div className="w-full">
        <div className="relative overflow-hidden bg-white">
          <img
            src={heroImage}
            alt="Once Morre buttermilk homepage banner"
            className="block h-auto w-[90%] mx-auto object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  )
}


