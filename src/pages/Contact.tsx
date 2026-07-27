import { useEffect, useState, FormEvent } from 'react'
import { PageHero, Section, Card, Field, inputClass } from '../components/ui'
import { setMeta } from '../lib/meta'
import { submitLead } from '../lib/leads'
import { Mail, Clock, FileSearch, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

const teamSizes = ['1–5', '5–25', '25–100', '100+']

const reasons = [
  {
    icon: FileSearch,
    title: 'Benchmark an existing invoice',
    body: 'Send your most recent hardware invoice. We will quote the same specification line by line, free and with no obligation.',
  },
  {
    icon: Clock,
    title: 'Get a formal quote',
    body: 'Tell us roles and headcount and you will have an itemised quote with exact SKUs within 24 hours.',
  },
  {
    icon: Mail,
    title: 'Ask something specific',
    body: 'Compatibility, compliance, licensing, whether we can work alongside your current provider. Straight answers, not a brochure.',
  },
]

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMeta(
      'Contact — Kepla',
      'Get an itemised hardware quote within 24 hours, benchmark an existing invoice, or ask a specific question about IT procurement in Canada.',
    )
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)

    const form = new FormData(e.currentTarget)

    // Honeypot — bots fill hidden fields, humans do not.
    if (form.get('bot-field')) {
      setStatus('sent')
      return
    }

    const result = await submitLead({
      source: 'contact',
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      company: String(form.get('company') || ''),
      phone: String(form.get('phone') || ''),
      teamSize: String(form.get('teamSize') || ''),
      message: String(form.get('message') || ''),
    })

    if (result.error) {
      setError(result.error)
      setStatus('error')
    } else {
      setStatus('sent')
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us what you need.
            <span className="text-gold italic"> We reply within one business day.</span>
          </>
        }
        subtitle="No gatekeeping and no discovery call before you can get a number. Send the detail you have and we will come back with something useful."
      />

      <Section className="pt-4">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">
          <Card hover={false} className="p-7 sm:p-9">
            {status === 'sent' ? (
              <div className="py-10 text-center">
                <CheckCircle2 size={44} className="text-gold mx-auto mb-5" strokeWidth={1.5} />
                <h2 className="font-serif text-2xl text-white mb-3">Thank you — that is with us.</h2>
                <p className="text-white/55 text-sm leading-relaxed max-w-md mx-auto">
                  We reply to every enquiry within one business day, usually sooner. If it is
                  urgent, email{' '}
                  <a href="mailto:hello@kepla.ca" className="text-gold underline underline-offset-4">
                    hello@kepla.ca
                  </a>{' '}
                  directly and mark it as such.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
                <div className="hidden">
                  <label>
                    Do not fill this in
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Your name" required>
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      className={inputClass}
                      placeholder="Jordan Miller"
                    />
                  </Field>
                  <Field label="Company" required>
                    <input
                      name="company"
                      required
                      autoComplete="organization"
                      className={inputClass}
                      placeholder="Miller & Co."
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Work email" required>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                      placeholder="jordan@millerco.ca"
                    />
                  </Field>
                  <Field label="Phone" hint="Optional, but it speeds things up.">
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={inputClass}
                      placeholder="(416) 555-0142"
                    />
                  </Field>
                </div>

                <Field label="Roughly how many people need equipment?">
                  <select name="teamSize" className={inputClass} defaultValue="">
                    <option value="">Select a range</option>
                    {teamSizes.map((s) => (
                      <option key={s} value={s}>
                        {s} people
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="What do you need?"
                  required
                  hint="Roles, timing, anything you already run, or just paste a list. Detail helps us quote accurately first time."
                >
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className={`${inputClass} resize-y`}
                    placeholder="We're hiring 8 people over the next quarter — 5 office-based, 3 remote. Currently buying ad hoc and it's becoming a mess. Would like a quote for laptops, monitors and setup."
                  />
                </Field>

                {status === 'error' && error && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                    <AlertCircle size={17} className="text-red-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-red-200/90 leading-relaxed">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-7 py-3.5 bg-gold hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed text-ink font-semibold rounded-full transition-all duration-200"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending
                    </>
                  ) : (
                    'Send enquiry'
                  )}
                </button>

                <p className="text-xs text-white/30 text-center leading-relaxed">
                  We use your details only to respond to this enquiry. No newsletter, no list, no
                  passing your information to anyone else.
                </p>
              </form>
            )}
          </Card>

          <div className="space-y-5">
            {reasons.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="p-6">
                <Icon size={20} className="text-gold mb-4" strokeWidth={1.5} />
                <h3 className="text-white font-medium mb-2 text-[0.95rem]">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{body}</p>
              </Card>
            ))}

            <Card hover={false} className="p-6 border-gold/25 bg-gold-muted/15">
              <p className="text-[0.7rem] uppercase tracking-[0.15em] text-gold mb-3">
                Prefer email?
              </p>
              <a
                href="mailto:hello@kepla.ca"
                className="text-white hover:text-gold transition-colors font-medium"
              >
                hello@kepla.ca
              </a>
              <p className="text-white/40 text-xs mt-3 leading-relaxed">
                Serving businesses across Canada. Replies within one business day.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}
