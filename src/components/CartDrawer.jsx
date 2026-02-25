import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";

export default function CartDrawer() {
  const { cartItems, cartOpen, setCartOpen, removeFromCart, updateQuantity, subtotal } = useCart();

  return (
    <>
      {cartOpen && <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={() => setCartOpen(false)} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-white dark:bg-brand-card border-l border-gray-200 dark:border-brand-border flex flex-col transform transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>

        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-brand-border">
          <h2 className="font-display text-2xl text-gray-900 dark:text-white tracking-wider">
            YOUR <span className="text-brand-cyan">CART</span>
          </h2>
          <button onClick={() => setCartOpen(false)} className="p-1 text-gray-400 dark:text-brand-muted hover:text-gray-900 dark:hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-400 dark:text-brand-muted font-body">Your cart is empty</p>
              <button onClick={() => setCartOpen(false)} className="mt-4 text-brand-cyan text-sm font-body hover:underline">Start Shopping →</button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.key} className="bg-gray-50 dark:bg-brand-dark border border-gray-200 dark:border-brand-border rounded-xl p-3 flex gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg shrink-0"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/64/E8EDF5/00D4FF?text=F"; }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 dark:text-brand-light text-sm font-body font-medium leading-snug truncate">{item.product.name}</p>
                  {item.variant && <p className="text-gray-400 dark:text-brand-muted text-xs font-mono mt-0.5">{item.variant.label}</p>}
                  <p className="text-brand-cyan text-sm font-display tracking-wide mt-1">{formatPrice(item.price)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-gray-200 dark:bg-brand-border text-gray-700 dark:text-brand-light text-sm hover:bg-brand-cyan hover:text-brand-dark transition-colors flex items-center justify-center">−</button>
                      <span className="text-gray-800 dark:text-brand-light text-sm font-mono w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-gray-200 dark:bg-brand-border text-gray-700 dark:text-brand-light text-sm hover:bg-brand-cyan hover:text-brand-dark transition-colors flex items-center justify-center">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.key)} className="text-red-400 hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-200 dark:border-brand-border space-y-3">
            <div className="flex justify-between text-gray-800 dark:text-brand-light font-body">
              <span>Subtotal</span>
              <span className="font-semibold font-mono">{formatPrice(subtotal)}</span>
            </div>
            <Link to="/checkout" onClick={() => setCartOpen(false)}
              className="block w-full bg-brand-cyan text-brand-dark text-center py-3.5 rounded-xl font-display text-xl tracking-wider hover:brightness-110 transition-all">
              CHECKOUT
            </Link>
            <button onClick={() => setCartOpen(false)}
              className="block w-full text-center text-gray-400 dark:text-brand-muted text-sm font-body hover:text-gray-700 dark:hover:text-brand-light transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
