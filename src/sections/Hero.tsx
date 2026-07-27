import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Laptop,
  Monitor,
  Router,
  ShieldCheck,
  Tag,
  FileSpreadsheet,
} from 'lucide-react'
import { PrimaryLink } from '../components/ui'

const capabilities = [
  {
    icon: Laptop,
    label: 'Business laptops',
    sub: 'Dell, Lenovo, HP',
    accent: true,
  },
  { icon: Monitor, label: 'Monitors & docks', sub: 'Specified per role' },
  { icon: Router, label: 'Network hardware', sub: 'Ubiquiti UniFi' },
  { icon: ShieldCheck, label: 'Imaged & secured', sub: 'Windows 11 Pro' },
  { icon: Tag, label: 'Asset tagged', sub: 'Serial-level record' },
  {
    icon: FileSpreadsheet,
    label: 'Full documentation',
    sub: 'Register on arrival',
    accent: true,
  },
]

const commitments = [
  { value: '24h', label: 'Formal quote turnaround' },
  { value: '48h', label: 'Config-to-ship target' },
  { value: '100%', label: 'Devices documented on arrival' },
  { value: '1', label: 'Direct contact, no ticket queue' },
]

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gold/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gold/30 bg-gold-muted mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-gold text-[0.7rem] font-semibold tracking-[0.15em] uppercase">
              Managed IT Procurement · Canada
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.25rem] leading-[1.04] mb-7">
            <span className="text-white block">Hardware and software,</span>
            <span className="text-gold italic block">procured properly.</span>
          </h1>

          <p className="text-white/55 text-lg leading-relaxed mb-9 max-w-xl">
            We spec, source, image, secure and asset-tag every device before it ships — then hand you
            a complete asset register. One accountable contact instead of a catalogue and a call
            centre.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {[
              'Line-by-line quotes',
              'Windows 11 Pro imaging',
              'Intune / MDM enrolment',
              'Warranty registered',
            ].map((item) => (
              <span
                key={item}
                className="text-xs text-white/50 bg-ink-card border border-ink-border rounded-full px-3.5 py-1.5"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <PrimaryLink to="/build">Build a Quote</PrimaryLink>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-ink-subtle hover:border-white/40 text-white/70 hover:text-white rounded-full transition-all duration-200 text-sm font-medium"
            >
              See how it works
              <ArrowRight size={15} />
            </Link>
          </div>

          <p className="mt-5 text-xs text-white/35">
            Takes about two minutes. No account required, no sales call to get a number.
          </p>
        </div>

        <div className="hidden lg:grid grid-cols-3 gap-3">
          {capabilities.map(({ icon: Icon, label, sub, accent }) => (
            <div
              key={label}
              className={`group bg-ink-card border rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:border-gold/40 hover:bg-ink-hover hover:-translate-y-1 ${
                accent ? 'border-gold/25' : 'border-ink-subtle'
              }`}
            >
              <Icon size={22} className="text-gold" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-white leading-tight">{label}</p>
                <p className="text-xs text-white/40 mt-1">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pb-12 w-full">
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/30 mb-4">
          What we commit to on every order
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink-border rounded-2xl overflow-hidden">
          {commitments.map((stat) => (
            <div key={stat.label} className="bg-ink-card px-6 py-6 flex flex-col gap-1.5">
              <span className="font-serif text-3xl font-bold text-gold">{stat.value}</span>
              <span className="text-xs text-white/45 leading-snug">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
