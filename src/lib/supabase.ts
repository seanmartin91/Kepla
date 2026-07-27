import { createClient, SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/**
 * Supabase is optional at build time. If the env vars are absent the site still
 * builds and every public page works — only the client portal degrades to a
 * "portal not configured yet" notice instead of crashing the whole app.
 */
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

export interface AssetRow {
  id: string
  client_id: string
  asset_tag: string | null
  device_type: string | null
  make_model: string | null
  serial_number: string | null
  assigned_to: string | null
  location: string | null
  purchase_date: string | null
  warranty_expires: string | null
  refresh_due: string | null
  status: string | null
}

export interface OrderRow {
  id: string
  client_id: string
  reference: string | null
  status: string | null
  item_count: number | null
  total_cad: number | null
  placed_at: string | null
  expected_ship_at: string | null
  notes: string | null
}

export interface ClientRow {
  id: string
  company_name: string | null
  account_manager: string | null
  primary_location: string | null
}
