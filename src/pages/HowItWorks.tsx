import { useEffect } from 'react'
import { PageHero, PrimaryLink } from '../components/ui'
import Process from '../sections/Process'
import Comparison from '../sections/Comparison'
import FAQ from '../sections/FAQ'
import CTABanner from '../sections/CTABanner'
import { setMeta } from '../lib/meta'

export default function HowItWorks() {
  useEffect(() => {
    setMeta(
      'How It Works — Kepla',
      'From enquiry to a documented, working device estate in five steps. Itemised quote within 24 hours, 48-hour config-to-ship target.',
    )
  }, [])

  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            One approval from you.
            <span className="text-gold italic"> The rest is ours.</span>
          </>
        }
        subtitle="Most IT procurement takes weeks and leaves the configuration work on your desk. Here is exactly what happens instead, and what we commit to at each stage."
      >
        <PrimaryLink to="/build">Start a quote</PrimaryLink>
      </PageHero>

      <Process />
      <Comparison />
      <FAQ />
      <CTABanner />
    </>
  )
}
