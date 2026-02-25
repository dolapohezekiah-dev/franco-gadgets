import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { totalItems, setCartOpen, setSidebarOpen } = useCart();
  const { isDark, toggleTheme } = useTheme();
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-brand-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">

        <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-500 dark:text-brand-muted hover:text-brand-cyan transition-colors" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-brand-cyan rounded-lg flex items-center justify-center">
            <span className="text-brand-dark font-display text-lg leading-none">F</span>
          </div>
          <span className="font-display text-2xl text-gray-900 dark:text-white tracking-wider hidden sm:block">
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
              className="w-full bg-gray-100 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl pl-4 pr-10 py-2.5 text-sm text-gray-800 dark:text-brand-light placeholder-gray-400 dark:placeholder-brand-muted focus:outline-none focus:border-brand-cyan transition-colors font-body"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-brand-muted hover:text-brand-cyan transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        <nav className="hidden md:flex items-center gap-1">
          <Link to="/" className={`px-3 py-2 rounded-lg text-sm font-body font-medium transition-colors ${location.pathname === "/" ? "text-brand-cyan" : "text-gray-500 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-light"}`}>Home</Link>
          <Link to="/explore" className={`px-3 py-2 rounded-lg text-sm font-body font-medium transition-colors ${location.pathname === "/explore" ? "text-brand-cyan" : "text-gray-500 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-light"}`}>Explore</Link>
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="p-2 rounded-xl border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted hover:text-brand-cyan hover:border-brand-cyan/40 dark:hover:text-brand-cyan dark:hover:border-brand-cyan/40 transition-all"
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        <button onClick={() => setCartOpen(true)} className="relative p-2 text-gray-500 dark:text-brand-muted hover:text-brand-cyan transition-colors" aria-label="Cart">
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
