import { useEffect } from 'react'
import { PageHero, Section, SectionHeading, Card, PrimaryLink } from '../components/ui'
import CTABanner from '../sections/CTABanner'
import { setMeta } from '../lib/meta'
import { Check } from 'lucide-react'

const services = [
  {
    n: '01',
    id: 'hardware',
    title: 'Hardware Procurement',
    blurb:
      'Business-class laptops, desktops, monitors and peripherals specified to the role rather than pulled off a price list.',
    points: [
      'Dell, Lenovo and HP business ranges',
      'Specification matched to the job, not the margin',
      'Itemised quote with SKU-level costs',
      'Windows 11 Pro imaging to your standard',
      'Asset tagging and serial-level register',
    ],
    price: 'Transparent hardware pricing, with the service fee as a separate line',
  },
  {
    n: '02',
    id: 'software',
    title: 'Software & Licensing',
    blurb:
      'Microsoft 365, endpoint protection, backup and the line-of-business applications your team actually uses.',
    points: [
      'Microsoft 365 tenant setup and licensing',
      'Antivirus and endpoint protection deployment',
      'Backup configuration and verification',
      'Line-of-business application installation',
      'Licence tracking against your asset register',
    ],
    price: 'Licences quoted transparently alongside hardware',
  },
  {
    n: '03',
    id: 'configuration',
    title: 'Configuration & Security',
    blurb:
      'Every device leaves imaged, encrypted, enrolled and policy-applied. Nothing arrives at factory defaults.',
    points: [
      'Windows 11 Pro image built to your standard',
      'BitLocker enabled with keys escrowed',
      'Intune / MDM enrolment and policy application',
      'Entra ID or domain join completed',
      'Local admin and account standards applied',
    ],
    price: 'Included in every bundle',
  },
  {
    n: '04',
    id: 'haas',
    title: 'Hardware-as-a-Service',
    blurb:
      'Predictable monthly spend instead of capital outlay, with refreshes on a schedule rather than on failure.',
    points: [
      'Fixed monthly cost per seat',
      'Warranty included for the full term',
      'Refresh cycle managed and scheduled',
      'Secure data wipe and disposal at end of life',
      'Scale seats up or down as you hire',
    ],
    price: 'Custom monthly pricing',
  },
  {
    n: '05',
    id: 'networking',
    title: 'Networking & Infrastructure',
    blurb:
      'Ubiquiti UniFi builds configured before we arrive, so a new office comes online the day you move in.',
    points: [
      'UniFi access points, switches and gateways',
      'VLAN segmentation and firewall configuration',
      'Guest network isolation',
      'Remote management handover',
      'Documented network topology',
    ],
    price: 'From $1,200 depending on site',
  },
  {
    n: '06',
    id: 'deployment',
    title: 'Deployment & Lifecycle',
    blurb:
      'Delivery to your office or direct to remote staff, plus the ongoing management that keeps records accurate.',
    points: [
      'Individually labelled per recipient',
      'On-site desk-level setup and user walkthrough',
      'Warranty claims raised and managed by us',
      'Refresh dates planned at point of purchase',
      'Offboarding wipe and redeployment',
    ],
    price: 'Bundled or standalone',
  },
]

export default function Services() {
  useEffect(() => {
    setMeta(
      'Services — Kepla Managed IT Procurement',
      'Hardware procurement, software licensing, configuration and security, Hardware-as-a-Service, networking, and full lifecycle management for Canadian businesses.',
    )
  }, [])

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Not a catalogue. A managed
            <span className="text-gold italic"> procurement partner.</span>
          </>
        }
        subtitle="Six services that cover everything between deciding you need equipment and having it working, documented and supported."
      >
        <PrimaryLink to="/build">Build a quote</PrimaryLink>
      </PageHero>

      <Section className="border-t border-ink-border pt-4">
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <Card key={s.id} className="p-7 flex flex-col" >
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-serif text-xl font-bold text-gold/60">{s.n}</span>
                <h2 className="text-white font-medium text-xl">{s.title}</h2>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{s.blurb}</p>
              <ul className="space-y-2.5 mb-6 flex-1">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-white/65">
                    <Check size={15} className="text-gold mt-0.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="pt-5 border-t border-ink-border">
                <p className="text-[0.7rem] uppercase tracking-[0.15em] text-white/30 mb-1.5">
                  Pricing
                </p>
                <p className="text-sm text-gold">{s.price}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-ink-border">
        <SectionHeading
          eyebrow="Mix and match"
          title="Take the whole service, or only the part you are missing."
          subtitle="Plenty of clients keep their existing IT provider for day-to-day support and use us purely for procurement, imaging and asset management. We will build to their standard image and enrol into their tenant."
        />
        <PrimaryLink to="/contact">Tell us what you need</PrimaryLink>
      </Section>

      <CTABanner />
    </>
  )
}
