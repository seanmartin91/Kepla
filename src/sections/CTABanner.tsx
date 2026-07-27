import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="border-t border-ink-border relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-gold/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-6 py-24 sm:py-32 text-center">
        <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">
          No obligation, no sales call required
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl leading-[1.1] text-white mb-6 text-balance">
          Find out what you should
          <span className="text-gold italic"> actually</span> be paying.
        </h2>
        <p className="text-white/55 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Build a quote in about two minutes, or send us your last hardware invoice and we will
          benchmark it against an itemised quote for the same specification.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/build"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-ink font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_35px_rgba(212,168,67,0.45)] group"
          >
            Build a Quote
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-ink-subtle hover:border-white/40 text-white/70 hover:text-white rounded-full transition-all duration-200 font-medium"
          >
            Talk to us instead
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-white/35">
          <span>No account needed</span>
          <span>No minimum order</span>
          <span>Quote within 24 hours</span>
        </div>
      </div>
    </section>
  )
}
