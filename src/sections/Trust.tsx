import { Section, SectionHeading, Card, PrimaryLink } from '../components/ui'
import { FileSearch, PackageCheck, PhoneCall, ScrollText } from 'lucide-react'

const brands = ['Dell', 'Lenovo', 'HP', 'Microsoft', 'Ubiquiti', 'Logitech', 'Kensington']

const guarantees = [
  {
    icon: FileSearch,
    title: 'Benchmark us before you commit',
    body: 'Send your most recent hardware invoice. We will quote the same specification line by line so you can see the difference in writing, at no cost and with no obligation.',
  },
  {
    icon: PackageCheck,
    title: 'Start with one order',
    body: 'No contract, no minimum seat count and no lock-in. Run a single order through the process and judge it on what arrives.',
  },
  {
    icon: PhoneCall,
    title: 'Speak to the owner, not a queue',
    body: 'You get a direct number and a direct email from the first conversation. The person who quotes your first order handles your tenth.',
  },
  {
    icon: ScrollText,
    title: 'Documentation you can audit',
    body: 'Every order ships with a serial-level asset register: make, model, specification, assigned user, purchase date and warranty expiry.',
  },
]

export default function Trust() {
  return (
    <Section className="border-t border-ink-border">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20 items-start">
        <div>
          <SectionHeading
            eyebrow="Why trust us"
            title="A new company, run by someone who has done this for years."
            subtitle="Kepla is deliberately young. Rather than point at a testimonial wall, here is how we would prefer to earn the work."
          />

          <div className="rounded-2xl border border-gold/25 bg-gold-muted/20 p-7">
            <p className="text-white/70 text-sm leading-relaxed italic mb-5">
              "After years as an account manager at a managed service provider, I kept seeing the
              same thing. Clients paying well over the odds, waiting weeks for gear that turned up
              unconfigured, then calling a ticket queue to speak to someone who had never seen their
              environment. I built the thing I always wished I could sell them."
            </p>
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-serif text-sm font-bold">
                K
              </span>
              <div>
                <p className="text-white text-sm font-medium">Founder</p>
                <p className="text-white/40 text-xs">Kepla Technologies Ltd.</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[0.7rem] uppercase tracking-[0.15em] text-white/30 mb-4">
              Brands we supply
            </p>
            <div className="flex flex-wrap gap-2.5">
              {brands.map((b) => (
                <span
                  key={b}
                  className="text-sm text-white/50 border border-ink-border bg-ink-card rounded-lg px-3.5 py-2"
                >
                  {b}
                </span>
              ))}
            </div>
            <p className="text-xs text-white/30 mt-4 leading-relaxed">
              Sourced through Canadian distribution. We are vendor-neutral and will recommend
              against a brand where it does not fit the requirement.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {guarantees.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="p-6">
              <Icon size={22} className="text-gold mb-4" strokeWidth={1.5} />
              <h3 className="text-white font-medium mb-2.5 text-[0.95rem] leading-snug">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{body}</p>
            </Card>
          ))}
          <div className="sm:col-span-2 mt-2">
            <PrimaryLink to="/contact">Send us an invoice to benchmark</PrimaryLink>
          </div>
        </div>
      </div>
    </Section>
  )
}
