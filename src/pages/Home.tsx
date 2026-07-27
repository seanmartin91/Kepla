import { useEffect } from 'react'
import Hero from '../sections/Hero'
import TickerBar from '../sections/TickerBar'
import Problem from '../sections/Problem'
import Features from '../sections/Features'
import WhoWeServe from '../sections/WhoWeServe'
import Comparison from '../sections/Comparison'
import Process from '../sections/Process'
import Pricing from '../sections/Pricing'
import Trust from '../sections/Trust'
import FAQ from '../sections/FAQ'
import CTABanner from '../sections/CTABanner'
import { setMeta } from '../lib/meta'

export default function Home() {
  useEffect(() => {
    setMeta(
      'Kepla — Managed IT Procurement for Canadian Business',
      'Hardware and software specified, configured, asset-tagged and documented before it reaches your desks. Itemised quotes within 24 hours. One accountable contact.',
    )
  }, [])

  return (
    <>
      <Hero />
      <TickerBar />
      <Problem />
      <Features />
      <WhoWeServe />
      <Comparison />
      <Process />
      <Pricing />
      <Trust />
      <FAQ />
      <CTABanner />
    </>
  )
}
