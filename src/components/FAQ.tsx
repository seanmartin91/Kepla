import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: "What's actually included in my box?",
    a: "Your box includes any devices you select (laptops, monitors, phones, accessories), all pre-configured and asset-tagged. The service fee covers MDM enrollment, app installation, security policy application, warranty registration, and asset tracking. Device costs are added separately at checkout.",
  },
  {
    q: 'How does MDM enrollment work?',
    a: 'We enroll every device into your preferred MDM platform (Jamf, Kandji, Mosyle, or Intune) before shipment. We apply your existing policies or help you set up a baseline configuration. Devices arrive already managed — your IT team just sees them appear in the dashboard.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Our target is 48 hours from order confirmation to shipment. Pro and Enterprise orders get priority processing and often ship same-day. Remote employee direct-ship is included on all tiers — we ship to wherever your team is.',
  },
  {
    q: 'What happens if a device breaks?',
    a: "We've already registered the warranty with the manufacturer on your behalf. On Pro and Enterprise plans, we also manage the claim process for you — we coordinate with Apple, Dell, or whoever it may be, so you don't have to.",
  },
  {
    q: 'Can I add or remove users later?',
    a: "Yes. You can order additional devices at any time through your account. For reductions, we offer a device recovery service — we'll send a prepaid, padded return box, wipe the device, update your asset register, and handle responsible recycling or resale.",
  },
  {
    q: 'Do you support Windows as well as Mac?',
    a: 'Absolutely. We support Apple (Mac, iPhone, iPad), Windows (Dell, Lenovo, HP), and mixed environments. Enterprise customers can get custom device specifications across any OEM.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-28 max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
        {/* Left */}
        <div>
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">
            FAQ
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-5">
            Common questions.
          </h2>
          <p className="text-white/45 leading-relaxed">
            Still have questions? Email us at{' '}
            <a href="mailto:hello@kepla.com" className="text-gold hover:text-gold-light transition-colors">
              hello@kepla.com
            </a>
          </p>
        </div>

        {/* Right: accordion */}
        <div className="flex flex-col divide-y divide-ink-border">
          {faqs.map((faq, i) => (
            <div key={i} className="py-5">
              <button
                className="w-full flex items-start justify-between gap-4 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className={`text-sm font-medium transition-colors ${
                    open === i ? 'text-white' : 'text-white/60 group-hover:text-white'
                  }`}
                >
                  {faq.q}
                </span>
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                    open === i
                      ? 'border-gold bg-gold-muted text-gold'
                      : 'border-ink-subtle text-white/30 group-hover:border-white/20'
                  }`}
                >
                  {open === i ? <Minus size={12} /> : <Plus size={12} />}
                </span>
              </button>

              {open === i && (
                <p className="mt-4 text-sm text-white/45 leading-relaxed pr-10">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
