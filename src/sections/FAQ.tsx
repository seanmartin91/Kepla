import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Minus } from 'lucide-react'
import { Section, SectionHeading } from '../components/ui'

const faqs = [
  {
    q: 'What is actually included in the service fee?',
    a: 'Specification and itemised quoting, Windows 11 Pro imaging to your standard, application installation, BitLocker encryption, Intune or MDM enrolment, security policy application, asset tagging, warranty registration, and the serial-level asset register delivered with your order. Hardware pricing is transparent and the service fee is shown as a separate line, so you can see both figures.',
  },
  {
    q: 'Do you supply Apple hardware as well as Windows?',
    a: 'Our core business is Windows on business-class hardware from Dell, Lenovo and HP, which is where we can add the most value on configuration and lifecycle management. We can source and supply Apple hardware where a role genuinely calls for it, and we will tell you plainly when we think a Mac is the wrong tool for the job.',
  },
  {
    q: 'How long does an order actually take?',
    a: 'You will have a formal quote within 24 hours of us understanding the requirement. Once the quote is approved and hardware is in hand, our configuration target is 48 hours to ship. Total time depends on distributor stock, and we will tell you the realistic date before you approve rather than after.',
  },
  {
    q: 'What happens when a device fails?',
    a: 'We register every device with the manufacturer at build time, so the warranty is already in place and traceable to your account. When something fails you contact us, not the manufacturer. We raise and manage the claim, and arrange a replacement or loan unit depending on the tier you are on.',
  },
  {
    q: 'Can you work alongside our existing IT provider?',
    a: 'Frequently, yes. Plenty of clients keep their MSP for day-to-day support and use us purely for procurement, imaging and asset management. We will build to their standard image and enrol into their MDM tenant. It usually makes their life easier too.',
  },
  {
    q: 'What is Hardware-as-a-Service?',
    a: 'Instead of buying devices outright, you pay a predictable monthly fee per seat. Warranty is included, refreshes happen on a set schedule rather than when things break, and secure disposal is handled at end of life. It suits businesses that would rather keep hardware off the balance sheet and out of the capital budget.',
  },
  {
    q: 'Do you handle software and licensing?',
    a: 'Yes. Microsoft 365 tenant setup and licensing, antivirus and endpoint protection, backup, and the line-of-business applications you specify. Licences are quoted transparently alongside hardware.',
  },
  {
    q: 'Do you only serve Canadian businesses?',
    a: 'Canada is our primary market and where our distribution and delivery are strongest. If you are outside Canada, get in touch and we will tell you honestly whether we can serve you properly rather than take the order and disappoint you.',
  },
  {
    q: 'What is in the client portal?',
    a: 'A live view of everything we have supplied you: your full asset register with serials and specifications, warranty status and expiry dates, upcoming refresh dates, and the status of any order currently in progress. Access is set up for you once your first order is placed.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section className="border-t border-ink-border" id="faq">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        <div>
          <SectionHeading eyebrow="FAQ" title="Questions we get asked." />
          <p className="text-white/45 text-sm leading-relaxed -mt-8">
            Something not covered here?{' '}
            <Link
              to="/contact"
              className="text-gold hover:text-gold-light underline underline-offset-4"
            >
              Send it over
            </Link>{' '}
            and you will get a straight answer, not a brochure.
          </p>
        </div>

        <div className="divide-y divide-ink-border border-y border-ink-border">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-[0.95rem] font-medium transition-colors ${
                      isOpen ? 'text-gold' : 'text-white/85 group-hover:text-white'
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span className="shrink-0 mt-0.5 text-gold">
                    {isOpen ? <Minus size={17} /> : <Plus size={17} />}
                  </span>
                </button>
                {isOpen && (
                  <p className="text-white/50 text-sm leading-relaxed pb-6 pr-10 -mt-1">{faq.a}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
