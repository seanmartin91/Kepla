import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  Boxes,
  CalendarClock,
  LogOut,
  Package,
  RefreshCw,
  ShieldCheck,
  Loader2,
} from 'lucide-react'
import { useAuth } from '../lib/auth'
import { supabase, AssetRow, OrderRow, ClientRow } from '../lib/supabase'

const dateFmt = (value: string | null) =>
  value
    ? new Date(value).toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '—'

const DAY = 86_400_000

export default function PortalDashboard() {
  const { user, signOut } = useAuth()
  const [client, setClient] = useState<ClientRow | null>(null)
  const [assets, setAssets] = useState<AssetRow[]>([])
  const [orders, setOrders] = useState<OrderRow[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [tab, setTab] = useState<'overview' | 'assets' | 'orders'>('overview')

  useEffect(() => {
    let active = true

    async function load() {
      if (!supabase) return
      setLoading(true)
      setLoadError(null)

      // Row-level security scopes all three queries to the caller's client_id.
      const [clientRes, assetRes, orderRes] = await Promise.all([
        supabase.from('clients').select('*').maybeSingle(),
        supabase.from('assets').select('*').order('asset_tag', { ascending: true }),
        supabase.from('orders').select('*').order('placed_at', { ascending: false }),
      ])

      if (!active) return

      const firstError = clientRes.error || assetRes.error || orderRes.error
      if (firstError) {
        setLoadError(
          'We could not load your records. This usually means your account has not been linked to a client yet — contact us and we will sort it out.',
        )
      }

      setClient(clientRes.data ?? null)
      setAssets(assetRes.data ?? [])
      setOrders(orderRes.data ?? [])
      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [])

  const stats = useMemo(() => {
    const now = Date.now()
    const warrantyActive = assets.filter(
      (a) => a.warranty_expires && new Date(a.warranty_expires).getTime() > now,
    )
    const expiringSoon = warrantyActive.filter(
      (a) => new Date(a.warranty_expires!).getTime() - now < 90 * DAY,
    )
    const nextRefresh = assets
      .filter((a) => a.refresh_due)
      .map((a) => new Date(a.refresh_due!).getTime())
      .filter((t) => t > now)
      .sort((a, b) => a - b)[0]
    const openOrders = orders.filter(
      (o) => o.status && !['delivered', 'cancelled', 'complete'].includes(o.status.toLowerCase()),
    )

    return {
      total: assets.length,
      warrantyActive: warrantyActive.length,
      expiringSoon: expiringSoon.length,
      nextRefresh: nextRefresh
        ? new Date(nextRefresh).toLocaleDateString('en-CA', { month: 'short', year: 'numeric' })
        : '—',
      refreshCount: assets.filter((a) => a.refresh_due && new Date(a.refresh_due).getTime() > now)
        .length,
      openOrders: openOrders.length,
    }
  }, [assets, orders])

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 18) return 'Good afternoon'
    return 'Good evening'
  })()

  const displayName =
    (user?.user_metadata?.full_name as string | undefined)?.split(' ')[0] ||
    user?.email?.split('@')[0] ||
    'there'

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
          <div>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Client Portal
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-white mb-2">
              {greeting}, {displayName}.
            </h1>
            <p className="text-white/45 text-sm">
              {client?.company_name
                ? `${client.company_name}${client.primary_location ? ` · ${client.primary_location}` : ''}`
                : user?.email}
            </p>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink-subtle hover:border-white/40 text-white/60 hover:text-white text-sm rounded-full transition-colors"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>

        {loading ? (
          <div className="py-24 flex justify-center">
            <Loader2 size={26} className="text-gold animate-spin" />
          </div>
        ) : (
          <>
            {loadError && (
              <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold-muted/20 p-5 mb-8">
                <AlertTriangle size={18} className="text-gold mt-0.5 shrink-0" />
                <p className="text-sm text-white/70 leading-relaxed">{loadError}</p>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-ink-card rounded-full border border-ink-border mb-8 w-fit">
              {(
                [
                  ['overview', 'Overview'],
                  ['assets', `Assets (${assets.length})`],
                  ['orders', `Orders (${orders.length})`],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setTab(value)}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                    tab === value ? 'bg-gold text-ink' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === 'overview' && (
              <>
                <div className="grid gap-px bg-ink-border rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4 mb-8">
                  <Stat
                    icon={Boxes}
                    label="Total assets"
                    value={String(stats.total)}
                    sub={client?.primary_location ?? 'On your account'}
                  />
                  <Stat
                    icon={ShieldCheck}
                    label="Warranties active"
                    value={String(stats.warrantyActive)}
                    sub={
                      stats.expiringSoon > 0
                        ? `${stats.expiringSoon} expiring within 90 days`
                        : 'None expiring soon'
                    }
                  />
                  <Stat
                    icon={CalendarClock}
                    label="Next refresh"
                    value={stats.nextRefresh}
                    sub={stats.refreshCount > 0 ? `${stats.refreshCount} devices scheduled` : '—'}
                  />
                  <Stat
                    icon={Package}
                    label="Open orders"
                    value={String(stats.openOrders)}
                    sub={stats.openOrders > 0 ? 'In progress' : 'Nothing outstanding'}
                  />
                </div>

                <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
                  <Panel title="Recent orders">
                    {orders.length === 0 ? (
                      <Empty message="No orders on record yet." />
                    ) : (
                      <ul className="divide-y divide-ink-border">
                        {orders.slice(0, 5).map((o) => (
                          <li key={o.id} className="py-4 flex items-start justify-between gap-4">
                            <div>
                              <p className="text-white text-sm font-medium">
                                {o.reference ?? 'Order'}
                              </p>
                              <p className="text-white/40 text-xs mt-1">
                                {o.item_count ?? 0} items · placed {dateFmt(o.placed_at)}
                              </p>
                            </div>
                            <StatusPill status={o.status} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </Panel>

                  <Panel title="Refresh planning">
                    {stats.refreshCount === 0 ? (
                      <Empty message="No refreshes scheduled." />
                    ) : (
                      <>
                        <div className="flex items-start gap-3.5 mb-5">
                          <RefreshCw size={20} className="text-gold mt-0.5 shrink-0" />
                          <p className="text-white/60 text-sm leading-relaxed">
                            <span className="text-white font-medium">
                              {stats.refreshCount} devices
                            </span>{' '}
                            are due for refresh, the first in {stats.nextRefresh}.
                          </p>
                        </div>
                        <p className="text-white/40 text-xs leading-relaxed mb-5">
                          We recommend starting the quote process around 60 days ahead to secure
                          stock and avoid a rushed changeover.
                        </p>
                        <Link
                          to="/contact"
                          className="inline-flex items-center justify-center w-full px-5 py-2.5 bg-gold hover:bg-gold-light text-ink font-semibold text-sm rounded-full transition-all"
                        >
                          Start refresh quote
                        </Link>
                      </>
                    )}
                  </Panel>
                </div>
              </>
            )}

            {tab === 'assets' && (
              <Panel title="Asset register" padded={false}>
                {assets.length === 0 ? (
                  <div className="p-8">
                    <Empty message="No assets recorded against your account yet. They appear here once your first order ships." />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[52rem]">
                      <thead>
                        <tr className="text-left text-[0.7rem] uppercase tracking-[0.12em] text-white/35 border-b border-ink-border">
                          <Th>Tag</Th>
                          <Th>Device</Th>
                          <Th>Serial</Th>
                          <Th>Assigned to</Th>
                          <Th>Warranty</Th>
                          <Th>Refresh due</Th>
                          <Th>Status</Th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink-border">
                        {assets.map((a) => (
                          <tr key={a.id} className="hover:bg-ink-hover/50 transition-colors">
                            <Td className="text-gold font-medium">{a.asset_tag ?? '—'}</Td>
                            <Td className="text-white">{a.make_model ?? a.device_type ?? '—'}</Td>
                            <Td className="text-white/45 font-mono text-xs">
                              {a.serial_number ?? '—'}
                            </Td>
                            <Td className="text-white/60">{a.assigned_to ?? 'Unassigned'}</Td>
                            <Td className="text-white/60">{dateFmt(a.warranty_expires)}</Td>
                            <Td className="text-white/60">{dateFmt(a.refresh_due)}</Td>
                            <Td>
                              <StatusPill status={a.status} />
                            </Td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Panel>
            )}

            {tab === 'orders' && (
              <Panel title="Order history" padded={false}>
                {orders.length === 0 ? (
                  <div className="p-8">
                    <Empty message="No orders on record yet." />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[44rem]">
                      <thead>
                        <tr className="text-left text-[0.7rem] uppercase tracking-[0.12em] text-white/35 border-b border-ink-border">
                          <Th>Reference</Th>
                          <Th>Placed</Th>
                          <Th>Items</Th>
                          <Th>Value</Th>
                          <Th>Expected ship</Th>
                          <Th>Status</Th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink-border">
                        {orders.map((o) => (
                          <tr key={o.id} className="hover:bg-ink-hover/50 transition-colors">
                            <Td className="text-gold font-medium">{o.reference ?? '—'}</Td>
                            <Td className="text-white/60">{dateFmt(o.placed_at)}</Td>
                            <Td className="text-white/60">{o.item_count ?? '—'}</Td>
                            <Td className="text-white">
                              {o.total_cad != null
                                ? o.total_cad.toLocaleString('en-CA', {
                                    style: 'currency',
                                    currency: 'CAD',
                                    maximumFractionDigits: 0,
                                  })
                                : '—'}
                            </Td>
                            <Td className="text-white/60">{dateFmt(o.expected_ship_at)}</Td>
                            <Td>
                              <StatusPill status={o.status} />
                            </Td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Panel>
            )}
          </>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Stat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Boxes
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="bg-ink-card p-6">
      <Icon size={18} className="text-gold mb-4" strokeWidth={1.5} />
      <p className="text-[0.7rem] uppercase tracking-[0.12em] text-white/35 mb-2">{label}</p>
      <p className="font-serif text-3xl font-bold text-white mb-1.5">{value}</p>
      <p className="text-xs text-white/40">{sub}</p>
    </div>
  )
}

function Panel({
  title,
  children,
  padded = true,
}: {
  title: string
  children: React.ReactNode
  padded?: boolean
}) {
  return (
    <div className="bg-ink-card border border-ink-border rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-ink-border">
        <h2 className="text-[0.7rem] uppercase tracking-[0.15em] text-white/40">{title}</h2>
      </div>
      <div className={padded ? 'px-6 py-2' : ''}>{children}</div>
    </div>
  )
}

function Empty({ message }: { message: string }) {
  return <p className="text-white/35 text-sm py-6 leading-relaxed">{message}</p>
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-6 py-3.5 font-medium whitespace-nowrap">{children}</th>
}

function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>
}

function StatusPill({ status }: { status: string | null }) {
  if (!status) return <span className="text-white/30 text-xs">—</span>
  const s = status.toLowerCase()
  const tone =
    s.includes('deliver') || s.includes('active') || s.includes('complete')
      ? 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10'
      : s.includes('cancel') || s.includes('retire') || s.includes('fault')
        ? 'text-red-300 border-red-500/30 bg-red-500/10'
        : 'text-gold border-gold/30 bg-gold-muted'
  return (
    <span className={`inline-block text-[0.7rem] px-2.5 py-1 rounded-full border ${tone}`}>
      {status}
    </span>
  )
}
