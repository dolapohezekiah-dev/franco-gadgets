# 🚀 Franco Gadgets — Setup & Customization Guide

## 📦 Getting Started (Vite)

### Prerequisites
- Node.js (v18 or newer) — download at https://nodejs.org
- VS Code (recommended)

### Installation & Running

```bash
# 1. Open terminal in the project folder
cd franco-gadgets

# 2. Install dependencies (only needed once)
npm install

# 3. Start the development server
npm run dev
```

Your site opens at **http://localhost:5173**  ← (Vite uses port 5173, not 3000)

### Build for Production
```bash
npm run build
```
Creates a `dist/` folder. Upload that to Vercel, Netlify, or cPanel.

### Preview Production Build Locally
```bash
npm run preview
```

---

## 🔐 Admin Dashboard

Go to: **http://localhost:5173/admin/login**

- **Username:** `theadmindoncome`  
- **Password:** `theadmindoncome`

From the dashboard you can:
- ✅ Add, edit, and delete products
- ✅ Upload product images from your computer
- ✅ Toggle Featured / Best Seller status with one click
- ✅ Export/import products as JSON backup
- ✅ Change WhatsApp number, delivery fee, and store settings

---

## ✏️ HOW TO EDIT PRODUCTS (in VS Code)

### 📁 Product File Location
```
src/data/products.js
```

---

### ➕ Adding a New Product

Copy any existing product block, paste at the end of the `products` array, increment the `id`.

```js
{
  id: 13,
  name: "Samsung Galaxy A55",
  brand: "Samsung",
  category: "smartphone",      // "laptop" | "smartphone" | "gaming" | "apple" | "accessory"
  condition: "New",            // "New" or "UK Used"
  price: 185000,               // Selling price in Naira (no commas)
  originalPrice: 210000,       // Original/crossed-out price
  ram: 8,                      // RAM in GB (null for accessories)
  storage: 256,                // Storage in GB (null for accessories)
  processor: "Exynos 1480",
  screen: '6.6"',
  battery: "5000mAh",
  rating: 4.5,
  reviews: 12,
  sold: 45,
  warranty: "1 Year Warranty",
  image: "https://...",        // Main image URL
  images: ["https://..."],     // All images array
  featured: true,              // Show in Hot Deals on homepage
  bestSeller: false,           // Show in Best Sellers on homepage
  description: "Your description...",
  specs: {
    Display: '6.6" Super AMOLED 120Hz',
    Charging: "25W Fast Charge",
    OS: "Android 14",
  },
  variants: [
    { label: "8GB / 128GB", priceAdd: -20000 },
    { label: "8GB / 256GB", priceAdd: 0 },
  ],
},
```

---

### 💰 Changing a Price
```js
price: 265000,         // ← Selling price
originalPrice: 300000, // ← Crossed-out original price
```

### 🖼️ Changing Product Images

**Option A — Online image URL:**
```js
image: "https://example.com/your-image.jpg",
```

**Option B — Local image file:**
1. Copy image to the `public/images/` folder
2. Set: `image: "/images/your-filename.jpg"`

### 🔄 Changing Condition
```js
condition: "New",     // or "UK Used"
```

---

## 📱 Changing Your WhatsApp Number

In `src/data/products.js`:
```js
export const WHATSAPP_NUMBER = "2348136513488";
```
No `+` sign. Include country code. e.g., `+234 803 456 7890` → `2348034567890`

## 🚚 Changing Delivery Fee
```js
export const DELIVERY_FEE = 3500; // Set to 0 for free delivery
```

---

## 📁 Project Structure

```
franco-gadgets/
├── index.html               ← Vite entry HTML (root level)
├── vite.config.js           ← Vite configuration
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── public/
│   └── images/              ← Put your product images here
└── src/
    ├── admin/               ← Admin Dashboard pages
    │   ├── AdminLogin.jsx
    │   ├── AdminLayout.jsx
    │   ├── AdminDashboard.jsx
    │   ├── AdminProducts.jsx
    │   ├── AdminProductForm.jsx
    │   └── AdminSettings.jsx
    ├── components/          ← Shared UI components
    ├── context/             ← Global state (Cart, Admin)
    ├── data/
    │   └── products.js      ← ⭐ EDIT THIS to change products
    ├── hooks/
    │   └── useProducts.js   ← Live product data hook
    ├── pages/               ← Store pages
    ├── utils/
    │   └── helpers.js       ← Price formatting, WhatsApp
    ├── App.jsx              ← Routes
    ├── main.jsx             ← Vite entry point
    └── index.css            ← Global styles + Tailwind
```

---

## 🌐 Deploying

### Vercel (Free & Recommended)
1. Push to GitHub
2. Import repo at vercel.com — done! Auto-detects Vite.

### Netlify (Free)
1. `npm run build`
2. Drag the `dist/` folder to netlify.com/drop

### cPanel
1. `npm run build`
2. Upload contents of `dist/` to your `public_html` folder

---

## ❓ Common Issues

**"npm not recognized"** → Install Node.js from nodejs.org

**Site opens on port 5173** → That's normal for Vite! (Not port 3000)

**Images not showing** → Confirm URL is publicly accessible or file is in `public/images/`

**WhatsApp not opening** → Check WHATSAPP_NUMBER (no + sign, with country code)
