# Kepla — deployment and setup

Everything you need to get this live and start taking enquiries.
Work through it top to bottom; each step is independent and takes a few minutes.

---

## 1. Point Netlify at this repo

The Netlify site currently serving `document-analyzer-kepla.netlify.app` is **not** building
from this repository — it is serving an older build from another source. Until you repoint
it, nothing here will appear on the live URL.

In Netlify: **Site configuration → Build & deploy → Continuous deployment → Link repository**,
and choose `seanmartin91/Kepla`, branch `redesign-lead-gen` (or merge to your default branch
and use that).

Build settings are already in `netlify.toml` and will be picked up automatically:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 20 |

The SPA redirect is also in `netlify.toml`. Without it, `/services`, `/portal` and every other
route return 404 on a hard refresh — that single rule is what stops that happening.

---

## 2. Turn on enquiry notifications

Every form on the site posts to **Netlify Forms** under the form name `kepla-enquiry`.
It works as soon as the site deploys — no configuration needed for capture. But you will not
be told about submissions until you set that up:

**Site configuration → Forms → Form notifications → Add notification → Email notification.**
Send it to the address you actually read.

Submissions are also stored permanently in the Netlify dashboard under **Forms**.

### Where enquiries come from

Every submission includes a `source` field so you can triage at a glance:

| `source` | Meaning |
| --- | --- |
| `quote-builder` | Completed the `/build` wizard — includes their full configuration and the live estimate |
| `contact` | Sent the form on `/contact` |
| `portal-access` | Asked for client portal access |

> **Do not delete the hidden `<form name="kepla-enquiry">` block in `index.html`.**
> Netlify only registers forms it can see in the static HTML at build time. Removing it
> silently breaks every enquiry on the site with no visible error.

---

## 3. Switch on the client portal

The portal degrades gracefully: with no database configured it shows a "request access"
page instead of a login box, so the site is safe to deploy right now. To enable real logins:

### 3a. Create the Supabase project

1. Sign up at [supabase.com](https://supabase.com) and create a project (free tier is fine).
2. Choose a region close to your clients — `Canada (Central)` if offered.
3. Save the database password somewhere safe.

### 3b. Create the tables

Open **SQL Editor → New query**, paste the entire contents of `supabase/schema.sql`, and run it.

This creates `clients`, `profiles`, `assets`, `orders` and `leads`, and turns on row-level
security so that a signed-in user can only ever read rows belonging to their own company.
Nobody can read another client's data, and nothing can be written from the browser.

### 3c. Add the keys to Netlify

In Supabase, go to **Settings → API** and copy two values. In Netlify, go to
**Site configuration → Environment variables** and add:

| Key | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | Your Project URL |
| `VITE_SUPABASE_ANON_KEY` | Your `anon` / `public` key |

Then trigger a redeploy — Vite reads these at build time, so an existing deploy will not
pick them up.

> The `anon` key is designed to be public and is safe in frontend code; row-level security
> is what protects the data. **Never** put the `service_role` key here — it bypasses all
> security and would expose every client's records.

### 3d. Configure email

Under **Authentication → Providers → Email**, keep "Confirm email" enabled so accounts must
verify before signing in. Under **Authentication → URL Configuration**, set the Site URL to
your live domain so confirmation and password-reset links point to the right place.

Supabase's built-in email sender is rate-limited and fine for testing. Before you onboard
real clients, connect your own SMTP under **Project Settings → Auth → SMTP Settings**.

---

## 4. Onboard a client

Anyone can create an account, but a new account sees an empty portal until you link it to a
client — that is deliberate. Three steps in the Supabase SQL Editor:

```sql
-- 1. Create the company
insert into public.clients (company_name, primary_location, account_manager)
values ('Miller & Co.', 'Toronto, ON', 'Sean');

-- 2. After they sign up at /portal, link their account to it
update public.profiles
set client_id = (select id from public.clients where company_name = 'Miller & Co.')
where email = 'jordan@millerco.ca';

-- 3. Add their assets (repeat per device)
insert into public.assets
  (client_id, asset_tag, device_type, make_model, serial_number,
   assigned_to, location, purchase_date, warranty_expires, refresh_due, status)
values (
  (select id from public.clients where company_name = 'Miller & Co.'),
  'KPL-0001', 'Laptop', 'Dell Latitude 5550', 'ABC1234',
  'Jordan Miller', 'Toronto, ON', '2026-07-01', '2029-07-01', '2029-04-01', 'Active'
);
```

Orders work the same way — see the commented examples at the bottom of `supabase/schema.sql`.
For anything beyond a handful of devices, use the Supabase **Table Editor**, which supports
CSV import.

---

## 5. Custom domain

Once `kepla.ca` is pointed at Netlify, no code changes are needed — but two files contain
hardcoded URLs worth updating: `public/sitemap.xml` and the `og:url` / canonical tags in
`index.html`.

---

## Running locally

```bash
npm install
cp .env.example .env      # optional; only needed to work on the portal
npm run dev               # http://localhost:5173
npm run build             # production build into dist/
```

Without a `.env` file the site runs fine and the portal shows its "request access" state.

---

## Things to be aware of

**Pricing in the quote builder is indicative.** The figures in `src/pages/Build.tsx`
(`laptops`, `monitors`, `accessories`, `perSeatServices`, `projectServices`) are realistic
placeholders, not your real margins. Review them before you drive traffic to the page — they
are plain arrays at the top of the file and easy to edit.

**Search engines and JavaScript.** This is a client-rendered single-page app. Page titles and
descriptions are set per route in the browser, which Google handles, but some crawlers and
most social-preview scrapers only read the static HTML — so every share link will show the
homepage description. If organic search becomes a channel worth investing in, the fix is
either Netlify's prerendering or migrating to a static-site framework.

**The legal pages are a starting point, not advice.** `/privacy` and `/terms` are written in
plain language and flag this on the page itself. Have a Canadian lawyer review them against
how you actually operate before relying on them.
