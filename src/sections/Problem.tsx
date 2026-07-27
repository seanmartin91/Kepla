import { Section, SectionHeading, Card } from '../components/ui'
import { Clock, Receipt, HelpCircle, FileWarning } from 'lucide-react'

const problems = [
  {
    icon: Clock,
    title: 'Gear arrives weeks late, and unconfigured',
    body: 'Devices land in brown boxes with a factory image. Someone on your team loses two days per machine setting up Windows, joining the domain and installing software.',
  },
  {
    icon: Receipt,
    title: 'You cannot tell whether the price is fair',
    body: 'A single line item and a total. No SKUs, no breakdown, no way to compare. Most businesses we speak to are paying noticeably over distributor pricing without knowing it.',
  },
  {
    icon: HelpCircle,
    title: 'Support means a ticket queue',
    body: 'You explain your environment from scratch to whoever picks up. The person who sold you the hardware is not the person who answers when it fails.',
  },
  {
    icon: FileWarning,
    title: 'Nobody knows what you own',
    body: 'No serial list, no warranty dates, no assignment record. Then an audit lands, or someone leaves with a laptop, and reconstructing it takes weeks.',
  },
]

export default function Problem() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why businesses switch"
        title="IT procurement is broken in four predictable ways."
        subtitle="These are the complaints we heard over and over from the inside of a managed service provider. Kepla exists to remove all four."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {problems.map(({ icon: Icon, title, body }) => (
          <Card key={title} className="p-7">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-gold-muted border border-gold/20 flex items-center justify-center">
                <Icon size={18} className="text-gold" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-white font-medium mb-2 leading-snug">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
