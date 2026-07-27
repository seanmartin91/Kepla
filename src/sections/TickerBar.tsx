const items = [
  'Line-by-line quoting',
  'Windows 11 Pro imaging',
  'Intune / MDM enrolment',
  'BitLocker encryption',
  'Asset tagging',
  'Warranty registration',
  'Serial-level asset register',
  'Microsoft 365 tenant setup',
  'Ubiquiti UniFi networking',
  'Refresh cycle planning',
  'Secure device disposal',
  'Direct account manager',
]

export default function TickerBar() {
  return (
    <div className="border-y border-ink-border bg-ink-card/40 py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-ticker">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-4 px-6 text-sm text-white/40"
              >
                {item}
                <span className="w-1 h-1 rounded-full bg-gold/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
