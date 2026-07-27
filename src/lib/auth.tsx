import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from './supabase'

interface AuthState {
  session: Session | null
  user: User | null
  loading: boolean
  configured: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (
    email: string,
    password: string,
    companyName: string,
    fullName: string,
  ) => Promise<{ error: string | null; needsConfirmation: boolean }>
  resetPassword: (email: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      setLoading(false)
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const notConfigured = 'The client portal is not connected to its database yet.'

  const value: AuthState = {
    session,
    user: session?.user ?? null,
    loading,
    configured: isSupabaseConfigured,

    async signIn(email, password) {
      if (!supabase) return { error: notConfigured }
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      return { error: error ? friendly(error.message) : null }
    },

    async signUp(email, password, companyName, fullName) {
      if (!supabase) return { error: notConfigured, needsConfirmation: false }
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { company_name: companyName.trim(), full_name: fullName.trim() },
          emailRedirectTo: `${window.location.origin}/portal`,
        },
      })
      if (error) return { error: friendly(error.message), needsConfirmation: false }
      return { error: null, needsConfirmation: !data.session }
    },

    async resetPassword(email) {
      if (!supabase) return { error: notConfigured }
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/portal`,
      })
      return { error: error ? friendly(error.message) : null }
    },

    async signOut() {
      if (!supabase) return
      await supabase.auth.signOut()
      setSession(null)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function friendly(message: string): string {
  const m = message.toLowerCase()
  if (m.includes('invalid login credentials')) {
    return 'That email and password combination does not match an account.'
  }
  if (m.includes('email not confirmed')) {
    return 'Please confirm your email address first — check your inbox for the link.'
  }
  if (m.includes('user already registered')) {
    return 'An account already exists for this email. Try signing in instead.'
  }
  if (m.includes('password should be at least')) {
    return 'Password must be at least 8 characters.'
  }
  if (m.includes('rate limit') || m.includes('too many')) {
    return 'Too many attempts. Please wait a minute and try again.'
  }
  if (m.includes('failed to fetch') || m.includes('network') || m.includes('load failed')) {
    return 'We could not reach the portal service. Check your connection and try again — if it keeps happening, email hello@kepla.ca.'
  }
  return message
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
