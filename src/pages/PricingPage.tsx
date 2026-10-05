import { useEffect } from 'react'
import { PageHero, PrimaryLink } from '../components/ui'
import Pricing from '../sections/Pricing'
import Trust from '../sections/Trust'
import FAQ from '../sections/FAQ'
import CTABanner from '../sections/CTABanner'
import { setMeta } from '../lib/meta'

export default function PricingPage() {
  useEffect(() => {
    setMeta(
      'Pricing — Kepla Managed IT Procurement',
      'Transparent, itemised pricing in Canadian dollars. Transparent hardware pricing, with the service fee shown as a separate line. Net-30 available for approved accounts.',
    )
  }, [])

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            You should be able to see
            <span className="text-gold italic"> exactly </span>
            what you are paying for.
          </>
        }
        subtitle="Every quote separates hardware cost from service fee, lists the SKUs, and explains why each item was recommended. If a line does not make sense, ask and we will change it or justify it."
      >
        <PrimaryLink to="/build">Build your quote</PrimaryLink>
      </PageHero>

      <Pricing compact />
      <Trust />
      <FAQ />
      <CTABanner />
    </>
  )
}
