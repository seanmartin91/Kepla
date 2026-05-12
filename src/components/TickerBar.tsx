const items = [
  'Pre-configured on arrival',
  '48-hour ship target',
  'Asset tagged & tracked',
  'Warranty registered',
  'MDM enrolled',
  'Apps pre-installed',
  'Zero-touch deployment',
  'No IT degree required',
  'Same-day processing',
  'White-glove packaging',
]

export default function TickerBar() {
  const doubled = [...items, ...items]

  return (
    <div className="border-y border-ink-border bg-ink-card overflow-hidden py-3.5">
      <div className="flex animate-ticker whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6 text-sm text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60 flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
