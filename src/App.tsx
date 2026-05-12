import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TickerBar from './components/TickerBar'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'
import BuildMyBox from './components/BuildMyBox'

export default function App() {
  const [showBuilder, setShowBuilder] = useState(false)

  return (
    <div className="bg-ink min-h-screen text-white font-sans overflow-x-hidden">
      <Navbar onBuildClick={() => setShowBuilder(true)} />
      <Hero onBuildClick={() => setShowBuilder(true)} />
      <TickerBar />
      <Features />
      <HowItWorks />
      <Pricing onBuildClick={() => setShowBuilder(true)} />
      <Testimonials />
      <FAQ />
      <CTABanner onBuildClick={() => setShowBuilder(true)} />
      <Footer />
      {showBuilder && <BuildMyBox onClose={() => setShowBuilder(false)} />}
    </div>
  )
}
