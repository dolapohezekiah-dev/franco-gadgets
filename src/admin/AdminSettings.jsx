import React, { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext";
import { products as staticProducts } from "../data/products";
import {
  WHATSAPP_NUMBER,
  STORE_NAME,
  STORE_TAGLINE,
  DELIVERY_FEE,
} from "../data/products";

const SETTINGS_KEY = "franco_settings";

function getDefaultSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          whatsapp: WHATSAPP_NUMBER,
          storeName: STORE_NAME,
          tagline: STORE_TAGLINE,
          deliveryFee: String(DELIVERY_FEE),
        };
  } catch {
    return {
      whatsapp: WHATSAPP_NUMBER,
      storeName: STORE_NAME,
      tagline: STORE_TAGLINE,
      deliveryFee: String(DELIVERY_FEE),
    };
  }
}

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-brand-light placeholder-brand-muted font-body text-sm focus:outline-none focus:border-brand-cyan transition-colors ${className}`}
    />
  );
}

export default function AdminSettings() {
  const { adminProducts, setAdminProducts } = useAdmin();
  const products = adminProducts !== null ? adminProducts : staticProducts;
  const [settings, setSettings] = useState(getDefaultSettings);
  const [saved, setSaved] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const setField = (k, v) => setSettings((s) => ({ ...s, [k]: v }));

  const handleSave = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetProducts = () => {
    setAdminProducts(null);
    localStorage.removeItem("franco_products");
    setResetConfirm(false);
  };

  const handleExportProducts = () => {
    const data = JSON.stringify(products, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "franco-products.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportProducts = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (Array.isArray(parsed)) {
          setAdminProducts(parsed);
          alert(`✅ Imported ${parsed.length} products successfully!`);
        } else {
          alert("❌ Invalid file format. Must be a JSON array of products.");
        }
      } catch {
        alert("❌ Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div>
      {saved && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg font-body text-sm">
          ✓ Settings saved!
        </div>
      )}

      <div className="mb-8">
        <h1 className="font-display text-4xl text-white tracking-wider">
          SET<span className="text-brand-cyan">TINGS</span>
        </h1>
        <p className="text-brand-muted font-body text-sm mt-1">
          Store configuration and data management
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store settings */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-4">
          <h2 className="font-display text-xl text-white tracking-wider border-b border-brand-border pb-3">
            STORE SETTINGS
          </h2>
          <p className="text-brand-muted text-xs font-body bg-brand-amber/10 border border-brand-amber/20 rounded-lg px-3 py-2">
            ⚠️ These are saved in your browser. To permanently change defaults, edit <code className="font-mono text-brand-amber">src/data/products.js</code>
          </p>

          <div>
            <label className="block text-brand-muted text-xs font-mono uppercase tracking-widest mb-1.5">
              Store Name
            </label>
            <Input value={settings.storeName} onChange={(e) => setField("storeName", e.target.value)} />
          </div>

          <div>
            <label className="block text-brand-muted text-xs font-mono uppercase tracking-widest mb-1.5">
              Store Tagline
            </label>
            <Input value={settings.tagline} onChange={(e) => setField("tagline", e.target.value)} />
          </div>

          <div>
            <label className="block text-brand-muted text-xs font-mono uppercase tracking-widest mb-1.5">
              WhatsApp Number
            </label>
            <Input
              value={settings.whatsapp}
              onChange={(e) => setField("whatsapp", e.target.value)}
              placeholder="2348012345678"
            />
            <p className="text-brand-muted text-xs font-mono mt-1">Include country code, no + sign. e.g., 2348012345678</p>
          </div>

          <div>
            <label className="block text-brand-muted text-xs font-mono uppercase tracking-widest mb-1.5">
              Delivery Fee (₦)
            </label>
            <Input
              type="number"
              value={settings.deliveryFee}
              onChange={(e) => setField("deliveryFee", e.target.value)}
              placeholder="3500"
            />
            <p className="text-brand-muted text-xs font-mono mt-1">Set to 0 for free delivery</p>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-brand-cyan text-brand-dark py-3 rounded-xl font-display text-lg tracking-wider hover:brightness-110 transition-all"
          >
            SAVE SETTINGS
          </button>
        </div>

        {/* Data management */}
        <div className="space-y-4">
          <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-4">
            <h2 className="font-display text-xl text-white tracking-wider border-b border-brand-border pb-3">
              DATA MANAGEMENT
            </h2>

            <div className="space-y-3">
              {/* Export */}
              <button
                onClick={handleExportProducts}
                className="w-full flex items-center gap-3 p-4 bg-brand-dark border border-brand-border rounded-xl hover:border-brand-cyan/40 transition-all text-left"
              >
                <div className="p-2 bg-brand-cyan/10 rounded-lg">
                  <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div>
                  <p className="text-brand-light text-sm font-body font-semibold">Export Products</p>
                  <p className="text-brand-muted text-xs">Download current products as JSON backup ({products.length} products)</p>
                </div>
              </button>

              {/* Import */}
              <label className="w-full flex items-center gap-3 p-4 bg-brand-dark border border-brand-border rounded-xl hover:border-brand-cyan/40 transition-all cursor-pointer">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <div>
                  <p className="text-brand-light text-sm font-body font-semibold">Import Products</p>
                  <p className="text-brand-muted text-xs">Load products from a JSON file (overwrites current)</p>
                </div>
                <input type="file" accept=".json" className="hidden" onChange={handleImportProducts} />
              </label>

              {/* Reset */}
              <button
                onClick={() => setResetConfirm(true)}
                className="w-full flex items-center gap-3 p-4 bg-brand-dark border border-red-500/20 rounded-xl hover:border-red-500/40 transition-all text-left"
              >
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <p className="text-red-400 text-sm font-body font-semibold">Reset to Default Products</p>
                  <p className="text-brand-muted text-xs">Removes all admin changes, restores products.js defaults</p>
                </div>
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-5">
            <h2 className="font-display text-xl text-white tracking-wider border-b border-brand-border pb-3 mb-4">
              SYSTEM STATUS
            </h2>
            <div className="space-y-2 text-sm font-body">
              {[
                { label: "Product Source", value: adminProducts ? "Admin (localStorage)" : "Default (products.js)", color: adminProducts ? "text-brand-amber" : "text-emerald-400" },
                { label: "Total Products", value: products.length, color: "text-brand-cyan" },
                { label: "Storage", value: "Browser localStorage", color: "text-brand-muted" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-brand-muted">{row.label}</span>
                  <span className={`font-mono ${row.color}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reset confirm modal */}
      {resetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-brand-card border border-brand-border rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-display text-xl tracking-wider mb-3">RESET PRODUCTS?</h3>
            <p className="text-brand-muted font-body text-sm mb-6">
              This will remove all admin changes and restore the default products from <code className="font-mono text-brand-amber">products.js</code>. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setResetConfirm(false)}
                className="flex-1 border border-brand-border text-brand-muted py-2.5 rounded-xl font-body text-sm hover:text-brand-light transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleResetProducts}
                className="flex-1 bg-red-500 hover:bg-red-400 text-white py-2.5 rounded-xl font-body text-sm font-semibold transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
