# 🗄️ Franco Gadgets — Supabase Backend Setup Guide

Follow these steps ONCE and your admin dashboard will work for real — permanently saving products to a database that all visitors read from.

---

## STEP 1 — Create Your Free Supabase Account

1. Go to **https://supabase.com**
2. Click **Start your project** → Sign up with GitHub or email
3. Click **New Project**
4. Fill in:
   - **Name:** franco-gadgets
   - **Database Password:** Choose a strong password (save it!)
   - **Region:** Pick the one closest to Nigeria (eu-west or us-east)
5. Click **Create new project** — wait about 1 minute for it to set up

---

## STEP 2 — Create the Database Tables

Once your project is ready, click **SQL Editor** in the left sidebar.
Click **New query** and paste this entire block, then click **Run**:

```sql
-- ============================================================
-- FRANCO GADGETS — Database Tables
-- Run this once in Supabase SQL Editor
-- ============================================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  brand       TEXT NOT NULL DEFAULT '',
  category    TEXT NOT NULL DEFAULT 'laptop',
  condition   TEXT NOT NULL DEFAULT 'New',
  price       NUMERIC NOT NULL DEFAULT 0,
  "originalPrice" NUMERIC DEFAULT 0,
  ram         NUMERIC,
  storage     NUMERIC,
  processor   TEXT,
  screen      TEXT,
  battery     TEXT,
  rating      NUMERIC DEFAULT 4.5,
  reviews     INTEGER DEFAULT 0,
  sold        INTEGER DEFAULT 0,
  warranty    TEXT DEFAULT '3 Months Warranty',
  image       TEXT DEFAULT '',
  images      TEXT DEFAULT '[]',
  featured    BOOLEAN DEFAULT false,
  "bestSeller" BOOLEAN DEFAULT false,
  description TEXT DEFAULT '',
  specs       TEXT DEFAULT '{}',
  variants    TEXT DEFAULT '[]',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Settings table (single row for store config)
CREATE TABLE IF NOT EXISTS settings (
  id            INTEGER PRIMARY KEY DEFAULT 1,
  whatsapp      TEXT DEFAULT '2348136513488',
  store_name    TEXT DEFAULT 'Franco Gadgets',
  tagline       TEXT DEFAULT 'Premium Gadgets. Real Deals.',
  delivery_fee  NUMERIC DEFAULT 3500,
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Allow public read access (so your store can show products)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read products"
  ON products FOR SELECT USING (true);

CREATE POLICY "Public can read settings"
  ON settings FOR SELECT USING (true);

CREATE POLICY "Public can insert products"
  ON products FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can update products"
  ON products FOR UPDATE USING (true);

CREATE POLICY "Public can delete products"
  ON products FOR DELETE USING (true);

CREATE POLICY "Public can upsert settings"
  ON settings FOR ALL USING (true);
```

You should see **"Success. No rows returned"** — that means it worked.

---

## STEP 3 — Get Your API Keys

1. In your Supabase project, click **Project Settings** (gear icon, bottom left)
2. Click **API** in the settings menu
3. You will see two values — copy both:
   - **Project URL** → looks like `https://abcdefghij.supabase.co`
   - **anon public key** → a very long string starting with `eyJ...`

---

## STEP 4 — Add Keys to Your Project

In your `franco-gadgets` folder, create a file called `.env` (no extension, just `.env`):

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace the values with your actual URL and key from Step 3.

**Important:** The file must be named exactly `.env` — not `.env.txt`

---

## STEP 5 — Run the Project

```bash
npm install
npm run dev
```

Visit **http://localhost:5173** — your store loads products from Supabase now.

Go to **http://localhost:5173/admin/login** and log in.
When you first open the admin dashboard, it will automatically seed the database with your 12 default products from `products.js`.

From this point:
- ✅ Adding a product → saves to Supabase → visible to ALL visitors instantly
- ✅ Editing a product → updates Supabase → all visitors see the change
- ✅ Deleting a product → removes from Supabase → gone for everyone
- ✅ Toggling Featured/Best Seller → updates Supabase → homepage updates

---

## STEP 6 — Deploy to Vercel

1. Push your project to GitHub (make sure `.env` is in `.gitignore` — it already is)
2. Go to **https://vercel.com** → Import your GitHub repo
3. Before clicking Deploy, click **Environment Variables** and add:
   - `VITE_SUPABASE_URL` → your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` → your Supabase anon key
4. Click **Deploy**

Your live site at `yoursite.vercel.app` now has a real backend.
Every admin change you make is immediately visible worldwide.

---

## How It All Works (Simple Explanation)

```
You (Admin)
    │
    │  Log in at /admin/login
    │  Add/edit/delete products in the dashboard
    ▼
Supabase Database  ←──────────────────────────────┐
    │                                              │
    │  Stores products permanently in PostgreSQL   │
    │  (a real database in the cloud)              │
    ▼                                              │
Your Vercel Website                                │
    │                                              │
    │  Every visitor's browser fetches             │
    │  products from Supabase                      │
    │  Nobody gets stale/old data                  │
    ▼                                              │
Customer sees your latest products ────────────────┘
```

---

## Troubleshooting

**"Supabase keys not found" warning** → Your `.env` file is missing or named wrong. Make sure it is `.env` not `.env.txt`.

**Products not loading** → Check the SQL ran successfully in Step 2. Visit the Supabase Table Editor and confirm the `products` table exists.

**Can't save products** → Your Row Level Security policies may not have applied. Re-run the SQL from Step 2.

**Works locally but not on Vercel** → You forgot to add environment variables in the Vercel dashboard (Step 6).
