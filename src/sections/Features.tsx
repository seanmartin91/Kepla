import { Section, SectionHeading, Card } from '../components/ui'
import {
  ClipboardList,
  HardDrive,
  ShieldCheck,
  Tag,
  Truck,
  RefreshCw,
} from 'lucide-react'

const features = [
  {
    icon: ClipboardList,
    title: 'Specification & quoting',
    body: 'We size the hardware to the role, not to the catalogue. Every quote is itemised by SKU with the cost and the reason it was recommended.',
  },
  {
    icon: HardDrive,
    title: 'Imaging & configuration',
    body: 'Windows 11 Pro deployed to your standard, your applications installed, domain or Entra ID joined, and Microsoft 365 configured before the box is sealed.',
  },
  {
    icon: ShieldCheck,
    title: 'Security baseline',
    body: 'BitLocker enabled and keys escrowed, antivirus deployed, Intune or your MDM enrolled, and your security policies applied at build time.',
  },
  {
    icon: Tag,
    title: 'Asset tagging & register',
    body: 'Every device physically labelled and recorded: make, model, serial, specification, assigned user, purchase date and warranty expiry.',
  },
  {
    icon: Truck,
    title: 'Delivery & deployment',
    body: 'Shipped to your office or direct to remote staff, individually labelled per recipient. On-site desk-level setup available where you want it.',
  },
  {
    icon: RefreshCw,
    title: 'Lifecycle management',
    body: 'Warranty registered and claims handled by us. Refresh cycles planned at the point of purchase, and secure disposal when devices retire.',
  },
]

export default function Features() {
  return (
    <Section className="border-t border-ink-border">
      <SectionHeading
        eyebrow="What we handle"
        title="Everything between the purchase order and a working desk."
        subtitle="You approve a quote. We take it from there and hand back devices that are ready to use and fully documented."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, body }) => (
          <Card key={title} className="p-7 group">
            <Icon
              size={24}
              className="text-gold mb-5 group-hover:scale-110 transition-transform duration-300"
              strokeWidth={1.5}
            />
            <h3 className="text-white font-medium mb-2.5">{title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{body}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
