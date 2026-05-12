import { useState } from 'react'
import { X, Check, ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react'

interface BuildMyBoxProps {
  onClose: () => void
}

interface Config {
  teamSize: string
  primaryDevice: string
  monitor: string
  phone: string
  accessories: string[]
  support: string
}

const teamSizes = [
  { id: '1-5', label: '1–5', sub: 'Small team' },
  { id: '5-25', label: '5–25', sub: 'Growing team' },
  { id: '25-100', label: '25–100', sub: 'Scale-up' },
  { id: '100+', label: '100+', sub: 'Enterprise' },
]

const devices = [
  { id: 'macbook-air', label: 'MacBook Air M3', sub: '13" · Apple Silicon', price: '+$1,299/seat', emoji: '💻' },
  { id: 'macbook-pro', label: 'MacBook Pro M4', sub: '14" · Apple Silicon', price: '+$1,999/seat', emoji: '💻' },
  { id: 'windows-laptop', label: 'Windows Laptop', sub: 'Dell / Lenovo / HP', price: '+$1,099/seat', emoji: '🖥️' },
  { id: 'mac-mini', label: 'Mac Mini M4', sub: 'Desktop setup', price: '+$699/seat', emoji: '🖥️' },
]

const monitors = [
  { id: 'none', label: 'No monitor', sub: 'Laptop only', price: '' },
  { id: 'single-27', label: 'Single 27" 4K', sub: 'LG UltraFine or Dell', price: '+$599/seat' },
  { id: 'dual-27', label: 'Dual 27" 4K', sub: 'Two 27" monitors', price: '+$1,099/seat' },
  { id: 'ultra', label: '34" Ultrawide', sub: 'LG UltraWide', price: '+$799/seat' },
]

const phones = [
  { id: 'none', label: 'No phone', sub: 'Skip this', price: '' },
  { id: 'iphone-16', label: 'iPhone 16', sub: '128GB · Black or White', price: '+$799/seat' },
  { id: 'iphone-16-pro', label: 'iPhone 16 Pro', sub: '256GB · Any finish', price: '+$1,099/seat' },
]

const accessoryOptions = [
  { id: 'magic-keyboard', label: 'Magic Keyboard', price: '+$99' },
  { id: 'airpods', label: 'AirPods Pro', price: '+$249' },
  { id: 'magic-mouse', label: 'Magic Mouse', price: '+$79' },
  { id: 'usb-hub', label: 'USB-C Hub', price: '+$59' },
  { id: 'webcam', label: 'Logitech C920 Webcam', price: '+$89' },
  { id: 'desk-mat', label: 'Leather Desk Mat', price: '+$49' },
]

const supportTiers = [
  {
    id: 'standard',
    label: 'Standard Setup',
    sub: 'Included with all plans',
    price: 'Included',
    features: ['MDM enrollment', 'App installation', 'Asset tagging', 'Warranty registration'],
  },
  {
    id: 'premium',
    label: 'Premium Setup',
    sub: 'Recommended for most teams',
    price: '+$199/seat',
    features: ['Everything in Standard', 'Security policy configuration', 'Dedicated account manager', 'Priority support'],
    popular: true,
  },
  {
    id: 'managed',
    label: 'Managed IT',
    sub: 'Full ongoing IT management',
    price: '+$49/seat/mo',
    features: ['Everything in Premium', 'Ongoing IT helpdesk', 'Device monitoring & alerts', 'Offboarding & recovery'],
  },
]

const STEPS = ['Team Size', 'Primary Device', 'Monitor', 'Phone', 'Accessories', 'Support', 'Summary']

function estimatePrice(config: Config, seatCount: number): number {
  let base = 0
  if (config.teamSize === '1-5') base = 3200
  else if (config.teamSize === '5-25') base = 2800 * seatCount
  else if (config.teamSize === '25-100') base = 2500 * seatCount
  else base = 2200 * seatCount

  const devicePrices: Record<string, number> = {
    'macbook-air': 1299 * seatCount,
    'macbook-pro': 1999 * seatCount,
    'windows-laptop': 1099 * seatCount,
    'mac-mini': 699 * seatCount,
  }
  const monitorPrices: Record<string, number> = {
    'single-27': 599 * seatCount,
    'dual-27': 1099 * seatCount,
    ultra: 799 * seatCount,
  }
  const phonePrices: Record<string, number> = {
    'iphone-16': 799 * seatCount,
    'iphone-16-pro': 1099 * seatCount,
  }
  const accessoryPrices: Record<string, number> = {
    'magic-keyboard': 99,
    airpods: 249,
    'magic-mouse': 79,
    'usb-hub': 59,
    webcam: 89,
    'desk-mat': 49,
  }
  const supportPrices: Record<string, number> = {
    premium: 199 * seatCount,
    managed: 49 * seatCount,
  }

  base += devicePrices[config.primaryDevice] || 0
  base += monitorPrices[config.monitor] || 0
  base += phonePrices[config.phone] || 0
  base += config.accessories.reduce((s, a) => s + (accessoryPrices[a] || 0), 0) * seatCount
  base += supportPrices[config.support] || 0

  return base
}

export default function BuildMyBox({ onClose }: BuildMyBoxProps) {
  const [step, setStep] = useState(0)
  const [config, setConfig] = useState<Config>({
    teamSize: '',
    primaryDevice: '',
    monitor: 'none',
    phone: 'none',
    accessories: [],
    support: 'standard',
  })

  const seatCount = config.teamSize === '1-5' ? 3 : config.teamSize === '5-25' ? 12 : config.teamSize === '25-100' ? 50 : 150

  const canAdvance = () => {
    if (step === 0) return !!config.teamSize
    if (step === 1) return !!config.primaryDevice
    return true
  }

  const toggleAccessory = (id: string) => {
    setConfig((c) => ({
      ...c,
      accessories: c.accessories.includes(id)
        ? c.accessories.filter((a) => a !== id)
        : [...c.accessories, id],
    }))
  }

  const formatPrice = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-ink-card border border-ink-border rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink-border flex-shrink-0">
          <div>
            <h2 className="font-serif text-xl text-white">Build My Box</h2>
            <p className="text-white/40 text-xs mt-0.5">
              Step {step + 1} of {STEPS.length} · {STEPS[step]}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-ink-subtle flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-ink-border flex-shrink-0">
          <div
            className="h-full bg-gold transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          {/* Step 0: Team size */}
          {step === 0 && (
            <div>
              <h3 className="font-semibold text-white mb-1">How big is your team?</h3>
              <p className="text-white/40 text-sm mb-6">This determines your pricing tier.</p>
              <div className="grid grid-cols-2 gap-3">
                {teamSizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setConfig((c) => ({ ...c, teamSize: s.id }))}
                    className={`p-5 rounded-2xl border text-left transition-all duration-150 ${
                      config.teamSize === s.id
                        ? 'border-gold bg-gold-muted'
                        : 'border-ink-border bg-ink hover:border-ink-subtle'
                    }`}
                  >
                    <p className="font-serif text-2xl font-bold text-white">{s.label}</p>
                    <p className="text-white/40 text-sm mt-1">{s.sub}</p>
                    {config.teamSize === s.id && (
                      <div className="mt-3 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                        <Check size={11} className="text-ink" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Primary device */}
          {step === 1 && (
            <div>
              <h3 className="font-semibold text-white mb-1">Choose your primary device</h3>
              <p className="text-white/40 text-sm mb-6">One device type per order. Mix can be arranged for Enterprise.</p>
              <div className="flex flex-col gap-3">
                {devices.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setConfig((c) => ({ ...c, primaryDevice: d.id }))}
                    className={`p-4 rounded-2xl border text-left transition-all duration-150 flex items-center gap-4 ${
                      config.primaryDevice === d.id
                        ? 'border-gold bg-gold-muted'
                        : 'border-ink-border bg-ink hover:border-ink-subtle'
                    }`}
                  >
                    <span className="text-2xl">{d.emoji}</span>
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{d.label}</p>
                      <p className="text-white/40 text-xs">{d.sub}</p>
                    </div>
                    <span className="text-gold text-sm font-medium">{d.price}</span>
                    {config.primaryDevice === d.id && (
                      <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-ink" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Monitor */}
          {step === 2 && (
            <div>
              <h3 className="font-semibold text-white mb-1">Add a monitor?</h3>
              <p className="text-white/40 text-sm mb-6">Optional — skip if your team uses laptops only.</p>
              <div className="flex flex-col gap-3">
                {monitors.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setConfig((c) => ({ ...c, monitor: m.id }))}
                    className={`p-4 rounded-2xl border text-left transition-all duration-150 flex items-center gap-4 ${
                      config.monitor === m.id
                        ? 'border-gold bg-gold-muted'
                        : 'border-ink-border bg-ink hover:border-ink-subtle'
                    }`}
                  >
                    <span className="text-2xl">{m.id === 'none' ? '–' : '🖥️'}</span>
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{m.label}</p>
                      <p className="text-white/40 text-xs">{m.sub}</p>
                    </div>
                    {m.price && <span className="text-gold text-sm font-medium">{m.price}</span>}
                    {config.monitor === m.id && (
                      <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-ink" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Phone */}
          {step === 3 && (
            <div>
              <h3 className="font-semibold text-white mb-1">Add a phone?</h3>
              <p className="text-white/40 text-sm mb-6">We'll enroll it into your MDM alongside the laptops.</p>
              <div className="flex flex-col gap-3">
                {phones.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setConfig((c) => ({ ...c, phone: p.id }))}
                    className={`p-4 rounded-2xl border text-left transition-all duration-150 flex items-center gap-4 ${
                      config.phone === p.id
                        ? 'border-gold bg-gold-muted'
                        : 'border-ink-border bg-ink hover:border-ink-subtle'
                    }`}
                  >
                    <span className="text-2xl">{p.id === 'none' ? '–' : '📱'}</span>
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{p.label}</p>
                      <p className="text-white/40 text-xs">{p.sub}</p>
                    </div>
                    {p.price && <span className="text-gold text-sm font-medium">{p.price}</span>}
                    {config.phone === p.id && (
                      <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-ink" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Accessories */}
          {step === 4 && (
            <div>
              <h3 className="font-semibold text-white mb-1">Any accessories?</h3>
              <p className="text-white/40 text-sm mb-6">Select all that apply. Prices are per seat.</p>
              <div className="grid grid-cols-2 gap-3">
                {accessoryOptions.map((a) => {
                  const selected = config.accessories.includes(a.id)
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAccessory(a.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-150 ${
                        selected
                          ? 'border-gold bg-gold-muted'
                          : 'border-ink-border bg-ink hover:border-ink-subtle'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <p className="font-medium text-white text-sm">{a.label}</p>
                        {selected && (
                          <div className="w-4 h-4 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                            <Check size={9} className="text-ink" />
                          </div>
                        )}
                      </div>
                      <p className="text-gold text-xs mt-1">{a.price}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 5: Support */}
          {step === 5 && (
            <div>
              <h3 className="font-semibold text-white mb-1">Choose your support level</h3>
              <p className="text-white/40 text-sm mb-6">You can upgrade at any time.</p>
              <div className="flex flex-col gap-3">
                {supportTiers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setConfig((c) => ({ ...c, support: t.id }))}
                    className={`p-5 rounded-2xl border text-left transition-all duration-150 relative ${
                      config.support === t.id
                        ? 'border-gold bg-gold-muted'
                        : 'border-ink-border bg-ink hover:border-ink-subtle'
                    }`}
                  >
                    {t.popular && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 bg-gold text-ink text-xs font-bold rounded-full">
                        Recommended
                      </span>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-white">{t.label}</p>
                      <span className="text-gold text-sm font-medium">{t.price}</span>
                    </div>
                    <p className="text-white/40 text-xs mb-3">{t.sub}</p>
                    <ul className="flex flex-col gap-1">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                          <ChevronRight size={11} className="text-gold/60 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {config.support === t.id && (
                      <div className="absolute top-3 left-3 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                        <Check size={11} className="text-ink" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Summary */}
          {step === 6 && (
            <div>
              <h3 className="font-semibold text-white mb-1">Your box summary</h3>
              <p className="text-white/40 text-sm mb-6">Review your configuration. Our team will confirm pricing within 2 hours.</p>

              {/* Price estimate */}
              <div className="bg-ink border border-gold/30 rounded-2xl p-6 mb-6">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Estimated total</p>
                <p className="font-serif text-4xl font-bold text-gold">
                  {formatPrice(estimatePrice(config, seatCount))}
                </p>
                <p className="text-white/30 text-xs mt-1">
                  Based on ~{seatCount} seats · Final quote after review
                </p>
              </div>

              {/* Config summary */}
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Team size', value: config.teamSize.replace('-', '–') + ' users' },
                  { label: 'Device', value: devices.find((d) => d.id === config.primaryDevice)?.label || '–' },
                  { label: 'Monitor', value: monitors.find((m) => m.id === config.monitor)?.label || '–' },
                  { label: 'Phone', value: phones.find((p) => p.id === config.phone)?.label || '–' },
                  {
                    label: 'Accessories',
                    value:
                      config.accessories.length === 0
                        ? 'None'
                        : config.accessories
                            .map((a) => accessoryOptions.find((o) => o.id === a)?.label)
                            .join(', '),
                  },
                  { label: 'Support', value: supportTiers.find((t) => t.id === config.support)?.label || '–' },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-start justify-between py-3 border-b border-ink-border last:border-0"
                  >
                    <span className="text-white/40 text-sm">{row.label}</span>
                    <span className="text-white text-sm text-right max-w-[55%]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-5 border-t border-ink-border flex-shrink-0 gap-3">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 px-5 py-2.5 border border-ink-subtle rounded-full text-white/50 hover:text-white hover:border-white/30 transition-all text-sm disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft size={14} /> Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance()}
              className="flex items-center gap-2 px-6 py-2.5 bg-gold hover:bg-gold-light text-ink font-semibold text-sm rounded-full transition-all disabled:opacity-40 disabled:pointer-events-none group"
            >
              Continue
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-2.5 bg-gold hover:bg-gold-light text-ink font-semibold text-sm rounded-full transition-all group"
            >
              Request Quote
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
