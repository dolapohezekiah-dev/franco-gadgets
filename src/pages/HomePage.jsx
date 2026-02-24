import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/products";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

const heroSlides = [
  { title: "Tech Deals of the Week", subtitle: "Laptops, phones & accessories at unbeatable prices", cta: "Shop Now", badge: "🔥 HOT DEALS", bg: "from-brand-cyan/20 to-brand-card", link: "/explore?filter=featured" },
  { title: "UK Used Laptops", subtitle: "Premium grade, original specs — trusted condition", cta: "Browse Laptops", badge: "💻 LAPTOPS", bg: "from-blue-500/20 to-brand-card", link: "/explore?category=laptop" },
  { title: "Latest Smartphones", subtitle: "iPhone, Samsung, Tecno & more — New & boxed", cta: "Shop Phones", badge: "📱 SMARTPHONES", bg: "from-purple-500/20 to-brand-card", link: "/explore?category=smartphone" },
];

const DOT_BG = { backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,212,255,0.4) 1px, transparent 0)", backgroundSize: "32px 32px" };

export default function HomePage() {
  const products = useProducts();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const featured = products.filter((p) => p.featured);
  const bestSellers = products.filter((p) => p.bestSeller);

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[380px] overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[slide].bg} transition-all duration-700`} />
        <div className="absolute inset-0 opacity-5" style={DOT_BG} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl animate-fade-up">
            <span className="inline-block bg-brand-amber text-brand-dark text-xs font-bold px-3 py-1 rounded-full font-mono mb-4 tracking-wider">{heroSlides[slide].badge}</span>
            <h1 className="font-display text-5xl sm:text-7xl text-white tracking-wider leading-none mb-4">
              {heroSlides[slide].title.split(" ").map((word, i, arr) =>
                i === arr.length - 1 ? <span key={i} className="text-brand-cyan">{word}</span> : <span key={i}>{word} </span>
              )}
            </h1>
            <p className="text-brand-muted font-body text-lg mb-8">{heroSlides[slide].subtitle}</p>
            <div className="flex gap-3 flex-wrap">
              <Link to={heroSlides[slide].link} className="bg-brand-cyan text-brand-dark px-7 py-3.5 rounded-xl font-display text-xl tracking-wider hover:brightness-110 transition-all shadow-lg shadow-brand-cyan/30">{heroSlides[slide].cta}</Link>
              <Link to="/explore" className="border border-brand-border text-brand-light px-7 py-3.5 rounded-xl font-display text-xl tracking-wider hover:border-brand-cyan/50 transition-all">All Products</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className={`rounded-full transition-all duration-300 ${i === slide ? "w-8 h-2 bg-brand-cyan" : "w-2 h-2 bg-brand-border"}`} />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-10 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Link key={cat.key} to={cat.key === "all" ? "/explore" : `/explore?category=${cat.key}`} className="flex-shrink-0 flex flex-col items-center gap-2 px-5 py-3 bg-brand-card border border-brand-border rounded-2xl hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all group">
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs text-brand-muted group-hover:text-brand-cyan transition-colors font-body whitespace-nowrap">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-6 border-b border-brand-border bg-brand-card/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{ icon: "✅", title: "Original Products", desc: "100% authentic gadgets" }, { icon: "🛡️", title: "Warranty Available", desc: "On all products sold" }, { icon: "🚚", title: "Nationwide Delivery", desc: "We deliver everywhere" }, { icon: "💬", title: "WhatsApp Support", desc: "Order via WhatsApp" }].map((badge) => (
              <div key={badge.title} className="flex items-center gap-3">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <p className="text-white text-sm font-body font-semibold">{badge.title}</p>
                  <p className="text-brand-muted text-xs font-body">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOT DEALS */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-brand-cyan text-xs font-mono uppercase tracking-widest mb-1">Curated Selection</p>
              <h2 className="font-display text-4xl text-white tracking-wider">HOT <span className="text-brand-amber">DEALS</span> 🔥</h2>
            </div>
            <Link to="/explore?filter=featured" className="text-brand-cyan text-sm font-body hover:underline flex items-center gap-1">View All <span>→</span></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featured.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-12 bg-brand-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-brand-cyan text-xs font-mono uppercase tracking-widest mb-1">Most Popular</p>
              <h2 className="font-display text-4xl text-white tracking-wider">BEST <span className="text-brand-cyan">SELLERS</span></h2>
            </div>
            <Link to="/explore?filter=bestseller" className="text-brand-cyan text-sm font-body hover:underline flex items-center gap-1">View All <span>→</span></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {bestSellers.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative bg-gradient-to-r from-brand-cyan/20 via-brand-card to-brand-amber/10 border border-brand-border rounded-3xl p-10 overflow-hidden text-center">
            <div className="absolute inset-0 opacity-5" style={DOT_BG} />
            <div className="relative z-10">
              <h2 className="font-display text-4xl sm:text-6xl text-white tracking-wider mb-4">ORDER VIA <span className="text-brand-cyan">WHATSAPP</span></h2>
              <p className="text-brand-muted font-body text-lg mb-8 max-w-md mx-auto">Add items to cart, checkout, and our team will confirm your order on WhatsApp instantly.</p>
              <Link to="/explore" className="inline-block bg-brand-cyan text-brand-dark px-8 py-4 rounded-xl font-display text-2xl tracking-wider hover:brightness-110 transition-all shadow-lg shadow-brand-cyan/30">Start Shopping</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
