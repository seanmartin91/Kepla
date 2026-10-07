import { useEffect, useMemo, useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { Field, inputClass } from '../components/ui'
import { setMeta } from '../lib/meta'
import { submitLead } from '../lib/leads'
import { Crisp } from 'crisp-sdk-web'

/* ------------------------------------------------------------------ */
/* Catalogue                                                           */
/* ------------------------------------------------------------------ */

interface Option {
  id: string
  label: string
  sub: string
  price: number
}

const laptops: Option[] = [
  {
    id: 'essential',
    label: 'Essential laptop',
    sub: 'Dell Pro 14 (7HG73) — Ryzen 5 Pro 230, 16GB, 512GB SSD, 14" FHD+',
    price: 2209,
  },
  {
    id: 'professional',
    label: 'Professional laptop',
    sub: 'HP EliteBook 8 G2i 14 (D81W3UT#ABA) — Core Ultra 7 355, 32GB, 512GB SSD, 14" WUXGA',
    price: 3619,
  },
  {
    id: 'performance',
    label: 'Performance workstation',
    sub: 'HP ZBook 8 G1i 14 (BX7T2UT#ABA) — Core Ultra 7 255H, 32GB, 1TB SSD, RTX 500 Ada, 14" WUXGA',
    price: 4289,
  },
  {
    id: 'desktop',
    label: 'Desktop micro PC',
    sub: 'HP ProDesk 4 Mini G1i (BS7M0UT#ABA) — Core Ultra 5 235T, 16GB, 512GB SSD',
    price: 1949,
  },
]

const monitors: Option[] = [
  { id: 'none', label: 'No monitor', sub: 'Laptop screen only', price: 0 },
  { id: 'single-24', label: 'Single 24" FHD', sub: 'Standard office display', price: 249 },
  { id: 'single-27', label: 'Single 27" QHD', sub: 'Recommended for most roles', price: 429 },
  { id: 'dual-27', label: 'Dual 27" QHD', sub: 'Finance, design, operations', price: 858 },
]

const accessories: Option[] = [
  { id: 'dock', label: 'USB-C docking station', sub: 'Single-cable desk setup', price: 229 },
  { id: 'keyboard-mouse', label: 'Keyboard & mouse', sub: 'Wireless business set', price: 79 },
  { id: 'headset', label: 'Noise-cancelling headset', sub: 'Certified for Teams', price: 119 },
  { id: 'webcam', label: '1080p webcam', sub: 'For desktop users', price: 99 },
]

const perSeatServices: Option[] = [
  {
    id: 'imaging',
    label: 'Imaging & configuration',
    sub: 'Windows 11 Pro, your apps, BitLocker, asset tag',
    price: 149,
  },
  {
    id: 'mdm',
    label: 'Intune / MDM enrolment',
    sub: 'Policy applied at build time',
    price: 89,
  },
  {
    id: 'm365',
    label: 'Microsoft 365 setup',
    sub: 'Tenant, mailbox and licence configuration',
    price: 59,
  },
]

const projectServices: Option[] = [
  {
    id: 'networking',
    label: 'Networking & infrastructure',
    sub: 'Ubiquiti UniFi build, VLANs, firewall',
    price: 1200,
  },
  {
    id: 'onsite',
    label: 'On-site deployment',
    sub: 'Desk-level setup and user walkthrough',
    price: 600,
  },
  {
    id: 'disposal',
    label: 'Old device wipe & disposal',
    sub: 'Certified data destruction',
    price: 350,
  },
]

const steps = ['Team', 'Devices', 'Services', 'Your details'] as const

const cad = (n: number) =>
  n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })

/* ------------------------------------------------------------------ */

export default function Build() {
  const [step, setStep] = useState(0)
  const [seats, setSeats] = useState(8)
  const [laptop, setLaptop] = useState('professional')
  const [monitor, setMonitor] = useState('single-27')
  const [acc, setAcc] = useState<string[]>(['dock'])
  const [seatSvc, setSeatSvc] = useState<string[]>(['imaging', 'mdm'])
  const [projSvc, setProjSvc] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMeta(
      'Build a Quote — Kepla',
      'Configure your hardware requirement in about two minutes and get a live estimate. A formal, itemised quote follows within 24 hours.',
    )
  }, [])

  const { perSeat, projectTotal, total } = useMemo(() => {
    const find = (list: Option[], id: string) => list.find((o) => o.id === id)?.price ?? 0
    const sum = (list: Option[], ids: string[]) =>
      list.filter((o) => ids.includes(o.id)).reduce((t, o) => t + o.price, 0)

    const per =
      find(laptops, laptop) +
      find(monitors, monitor) +
      sum(accessories, acc) +
      sum(perSeatServices, seatSvc)
    const project = sum(projectServices, projSvc)
    return { perSeat: per, projectTotal: project, total: per * seats + project }
  }, [seats, laptop, monitor, acc, seatSvc, projSvc])

  const toggle = (list: string[], set: (v: string[]) => void, id: string) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id])

  const configurationSummary = () => {
    const name = (list: Option[], id: string) => list.find((o) => o.id === id)?.label ?? id
    const names = (list: Option[], ids: string[]) =>
      list.filter((o) => ids.includes(o.id)).map((o) => o.label).join(', ') || 'None'
    return [
      `Seats: ${seats}`,
      `Device: ${name(laptops, laptop)}`,
      `Monitor: ${name(monitors, monitor)}`,
      `Accessories: ${names(accessories, acc)}`,
      `Per-seat services: ${names(perSeatServices, seatSvc)}`,
      `Project services: ${names(projectServices, projSvc)}`,
      `Per-seat subtotal: ${cad(perSeat)}`,
      `Project costs: ${cad(projectTotal)}`,
      `Estimated total: ${cad(total)}`,
    ].join('\n')
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)

    const form = new FormData(e.currentTarget)
    if (form.get('bot-field')) {
      setStatus('sent')
      return
    }

    const result = await submitLead({
      source: 'quote-builder',
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      company: String(form.get('company') || ''),
      phone: String(form.get('phone') || ''),
      teamSize: String(seats),
      message: String(form.get('message') || ''),
      configuration: configurationSummary(),
      estimateCad: total,
    })

    if (result.error) {
      setError(result.error)
      setStatus('error')
    } else {
      setStatus('sent')
    }
  }

  /* ---------------------------------------------------------------- */

  if (status === 'sent') {
    return (
      <div className="pt-36 pb-24 px-6">
        <div className="max-w-xl mx-auto text-center bg-ink-card border border-ink-border rounded-2xl p-10 sm:p-14">
          <CheckCircle2 size={48} className="text-gold mx-auto mb-6" strokeWidth={1.5} />
          <h1 className="font-serif text-3xl text-white mb-4">Your configuration is with us.</h1>
          <p className="text-white/55 leading-relaxed mb-8">
            We will come back within 24 hours with a formal, itemised quote — exact SKUs, unit
            costs, service fee and a realistic delivery date. If anything in your configuration
            looks wrong for what you actually need, we will say so.
          </p>
          <div className="rounded-xl border border-gold/25 bg-gold-muted/15 p-5 mb-8">
            <p className="text-[0.7rem] uppercase tracking-[0.15em] text-gold mb-2">
              Your estimate
            </p>
            <p className="font-serif text-3xl text-white">{cad(total)}</p>
            <p className="text-xs text-white/40 mt-2">
              {seats} seats · indicative only, before tax
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Build a quote
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-white mb-3">
            Configure your requirement.
          </h1>
          <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
            This gives you an indicative estimate in about two minutes. It is deliberately a
            starting point — the formal quote that follows is itemised by SKU and priced against
            live distribution stock.
          </p>
          <p className="mt-3 text-sm text-white/50">
            Not sure what to pick?{' '}
            <button
              type="button"
              onClick={() => Crisp.chat.open()}
              className="text-gold hover:text-gold-light underline underline-offset-4"
            >
              Chat with us
            </button>
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 sm:gap-4 mb-10 overflow-x-auto pb-1">
          {steps.map((label, i) => (
            <button
              key={label}
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              className={`flex items-center gap-2.5 shrink-0 text-sm transition-colors ${
                i > step ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                  i < step
                    ? 'bg-gold border-gold text-ink'
                    : i === step
                      ? 'border-gold text-gold'
                      : 'border-ink-subtle text-white/25'
                }`}
              >
                {i < step ? <Check size={13} /> : i + 1}
              </span>
              <span className={i <= step ? 'text-white/80' : 'text-white/25'}>{label}</span>
              {i < steps.length - 1 && <span className="w-4 sm:w-8 h-px bg-ink-subtle ml-1" />}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
          {/* Main panel */}
          <div className="bg-ink-card border border-ink-border rounded-2xl p-6 sm:p-8">
            {step === 0 && (
              <div>
                <h2 className="font-serif text-2xl text-white mb-2">How many people?</h2>
                <p className="text-white/45 text-sm mb-8">
                  Count everyone who needs a device. You can adjust this before the formal quote.
                </p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-3 mb-5">
                    <span className="font-serif text-5xl font-bold text-gold">{seats}</span>
                    <span className="text-white/45 text-sm">
                      {seats === 1 ? 'person' : 'people'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={150}
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                    className="w-full accent-gold cursor-pointer"
                    aria-label="Number of seats"
                  />
                  <div className="flex justify-between text-xs text-white/25 mt-2">
                    <span>1</span>
                    <span>150+</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[3, 10, 25, 60].map((n) => (
                    <button
                      key={n}
                      onClick={() => setSeats(n)}
                      className={`py-3 rounded-xl border text-sm transition-colors ${
                        seats === n
                          ? 'border-gold bg-gold-muted text-white'
                          : 'border-ink-subtle text-white/50 hover:border-white/30'
                      }`}
                    >
                      {n} people
                    </button>
                  ))}
                </div>

                <p className="text-xs text-white/30 mt-6 leading-relaxed">
                  Over 150 seats, or need mixed specifications across departments?{' '}
                  <Link to="/contact" className="text-gold underline underline-offset-4">
                    Talk to us directly
                  </Link>{' '}
                  — bulk pricing works differently.
                </p>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-9">
                <div>
                  <h2 className="font-serif text-2xl text-white mb-2">Choose a device standard</h2>
                  <p className="text-white/45 text-sm mb-6">
                    Per seat. Exact model is confirmed on your formal quote against current stock.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {laptops.map((o) => (
                      <OptionCard
                        key={o.id}
                        option={o}
                        selected={laptop === o.id}
                        onClick={() => setLaptop(o.id)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-4">Monitors</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {monitors.map((o) => (
                      <OptionCard
                        key={o.id}
                        option={o}
                        selected={monitor === o.id}
                        onClick={() => setMonitor(o.id)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-4">Accessories</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {accessories.map((o) => (
                      <OptionCard
                        key={o.id}
                        option={o}
                        selected={acc.includes(o.id)}
                        multi
                        onClick={() => toggle(acc, setAcc, o.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-9">
                <div>
                  <h2 className="font-serif text-2xl text-white mb-2">Configuration services</h2>
                  <p className="text-white/45 text-sm mb-6">
                    Charged per seat. This is the work that otherwise lands on someone in your team.
                  </p>
                  <div className="space-y-3">
                    {perSeatServices.map((o) => (
                      <OptionCard
                        key={o.id}
                        option={o}
                        selected={seatSvc.includes(o.id)}
                        multi
                        wide
                        onClick={() => toggle(seatSvc, setSeatSvc, o.id)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Project services</h3>
                  <p className="text-white/45 text-sm mb-5">
                    One-off costs for the whole order rather than per seat.
                  </p>
                  <div className="space-y-3">
                    {projectServices.map((o) => (
                      <OptionCard
                        key={o.id}
                        option={o}
                        selected={projSvc.includes(o.id)}
                        multi
                        wide
                        onClick={() => toggle(projSvc, setProjSvc, o.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="font-serif text-2xl text-white mb-2">Where should we send it?</h2>
                  <p className="text-white/45 text-sm mb-2">
                    We will come back within 24 hours with an itemised quote. No sales sequence, no
                    newsletter.
                  </p>
                </div>

                <div className="hidden">
                  <label>
                    Do not fill this in
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Your name" required>
                    <input name="name" required autoComplete="name" className={inputClass} />
                  </Field>
                  <Field label="Company" required>
                    <input
                      name="company"
                      required
                      autoComplete="organization"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Work email" required>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Phone" hint="Optional">
                    <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
                  </Field>
                </div>

                <Field
                  label="Anything else we should know?"
                  hint="Timing, existing provider, compliance requirements, specific applications."
                >
                  <textarea name="message" rows={4} className={`${inputClass} resize-y`} />
                </Field>

                {status === 'error' && error && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                    <AlertCircle size={17} className="text-red-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-red-200/90 leading-relaxed">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-7 py-3.5 bg-gold hover:bg-gold-light disabled:opacity-60 text-ink font-semibold rounded-full transition-all"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send my configuration
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="text-xs text-white/30 text-center leading-relaxed">
                  Your details are used only to prepare and send this quote.
                </p>
              </form>
            )}

            {/* Navigation */}
            {step < 3 && (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-ink-border">
                <button
                  onClick={() => (step === 0 ? null : setStep(step - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft size={15} />
                  Back
                </button>
                <button
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-light text-ink font-semibold text-sm rounded-full transition-all"
                >
                  Continue
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Estimate sidebar */}
          <aside className="lg:sticky lg:top-24 bg-ink-card border border-gold/25 rounded-2xl p-6 sm:p-7">
            <p className="text-[0.7rem] uppercase tracking-[0.15em] text-gold mb-4">
              Live estimate
            </p>

            <div className="mb-6">
              <p className="font-serif text-4xl font-bold text-white leading-none mb-2">
                {cad(total)}
              </p>
              <p className="text-xs text-white/40">
                {seats} {seats === 1 ? 'seat' : 'seats'} · before tax
              </p>
            </div>

            <div className="space-y-2.5 text-sm border-t border-ink-border pt-5 mb-5">
              <Row label="Per seat" value={cad(perSeat)} />
              <Row label={`× ${seats} seats`} value={cad(perSeat * seats)} />
              {projectTotal > 0 && <Row label="Project services" value={cad(projectTotal)} />}
            </div>

            <div className="rounded-xl bg-ink border border-ink-border p-4 mb-5">
              <p className="text-xs text-white/45 leading-relaxed">
                This is an indicative estimate built from typical distribution pricing. Your formal
                quote will list exact SKUs and may come in above or below this figure depending on
                stock and specification.
              </p>
            </div>

            {step < 3 ? (
              <button
                onClick={() => setStep(3)}
                className="w-full px-6 py-3 bg-gold hover:bg-gold-light text-ink font-semibold text-sm rounded-full transition-all"
              >
                Skip to details
              </button>
            ) : (
              <p className="text-xs text-white/30 text-center">
                Complete the form to receive your itemised quote.
              </p>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/45">{label}</span>
      <span className="text-white/80">{value}</span>
    </div>
  )
}

function OptionCard({
  option,
  selected,
  onClick,
  multi = false,
  wide = false,
}: {
  option: Option
  selected: boolean
  onClick: () => void
  multi?: boolean
  wide?: boolean
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-pressed={selected}
      className={`text-left rounded-xl border p-4 transition-all ${
        wide ? 'flex items-center justify-between gap-4 w-full' : ''
      } ${
        selected
          ? 'border-gold bg-gold-muted/40'
          : 'border-ink-subtle hover:border-white/30 hover:bg-ink-hover'
      }`}
    >
      <div className={wide ? 'flex items-center gap-3.5' : ''}>
        <span
          className={`shrink-0 w-4 h-4 border flex items-center justify-center mt-0.5 ${
            multi ? 'rounded' : 'rounded-full'
          } ${selected ? 'bg-gold border-gold' : 'border-ink-subtle'} ${wide ? '' : 'hidden'}`}
        >
          {selected && <Check size={11} className="text-ink" strokeWidth={3} />}
        </span>
        <div>
          <p className="text-sm font-medium text-white leading-tight">{option.label}</p>
          <p className="text-xs text-white/40 mt-1">{option.sub}</p>
        </div>
      </div>
      <p className={`text-sm text-gold font-medium ${wide ? 'shrink-0' : 'mt-3'}`}>
        {option.price === 0 ? 'Included' : `+${cad(option.price)}`}
      </p>
    </button>
  )
}
