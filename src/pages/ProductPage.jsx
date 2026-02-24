import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { formatPrice, discount } from "../utils/helpers";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const products = useProducts();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="font-display text-4xl text-white mb-4">PRODUCT NOT FOUND</h2>
          <Link to="/explore" className="text-brand-cyan hover:underline font-body">← Back to Explore</Link>
        </div>
      </div>
    );
  }

  const variant = product.variants?.[selectedVariant];
  const currentPrice = product.price + (variant?.priceAdd || 0);
  const disc = discount(product.originalPrice, product.price);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, variant, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const allImages = product.images?.length ? product.images : [product.image];

  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-brand-muted hover:text-brand-cyan transition-colors mb-8 font-body text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <div className="relative bg-brand-card border border-brand-border rounded-2xl overflow-hidden aspect-[4/3] mb-3">
              <img
                src={allImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://via.placeholder.com/600x450/0D1422/00D4FF?text=FRANCO"; }}
              />
              {disc > 0 && (
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-amber text-brand-dark text-sm font-bold px-3 py-1 rounded-full font-mono">
                    -{disc}% OFF
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-brand-cyan" : "border-brand-border"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/64/0D1422/00D4FF?text=F"; }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-brand-cyan text-xs font-mono uppercase tracking-widest mb-2">{product.brand}</p>
            <h1 className="font-body text-3xl font-bold text-white leading-snug mb-3">{product.name}</h1>

            {/* Rating & Sold */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "text-brand-amber" : "text-brand-border"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-brand-muted text-sm font-mono">{product.rating} ({product.reviews} reviews)</span>
              </div>
              <span className="text-brand-muted text-sm font-mono">🔥 {product.sold}+ sold</span>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mb-6">
              <span className={`text-xs font-bold px-3 py-1 rounded-full font-mono border ${
                product.condition === "New"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-blue-500/10 text-blue-400 border-blue-500/30"
              }`}>
                {product.condition}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full font-mono bg-brand-border text-brand-muted">
                🛡️ {product.warranty}
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl text-brand-cyan tracking-wider">
                  {formatPrice(currentPrice)}
                </span>
                {disc > 0 && (
                  <span className="text-brand-muted text-lg line-through font-mono">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {variant?.priceAdd > 0 && (
                <p className="text-brand-muted text-xs font-mono mt-1">+{formatPrice(variant.priceAdd)} for this configuration</p>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 1 && (
              <div className="mb-6">
                <p className="text-brand-muted text-xs font-mono uppercase tracking-widest mb-2">Configuration</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-mono border transition-all ${
                        selectedVariant === i
                          ? "bg-brand-cyan text-brand-dark border-brand-cyan"
                          : "border-brand-border text-brand-muted hover:border-brand-cyan/50"
                      }`}
                    >
                      {v.label}
                      {v.priceAdd > 0 && <span className="ml-1 opacity-60 text-xs">+{formatPrice(v.priceAdd)}</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {product.ram && (
                <div className="bg-brand-card border border-brand-border rounded-xl p-3">
                  <p className="text-brand-muted text-xs font-mono">RAM</p>
                  <p className="text-brand-light font-semibold font-body">{product.ram}GB</p>
                </div>
              )}
              {product.storage && (
                <div className="bg-brand-card border border-brand-border rounded-xl p-3">
                  <p className="text-brand-muted text-xs font-mono">Storage</p>
                  <p className="text-brand-light font-semibold font-body">{product.storage}GB SSD</p>
                </div>
              )}
              {product.processor && (
                <div className="bg-brand-card border border-brand-border rounded-xl p-3 col-span-2">
                  <p className="text-brand-muted text-xs font-mono">Processor</p>
                  <p className="text-brand-light font-semibold font-body text-sm">{product.processor}</p>
                </div>
              )}
              {product.screen && (
                <div className="bg-brand-card border border-brand-border rounded-xl p-3">
                  <p className="text-brand-muted text-xs font-mono">Screen</p>
                  <p className="text-brand-light font-semibold font-body">{product.screen}</p>
                </div>
              )}
              {product.battery && (
                <div className="bg-brand-card border border-brand-border rounded-xl p-3">
                  <p className="text-brand-muted text-xs font-mono">Battery</p>
                  <p className="text-brand-light font-semibold font-body text-sm">{product.battery}</p>
                </div>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 bg-brand-card border border-brand-border rounded-xl px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-10 text-brand-muted hover:text-brand-cyan transition-colors text-lg"
                >
                  −
                </button>
                <span className="text-white font-mono w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-10 text-brand-muted hover:text-brand-cyan transition-colors text-lg"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 rounded-xl font-display text-xl tracking-wider transition-all ${
                  addedFeedback
                    ? "bg-emerald-500 text-white"
                    : "bg-brand-cyan text-brand-dark hover:brightness-110 shadow-lg shadow-brand-cyan/30"
                }`}
              >
                {addedFeedback ? "✓ ADDED TO CART!" : "ADD TO CART"}
              </button>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center border border-brand-cyan text-brand-cyan py-3.5 rounded-xl font-display text-xl tracking-wider hover:bg-brand-cyan/10 transition-all"
            >
              BUY NOW VIA WHATSAPP
            </Link>
          </div>
        </div>

        {/* Description & Full Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="font-display text-2xl text-white tracking-wider mb-4">DESCRIPTION</h2>
            <p className="text-brand-muted font-body leading-relaxed">{product.description}</p>
          </div>
          {product.specs && (
            <div>
              <h2 className="font-display text-2xl text-white tracking-wider mb-4">FULL SPECS</h2>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between gap-4 py-2 border-b border-brand-border">
                    <span className="text-brand-muted text-sm font-mono">{key}</span>
                    <span className="text-brand-light text-sm font-body text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-3xl text-white tracking-wider mb-6">
              YOU MAY <span className="text-brand-cyan">ALSO LIKE</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-brand-card/95 backdrop-blur-md border-t border-brand-border p-3 flex items-center justify-between gap-4 lg:hidden z-40">
        <div>
          <p className="text-brand-muted text-xs font-mono">Total</p>
          <p className="text-brand-cyan font-display text-2xl">{formatPrice(currentPrice * quantity)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className={`flex-1 max-w-xs py-3 rounded-xl font-display text-lg tracking-wider transition-all ${
            addedFeedback ? "bg-emerald-500 text-white" : "bg-brand-cyan text-brand-dark"
          }`}
        >
          {addedFeedback ? "✓ ADDED!" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}
