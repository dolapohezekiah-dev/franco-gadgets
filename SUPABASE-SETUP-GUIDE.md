# 🗄️ Franco Gadgets — Supabase + Vercel Setup Guide

This guide takes you from zero to a **fully working live website** where:
- Products are stored in a real database
- Admin dashboard changes are visible to ALL customers instantly
- Everything is FREE

---

## WHAT YOU NEED

- Your `franco-gadgets` project folder
- A free Supabase account → https://supabase.com
- A free Vercel account → https://vercel.com
- A free GitHub account → https://github.com (needed for Vercel deployment)

---

## PART 1 — SET UP SUPABASE (Your Database)

### Step 1: Create a Supabase Account
1. Go to **https://supabase.com**
2. Click **Start your project** → sign up with GitHub or email
3. Once logged in, click **New Project**

### Step 2: Create Your Project
Fill in these fields:
- **Name:** `franco-gadgets`
- **Database Password:** Choose a strong password and **save it somewhere safe**
- **Region:** Choose the closest to Nigeria — `West EU (Ireland)` is usually fastest from Lagos
- Click **Create new project** and wait about 2 minutes

### Step 3: Create Your Database Tables
1. In your Supabase project, look at the left sidebar
2. Click **SQL Editor**
3. Click **New query**
4. Open the file `supabase-setup.sql` from your project folder
5. Copy the **entire contents** of that file
6. Paste it into the SQL editor
7. Click the green **Run** button (or press Ctrl+Enter)
8. You should see: `Setup complete! Tables created successfully.`

✅ Your database tables are now ready.

### Step 4: Get Your API Keys
1. In the left sidebar, click **Settings** (gear icon at the bottom)
2. Click **API**
3. You will see two important values — copy both:

```
Project URL:    https://abcdefghijkl.supabase.co
anon public:    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx...
```

Keep these open — you'll need them in the next parts.

---

## PART 2 — CONNECT SUPABASE TO YOUR PROJECT (Local)

### Step 5: Create Your .env File
1. Open your `franco-gadgets` folder in VS Code
2. Look for the file called `.env.example`
3. Make a **copy** of it in the same folder
4. Rename the copy to exactly: `.env` (no .example, just .env)
5. Open the `.env` file and fill in your values:

```
VITE_SUPABASE_URL=https://abcdefghijkl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx...
```

Replace the placeholder values with your real ones from Step 4.

### Step 6: Install Dependencies & Test
Open a terminal in your project folder and run:

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

**What should happen:**
- The store loads as normal
- In the background, the app connects to Supabase
- Because the products table is empty, it automatically fills it with your 12 default products
- Open browser DevTools (F12) → Console — you should see: `Seeding Supabase with default products...`

### Step 7: Verify in Supabase
1. Go back to your Supabase project
2. Click **Table Editor** in the left sidebar
3. Click the **products** table
4. You should see all 12 products listed there ✅

If you see them — **your database connection is working perfectly.**

---

## PART 3 — TEST THE ADMIN DASHBOARD

### Step 8: Log Into Admin
1. Go to **http://localhost:5173/admin/login**
2. Username: `theadmindoncome`
3. Password: `theadmindoncome`

### Step 9: Make a Change
1. Click **Products** in the sidebar
2. Click the edit (pencil) icon on any product
3. Change the price or name
4. Click **Save Changes**

### Step 10: Verify It Saved to Database
1. Go back to Supabase → Table Editor → products
2. Find that product
3. You should see your updated price/name there ✅

**This means:** When a customer opens your store, they fetch products from this same database and see your changes immediately.

---

## PART 4 — DEPLOY TO VERCEL (Go Live)

### Step 11: Push to GitHub
You need your code on GitHub so Vercel can access it.

1. Go to **https://github.com** and create a new repository
   - Name: `franco-gadgets`
   - Set it to **Private** (recommended)
   - Do NOT add README or .gitignore (you already have them)

2. In your VS Code terminal, run these commands one by one:

```bash
git init
git add .
git commit -m "Initial commit - Franco Gadgets"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/franco-gadgets.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 12: Deploy on Vercel
1. Go to **https://vercel.com** and sign in with GitHub
2. Click **Add New Project**
3. Find your `franco-gadgets` repository and click **Import**
4. Vercel auto-detects Vite — leave all settings as default
5. **IMPORTANT — Before clicking Deploy**, you must add your environment variables:
   - Look for the section called **Environment Variables**
   - Add the first variable:
     - Name: `VITE_SUPABASE_URL`
     - Value: your Supabase project URL
   - Add the second variable:
     - Name: `VITE_SUPABASE_ANON_KEY`
     - Value: your Supabase anon key
6. Now click **Deploy**
7. Wait about 60 seconds
8. Vercel gives you a live URL like: `https://franco-gadgets.vercel.app`

✅ Your store is now LIVE on the internet.

---

## PART 5 — HOW IT ALL WORKS NOW

```
┌─────────────────────────────────────────────────────┐
│                   SUPABASE DATABASE                  │
│                                                      │
│   products table    │    settings table              │
│   (12+ products)    │    (WhatsApp, fees, etc.)      │
└──────────┬──────────┴──────────┬───────────────────-─┘
           │ reads/writes        │ reads/writes
           ▼                     ▼
┌──────────────────┐   ┌───────────────────────────────┐
│   YOUR STORE     │   │   ADMIN DASHBOARD             │
│   (Vercel)       │   │   (Vercel /admin/login)        │
│                  │   │                               │
│ All customers    │   │ You log in here               │
│ fetch products   │   │ Add/edit/delete products      │
│ from Supabase    │   │ Changes save to Supabase      │
│                  │   │ Customers see changes         │
│                  │   │ within seconds                │
└──────────────────┘   └───────────────────────────────┘
```

**The flow when you add a product:**
1. You log into `/admin/login` on your live Vercel site
2. You click Add Product, fill in details, click Save
3. The product saves to your Supabase database
4. A customer opens the store → React fetches from Supabase → they see the new product
5. **No redeployment needed. Ever.**

---

## PART 6 — YOUR DAILY WORKFLOW

### Adding a New Product
1. Go to `https://franco-gadgets.vercel.app/admin/login`
2. Log in with your credentials
3. Click **Add Product** → fill in details → Save
4. Done. Customers see it immediately.

### Editing a Product
1. Go to Admin → Products
2. Click the pencil icon → make changes → Save
3. Done.

### Changing Your WhatsApp Number
1. Go to Admin → Settings
2. Update the number → Save Settings
3. Done. All new orders go to the new number.

### Changing Delivery Fee
1. Go to Admin → Settings
2. Update Delivery Fee → Save Settings
3. Done.

---

## TROUBLESHOOTING

**"Failed to fetch products" error on the store**
→ Your `.env` file has wrong Supabase keys. Double-check them.

**Products show but admin changes don't save**
→ Check that RLS policies were created. Re-run the SQL file in Supabase.

**On Vercel, store loads but shows no products**
→ You forgot to add Environment Variables in Vercel. Go to:
   Vercel → Your Project → Settings → Environment Variables → add both keys → Redeploy

**"relation products does not exist" error**
→ The SQL setup didn't run. Go to Supabase → SQL Editor and run `supabase-setup.sql` again.

**Admin dashboard shows old data after changes**
→ Hard refresh the browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## SECURITY NOTES

- Your **anon key** is safe to expose in frontend code — Supabase designed it for this
- Your **service role key** (in Supabase Settings → API) is secret — never use it in frontend
- The admin login (`theadmindoncome`) only protects the UI, not the database itself
- For a bigger business, consider adding Supabase Auth for proper admin login

---

## COST

| Service | Free Tier | When you'd need to pay |
|---------|-----------|------------------------|
| Supabase | 500MB database, 2GB bandwidth/month | When you have thousands of products or huge images |
| Vercel | 100GB bandwidth/month, unlimited deploys | Almost never for a small store |
| GitHub | Unlimited private repos | Never for this use case |

**For a typical Nigerian gadget store, you will likely never need to pay anything.**
