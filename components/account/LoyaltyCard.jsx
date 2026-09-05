import { useAuth } from '../../context/AuthContext.jsx'

export default function LoyaltyCard() {
  const { user } = useAuth()
  const tier = user?.tier || 'Bronze'
  const points = user?.loyaltyPoints || 0

  const nextTier = tier === 'Bronze' ? 'Silver' : tier === 'Silver' ? 'Gold' : tier === 'Gold' ? 'Platinum' : null
  const tierThresholds = { Bronze: 1000, Silver: 5000, Gold: 10000, Platinum: Infinity }
  const currentThreshold = tierThresholds[tier] || 1000
  const previousThreshold = tier === 'Bronze' ? 0 : tier === 'Silver' ? 1000 : tier === 'Gold' ? 5000 : 10000
  const pointsToNext = currentThreshold - points

  return (
    <section className="bg-surface-white p-8 border border-regal-gold/30 rounded shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-soft-cream to-surface-white opacity-50 pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-soft-cream border border-regal-gold flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-4xl text-regal-gold">diamond</span>
        </div>
        <div>
          <h3 className="font-headline-md text-headline-md text-deep-emerald">
            ONCE MORRE Insider Tier: <span className="text-regal-gold">{tier}</span>
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            {nextTier
              ? `You are ${pointsToNext.toLocaleString()} points away from ${nextTier} status.`
              : 'You have reached the highest tier!'}
          </p>
        </div>
      </div>
      <div className="relative z-10 text-center md:text-right">
        <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-1">Current Balance</p>
        <p className="font-display-lg text-headline-lg text-deep-emerald">
          {points.toLocaleString()} <span className="text-body-md text-on-surface-variant">pts</span>
        </p>
        <button className="mt-2 text-sm text-regal-gold underline hover:text-deep-emerald transition-colors">View Rewards</button>
      </div>
    </section>
  )
}
