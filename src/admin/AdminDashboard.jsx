import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { products as staticProducts } from "../data/products";
import { formatPrice } from "../utils/helpers";

function StatCard({ title, value, sub, icon, color }) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${color}`}>{icon}</div>
      </div>
      <p className="text-brand-muted text-xs font-mono uppercase tracking-widest mb-1">{title}</p>
      <p className="text-white font-display text-4xl tracking-wider">{value}</p>
      {sub && <p className="text-brand-muted text-xs font-body mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const { adminProducts } = useAdmin();
  const products = adminProducts !== null ? adminProducts : staticProducts;

  const stats = useMemo(() => {
    const totalValue = products.reduce((s, p) => s + p.price, 0);
    const avgPrice = products.length ? totalValue / products.length : 0;
    const totalSold = products.reduce((s, p) => s + (p.sold || 0), 0);
    const newCount = products.filter((p) => p.condition === "New").length;
    const usedCount = products.filter((p) => p.condition === "UK Used").length;
    const featured = products.filter((p) => p.featured).length;

    const byCat = {};
    products.forEach((p) => {
      byCat[p.category] = (byCat[p.category] || 0) + 1;
    });

    return { totalValue, avgPrice, totalSold, newCount, usedCount, featured, byCat };
  }, [products]);

  const recentProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl text-white tracking-wider">
          DASH<span className="text-brand-cyan">BOARD</span>
        </h1>
        <p className="text-brand-muted font-body text-sm mt-1">
          Welcome back, Admin. Here's your store overview.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Products"
          value={products.length}
          sub={`${stats.newCount} New · ${stats.usedCount} UK Used`}
          color="bg-brand-cyan/10"
          icon={
            <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
        />
        <StatCard
          title="Total Units Sold"
          value={stats.totalSold.toLocaleString()}
          sub="Across all products"
          color="bg-emerald-500/10"
          icon={
            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <StatCard
          title="Avg. Product Price"
          value={formatPrice(Math.round(stats.avgPrice))}
          sub="Across all listings"
          color="bg-brand-amber/10"
          icon={
            <svg className="w-5 h-5 text-brand-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Featured Products"
          value={stats.featured}
          sub="Showing on homepage"
          color="bg-purple-500/10"
          icon={
            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent products */}
        <div className="lg:col-span-2 bg-brand-card border border-brand-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl text-white tracking-wider">RECENT PRODUCTS</h2>
            <Link
              to="/admin/products"
              className="text-brand-cyan text-sm font-body hover:underline"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 bg-brand-dark rounded-xl hover:bg-brand-border transition-colors">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/48/0D1422/00D4FF?text=F";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-brand-light text-sm font-body font-medium truncate">{p.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs font-mono ${p.condition === "New" ? "text-emerald-400" : "text-blue-400"}`}>
                      {p.condition}
                    </span>
                    <span className="text-brand-muted text-xs">·</span>
                    <span className="text-brand-muted text-xs font-mono">{p.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-brand-cyan font-mono text-sm">{formatPrice(p.price)}</p>
                  <p className="text-brand-muted text-xs">{p.sold} sold</p>
                </div>
                <Link
                  to={`/admin/products/edit/${p.id}`}
                  className="ml-2 p-2 text-brand-muted hover:text-brand-cyan transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-5">
          <h2 className="font-display text-xl text-white tracking-wider mb-5">BY CATEGORY</h2>
          <div className="space-y-3">
            {Object.entries(stats.byCat).map(([cat, count]) => {
              const pct = Math.round((count / products.length) * 100);
              const colors = {
                laptop: "bg-brand-cyan",
                smartphone: "bg-purple-400",
                gaming: "bg-red-400",
                apple: "bg-brand-amber",
                accessory: "bg-emerald-400",
              };
              return (
                <div key={cat}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-brand-muted font-mono capitalize">{cat}</span>
                    <span className="text-brand-light font-mono">{count} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 bg-brand-dark rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${colors[cat] || "bg-brand-muted"} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-brand-border">
            <Link
              to="/admin/products/new"
              className="flex items-center justify-center gap-2 w-full bg-brand-cyan text-brand-dark py-3 rounded-xl font-display text-lg tracking-wider hover:brightness-110 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              ADD PRODUCT
            </Link>
          </div>
        </div>
      </div>

      {/* Admin was editing notice */}
      {adminProducts !== null && (
        <div className="mt-6 bg-brand-amber/10 border border-brand-amber/30 rounded-xl px-5 py-3 flex items-center gap-3">
          <svg className="w-5 h-5 text-brand-amber shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-brand-amber text-sm font-body">
            You have <strong>{adminProducts.length} products</strong> saved via Admin Dashboard. These override the default product file.
          </p>
        </div>
      )}
    </div>
  );
}
