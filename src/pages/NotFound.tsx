import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PrimaryLink, SecondaryLink } from '../components/ui'
import { setMeta } from '../lib/meta'

export default function NotFound() {
  useEffect(() => {
    setMeta('Page not found — Kepla', 'The page you were looking for does not exist.')
  }, [])

  return (
    <div className="pt-40 pb-32 px-6 text-center">
      <p className="font-serif text-7xl font-bold text-gold/30 mb-6">404</p>
      <h1 className="font-serif text-3xl text-white mb-4">That page does not exist.</h1>
      <p className="text-white/50 max-w-md mx-auto mb-10 leading-relaxed">
        The link may be out of date. Everything is reachable from the home page, or jump straight to
        a quote.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <PrimaryLink to="/build">Build a quote</PrimaryLink>
        <SecondaryLink to="/">Back to home</SecondaryLink>
      </div>
      <p className="text-xs text-white/30 mt-10">
        Still stuck?{' '}
        <Link to="/contact" className="text-gold underline underline-offset-4">
          Get in touch
        </Link>
        .
      </p>
    </div>
  )
}
