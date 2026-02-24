import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { products as staticProducts } from "../data/products";
import { formatPrice } from "../utils/helpers";

export default function AdminProducts() {
  const { adminProducts, setAdminProducts } = useAdmin();
  const products = adminProducts !== null ? adminProducts : staticProducts;

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (filterCat !== "all") list = list.filter((p) => p.category === filterCat);
    return list;
  }, [products, search, filterCat]);

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setAdminProducts(updated);
    setConfirmDelete(null);
    showToast("Product deleted successfully.");
  };

  const handleToggleFeatured = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    setAdminProducts(updated);
    showToast("Featured status updated.");
  };

  const handleToggleBestSeller = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, bestSeller: !p.bestSeller } : p
    );
    setAdminProducts(updated);
    showToast("Best Seller status updated.");
  };

  const categories = ["all", "laptop", "smartphone", "gaming", "apple", "accessory"];

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[100] flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg font-body text-sm transition-all ${
            toast.type === "success"
              ? "bg-emerald-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.type === "success" ? "✓" : "✗"} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="font-display text-4xl text-white tracking-wider">
            ALL <span className="text-brand-cyan">PRODUCTS</span>
          </h1>
          <p className="text-brand-muted font-body text-sm mt-1">
            {products.length} total products
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 bg-brand-cyan text-brand-dark px-4 py-2.5 rounded-xl font-display text-lg tracking-wider hover:brightness-110 transition-all shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          ADD NEW
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-brand-card border border-brand-border rounded-xl pl-9 pr-4 py-2.5 text-brand-light placeholder-brand-muted font-body text-sm focus:outline-none focus:border-brand-cyan transition-colors"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-mono capitalize transition-all border ${
                filterCat === cat
                  ? "bg-brand-cyan text-brand-dark border-brand-cyan"
                  : "border-brand-border text-brand-muted hover:border-brand-cyan/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-brand-muted font-body">No products match your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-brand-border">
                  <th className="text-left px-4 py-3 text-brand-muted text-xs font-mono uppercase tracking-widest">Product</th>
                  <th className="text-left px-4 py-3 text-brand-muted text-xs font-mono uppercase tracking-widest">Category</th>
                  <th className="text-left px-4 py-3 text-brand-muted text-xs font-mono uppercase tracking-widest">Condition</th>
                  <th className="text-left px-4 py-3 text-brand-muted text-xs font-mono uppercase tracking-widest">Price</th>
                  <th className="text-center px-4 py-3 text-brand-muted text-xs font-mono uppercase tracking-widest">Featured</th>
                  <th className="text-center px-4 py-3 text-brand-muted text-xs font-mono uppercase tracking-widest">Best Seller</th>
                  <th className="text-center px-4 py-3 text-brand-muted text-xs font-mono uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`border-b border-brand-border hover:bg-brand-dark/50 transition-colors ${
                      i === filtered.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    {/* Product */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/40/0D1422/00D4FF?text=F";
                          }}
                        />
                        <div>
                          <p className="text-brand-light text-sm font-body font-medium leading-snug">{p.name}</p>
                          <p className="text-brand-muted text-xs font-mono">{p.brand} · ID #{p.id}</p>
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-brand-muted capitalize bg-brand-dark px-2 py-1 rounded-lg">
                        {p.category}
                      </span>
                    </td>
                    {/* Condition */}
                    <td className="px-4 py-3">
                      <span className={`text-xs font-mono px-2 py-1 rounded-lg ${
                        p.condition === "New"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-blue-500/10 text-blue-400"
                      }`}>
                        {p.condition}
                      </span>
                    </td>
                    {/* Price */}
                    <td className="px-4 py-3">
                      <p className="text-brand-cyan font-mono text-sm">{formatPrice(p.price)}</p>
                      {p.originalPrice > p.price && (
                        <p className="text-brand-muted text-xs line-through font-mono">{formatPrice(p.originalPrice)}</p>
                      )}
                    </td>
                    {/* Featured toggle */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleToggleFeatured(p.id)}
                        className={`w-8 h-8 rounded-lg transition-all flex items-center justify-center mx-auto ${
                          p.featured
                            ? "bg-brand-amber/20 text-brand-amber"
                            : "bg-brand-dark text-brand-border hover:text-brand-muted"
                        }`}
                        title={p.featured ? "Remove from Featured" : "Add to Featured"}
                      >
                        <svg className="w-4 h-4" fill={p.featured ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                    </td>
                    {/* Best Seller toggle */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleToggleBestSeller(p.id)}
                        className={`w-8 h-8 rounded-lg transition-all flex items-center justify-center mx-auto ${
                          p.bestSeller
                            ? "bg-brand-cyan/20 text-brand-cyan"
                            : "bg-brand-dark text-brand-border hover:text-brand-muted"
                        }`}
                        title={p.bestSeller ? "Remove from Best Sellers" : "Add to Best Sellers"}
                      >
                        <svg className="w-4 h-4" fill={p.bestSeller ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </button>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/admin/products/edit/${p.id}`}
                          className="p-2 text-brand-muted hover:text-brand-cyan bg-brand-dark hover:bg-brand-cyan/10 rounded-lg transition-all"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => setConfirmDelete(p)}
                          className="p-2 text-brand-muted hover:text-red-400 bg-brand-dark hover:bg-red-500/10 rounded-lg transition-all"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-brand-card border border-brand-border rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-red-500/10 rounded-xl">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-white font-display text-xl tracking-wider">DELETE PRODUCT?</h3>
            </div>
            <p className="text-brand-muted font-body text-sm mb-6">
              Are you sure you want to delete <strong className="text-brand-light">"{confirmDelete.name}"</strong>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 border border-brand-border text-brand-muted py-2.5 rounded-xl font-body text-sm hover:border-brand-cyan/30 hover:text-brand-light transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete.id)}
                className="flex-1 bg-red-500 hover:bg-red-400 text-white py-2.5 rounded-xl font-body text-sm font-semibold transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
