export default function TrustSignals() {
  const signals = [
    { icon: 'verified', label: 'Quality Assured' },
    { icon: 'assignment_return', label: '15 Day Returns' },
    { icon: 'autorenew', label: 'Lifetime Exchange' },
    { icon: 'security', label: '1 Yr Warranty' },
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

