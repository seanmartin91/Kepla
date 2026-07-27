import { useEffect } from 'react'
import { PageHero, Section } from '../components/ui'
import { setMeta } from '../lib/meta'

const privacy = [
  {
    h: 'What we collect',
    p: 'When you submit an enquiry or build a quote we collect your name, company, work email, optional phone number, and the configuration or message you send us. If you hold a client portal account we also store your account email and the asset and order records associated with your company.',
  },
  {
    h: 'Why we collect it',
    p: 'Solely to respond to your enquiry, prepare and deliver quotes, fulfil orders, and provide the client portal. We do not use your details for profiling or automated decision-making.',
  },
  {
    h: 'What we do not do',
    p: 'We do not sell your data. We do not share it with third parties for their own marketing. We do not add you to a mailing list because you requested a quote.',
  },
  {
    h: 'Who processes it',
    p: 'Enquiry submissions are processed by our website host and our database provider, both acting as processors on our instructions. Order fulfilment necessarily involves sharing delivery details with distributors and couriers.',
  },
  {
    h: 'How long we keep it',
    p: 'Enquiry records are retained for up to 24 months. Client account, asset and order records are retained for the life of the account and for a further seven years afterwards where required for tax and warranty purposes.',
  },
  {
    h: 'Your rights',
    p: 'You may request a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it where we are not required to retain it. Email hello@kepla.ca and we will respond within 30 days.',
  },
  {
    h: 'Cookies',
    p: 'We use only the storage strictly necessary to keep you signed in to the client portal. We do not run advertising or cross-site tracking cookies.',
  },
]

const terms = [
  {
    h: 'Quotes and pricing',
    p: 'Estimates generated on this website are indicative only and do not constitute an offer. Binding pricing is provided in a formal written quote. Quotes are valid for the period stated on them and are subject to distributor stock and pricing at the time of order.',
  },
  {
    h: 'Orders and acceptance',
    p: 'A contract is formed when we confirm your written acceptance of a formal quote. Specifications may be substituted for equivalent or better where a specific model becomes unavailable, and we will notify you before doing so.',
  },
  {
    h: 'Delivery timescales',
    p: 'Our 24-hour quote turnaround and 48-hour configuration targets are service targets we work to, not contractual guarantees. Delivery dates depend on distributor stock and courier performance. We will give you a realistic date before you approve an order.',
  },
  {
    h: 'Payment terms',
    p: 'Payment is due in accordance with the terms stated on your invoice. Net-30 terms are available to approved accounts at our discretion. Title in goods passes on receipt of payment in full; risk passes on delivery.',
  },
  {
    h: 'Warranties',
    p: 'Hardware is covered by the manufacturer warranty applicable to that product. We register devices on your behalf and manage claims where your service tier includes it. We do not extend or replace manufacturer warranty terms.',
  },
  {
    h: 'Hardware-as-a-Service',
    p: 'HaaS agreements are governed by a separate written agreement setting out term, monthly fee, refresh schedule, and end-of-term obligations. Equipment supplied under HaaS remains our property throughout the term.',
  },
  {
    h: 'Liability',
    p: 'Nothing in these terms limits liability for death, personal injury caused by negligence, or fraud. Otherwise our total liability in respect of any order is limited to the amount paid by you for that order. We are not liable for indirect or consequential loss, including loss of profit or business interruption.',
  },
  {
    h: 'Governing law',
    p: 'These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.',
  },
]

export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const isPrivacy = kind === 'privacy'
  const items = isPrivacy ? privacy : terms

  useEffect(() => {
    setMeta(
      isPrivacy ? 'Privacy Policy — Kepla' : 'Terms of Service — Kepla',
      isPrivacy
        ? 'How Kepla collects, uses and retains personal information, and how to exercise your rights.'
        : 'The terms governing quotes, orders, delivery, payment, warranties and liability for Kepla services.',
    )
  }, [isPrivacy])

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
        subtitle={`Last updated ${new Date().toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })}.`}
      />

      <Section className="pt-0">
        <div className="max-w-3xl space-y-9">
          {items.map((item) => (
            <div key={item.h}>
              <h2 className="text-white font-medium text-lg mb-3">{item.h}</h2>
              <p className="text-white/55 text-sm leading-relaxed">{item.p}</p>
            </div>
          ))}

          <div className="rounded-2xl border border-gold/25 bg-gold-muted/15 p-6">
            <p className="text-sm text-white/70 leading-relaxed">
              <strong className="text-white font-medium">Please note:</strong> this page is a
              plain-language summary prepared as a starting point. Before relying on it
              commercially, have it reviewed by a qualified Canadian lawyer against your actual
              operating practices and the privacy legislation that applies to your business.
            </p>
          </div>

          <p className="text-white/45 text-sm">
            Questions about this page? Email{' '}
            <a
              href="mailto:hello@kepla.ca"
              className="text-gold underline underline-offset-4 hover:text-gold-light"
            >
              hello@kepla.ca
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  )
}
