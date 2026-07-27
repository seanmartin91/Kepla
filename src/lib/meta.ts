/**
 * Lightweight per-route metadata. Keeps titles and descriptions correct for
 * users, browser history and any crawler that executes JavaScript.
 *
 * Note: this runs client-side. For crawlers that do not execute JS, use
 * Netlify prerendering or migrate to a static-site framework later.
 */
export function setMeta(title: string, description: string) {
  document.title = title

  const set = (selector: string, attr: string, value: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(selector)
    if (!el) {
      el = document.createElement('meta')
      const [key, val] = selector.replace(/^meta\[|\]$/g, '').split('=')
      el.setAttribute(key, val.replace(/"/g, ''))
      document.head.appendChild(el)
    }
    el.setAttribute(attr, value)
  }

  set('meta[name="description"]', 'content', description)
  set('meta[property="og:title"]', 'content', title)
  set('meta[property="og:description"]', 'content', description)
  set('meta[name="twitter:title"]', 'content', title)
  set('meta[name="twitter:description"]', 'content', description)

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = window.location.origin + window.location.pathname
}
