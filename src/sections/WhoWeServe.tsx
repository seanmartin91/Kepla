import { Section, SectionHeading, Card } from '../components/ui'
import { PrimaryLink } from '../components/ui'

const segments = [
  {
    title: 'Growing companies without IT staff',
    range: '5–50 staff',
    body: 'You have outgrown buying laptops from a retail site, but you cannot justify a full-time IT hire. We are the procurement function you do not have.',
    signals: ['Hiring steadily', 'No dedicated IT', 'Mixed device estate'],
  },
  {
    title: 'Professional services firms',
    range: 'Law, accounting, engineering',
    body: 'Regulated data, audit expectations and partners who need machines that simply work. Our asset register and encryption baseline are built for exactly this.',
    signals: ['Compliance pressure', 'Audit trail needed', 'Client confidentiality'],
  },
  {
    title: 'Multi-site and field operations',
    range: 'Trades, clinics, manufacturing',
    body: 'Devices going to several locations or straight to people in the field, each labelled per recipient with networking configured before it leaves us.',
    signals: ['Several locations', 'Remote deployment', 'On-site networking'],
  },
  {
    title: 'Businesses replacing an incumbent',
    range: 'Any size',
    body: 'Already with a VAR or MSP and unhappy with the pricing, the pace or the person answering the phone. We will quote against your last invoice, line by line.',
    signals: ['Renewal approaching', 'Price concerns', 'Slow response'],
  },
]

export default function WhoWeServe() {
  return (
    <Section className="border-t border-ink-border">
      <SectionHeading
        eyebrow="Who we work with"
        title="Built for businesses where IT is someone's second job."
        subtitle="If procurement currently falls to an office manager, a finance lead or a founder, this is the situation we designed the service around."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {segments.map((seg) => (
          <Card key={seg.title} className="p-7 flex flex-col">
            <p className="text-[0.7rem] uppercase tracking-[0.15em] text-gold/80 mb-3">
              {seg.range}
            </p>
            <h3 className="text-white font-medium text-lg mb-3 leading-snug">{seg.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">{seg.body}</p>
            <div className="flex flex-wrap gap-2">
              {seg.signals.map((s) => (
                <span
                  key={s}
                  className="text-[0.7rem] text-white/45 border border-ink-subtle rounded-full px-2.5 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <PrimaryLink to="/build">Get a quote for your team</PrimaryLink>
        <p className="text-sm text-white/40">
          Not sure which applies? Send your last hardware invoice and we will benchmark it.
        </p>
      </div>
    </Section>
  )
}
