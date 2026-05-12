import { Check, Minus, ArrowRight } from 'lucide-react'

interface PricingProps {
  onBuildClick: () => void
}

const tiers = [
  {
    name: 'Starter',
    seats: '1–5 users',
    price: '$3,200',
    unit: 'flat rate',
    description: 'Perfect for small teams getting started.',
    cta: 'Get Started',
    popular: false,
    features: [
      { text: 'Up to 5 devices', included: true },
      { text: 'MacBook Air M3 or equivalent PC', included: true },
      { text: 'Zero-touch MDM enrollment', included: true },
      { text: 'Asset tagging & tracking', included: true },
      { text: 'Warranty registration', included: true },
      { text: 'Standard 48-hr shipping', included: true },
      { text: 'Email support', included: true },
      { text: 'Monitor & accessories', included: false },
      { text: 'Dedicated account manager', included: false },
      { text: 'iPhone add-on', included: false },
    ],
  },
  {
    name: 'Pro',
    seats: '5–25 users',
    price: '$2,800',
    unit: 'per seat',
    description: 'The most popular choice for growing teams.',
    cta: 'Build My Box',
    popular: true,
    features: [
      { text: '5–25 devices', included: true },
      { text: 'MacBook Pro M4 or equivalent PC', included: true },
      { text: 'Zero-touch MDM + security policies', included: true },
      { text: 'Asset tagging & tracking', included: true },
      { text: 'Warranty registration & management', included: true },
      { text: 'Priority 24-hr shipping', included: true },
      { text: 'Phone + email support', included: true },
      { text: 'Monitor & accessories', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'iPhone add-on available', included: true },
    ],
  },
  {
    name: 'Enterprise',
    seats: '25+ users',
    price: 'Custom',
    unit: 'quote',
    description: 'Tailored solutions for large organisations.',
    cta: 'Contact Us',
    popular: false,
    features: [
      { text: 'Unlimited devices', included: true },
      { text: 'Custom device specifications', included: true },
      { text: 'Advanced MDM + compliance policies', included: true },
      { text: 'Full asset lifecycle management', included: true },
      { text: 'SLA-backed warranty management', included: true },
      { text: 'On-site setup available', included: true },
      { text: '24/7 priority support', included: true },
      { text: 'Custom app configuration', included: true },
      { text: 'Dedicated account team', included: true },
      { text: 'Bulk pricing', included: true },
    ],
  },
]

export default function Pricing({ onBuildClick }: PricingProps) {
  return (
    <section id="pricing" className="py-28 max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="max-w-2xl mb-16">
        <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">
          Pricing
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-white mb-5">
          Simple, transparent{' '}
          <span className="text-white/30">pricing.</span>
        </h2>
        <p className="text-white/50 text-lg leading-relaxed">
          No hidden fees. No surprise IT bills. One order covers everything from device to desk.
        </p>
      </div>

      {/* Cards */}
      <div className="grid lg:grid-cols-3 gap-5">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-2xl border flex flex-col transition-all duration-200 ${
              tier.popular
                ? 'border-gold bg-ink-card shadow-[0_0_40px_rgba(212,168,67,0.12)]'
                : 'border-ink-border bg-ink-card hover:border-ink-subtle'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-gold text-ink text-xs font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              </div>
            )}

            <div className="p-8 flex flex-col flex-1">
              {/* Tier header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-serif text-2xl text-white">{tier.name}</h3>
                  {tier.popular && (
                    <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                      <Check size={12} className="text-ink" />
                    </div>
                  )}
                </div>
                <p className="text-white/40 text-sm mb-6">{tier.seats}</p>

                <div className="flex items-end gap-2">
                  <span className={`font-serif text-4xl font-bold ${tier.popular ? 'text-gold' : 'text-white'}`}>
                    {tier.price}
                  </span>
                  <span className="text-white/40 text-sm pb-1">/ {tier.unit}</span>
                </div>
                <p className="text-white/40 text-sm mt-2">{tier.description}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-ink-border mb-6" />

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check size={15} className="text-gold mt-0.5 flex-shrink-0" />
                    ) : (
                      <Minus size={15} className="text-white/20 mt-0.5 flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? 'text-white/70' : 'text-white/25 line-through'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={onBuildClick}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 group ${
                  tier.popular
                    ? 'bg-gold hover:bg-gold-light text-ink hover:shadow-[0_0_20px_rgba(212,168,67,0.4)]'
                    : 'border border-ink-subtle hover:border-white/30 text-white/60 hover:text-white'
                }`}
              >
                {tier.cta}
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-white/30 text-sm mt-8">
        All prices exclude devices. Device cost added to your quote at checkout.{' '}
        <span className="text-white/50 hover:text-white cursor-pointer transition-colors">
          See full pricing breakdown →
        </span>
      </p>
    </section>
  )
}
