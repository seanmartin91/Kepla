import { useEffect } from 'react'
import { PageHero, Section, SectionHeading, Card, PrimaryLink, SecondaryLink } from '../components/ui'
import CTABanner from '../sections/CTABanner'
import { setMeta } from '../lib/meta'

const values = [
  {
    title: 'Radical transparency',
    body: 'Every quote is line by line. You see the hardware cost, the service fee, and the reasoning behind each recommendation. No mystery markup, and no bundling designed to hide a number.',
  },
  {
    title: 'Speed as a feature',
    body: 'A 24-hour quote turnaround and a 48-hour config-to-ship target. These are the targets we build the business around, and we tell you the realistic date before you approve, not after.',
  },
  {
    title: 'One person, always',
    body: 'A direct number and a direct email. Not a queue, not a shared inbox, not a bot. The person who quotes your first order is the person who handles your tenth.',
  },
  {
    title: 'Documentation by default',
    body: 'Every order ships with a full asset register: serials, specifications, warranties, assigned users and refresh dates. If your auditor asks, the answer is already written down.',
  },
  {
    title: 'Long-term thinking',
    body: 'We plan refresh cycles at the point of purchase rather than when devices start failing. Nobody should be surprised by end-of-life on a fleet they bought from us.',
  },
  {
    title: 'Built for any size',
    body: 'A two-person startup and a three-hundred-seat business get the same process and the same attention. We do not tier how seriously we take you by order value.',
  },
]

const team = [
  {
    role: 'Account management',
    title: 'Founder & procurement lead',
    body: 'Years inside the managed service provider and value-added reseller world. Kepla exists because clients deserved better than a catalogue and a call centre. Knows your environment, not just your order number.',
  },
  {
    role: 'Configuration',
    title: 'Imaging, deployment & MDM',
    body: 'Every device that leaves us is imaged, encrypted, enrolled and tagged. Windows 11 Pro, endpoint protection, your applications and your policies, all applied before the box is sealed.',
  },
  {
    role: 'Logistics',
    title: 'Fulfilment & delivery',
    body: 'From distributor to your door, or directly to a desk if you opt for on-site deployment. Every shipment tracked, with follow-up to confirm arrival and a signed handover.',
  },
]

export default function About() {
  useEffect(() => {
    setMeta(
      'About — Kepla',
      'Kepla is a managed IT procurement partner founded by a former MSP account manager, built to fix transparent pricing, configuration and accountability in hardware buying.',
    )
  }, [])

  return (
    <>
      <PageHero
        eyebrow="About Kepla"
        title={
          <>
            Built by someone who
            <span className="text-gold italic"> knows the industry</span> from the inside.
          </>
        }
        subtitle="We are not a catalogue and we are not a call centre. We are a managed procurement partner, run by an account manager who spent years watching clients overpay for brown-box service."
      >
        <div className="flex flex-wrap gap-4">
          <PrimaryLink to="/contact">Work with us</PrimaryLink>
          <SecondaryLink to="/services">See our services</SecondaryLink>
        </div>
      </PageHero>

      <Section className="pt-4">
        <div className="rounded-2xl border border-gold/25 bg-gold-muted/20 p-8 sm:p-12 max-w-4xl">
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/85 italic mb-7">
            "After years as an account manager at a managed service provider, I kept seeing the same
            thing. Clients spending noticeably more than they needed to, waiting weeks for gear that
            arrived unconfigured, then calling a ticket queue to talk to someone who had never seen
            their environment. So I built the thing I always wished I could sell them."
          </p>
          <div className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-serif font-bold">
              K
            </span>
            <div>
              <p className="text-white text-sm font-medium">Founder</p>
              <p className="text-white/40 text-xs">Kepla Technologies Ltd.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-ink-border">
        <SectionHeading
          eyebrow="What we believe"
          title="Six principles we will be held to."
          subtitle="These are commitments rather than achievements. Hold us to them, and tell us when we fall short."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} className="p-7">
              <h3 className="text-white font-medium mb-3">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-ink-border">
        <SectionHeading
          eyebrow="How we are set up"
          title="Real people. Direct lines."
          subtitle="A deliberately small operation. Fewer handoffs means fewer places for your order to get lost."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {team.map((t) => (
            <Card key={t.title} className="p-7">
              <p className="text-[0.7rem] uppercase tracking-[0.15em] text-gold/80 mb-3">
                {t.role}
              </p>
              <h3 className="text-white font-medium mb-3 leading-snug">{t.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{t.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  )
}
