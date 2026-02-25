import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { products as staticProducts } from "../data/products";

const EMPTY_PRODUCT = {
  name: "", brand: "", category: "laptop", condition: "New",
  price: "", originalPrice: "", ram: "", storage: "", processor: "",
  screen: "", battery: "", rating: "4.5", reviews: "0", sold: "0",
  warranty: "3 Months Warranty", image: "", images: [],
  featured: false, bestSeller: false, description: "", specs: {},
  variants: [{ label: "", priceAdd: 0 }],
};

function FieldGroup({ label, hint, children }) {
  return (
    <div>
      <label className="block text-brand-muted text-xs font-mono uppercase tracking-widest mb-1.5">{label}</label>
      {hint && <p className="text-brand-muted text-xs font-body mb-1.5 -mt-1">{hint}</p>}
      {children}
    </div>
  );
}

function Input({ className = "", ...props }) {
  return <input {...props} className={`w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-brand-light placeholder-brand-muted font-body text-sm focus:outline-none focus:border-brand-cyan transition-colors ${className}`} />;
}

function Textarea({ className = "", ...props }) {
  return <textarea {...props} className={`w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-brand-light placeholder-brand-muted font-body text-sm focus:outline-none focus:border-brand-cyan transition-colors resize-none ${className}`} />;
}

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { adminProducts, addProduct, editProduct, productsLoading } = useAdmin();
  const products = adminProducts !== null ? adminProducts : staticProducts;

  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [specKey, setSpecKey] = useState("");
  const [specVal, setSpecVal] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);
  const galleryFileRef = useRef(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (isEdit && !productsLoading) {
      const existing = products.find((p) => p.id === Number(id));
      if (existing) {
        setForm({
          ...EMPTY_PRODUCT, ...existing,
          price: String(existing.price),
          originalPrice: String(existing.originalPrice || existing.price),
          ram: existing.ram != null ? String(existing.ram) : "",
          storage: existing.storage != null ? String(existing.storage) : "",
          rating: String(existing.rating || "4.5"),
          reviews: String(existing.reviews || "0"),
          sold: String(existing.sold || "0"),
          images: existing.images || [existing.image],
          variants: existing.variants?.length ? existing.variants : [{ label: "", priceAdd: 0 }],
        });
        setImagePreview(existing.image || "");
      }
    }
  }, [id, isEdit, productsLoading]);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleImageUpload = (e, isGallery = false) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        if (!isGallery) {
          setForm((f) => ({ ...f, image: dataUrl, images: [dataUrl, ...f.images.filter((i) => i !== f.image)] }));
          setImagePreview(dataUrl);
        } else {
          setForm((f) => ({ ...f, images: [...f.images, dataUrl] }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleMainImageUrl = (url) => {
    set("image", url);
    setImagePreview(url);
    if (url) setForm((f) => ({ ...f, image: url, images: f.images.includes(url) ? f.images : [url, ...f.images] }));
  };

  const removeGalleryImage = (idx) => {
    const updated = form.images.filter((_, i) => i !== idx);
    setForm((f) => ({ ...f, images: updated, image: updated[0] || f.image }));
    if (idx === 0) setImagePreview(updated[0] || "");
  };

  const addSpec = () => {
    if (!specKey.trim()) return;
    setForm((f) => ({ ...f, specs: { ...f.specs, [specKey.trim()]: specVal.trim() } }));
    setSpecKey(""); setSpecVal("");
  };

  const removeSpec = (key) => {
    const updated = { ...form.specs };
    delete updated[key];
    setForm((f) => ({ ...f, specs: updated }));
  };

  const updateVariant = (i, field, value) => {
    const updated = [...form.variants];
    updated[i] = { ...updated[i], [field]: field === "priceAdd" ? Number(value) : value };
    set("variants", updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) { showToast("Name and price are required.", "error"); return; }
    setSaving(true);
    try {
      const cleaned = {
        ...form,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice) || Number(form.price),
        ram: form.ram ? Number(form.ram) : null,
        storage: form.storage ? Number(form.storage) : null,
        rating: Number(form.rating) || 4.5,
        reviews: Number(form.reviews) || 0,
        sold: Number(form.sold) || 0,
        variants: form.variants.filter((v) => v.label.trim()),
        images: form.images.length ? form.images : form.image ? [form.image] : [],
      };
      if (isEdit) {
        await editProduct(Number(id), cleaned);
        showToast("Product updated and saved to database!");
      } else {
        // Remove id so Supabase auto-generates it
        const { id: _removeId, ...cleanedNoId } = cleaned;
        await addProduct(cleanedNoId);
        showToast("Product added to database!");
      }
      setTimeout(() => navigate("/admin/products"), 1200);
    } catch (err) {
      showToast("Error: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg font-body text-sm ${toast.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
          {toast.type === "success" ? "✓" : "✗"} {toast.msg}
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate("/admin/products")} className="p-2 text-brand-muted hover:text-brand-cyan transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="font-display text-4xl text-white tracking-wider">
            {isEdit ? "EDIT" : "ADD"} <span className="text-brand-cyan">PRODUCT</span>
          </h1>
          <p className="text-brand-muted text-xs font-mono mt-0.5">
            {isEdit ? `Editing ID #${id} — changes save directly to database` : "New product will be saved to Supabase database"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="xl:col-span-2 space-y-6">
            {/* Basic info */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-4">
              <h2 className="font-display text-xl text-white tracking-wider border-b border-brand-border pb-3">BASIC INFO</h2>
              <FieldGroup label="Product Name *">
                <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g., HP EliteBook 840 G8" required />
              </FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <FieldGroup label="Brand *">
                  <Input value={form.brand} onChange={(e) => set("brand", e.target.value)} placeholder="e.g., HP, Apple" required />
                </FieldGroup>
                <FieldGroup label="Category *">
                  <select value={form.category} onChange={(e) => set("category", e.target.value)}
                    className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-brand-light font-body text-sm focus:outline-none focus:border-brand-cyan transition-colors">
                    <option value="laptop">Laptop</option>
                    <option value="smartphone">Smartphone</option>
                    <option value="gaming">Gaming Laptop</option>
                    <option value="apple">Apple Device</option>
                    <option value="accessory">Accessory</option>
                  </select>
                </FieldGroup>
              </div>
              <FieldGroup label="Condition *">
                <div className="flex gap-3">
                  {["New", "UK Used"].map((c) => (
                    <button key={c} type="button" onClick={() => set("condition", c)}
                      className={`flex-1 py-3 rounded-xl border font-mono text-sm transition-all ${form.condition === c ? (c === "New" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40" : "bg-blue-500/10 text-blue-400 border-blue-500/40") : "border-brand-border text-brand-muted hover:border-brand-cyan/30"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </FieldGroup>
              <FieldGroup label="Description">
                <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the product..." rows={4} />
              </FieldGroup>
            </div>

            {/* Pricing */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-4">
              <h2 className="font-display text-xl text-white tracking-wider border-b border-brand-border pb-3">PRICING</h2>
              <div className="grid grid-cols-2 gap-4">
                <FieldGroup label="Selling Price (₦) *">
                  <Input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="285000" min="0" required />
                </FieldGroup>
                <FieldGroup label="Original Price (₦)" hint="Set same as price if no discount">
                  <Input type="number" value={form.originalPrice} onChange={(e) => set("originalPrice", e.target.value)} placeholder="320000" min="0" />
                </FieldGroup>
              </div>
            </div>

            {/* Specs */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-4">
              <h2 className="font-display text-xl text-white tracking-wider border-b border-brand-border pb-3">SPECIFICATIONS</h2>
              <div className="grid grid-cols-2 gap-4">
                {[["RAM (GB)", "ram", "16"], ["Storage (GB)", "storage", "512"], ["Processor", "processor", "Intel Core i5 11th Gen"], ["Screen Size", "screen", '15.6"'], ["Battery", "battery", "85% Health"], ["Warranty", "warranty", "3 Months Warranty"]].map(([label, field, ph]) => (
                  <FieldGroup key={field} label={label}>
                    <Input value={form[field]} onChange={(e) => set(field, e.target.value)} placeholder={ph} type={["ram", "storage"].includes(field) ? "number" : "text"} />
                  </FieldGroup>
                ))}
              </div>
              {/* Custom specs */}
              <div>
                <p className="text-brand-muted text-xs font-mono uppercase tracking-widest mb-2">Extra Specs</p>
                {Object.entries(form.specs).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2 mb-2">
                    <div className="flex-1 bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-xs font-mono text-brand-muted flex justify-between">
                      <span className="text-brand-light">{k}</span><span>{v}</span>
                    </div>
                    <button type="button" onClick={() => removeSpec(k)} className="p-2 text-red-400 hover:text-red-300 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
                <div className="flex gap-2 mt-2">
                  <Input value={specKey} onChange={(e) => setSpecKey(e.target.value)} placeholder="Spec name (e.g., Display)" className="flex-1" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSpec())} />
                  <Input value={specVal} onChange={(e) => setSpecVal(e.target.value)} placeholder="Value" className="flex-1" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSpec())} />
                  <button type="button" onClick={addSpec} className="px-4 py-3 bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan rounded-xl font-mono text-sm hover:bg-brand-cyan hover:text-brand-dark transition-all">+ Add</button>
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-3">
              <h2 className="font-display text-xl text-white tracking-wider border-b border-brand-border pb-3">VARIANTS</h2>
              {form.variants.map((v, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={v.label} onChange={(e) => updateVariant(i, "label", e.target.value)} placeholder="e.g., 16GB / 512GB" className="flex-1" />
                  <Input type="number" value={v.priceAdd} onChange={(e) => updateVariant(i, "priceAdd", e.target.value)} placeholder="Price add (₦)" className="w-36" />
                  {form.variants.length > 1 && (
                    <button type="button" onClick={() => set("variants", form.variants.filter((_, idx) => idx !== i))} className="p-3 text-red-400 hover:text-red-300 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => set("variants", [...form.variants, { label: "", priceAdd: 0 }])} className="text-brand-cyan text-sm font-body hover:underline">+ Add another variant</button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Images */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-4">
              <h2 className="font-display text-xl text-white tracking-wider border-b border-brand-border pb-3">PRODUCT IMAGES</h2>
              <div className="relative aspect-video bg-brand-dark border-2 border-dashed border-brand-border rounded-xl overflow-hidden cursor-pointer group hover:border-brand-cyan/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}>
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" onError={() => setImagePreview("")} />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-sm font-body">Click to change</p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                    <svg className="w-10 h-10 text-brand-muted mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-brand-muted text-sm font-body">Click to upload image</p>
                    <p className="text-brand-muted text-xs font-mono mt-1">JPG, PNG, WEBP</p>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, false)} />
              <FieldGroup label="Or Paste Image URL">
                <Input value={form.image.startsWith("data:") ? "" : form.image} onChange={(e) => handleMainImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
              </FieldGroup>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-brand-muted text-xs font-mono uppercase tracking-widest">Gallery ({form.images.length})</p>
                  <button type="button" onClick={() => galleryFileRef.current?.click()} className="text-brand-cyan text-xs font-body hover:underline">+ Upload More</button>
                </div>
                <input ref={galleryFileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImageUpload(e, true)} />
                <div className="grid grid-cols-3 gap-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://placehold.co/60x60/0D1422/00D4FF?text=?"; }} />
                      <button type="button" onClick={() => removeGalleryImage(i)} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">×</button>
                      {i === 0 && <div className="absolute bottom-0 left-0 right-0 bg-brand-cyan/80 text-brand-dark text-xs text-center font-mono py-0.5">MAIN</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats & Visibility */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-4">
              <h2 className="font-display text-xl text-white tracking-wider border-b border-brand-border pb-3">STATS & VISIBILITY</h2>
              <div className="grid grid-cols-3 gap-3">
                <FieldGroup label="Rating"><Input type="number" value={form.rating} onChange={(e) => set("rating", e.target.value)} min="0" max="5" step="0.1" placeholder="4.5" /></FieldGroup>
                <FieldGroup label="Reviews"><Input type="number" value={form.reviews} onChange={(e) => set("reviews", e.target.value)} min="0" placeholder="0" /></FieldGroup>
                <FieldGroup label="Units Sold"><Input type="number" value={form.sold} onChange={(e) => set("sold", e.target.value)} min="0" placeholder="0" /></FieldGroup>
              </div>
              <div className="space-y-2">
                {[{ key: "featured", label: "Featured", sub: "Show in Hot Deals on homepage", icon: "🔥" }, { key: "bestSeller", label: "Best Seller", sub: "Show in Best Sellers on homepage", icon: "⭐" }].map((toggle) => (
                  <button key={toggle.key} type="button" onClick={() => set(toggle.key, !form[toggle.key])}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${form[toggle.key] ? "bg-brand-cyan/10 border-brand-cyan/30 text-brand-light" : "bg-brand-dark border-brand-border text-brand-muted hover:border-brand-cyan/20"}`}>
                    <div className="flex items-center gap-2">
                      <span>{toggle.icon}</span>
                      <div className="text-left">
                        <p className="text-sm font-body font-medium">{toggle.label}</p>
                        <p className="text-xs text-brand-muted">{toggle.sub}</p>
                      </div>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-all ${form[toggle.key] ? "bg-brand-cyan" : "bg-brand-border"}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${form[toggle.key] ? "right-0.5" : "left-0.5"}`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={saving}
              className="w-full bg-brand-cyan text-brand-dark py-4 rounded-xl font-display text-2xl tracking-wider hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-brand-cyan/20">
              {saving && <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
              {saving ? "SAVING TO DATABASE..." : isEdit ? "SAVE CHANGES" : "ADD PRODUCT"}
            </button>
            {isEdit && (
              <button type="button" onClick={() => navigate("/admin/products")} className="w-full border border-brand-border text-brand-muted py-3 rounded-xl font-body text-sm hover:text-brand-light transition-all">Cancel</button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
