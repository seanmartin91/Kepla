import { Tag, ShieldCheck, Truck, Settings2, BarChart3, HeadphonesIcon } from 'lucide-react'

const features = [
  {
    icon: <Settings2 size={22} />,
    title: 'Zero-Touch Configuration',
    description:
      'Every device arrives with MDM enrolled, apps installed, and company settings applied. Your team plugs in and starts working.',
  },
  {
    icon: <Tag size={22} />,
    title: 'Asset Tagged & Tracked',
    description:
      'Every item is labeled, logged, and registered to your account. Know where every device is — from desk to offboarding.',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Warranty Managed',
    description:
      'We register every device with the manufacturer on your behalf. When something breaks, we handle the claim.',
  },
  {
    icon: <Truck size={22} />,
    title: '48-Hour Ship Target',
    description:
      'Orders processed same day. Devices shipped individually labeled and packaged, ready to hand off on arrival.',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Full Lifecycle Visibility',
    description:
      'A single dashboard shows your entire fleet — purchase date, warranty status, user assignment, and replacement timeline.',
  },
  {
    icon: <HeadphonesIcon size={22} />,
    title: 'Ongoing IT Support',
    description:
      'Add our managed support tier and get a dedicated IT contact. We handle onboarding, offboarding, and troubleshooting.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-28 max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="max-w-2xl mb-16">
        <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">
          What's included
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-white mb-5">
          Everything handled.{' '}
          <span className="text-white/30">Nothing missed.</span>
        </h2>
        <p className="text-white/50 text-lg leading-relaxed">
          We don't just ship boxes. We configure, tag, register, and manage every device so you never have to think about IT again.
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-border rounded-2xl overflow-hidden">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-ink-card hover:bg-ink-hover p-8 flex flex-col gap-4 transition-colors duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gold-muted border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
