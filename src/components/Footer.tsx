const links = {
  Product: ['How It Works', 'Pricing', 'Services', 'FAQ'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Security'],
}

export default function Footer() {
  return (
    <footer className="border-t border-ink-border bg-ink">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-serif text-xl font-bold text-white">KEPLA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Your entire office, one order. Every device pre-configured and delivered ready to plug in.
            </p>
            <p className="text-white/25 text-xs mt-6">
              © {new Date().getFullYear()} Kepla Technologies Ltd.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-4">
                {category}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/50 hover:text-white text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-ink-border flex flex-wrap items-center justify-between gap-4 text-xs text-white/25">
          <span>Designed and built for teams that move fast.</span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
