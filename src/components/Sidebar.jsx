import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const menuItems = [
  { label: "Home", to: "/", icon: "🏠" },
  { label: "Explore Products", to: "/explore", icon: "🔍" },
  { label: "About Us", to: "/about", icon: "ℹ️" },
  { label: "FAQs", to: "/faqs", icon: "❓" },
  { label: "Warranty Policy", to: "/warranty", icon: "🛡️" },
  { label: "Delivery Info", to: "/delivery", icon: "🚚" },
  { label: "Contact Us", to: "/contact", icon: "💬" },
];

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useCart();
  return (
    <>
      {sidebarOpen && <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-72 z-50 bg-brand-card border-r border-brand-border transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-5 border-b border-brand-border">
          <Link to="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-cyan rounded-lg flex items-center justify-center">
              <span className="text-brand-dark font-display text-lg">F</span>
            </div>
            <span className="font-display text-xl text-white tracking-wider">FRANCO <span className="text-brand-cyan">GADGETS</span></span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="p-1 text-brand-muted hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-muted hover:text-brand-light hover:bg-brand-border transition-all font-body">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-brand-border space-y-2">
          {["✅ Original Products Only", "🛡️ Warranty Available", "🚚 Nationwide Delivery"].map((b) => (
            <div key={b} className="text-xs text-brand-muted font-body">{b}</div>
          ))}
        </div>
      </aside>
    </>
  );
}
