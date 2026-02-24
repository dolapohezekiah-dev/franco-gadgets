import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice, discount } from "../utils/helpers";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const disc = discount(product.originalPrice, product.price);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.variants?.[0] || null);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-brand-card border border-brand-border rounded-2xl overflow-hidden hover:border-brand-cyan/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-cyan/10 flex flex-col"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {disc > 0 && (
          <span className="bg-brand-amber text-brand-dark text-xs font-bold px-2 py-0.5 rounded-full font-mono">
            -{disc}%
          </span>
        )}
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full font-mono ${
            product.condition === "New"
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
          }`}
        >
          {product.condition}
        </span>
      </div>

      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-brand-border to-brand-dark overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300/0D1422/00D4FF?text=FRANCO";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <p className="text-xs text-brand-muted font-mono uppercase tracking-widest mb-1">{product.brand}</p>
          <h3 className="text-brand-light font-body font-semibold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-brand-cyan transition-colors">
            {product.name}
          </h3>

          {/* Specs pills */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.ram && (
              <span className="text-xs bg-brand-border text-brand-muted px-2 py-0.5 rounded-full font-mono">
                {product.ram}GB RAM
              </span>
            )}
            {product.storage && (
              <span className="text-xs bg-brand-border text-brand-muted px-2 py-0.5 rounded-full font-mono">
                {product.storage}GB
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  className={`w-3 h-3 ${s <= Math.round(product.rating) ? "text-brand-amber" : "text-brand-border"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-brand-muted font-mono">({product.reviews})</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between gap-2 mt-auto">
          <div>
            <p className="text-brand-cyan font-display text-xl tracking-wide">
              {formatPrice(product.price)}
            </p>
            {disc > 0 && (
              <p className="text-brand-muted text-xs line-through font-mono">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="shrink-0 bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan px-3 py-2 rounded-xl text-xs font-semibold hover:bg-brand-cyan hover:text-brand-dark transition-all duration-200 font-body"
          >
            Add to Cart
          </button>
        </div>

        {/* Sold count */}
        {product.sold > 50 && (
          <p className="text-xs text-brand-muted mt-2 font-mono">
            🔥 {product.sold}+ sold
          </p>
        )}
      </div>
    </Link>
  );
}
