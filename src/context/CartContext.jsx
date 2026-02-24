import React, { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((product, variant, quantity = 1) => {
    setCartItems((prev) => {
      const key = `${product.id}-${variant?.label || "default"}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) return prev.map((i) => i.key === key ? { ...i, quantity: i.quantity + quantity } : i);
      const price = product.price + (variant?.priceAdd || 0);
      return [...prev, { key, product, variant, quantity, price }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((key) => setCartItems((prev) => prev.filter((i) => i.key !== key)), []);
  const updateQuantity = useCallback((key, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) => prev.map((i) => i.key === key ? { ...i, quantity } : i));
  }, []);
  const clearCart = useCallback(() => setCartItems([]), []);

  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal, sidebarOpen, setSidebarOpen, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() { return useContext(CartContext); }
