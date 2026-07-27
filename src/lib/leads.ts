import { supabase } from './supabase'

export interface LeadPayload {
  /** Which form the enquiry came from — lets you triage in one inbox. */
  source: 'quote-builder' | 'contact' | 'portal-access'
  name: string
  email: string
  company: string
  phone?: string
  teamSize?: string
  message?: string
  /** Human-readable summary of a Build My Box configuration. */
  configuration?: string
  estimateCad?: number | null
}

/**
 * Every enquiry is written to Netlify Forms (which emails you and keeps a
 * permanent record in the Netlify dashboard). If Supabase is also configured
 * we mirror the lead into the `leads` table so it is queryable.
 *
 * Netlify only registers forms it can see in the static HTML at deploy time,
 * so index.html contains a hidden copy of this form with matching field names.
 */
export async function submitLead(payload: LeadPayload): Promise<{ error: string | null }> {
  const fields: Record<string, string> = {
    'form-name': 'kepla-enquiry',
    source: payload.source,
    name: payload.name,
    email: payload.email,
    company: payload.company,
    phone: payload.phone ?? '',
    teamSize: payload.teamSize ?? '',
    message: payload.message ?? '',
    configuration: payload.configuration ?? '',
    estimate: payload.estimateCad != null ? String(payload.estimateCad) : '',
    submittedAt: new Date().toISOString(),
  }

  let netlifyOk = false
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(fields).toString(),
    })
    netlifyOk = res.ok
  } catch {
    netlifyOk = false
  }

  let supabaseOk = false
  if (supabase) {
    try {
      const { error } = await supabase.from('leads').insert({
        source: payload.source,
        name: payload.name,
        email: payload.email,
        company: payload.company,
        phone: payload.phone || null,
        team_size: payload.teamSize || null,
        message: payload.message || null,
        configuration: payload.configuration || null,
        estimate_cad: payload.estimateCad ?? null,
      })
      supabaseOk = !error
    } catch {
      supabaseOk = false
    }
  }

  if (netlifyOk || supabaseOk) return { error: null }

  return {
    error:
      'We could not submit that automatically. Please email hello@kepla.ca directly and we will pick it up straight away.',
  }
}
