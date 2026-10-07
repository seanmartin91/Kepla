import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export const CRISP_WEBSITE_ID = '59561ac8-b202-4524-8785-ae84fa4c4fcb'

// Module-level guard so StrictMode's double-invoked effects only configure once.
let configured = false

export default function CrispChat() {
  useEffect(() => {
    if (configured) return
    configured = true
    Crisp.configure(CRISP_WEBSITE_ID)
  }, [])
  return null
}
