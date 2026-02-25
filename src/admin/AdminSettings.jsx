import React, { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext";
import { products as staticProducts } from "../data/products";
import { WHATSAPP_NUMBER, STORE_NAME, STORE_TAGLINE, DELIVERY_FEE } from "../data/products";

export default function AdminSettings() {
  const { adminProducts, resetToDefaults, storeSettings, updateSettings, productsLoading } = useAdmin();
  const products = adminProducts !== null ? adminProducts : staticProducts;

  const [form, setForm] = useState({
    whatsapp: WHATSAPP_NUMBER,
    storeName: STORE_NAME,
    tagline: STORE_TAGLINE,
    deliveryFee: String(DELIVERY_FEE),
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Load settings from Supabase when they arrive
  useEffect(() => {
    if (storeSettings) {
      setForm({
        whatsapp: storeSettings.whatsapp || WHATSAPP_NUMBER,
        storeName: storeSettings.store_name || STORE_NAME,
        tagline: storeSettings.tagline || STORE_TAGLINE,
        deliveryFee: String(storeSettings.delivery_fee ?? DELIVERY_FEE),
      });
    }
  }, [storeSettings]);

  const setField = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings({
        whatsapp: form.whatsapp,
        store_name: form.storeName,
        tagline: form.tagline,
        delivery_fee: Number(form.deliveryFee),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleResetProducts = async () => {
    setResetting(true);
    try {
      await resetToDefaults();
      setResetConfirm(false);
    } catch (err) {
      alert("Failed to reset: " + err.message);
    } finally {
      setResetting(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "franco-products.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (Array.isArray(parsed)) {
          await resetToDefaults(); // clears then seeds with this data
          alert(`✅ Imported ${parsed.length} products successfully!`);
        } else {
          alert("❌ Invalid format. Must be a JSON array.");
        }
      } catch { alert("❌ Failed to parse JSON file."); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  function Input({ className = "", ...props }) {
    return <input {...props} className={`w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-brand-light placeholder-brand-muted font-body text-sm focus:outline-none focus:border-brand-cyan transition-colors ${className}`} />;
  }

  return (
    <div>
      {saved && <div className="fixed top-4 right-4 z-[100] bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg font-body text-sm">✓ Settings saved to database!</div>}

      <div className="mb-8">
        <h1 className="font-display text-4xl text-white tracking-wider">SET<span className="text-brand-cyan">TINGS</span></h1>
        <p className="text-brand-muted font-body text-sm mt-1">Store configuration — saved to Supabase database</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store settings */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-4">
          <h2 className="font-display text-xl text-white tracking-wider border-b border-brand-border pb-3">STORE SETTINGS</h2>
          <p className="text-brand-muted text-xs font-body bg-brand-cyan/5 border border-brand-cyan/20 rounded-lg px-3 py-2">
            ✅ These settings are saved to your Supabase database and apply to all visitors.
          </p>

          {[
            { label: "Store Name", key: "storeName", placeholder: "Franco Gadgets" },
            { label: "Store Tagline", key: "tagline", placeholder: "Premium Gadgets. Real Deals." },
            { label: "WhatsApp Number", key: "whatsapp", placeholder: "2348012345678", hint: "Include country code, no + sign." },
            { label: "Delivery Fee (₦)", key: "deliveryFee", placeholder: "3500", type: "number", hint: "Set to 0 for free delivery" },
          ].map(({ label, key, placeholder, hint, type }) => (
            <div key={key}>
              <label className="block text-brand-muted text-xs font-mono uppercase tracking-widest mb-1.5">{label}</label>
              <input type={type || "text"} value={form[key]} onChange={(e) => setField(key, e.target.value)} placeholder={placeholder}
                className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-brand-light placeholder-brand-muted font-body text-sm focus:outline-none focus:border-brand-cyan transition-colors" />
              {hint && <p className="text-brand-muted text-xs font-mono mt-1">{hint}</p>}
            </div>
          ))}

          <button onClick={handleSave} disabled={saving}
            className="w-full bg-brand-cyan text-brand-dark py-3 rounded-xl font-display text-lg tracking-wider hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
            {saving && <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
            {saving ? "SAVING..." : "SAVE SETTINGS"}
          </button>
        </div>

        <div className="space-y-4">
          {/* Data management */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-4">
            <h2 className="font-display text-xl text-white tracking-wider border-b border-brand-border pb-3">DATA MANAGEMENT</h2>
            <div className="space-y-3">
              <button onClick={handleExport}
                className="w-full flex items-center gap-3 p-4 bg-brand-dark border border-brand-border rounded-xl hover:border-brand-cyan/40 transition-all text-left">
                <div className="p-2 bg-brand-cyan/10 rounded-lg">
                  <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div>
                  <p className="text-brand-light text-sm font-body font-semibold">Export Products as JSON</p>
                  <p className="text-brand-muted text-xs">Download backup of {products.length} products</p>
                </div>
              </button>

              <label className="w-full flex items-center gap-3 p-4 bg-brand-dark border border-brand-border rounded-xl hover:border-brand-cyan/40 transition-all cursor-pointer">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <div>
                  <p className="text-brand-light text-sm font-body font-semibold">Import Products from JSON</p>
                  <p className="text-brand-muted text-xs">Load and sync products from a JSON file</p>
                </div>
                <input type="file" accept=".json" className="hidden" onChange={handleImport} />
              </label>

              <button onClick={() => setResetConfirm(true)}
                className="w-full flex items-center gap-3 p-4 bg-brand-dark border border-red-500/20 rounded-xl hover:border-red-500/40 transition-all text-left">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <p className="text-red-400 text-sm font-body font-semibold">Reset to Default Products</p>
                  <p className="text-brand-muted text-xs">Clears database and reseeds from products.js</p>
                </div>
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-5">
            <h2 className="font-display text-xl text-white tracking-wider border-b border-brand-border pb-3 mb-4">SYSTEM STATUS</h2>
            <div className="space-y-3">
              {[
                { label: "Database", value: "Supabase (PostgreSQL)", color: "text-emerald-400" },
                { label: "Product Source", value: productsLoading ? "Loading..." : `Database (${products.length} products)`, color: "text-brand-cyan" },
                { label: "Settings Source", value: storeSettings ? "Database" : "Defaults (not yet saved)", color: storeSettings ? "text-emerald-400" : "text-brand-amber" },
                { label: "Hosting", value: "Vercel (recommended)", color: "text-brand-muted" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-sm font-body">
                  <span className="text-brand-muted">{row.label}</span>
                  <span className={`font-mono text-xs ${row.color}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {resetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-brand-card border border-brand-border rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-display text-xl tracking-wider mb-3">RESET DATABASE?</h3>
            <p className="text-brand-muted font-body text-sm mb-6">
              This will <strong className="text-red-400">permanently delete all products</strong> in Supabase and replace them with the defaults from <code className="font-mono text-brand-amber">products.js</code>.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setResetConfirm(false)} disabled={resetting}
                className="flex-1 border border-brand-border text-brand-muted py-2.5 rounded-xl font-body text-sm hover:text-brand-light transition-all disabled:opacity-50">Cancel</button>
              <button onClick={handleResetProducts} disabled={resetting}
                className="flex-1 bg-red-500 hover:bg-red-400 text-white py-2.5 rounded-xl font-body text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {resetting && <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
                {resetting ? "Resetting..." : "Yes, Reset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
