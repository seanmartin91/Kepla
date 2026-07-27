import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </section>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-8 bg-gold/60" />
      <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">{children}</span>
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <div className={`max-w-3xl mb-14 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow &&
        (align === 'center' ? (
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">
            {eyebrow}
          </p>
        ) : (
          <Eyebrow>{eyebrow}</Eyebrow>
        ))}
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] text-white text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-white/55 text-base sm:text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}

export function Card({
  children,
  className = '',
  hover = true,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={`bg-ink-card border border-ink-border rounded-2xl ${
        hover ? 'transition-all duration-300 hover:border-gold/30 hover:bg-ink-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function PrimaryLink({
  to,
  children,
  className = '',
}: {
  to: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 px-7 py-3.5 bg-gold hover:bg-gold-light text-ink font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(212,168,67,0.4)] group ${className}`}
    >
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </Link>
  )
}

export function SecondaryLink({
  to,
  children,
  className = '',
}: {
  to: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 px-7 py-3.5 border border-ink-subtle hover:border-white/40 text-white/70 hover:text-white rounded-full transition-all duration-200 text-sm font-medium ${className}`}
    >
      {children}
    </Link>
  )
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute -top-20 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">{eyebrow}</p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-white max-w-4xl text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-white/55 text-lg leading-relaxed max-w-2xl">{subtitle}</p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  )
}

export function Field({
  label,
  hint,
  children,
  required,
}: {
  label: string
  hint?: string
  children: ReactNode
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-white/80 mb-2">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-white/35 mt-1.5">{hint}</span>}
    </label>
  )
}

export const inputClass =
  'w-full bg-ink border border-ink-subtle rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-colors'
