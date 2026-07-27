-- =====================================================================
-- Kepla client portal — database schema
-- =====================================================================
-- Run this ONCE in the Supabase SQL Editor (Dashboard > SQL Editor > New query).
--
-- What it creates:
--   clients        one row per customer company
--   profiles       links a Supabase auth user to a client
--   assets         the asset register shown in the portal
--   orders         order history and live order status
--   leads          website enquiries mirrored from the contact/quote forms
--
-- Security model: row-level security is ON for every table. A signed-in user
-- can only ever read rows belonging to the client their profile points at.
-- Nobody can read anyone else's data, and nobody can write anything from the
-- browser — you populate assets and orders from the Supabase dashboard.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Tables
-- ---------------------------------------------------------------------

create table if not exists public.clients (
  id               uuid primary key default gen_random_uuid(),
  company_name     text not null,
  primary_location text,
  account_manager  text,
  created_at       timestamptz not null default now()
);

create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  client_id  uuid references public.clients(id) on delete set null,
  full_name  text,
  email      text,
  created_at timestamptz not null default now()
);

create table if not exists public.assets (
  id               uuid primary key default gen_random_uuid(),
  client_id        uuid not null references public.clients(id) on delete cascade,
  asset_tag        text,
  device_type      text,
  make_model       text,
  serial_number    text,
  assigned_to      text,
  location         text,
  purchase_date    date,
  warranty_expires date,
  refresh_due      date,
  status           text default 'Active',
  created_at       timestamptz not null default now()
);

create table if not exists public.orders (
  id               uuid primary key default gen_random_uuid(),
  client_id        uuid not null references public.clients(id) on delete cascade,
  reference        text,
  status           text default 'In configuration',
  item_count       integer,
  total_cad        numeric(12,2),
  placed_at        timestamptz default now(),
  expected_ship_at timestamptz,
  notes            text
);

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  source        text,
  name          text,
  email         text,
  company       text,
  phone         text,
  team_size     text,
  message       text,
  configuration text,
  estimate_cad  numeric(12,2),
  status        text default 'New',
  created_at    timestamptz not null default now()
);

create index if not exists assets_client_id_idx on public.assets(client_id);
create index if not exists orders_client_id_idx on public.orders(client_id);
create index if not exists leads_created_at_idx on public.leads(created_at desc);

-- ---------------------------------------------------------------------
-- 2. Auto-create a profile whenever someone signs up
-- ---------------------------------------------------------------------
-- The new profile has client_id = NULL, so a brand-new signup sees an empty
-- portal until you link them to a client (step 5 below). That is deliberate:
-- anyone can create an account, but nobody sees data until you say so.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- 3. Helper: which client does the current user belong to?
-- ---------------------------------------------------------------------

create or replace function public.current_client_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select client_id from public.profiles where id = auth.uid();
$$;

-- ---------------------------------------------------------------------
-- 4. Row-level security
-- ---------------------------------------------------------------------

alter table public.clients  enable row level security;
alter table public.profiles enable row level security;
alter table public.assets   enable row level security;
alter table public.orders   enable row level security;
alter table public.leads    enable row level security;

-- Users read only their own profile.
drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles
  for select using (id = auth.uid());

-- Users read only their own client record.
drop policy if exists "own client" on public.clients;
create policy "own client" on public.clients
  for select using (id = public.current_client_id());

-- Users read only assets belonging to their client.
drop policy if exists "own assets" on public.assets;
create policy "own assets" on public.assets
  for select using (client_id = public.current_client_id());

-- Users read only orders belonging to their client.
drop policy if exists "own orders" on public.orders;
create policy "own orders" on public.orders
  for select using (client_id = public.current_client_id());

-- Anyone (including anonymous website visitors) may submit a lead,
-- but nobody may read leads back through the public API.
drop policy if exists "anyone can submit a lead" on public.leads;
create policy "anyone can submit a lead" on public.leads
  for insert to anon, authenticated with check (true);

-- Note: no SELECT policy on leads. Read them in the Supabase Table Editor,
-- which uses the service role and bypasses RLS.

-- =====================================================================
-- 5. ONBOARDING A CLIENT — run this each time you add a customer
-- =====================================================================
--
-- Step A: create the client company
--
--   insert into public.clients (company_name, primary_location, account_manager)
--   values ('Miller & Co.', 'Toronto, ON', 'Sean');
--
-- Step B: ask the customer to create an account at /portal, then link them:
--
--   update public.profiles
--   set client_id = (select id from public.clients where company_name = 'Miller & Co.')
--   where email = 'jordan@millerco.ca';
--
-- Step C: add their assets
--
--   insert into public.assets
--     (client_id, asset_tag, device_type, make_model, serial_number,
--      assigned_to, location, purchase_date, warranty_expires, refresh_due, status)
--   values (
--     (select id from public.clients where company_name = 'Miller & Co.'),
--     'KPL-0001', 'Laptop', 'Dell Latitude 5550', 'ABC1234',
--     'Jordan Miller', 'Toronto, ON', '2026-07-01', '2029-07-01', '2029-04-01', 'Active'
--   );
--
-- Step D: add an order
--
--   insert into public.orders
--     (client_id, reference, status, item_count, total_cad, placed_at, expected_ship_at)
--   values (
--     (select id from public.clients where company_name = 'Miller & Co.'),
--     'KPL-2026-001', 'In configuration', 8, 22400.00, now(), now() + interval '2 days'
--   );
--
-- =====================================================================
