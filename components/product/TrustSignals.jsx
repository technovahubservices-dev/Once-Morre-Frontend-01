export default function TrustSignals() {
  const signals = [
    { icon: 'verified', label: 'Fresh & Hygienic' },
    { icon: 'assignment_return', label: 'Fresh Delivery' },
    { icon: 'autorenew', label: 'Quality Ingredients' },
    { icon: 'security', label: 'Made with Care' },
  ]

  return (
    <div className="flex justify-between items-center py-4 border-t border-outline-variant/30">
      {signals.map((signal) => (
        <div key={signal.icon} className="flex flex-col items-center gap-1 text-center">
          <span className="material-symbols-outlined text-2xl text-regal-gold">{signal.icon}</span>
          <span className="text-[10px] uppercase font-label-caps tracking-wide text-on-surface-variant whitespace-pre-line">
            {signal.label}
          </span>
        </div>
      ))}
    </div>
  )
}


