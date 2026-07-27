import { Section, SectionHeading } from '../components/ui'
import { Check, Minus } from 'lucide-react'

const rows = [
  {
    dimension: 'Quote detail',
    others: 'A total, sometimes a category',
    kepla: 'Every SKU, cost and reason, itemised',
  },
  {
    dimension: 'Device on arrival',
    others: 'Factory image, brown box',
    kepla: 'Imaged, secured, enrolled, labelled',
  },
  {
    dimension: 'Who answers',
    others: 'Whoever is next in the queue',
    kepla: 'The person who quoted your first order',
  },
  {
    dimension: 'Asset records',
    others: 'Your responsibility',
    kepla: 'Serial-level register delivered with every order',
  },
  {
    dimension: 'Warranty claims',
    others: 'You call the manufacturer',
    kepla: 'Registered by us, claims handled by us',
  },
  {
    dimension: 'Refresh planning',
    others: 'Raised when something fails',
    kepla: 'Scheduled at the point of purchase',
  },
  {
    dimension: 'Minimum order',
    others: 'Often 10+ seats to be worth their time',
    kepla: 'One seat gets the same process',
  },
]

export default function Comparison() {
  return (
    <Section className="border-t border-ink-border">
      <SectionHeading
        eyebrow="The difference"
        title="Same hardware. A materially different service."
        subtitle="We are not claiming to beat every reseller on every line. We are claiming the work that usually lands on you is included here."
      />

      <div className="rounded-2xl border border-ink-border overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_1.2fr_1.4fr] bg-ink-card border-b border-ink-border">
          <div className="px-6 py-4 text-[0.7rem] uppercase tracking-[0.15em] text-white/35">
            What you are comparing
          </div>
          <div className="px-6 py-4 text-[0.7rem] uppercase tracking-[0.15em] text-white/35 border-t sm:border-t-0 sm:border-l border-ink-border">
            Typical reseller
          </div>
          <div className="px-6 py-4 text-[0.7rem] uppercase tracking-[0.15em] text-gold border-t sm:border-t-0 sm:border-l border-ink-border bg-gold-muted/40">
            Kepla
          </div>
        </div>

        {rows.map((row) => (
          <div
            key={row.dimension}
            className="grid grid-cols-1 sm:grid-cols-[1.1fr_1.2fr_1.4fr] border-b border-ink-border last:border-0 hover:bg-ink-card/50 transition-colors"
          >
            <div className="px-6 py-5 text-sm text-white/80 font-medium">{row.dimension}</div>
            <div className="px-6 py-5 text-sm text-white/40 flex items-start gap-2.5 sm:border-l border-ink-border">
              <Minus size={15} className="text-white/25 mt-0.5 shrink-0" />
              {row.others}
            </div>
            <div className="px-6 py-5 text-sm text-white/75 flex items-start gap-2.5 sm:border-l border-ink-border bg-gold-muted/10">
              <Check size={15} className="text-gold mt-0.5 shrink-0" />
              {row.kepla}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
