import { ClipboardList, Cpu, PackageCheck, Plug } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: <ClipboardList size={20} />,
    title: 'Build Your Box',
    description:
      'Choose your devices, team size, and add-on services. Get a live price estimate as you configure. No sales call required.',
  },
  {
    number: '02',
    icon: <Cpu size={20} />,
    title: 'We Configure Everything',
    description:
      'Our team enrolls every device into your MDM, installs your apps, applies security policies, and asset-tags each item.',
  },
  {
    number: '03',
    icon: <PackageCheck size={20} />,
    title: 'We Ship Direct',
    description:
      'Every device is individually packaged, labeled with the recipient\'s name, and shipped to your office — or directly to remote team members.',
  },
  {
    number: '04',
    icon: <Plug size={20} />,
    title: 'Plug In & Go',
    description:
      'Devices arrive at desks completely ready to use. No setup required. Your team just logs in and starts working.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-ink-card border-y border-ink-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">
            The process
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-5">
            From order to desk{' '}
            <span className="text-gold italic">in 48 hours.</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Most IT procurement takes weeks. We've engineered our process to get your team set up in under two days.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(100%_-_12px)] w-full h-px bg-gradient-to-r from-ink-border to-transparent z-0" />
              )}

              <div className="relative z-10 flex flex-col gap-5">
                {/* Icon + number */}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-ink border border-ink-border flex items-center justify-center text-gold">
                    {step.icon}
                  </div>
                  <span className="font-serif text-4xl font-bold text-ink-subtle select-none">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
