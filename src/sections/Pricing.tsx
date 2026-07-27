import { Section, SectionHeading, PrimaryLink } from '../components/ui'
import { Check, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Tier {
  name: string
  range: string
  price: string
  unit: string
  blurb: string
  featured?: boolean
  cta: string
  included: string[]
  excluded?: string[]
}

const tiers: Tier[] = [
  {
    name: 'Essentials',
    range: '1–5 seats',
    price: 'From $3,200',
    unit: 'per bundle',
    blurb: 'A complete, documented setup for a small team or a new office.',
    cta: 'Build a quote',
    included: [
      'Business-class laptop per seat',
      '24" FHD monitor and peripherals',
      'Windows 11 Pro imaging',
      'BitLocker encryption enabled',
      'Asset tagging and register',
      'Warranty registration',
      'Standard 48-hour ship target',
      'Email support',
    ],
    excluded: ['Dedicated account manager', 'On-site deployment'],
  },
  {
    name: 'Professional',
    range: '5–25 seats',
    price: 'From $2,800',
    unit: 'per seat',
    blurb: 'The full-stack office build for teams that are actively hiring.',
    featured: true,
    cta: 'Build a quote',
    included: [
      'Premium laptop per seat (i7 / 32GB class)',
      '27" QHD monitor and dock',
      'Windows 11 Pro imaging to your standard',
      'Intune / MDM enrolment and policy',
      'Microsoft 365 tenant configuration',
      'Asset tagging and register',
      'Warranty registration and claim handling',
      'Priority 24-hour ship target',
      'Named account manager, direct line',
    ],
  },
  {
    name: 'Enterprise & HaaS',
    range: '25+ seats',
    price: 'Custom',
    unit: 'quote or monthly',
    blurb: 'Bulk pricing, or predictable monthly spend with scheduled refreshes.',
    cta: 'Talk to us',
    included: [
      'Custom device specification',
      'Advanced MDM and compliance policy',
      'Full lifecycle asset management',
      'Hardware-as-a-Service option, no capital outlay',
      'Scheduled refresh cycles and disposal',
      'Networking and infrastructure build',
      'On-site deployment available',
      'SLA-backed warranty management',
      'Dedicated account team',
    ],
  },
]

export default function Pricing({ compact = false }: { compact?: boolean }) {
  return (
    <Section className="border-t border-ink-border" id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Transparent pricing, quoted line by line."
        subtitle="The figures below are realistic starting points, not the final number. Every formal quote itemises the exact hardware SKUs and the service fee separately, so you can see precisely what you are paying for."
      />

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-2xl border p-7 flex flex-col h-full transition-colors ${
              tier.featured
                ? 'border-gold/50 bg-ink-card shadow-[0_0_40px_rgba(212,168,67,0.07)]'
                : 'border-ink-border bg-ink-card hover:border-gold/25'
            }`}
          >
            {tier.featured && (
              <span className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-gold text-ink text-[0.65rem] font-bold tracking-wider uppercase">
                Most common
              </span>
            )}

            <p className="text-[0.7rem] uppercase tracking-[0.15em] text-white/35 mb-2">
              {tier.range}
            </p>
            <h3 className="font-serif text-2xl text-white mb-4">{tier.name}</h3>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-serif text-3xl font-bold text-gold">{tier.price}</span>
              <span className="text-xs text-white/40">{tier.unit}</span>
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-6 pb-6 border-b border-ink-border">
              {tier.blurb}
            </p>

            <ul className="space-y-3 mb-8 flex-1">
              {tier.included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/65">
                  <Check size={15} className="text-gold mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
              {tier.excluded?.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/25">
                  <Minus size={15} className="mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to={tier.name === 'Enterprise & HaaS' ? '/contact' : '/build'}
              className={`w-full text-center px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                tier.featured
                  ? 'bg-gold hover:bg-gold-light text-ink hover:shadow-[0_0_25px_rgba(212,168,67,0.4)]'
                  : 'border border-ink-subtle hover:border-gold/50 text-white/80 hover:text-white'
              }`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-ink-border bg-ink-card/50 p-6 sm:p-7">
        <h4 className="text-white font-medium text-sm mb-3">How to read these numbers</h4>
        <ul className="grid gap-2.5 sm:grid-cols-2 text-sm text-white/50">
          <li>All prices are in Canadian dollars and exclude applicable taxes.</li>
          <li>Hardware is quoted at cost with the service fee shown as a separate line.</li>
          <li>
            Specifications move with the market — the exact model is confirmed on your quote.
          </li>
          <li>Net-30 terms are available for approved accounts.</li>
        </ul>
      </div>

      {!compact && (
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <PrimaryLink to="/build">Build your quote</PrimaryLink>
          <p className="text-sm text-white/40">
            Prefer to talk it through?{' '}
            <Link to="/contact" className="text-gold hover:text-gold-light underline underline-offset-4">
              Book a short call
            </Link>
            .
          </p>
        </div>
      )}
    </Section>
  )
}
