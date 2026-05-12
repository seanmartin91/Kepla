import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  onBuildClick: () => void
}

export default function Navbar({ onBuildClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Services', href: '#features' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink/95 backdrop-blur-md border-b border-ink-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-serif text-xl font-bold tracking-tight text-white group-hover:text-gold transition-colors">
            KEPLA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onBuildClick}
            className="px-5 py-2 bg-gold hover:bg-gold-light text-ink font-semibold text-sm rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,168,67,0.4)]"
          >
            Build My Box →
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-ink-card border-b border-ink-border px-6 pb-6 pt-2 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-white py-1 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onBuildClick() }}
            className="mt-2 px-5 py-2.5 bg-gold text-ink font-semibold text-sm rounded-full"
          >
            Build My Box →
          </button>
        </div>
      )}
    </header>
  )
}
