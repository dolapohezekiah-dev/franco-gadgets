import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "../data/products";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

export default function ExplorePage() {
  const allProducts = useProducts();
  const brands = [...new Set(allProducts.map((p) => p.brand))].sort();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const cat = searchParams.get("category");
    const search = searchParams.get("search");
    const filter = searchParams.get("filter");
    if (cat) setSelectedCategory(cat);
    if (search) setSearchQuery(search);
    if (filter === "featured" || filter === "bestseller") {
      setSelectedCategory("all");
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...allProducts];

    const filter = searchParams.get("filter");
    if (filter === "featured") result = result.filter((p) => p.featured);
    if (filter === "bestseller") result = result.filter((p) => p.bestSeller);

    if (selectedCategory !== "all") result = result.filter((p) => p.category === selectedCategory);
    if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
    if (selectedCondition !== "all") result = result.filter((p) => p.condition === selectedCondition);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.processor?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case "price-asc": return result.sort((a, b) => a.price - b.price);
      case "price-desc": return result.sort((a, b) => b.price - a.price);
      case "rating": return result.sort((a, b) => b.rating - a.rating);
      case "newest": return result.sort((a, b) => b.id - a.id);
      default: return result.sort((a, b) => b.sold - a.sold);
    }
  }, [selectedCategory, selectedBrands, selectedCondition, sortBy, priceRange, searchQuery, searchParams]);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="text-gray-900 dark:text-white font-display text-lg tracking-wider mb-3">CATEGORY</h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-body text-left transition-all ${
                selectedCategory === cat.key
                  ? "bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30"
                  : "text-gray-500 dark:text-brand-muted hover:text-gray-800 dark:text-brand-light hover:bg-gray-100 dark:bg-brand-border"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <h3 className="text-gray-900 dark:text-white font-display text-lg tracking-wider mb-3">CONDITION</h3>
        <div className="flex gap-2">
          {["all", "New", "UK Used"].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCondition(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                selectedCondition === c
                  ? "bg-brand-cyan text-brand-dark border-brand-cyan"
                  : "text-gray-500 dark:text-brand-muted border-gray-200 dark:border-brand-border hover:border-brand-cyan/30"
              }`}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-gray-900 dark:text-white font-display text-lg tracking-wider mb-3">BRAND</h3>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => toggleBrand(brand)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                selectedBrands.includes(brand)
                  ? "bg-brand-cyan text-brand-dark border-brand-cyan"
                  : "text-gray-500 dark:text-brand-muted border-gray-200 dark:border-brand-border hover:border-brand-cyan/30"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
        {selectedBrands.length > 0 && (
          <button
            onClick={() => setSelectedBrands([])}
            className="text-xs text-red-400 mt-2 hover:text-red-300 font-mono"
          >
            Clear brands ×
          </button>
        )}
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-gray-900 dark:text-white font-display text-lg tracking-wider mb-3">MAX PRICE</h3>
        <input
          type="range"
          min={0}
          max={1000000}
          step={10000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-brand-cyan"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-brand-muted font-mono mt-1">
          <span>₦0</span>
          <span>₦{(priceRange[1] / 1000).toFixed(0)}k</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <p className="text-brand-cyan text-xs font-mono uppercase tracking-widest mb-1">Browse All</p>
          <h1 className="font-display text-5xl text-gray-900 dark:text-white tracking-wider">
            EXPLORE <span className="text-brand-cyan">GADGETS</span>
          </h1>
          {searchQuery && (
            <p className="text-gray-500 dark:text-brand-muted font-body mt-2">
              Search results for: <span className="text-gray-800 dark:text-brand-light font-semibold">"{searchQuery}"</span>
              <button onClick={() => setSearchQuery("")} className="ml-2 text-red-400 hover:text-red-300 text-sm">× Clear</button>
            </p>
          )}
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters — desktop */}
          <aside className="hidden lg:block w-60 shrink-0 sticky top-24 self-start">
            <FilterPanel />
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <p className="text-gray-500 dark:text-brand-muted text-sm font-body">
                <span className="text-gray-800 dark:text-brand-light font-semibold">{filtered.length}</span> products found
              </p>
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl text-sm text-gray-500 dark:text-brand-muted hover:text-brand-cyan font-body transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted rounded-xl px-3 py-2 text-sm font-body focus:outline-none focus:border-brand-cyan transition-colors"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating">Best Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Mobile filters */}
            {showFilters && (
              <div className="lg:hidden bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-2xl p-5 mb-6">
                <FilterPanel />
              </div>
            )}

            {/* Products grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-gray-900 dark:text-white font-display text-3xl tracking-wider mb-2">NO RESULTS</h3>
                <p className="text-gray-500 dark:text-brand-muted font-body">Try adjusting your filters or search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
