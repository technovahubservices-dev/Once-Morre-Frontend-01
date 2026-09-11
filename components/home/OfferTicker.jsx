import { useEffect, useState } from 'react'
import { api } from '../../services/api.js'

export default function OfferTicker() {
  const [offers, setOffers] = useState([])

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const settings = await api.getSiteSettings()

        if (Array.isArray(settings?.announcements)) {
          setOffers(settings.announcements)
        }
      } catch (error) {
        console.error('Failed to load announcements:', error)
      }
    }

    fetchAnnouncements()
  }, [])

  if (!offers.length) {
    return null
  }

  return (
    <div className="w-full overflow-hidden bg-[#114232] text-white">
      <div
        className="flex whitespace-nowrap py-3 text-sm font-medium"
        style={{
          width: 'max-content',
          animation: 'tickerScroll 35s linear infinite',
        }}
      >
        {offers.map((offer, index) => (
          <span key={index} className="mx-8">
            {offer}
          </span>
        ))}
      </div>
    </div>
  )
}
