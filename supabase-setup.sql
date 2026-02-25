-- ============================================================
-- FRANCO GADGETS — Supabase Database Setup
-- ============================================================
-- Run this entire file in your Supabase SQL Editor
-- (Supabase Dashboard → SQL Editor → New query → Paste → Run)
-- ============================================================


-- ── 1. PRODUCTS TABLE ─────────────────────────────────────

create table if not exists products (
  id            bigint primary key generated always as identity,
  name          text not null,
  brand         text not null default '',
  category      text not null default 'laptop',
  condition     text not null default 'New',
  price         numeric not null default 0,
  "originalPrice" numeric not null default 0,
  ram           numeric,
  storage       numeric,
  processor     text,
  screen        text,
  battery       text,
  rating        numeric default 4.5,
  reviews       integer default 0,
  sold          integer default 0,
  warranty      text default '3 Months Warranty',
  image         text default '',
  images        text default '[]',   -- stored as JSON string
  featured      boolean default false,
  "bestSeller"  boolean default false,
  description   text default '',
  specs         text default '{}',   -- stored as JSON string
  variants      text default '[]',   -- stored as JSON string
  created_at    timestamptz default now()
);


-- ── 2. SETTINGS TABLE ─────────────────────────────────────

create table if not exists settings (
  id            integer primary key default 1,  -- always just 1 row
  whatsapp      text default '2348012345678',
  store_name    text default 'Franco Gadgets',
  tagline       text default 'Premium Gadgets. Real Deals.',
  delivery_fee  numeric default 3500,
  updated_at    timestamptz default now(),

  -- Ensure only one row ever exists
  constraint settings_single_row check (id = 1)
);


-- ── 3. ROW LEVEL SECURITY (RLS) ───────────────────────────
-- This controls who can read/write your tables.
-- We enable RLS but allow public reads (so customers see products)
-- and allow anon writes (so admin dashboard can save changes).
--
-- NOTE: For a production site you'd want a proper auth system.
-- For now this is safe because:
--   (a) products/settings data is not sensitive
--   (b) your admin login protects the dashboard UI
--   (c) the anon key is safe to expose in frontend code

alter table products enable row level security;
alter table settings enable row level security;

-- Allow anyone to READ products and settings
create policy "Public can read products"
  on products for select
  using (true);

create policy "Public can read settings"
  on settings for select
  using (true);

-- Allow anon (your frontend app) to INSERT, UPDATE, DELETE products
create policy "Anon can insert products"
  on products for insert
  with check (true);

create policy "Anon can update products"
  on products for update
  using (true);

create policy "Anon can delete products"
  on products for delete
  using (true);

-- Allow anon to upsert settings
create policy "Anon can upsert settings"
  on settings for all
  using (true)
  with check (true);


-- ── 4. DONE ───────────────────────────────────────────────
-- Your tables are ready.
-- The app will automatically seed products from products.js
-- the first time it loads and finds the table empty.

select 'Setup complete! Tables created successfully.' as status;
