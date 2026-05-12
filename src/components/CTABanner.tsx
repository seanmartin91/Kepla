import { ArrowRight } from 'lucide-react'

interface CTABannerProps {
  onBuildClick: () => void
}

export default function CTABanner({ onBuildClick }: CTABannerProps) {
  return (
    <section className="py-20 bg-ink-card border-t border-ink-border">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold-muted mb-8">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse-dot" />
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Ready in 48 hours
          </span>
        </div>

        <h2 className="font-serif text-5xl sm:text-6xl text-white mb-6">
          Ready to outfit{' '}
          <span className="text-gold italic">your team?</span>
        </h2>

        <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Build your box in minutes. Get a live price estimate with no commitment — our team reviews every order before it ships.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onBuildClick}
            className="flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-ink font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_40px_rgba(212,168,67,0.5)] text-base group"
          >
            Build My Box
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="mailto:hello@kepla.com"
            className="px-8 py-4 border border-ink-subtle hover:border-white/30 text-white/60 hover:text-white rounded-full transition-all duration-200 text-base"
          >
            Talk to us instead
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/30">
          <span>2,400+ offices equipped</span>
          <span className="w-1 h-1 rounded-full bg-ink-subtle" />
          <span>No credit card required</span>
          <span className="w-1 h-1 rounded-full bg-ink-subtle" />
          <span>Cancel anytime</span>
        </div>
      </div>
    </section>
  )
}
