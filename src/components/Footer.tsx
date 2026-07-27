import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'Hardware Procurement', to: '/services' },
      { label: 'Software & Licensing', to: '/services' },
      { label: 'Hardware-as-a-Service', to: '/services' },
      { label: 'Networking & Infrastructure', to: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'How It Works', to: '/how-it-works' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Client Portal', to: '/portal' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Get Started',
    links: [
      { label: 'Build a Quote', to: '/build' },
      { label: 'Book a Call', to: '/contact' },
      { label: 'Request Portal Access', to: '/portal' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink-border bg-ink">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="font-serif text-xl font-bold tracking-tight text-white">KEPLA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            </Link>
            <p className="text-white/45 text-sm leading-relaxed max-w-sm mb-6">
              Managed IT procurement for Canadian businesses. Hardware and software specified,
              configured, asset-tagged and documented before it reaches your desks.
            </p>
            <div className="space-y-2.5 text-sm">
              <a
                href="mailto:hello@kepla.ca"
                className="flex items-center gap-2.5 text-white/55 hover:text-gold transition-colors"
              >
                <Mail size={15} className="text-gold shrink-0" />
                hello@kepla.ca
              </a>
              <p className="flex items-center gap-2.5 text-white/45">
                <MapPin size={15} className="text-gold shrink-0" />
                Serving businesses across Canada
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/55 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-ink-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Kepla Technologies Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-xs text-white/35">
            <Link to="/privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
