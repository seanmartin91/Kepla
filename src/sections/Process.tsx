import { Section, SectionHeading } from '../components/ui'

const steps = [
  {
    n: '01',
    title: 'Tell us what you need',
    body: 'Use the quote builder or send your requirements in an email. Team size, roles, whether people are in an office or remote, and anything you already run.',
    detail: 'Two minutes. No account, no sales call required to get a number.',
  },
  {
    n: '02',
    title: 'You get an itemised quote',
    body: 'A formal quote within 24 hours with exact SKUs, unit costs, service fees and delivery timing. Line by line, so you can compare it against anything else on your desk.',
    detail: 'Net-30 available for approved accounts. Card and HaaS also available.',
  },
  {
    n: '03',
    title: 'We build and document',
    body: 'Devices imaged to your standard, encrypted, MDM enrolled, applications installed, asset tagged and recorded. Networking pre-configured where included.',
    detail: '48-hour config-to-ship target once hardware is in hand.',
  },
  {
    n: '04',
    title: 'It arrives ready to use',
    body: 'Individually labelled per recipient, delivered to your office or direct to remote staff. Your asset register arrives with the shipment.',
    detail: 'On-site deployment and user walkthrough available as an add-on.',
  },
  {
    n: '05',
    title: 'We stay accountable',
    body: 'Warranty claims handled by us. Refresh dates already in the calendar. Same contact for your tenth order as your first.',
    detail: 'Client portal gives you live visibility of assets, warranties and orders.',
  },
]

export default function Process() {
  return (
    <Section className="border-t border-ink-border">
      <SectionHeading
        eyebrow="The process"
        title="Five steps, and only one of them is yours."
        subtitle="From first enquiry to a documented, working device estate."
      />

      <div className="relative">
        <div className="absolute left-[1.6rem] top-4 bottom-4 w-px bg-gradient-to-b from-gold/40 via-ink-subtle to-transparent hidden sm:block" />
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.n} className="relative flex gap-6 group">
              <div className="hidden sm:flex shrink-0 w-[3.25rem] h-[3.25rem] rounded-full bg-ink-card border border-ink-border group-hover:border-gold/50 items-center justify-center transition-colors z-10">
                <span className="font-serif text-sm font-bold text-gold">{step.n}</span>
              </div>
              <div className="flex-1 bg-ink-card border border-ink-border rounded-2xl p-6 sm:p-7 transition-colors group-hover:border-gold/25">
                <div className="flex items-baseline gap-3 mb-2.5">
                  <span className="sm:hidden font-serif text-sm font-bold text-gold">{step.n}</span>
                  <h3 className="text-white font-medium text-lg">{step.title}</h3>
                </div>
                <p className="text-white/55 text-sm leading-relaxed mb-3">{step.body}</p>
                <p className="text-white/35 text-xs border-l-2 border-gold/30 pl-3">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
