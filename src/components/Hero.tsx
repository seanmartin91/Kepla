import { ArrowRight, Shield, Zap, Package } from 'lucide-react'

interface HeroProps {
  onBuildClick: () => void
}

const devices = [
  { icon: '💻', label: 'MacBook Pro M4', sub: 'Pre-configured', color: 'border-gold/20' },
  { icon: '📱', label: 'iPhone 16 Pro', sub: 'MDM enrolled', color: 'border-ink-subtle' },
  { icon: '🖥️', label: '27" 4K Monitor', sub: 'Asset tagged', color: 'border-ink-subtle' },
  { icon: '⌨️', label: 'Magic Keyboard', sub: 'Paired & ready', color: 'border-ink-subtle' },
  { icon: '🎧', label: 'AirPods Pro', sub: 'Warranty reg.', color: 'border-ink-subtle' },
  { icon: '📦', label: 'Plug & Go', sub: '48-hr delivery', color: 'border-gold/30' },
]

const stats = [
  { value: '2,400+', label: 'Offices equipped' },
  { value: '48hr', label: 'Ship target' },
  { value: '99.2%', label: 'On-time delivery' },
  { value: '$0', label: 'IT consultant fees' },
]

export default function Hero({ onBuildClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Gold glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold-muted mb-8">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse-dot" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              Office in a Box · Live Now
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6">
            <span className="text-white block">Your entire</span>
            <span className="text-gold italic block">office,</span>
            <span className="text-white/30 block">one order.</span>
          </h1>

          {/* Subtext */}
          <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
            Every device pre-configured, asset-tagged, and warranty-registered.
            Delivered ready to plug in — for teams of 1 or 500.{' '}
            <span className="text-white/80">No IT degree required.</span>
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { icon: <Zap size={13} />, label: '48-hour ship target' },
              { icon: <Shield size={13} />, label: 'Warranty managed' },
              { icon: <Package size={13} />, label: 'Zero-touch MDM' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-1.5 text-xs text-white/50 bg-ink-card border border-ink-border rounded-full px-3 py-1.5"
              >
                <span className="text-gold">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onBuildClick}
              className="flex items-center gap-2 px-7 py-3.5 bg-gold hover:bg-gold-light text-ink font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(212,168,67,0.5)] group"
            >
              Build My Box
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-7 py-3.5 border border-ink-subtle hover:border-white/30 text-white/60 hover:text-white rounded-full transition-all duration-200 text-sm"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Right: device grid */}
        <div className="hidden lg:grid grid-cols-3 gap-3">
          {devices.map((device, i) => (
            <div
              key={i}
              className={`group relative bg-ink-card border ${device.color} hover:border-gold/40 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:bg-ink-hover hover:-translate-y-1 cursor-default`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{device.icon}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
              </div>
              <div>
                <p className="text-sm font-medium text-white leading-tight">{device.label}</p>
                <p className="text-xs text-white/40 mt-0.5">{device.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative max-w-7xl mx-auto px-6 pb-16 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink-border rounded-2xl overflow-hidden">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-ink-card px-8 py-6 flex flex-col gap-1">
              <span className="font-serif text-3xl font-bold text-gold">{stat.value}</span>
              <span className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
