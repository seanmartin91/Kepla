import { useEffect, useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Loader2, Lock, ShieldCheck } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { setMeta } from '../lib/meta'
import { submitLead } from '../lib/leads'
import { Field, inputClass } from '../components/ui'
import PortalDashboard from '../components/PortalDashboard'

type Mode = 'signin' | 'signup' | 'reset'

export default function Portal() {
  const { user, loading, configured } = useAuth()

  useEffect(() => {
    setMeta(
      'Client Portal — Kepla',
      'Sign in to view your asset register, warranty status, refresh dates and live order progress.',
    )
  }, [])

  if (loading) {
    return (
      <div className="pt-40 pb-32 flex justify-center">
        <Loader2 size={28} className="text-gold animate-spin" />
      </div>
    )
  }

  if (!configured) return <PortalUnavailable />
  if (!user) return <AuthPanel />
  return <PortalDashboard />
}

/* ------------------------------------------------------------------ */
/* Auth                                                                */
/* ------------------------------------------------------------------ */

function AuthPanel() {
  const { signIn, signUp, resetPassword } = useAuth()
  const [mode, setMode] = useState<Mode>('signin')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  async function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    setNotice(null)

    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') || '')
    const password = String(form.get('password') || '')

    if (mode === 'reset') {
      const { error } = await resetPassword(email)
      if (error) setError(error)
      else setNotice('If an account exists for that address, a reset link is on its way.')
      setBusy(false)
      return
    }

    if (mode === 'signup') {
      const confirm = String(form.get('confirmPassword') || '')
      if (password.length < 8) {
        setError('Password must be at least 8 characters.')
        setBusy(false)
        return
      }
      if (password !== confirm) {
        setError('The two passwords do not match.')
        setBusy(false)
        return
      }
      const { error, needsConfirmation } = await signUp(
        email,
        password,
        String(form.get('company') || ''),
        String(form.get('fullName') || ''),
      )
      if (error) setError(error)
      else if (needsConfirmation)
        setNotice('Account created. Check your inbox for a confirmation link before signing in.')
      setBusy(false)
      return
    }

    const { error } = await signIn(email, password)
    if (error) setError(error)
    setBusy(false)
  }

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">
            Client Portal
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-white leading-[1.1] mb-6">
            Your equipment,
            <span className="text-gold italic"> on the record.</span>
          </h1>
          <p className="text-white/55 leading-relaxed mb-8">
            Every device we supply is logged against your account. Sign in to see your full asset
            register, warranty status, upcoming refresh dates and the progress of any live order.
          </p>

          <ul className="space-y-3.5">
            {[
              'Serial-level asset register, always current',
              'Warranty expiry dates and claim history',
              'Refresh planning before devices reach end of life',
              'Live status on orders in configuration',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                <ShieldCheck size={16} className="text-gold mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <p className="text-xs text-white/35 mt-8 leading-relaxed">
            Not a client yet?{' '}
            <Link to="/build" className="text-gold underline underline-offset-4">
              Build a quote
            </Link>{' '}
            — portal access is set up with your first order.
          </p>
        </div>

        <div className="bg-ink-card border border-ink-border rounded-2xl p-7 sm:p-8">
          <div className="flex gap-1 p-1 bg-ink rounded-full border border-ink-border mb-7">
            {(
              [
                ['signin', 'Sign in'],
                ['signup', 'Create account'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                onClick={() => {
                  setMode(value)
                  setError(null)
                  setNotice(null)
                }}
                className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors ${
                  mode === value ? 'bg-gold text-ink' : 'text-white/50 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handle} className="space-y-4">
            {mode === 'signup' && (
              <>
                <Field label="Your name" required>
                  <input name="fullName" required autoComplete="name" className={inputClass} />
                </Field>
                <Field label="Company" required>
                  <input
                    name="company"
                    required
                    autoComplete="organization"
                    className={inputClass}
                  />
                </Field>
              </>
            )}

            <Field label="Work email" required>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
              />
            </Field>

            {mode !== 'reset' && (
              <Field
                label="Password"
                required
                hint={mode === 'signup' ? 'At least 8 characters.' : undefined}
              >
                <input
                  name="password"
                  type="password"
                  required
                  minLength={mode === 'signup' ? 8 : undefined}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  className={inputClass}
                />
              </Field>
            )}

            {mode === 'signup' && (
              <Field label="Confirm password" required>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className={inputClass}
                />
              </Field>
            )}

            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5">
                <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-200/90 leading-relaxed">{error}</p>
              </div>
            )}

            {notice && (
              <div className="flex items-start gap-3 rounded-xl border border-gold/30 bg-gold-muted/30 p-3.5">
                <CheckCircle2 size={16} className="text-gold mt-0.5 shrink-0" />
                <p className="text-sm text-white/80 leading-relaxed">{notice}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gold hover:bg-gold-light disabled:opacity-60 text-ink font-semibold rounded-full transition-all"
            >
              {busy && <Loader2 size={16} className="animate-spin" />}
              {mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send reset link'}
            </button>

            <div className="text-center pt-1">
              {mode === 'reset' ? (
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin')
                    setError(null)
                    setNotice(null)
                  }}
                  className="text-xs text-white/45 hover:text-white transition-colors"
                >
                  Back to sign in
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMode('reset')
                    setError(null)
                    setNotice(null)
                  }}
                  className="text-xs text-white/45 hover:text-white transition-colors"
                >
                  Forgotten your password?
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Fallback when Supabase env vars are absent                          */
/* ------------------------------------------------------------------ */

function PortalUnavailable() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = new FormData(e.currentTarget)
    if (form.get('bot-field')) {
      setStatus('sent')
      return
    }
    const result = await submitLead({
      source: 'portal-access',
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      company: String(form.get('company') || ''),
      message: 'Requested client portal access.',
    })
    if (result.error) {
      setError(result.error)
      setStatus('error')
    } else {
      setStatus('sent')
    }
  }

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-14 h-14 rounded-2xl bg-gold-muted border border-gold/25 flex items-center justify-center mx-auto mb-7">
          <Lock size={24} className="text-gold" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-3xl text-white mb-4">Client portal — coming online</h1>
        <p className="text-white/55 leading-relaxed mb-9">
          The portal is being connected to our asset database. Request access below and we will set
          up your account the moment it is live, along with the full register of everything we have
          supplied you.
        </p>

        {status === 'sent' ? (
          <div className="rounded-2xl border border-gold/30 bg-gold-muted/20 p-7">
            <CheckCircle2 size={32} className="text-gold mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-white/75 text-sm leading-relaxed">
              Request received. We will be in touch as soon as your account is ready.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-ink-card border border-ink-border rounded-2xl p-7 space-y-4 text-left"
          >
            <div className="hidden">
              <label>
                Do not fill this in
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <Field label="Your name" required>
              <input name="name" required autoComplete="name" className={inputClass} />
            </Field>
            <Field label="Company" required>
              <input name="company" required autoComplete="organization" className={inputClass} />
            </Field>
            <Field label="Work email" required>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
              />
            </Field>

            {status === 'error' && error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5">
                <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-200/90 leading-relaxed">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gold hover:bg-gold-light disabled:opacity-60 text-ink font-semibold rounded-full transition-all"
            >
              {status === 'sending' && <Loader2 size={16} className="animate-spin" />}
              Request access
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
