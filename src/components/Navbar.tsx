import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'

const links = [
  { label: 'Services', to: '/services' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Client Portal', to: '/portal' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-ink/95 backdrop-blur-md border-b border-ink-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Kepla home">
          <span className="font-serif text-xl font-bold tracking-tight text-white group-hover:text-gold transition-colors">
            KEPLA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors">
            Contact
          </Link>
          <Link
            to="/build"
            className="flex items-center gap-1.5 px-5 py-2 bg-gold hover:bg-gold-light text-ink font-semibold text-sm rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,168,67,0.4)]"
          >
            Get a Quote
            <ArrowRight size={14} />
          </Link>
        </div>

        <button
          className="lg:hidden text-white/70 hover:text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-ink-card border-b border-ink-border px-6 pb-6 pt-2 flex flex-col gap-1">
          {[...links, { label: 'Contact', to: '/contact' }].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-white/70 hover:text-white py-2.5 text-sm border-b border-ink-border/60 last:border-0"
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/build"
            className="mt-3 px-5 py-3 bg-gold text-ink font-semibold text-sm rounded-full text-center"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  )
}
