import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems, setCartOpen, setSidebarOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-brand-muted hover:text-brand-cyan transition-colors" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-brand-cyan rounded-lg flex items-center justify-center">
            <span className="text-brand-dark font-display text-lg leading-none">F</span>
          </div>
          <span className="font-display text-2xl text-white tracking-wider hidden sm:block">
            FRANCO <span className="text-brand-cyan">GADGETS</span>
          </span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search laptops, phones, accessories..."
              className="w-full bg-brand-card border border-brand-border rounded-xl pl-4 pr-10 py-2.5 text-sm text-brand-light placeholder-brand-muted focus:outline-none focus:border-brand-cyan transition-colors font-body"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-cyan transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        <nav className="hidden md:flex items-center gap-1">
          <Link to="/" className={`px-3 py-2 rounded-lg text-sm font-body font-medium transition-colors ${location.pathname === "/" ? "text-brand-cyan" : "text-brand-muted hover:text-brand-light"}`}>Home</Link>
          <Link to="/explore" className={`px-3 py-2 rounded-lg text-sm font-body font-medium transition-colors ${location.pathname === "/explore" ? "text-brand-cyan" : "text-brand-muted hover:text-brand-light"}`}>Explore</Link>
        </nav>

        <button onClick={() => setCartOpen(true)} className="relative p-2 text-brand-muted hover:text-brand-cyan transition-colors ml-auto md:ml-0" aria-label="Cart">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-cyan text-brand-dark text-xs font-bold rounded-full flex items-center justify-center font-mono">{totalItems}</span>
          )}
        </button>
      </div>
    </header>
  );
}
