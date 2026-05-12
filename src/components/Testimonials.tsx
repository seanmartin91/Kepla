const testimonials = [
  {
    quote:
      "We opened a second office with 18 people. Kepla had every device configured, asset-tagged, and sitting on desks before day one. Our IT guy didn't have to touch a single thing.",
    name: 'Sarah Chen',
    role: 'Head of Operations',
    company: 'Finlake Capital',
    avatar: 'SC',
  },
  {
    quote:
      "I was skeptical that a 'box' service could handle our security requirements. They enrolled everything into our MDM, applied our policies, and even pre-installed our VPN. Genuinely impressed.",
    name: 'Marcus Webb',
    role: 'CTO',
    company: 'Prism Health',
    avatar: 'MW',
  },
  {
    quote:
      "We went from 5 to 40 people in eight months. Kepla scaled right alongside us — same process, same quality, zero chaos. The asset tracking alone has saved us thousands.",
    name: 'Priya Anand',
    role: 'Founder & CEO',
    company: 'Velosity',
    avatar: 'PA',
  },
]

export default function Testimonials() {
  return (
    <section className="py-28 bg-ink-card border-y border-ink-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">
            What teams say
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-white">
            Built for teams who{' '}
            <span className="text-white/30">move fast.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-ink border border-ink-border rounded-2xl p-8 flex flex-col gap-6 hover:border-ink-subtle transition-colors duration-200"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-gold text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/60 text-sm leading-relaxed flex-1">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-muted border border-gold/20 flex items-center justify-center">
                  <span className="text-gold text-xs font-bold">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-white/40 text-xs">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
