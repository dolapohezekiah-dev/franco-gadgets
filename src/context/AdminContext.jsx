import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  fetchProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
  fetchSettings,
  saveSettings,
} from "../lib/supabase";
import { products as staticProducts } from "../data/products";

const AdminContext = createContext(null);

const ADMIN_CREDENTIALS = { username: "theadmindoncome", password: "theadmindoncome" };
const AUTH_KEY = "franco_admin_auth";

export function AdminProvider({ children }) {
  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try { return sessionStorage.getItem(AUTH_KEY) === "true"; } catch { return false; }
  });

  // Products
  const [adminProducts, setAdminProducts] = useState(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  // Settings
  const [storeSettings, setStoreSettings] = useState(null);

  // Load products from Supabase on mount
  useEffect(() => { loadProducts(); }, []);

  const loadProducts = useCallback(async () => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const data = await fetchProducts();
      if (data && data.length > 0) {
        setAdminProducts(data);
      } else {
        // Table is empty — seed with defaults from products.js
        console.log("Seeding Supabase with default products...");
        const seeded = await seedProducts(staticProducts);
        setAdminProducts(seeded);
      }
    } catch (err) {
      console.error("Supabase error:", err);
      setProductsError(err.message);
      setAdminProducts(null); // fall back to staticProducts via useProducts hook
    } finally {
      setProductsLoading(false);
    }
  }, []);

  // Load settings from Supabase on mount
  useEffect(() => { loadSettings(); }, []);

  const loadSettings = useCallback(async () => {
    try {
      const data = await fetchSettings();
      if (data) setStoreSettings(data);
    } catch (err) {
      console.error("Settings load error:", err);
    }
  }, []);

  // CRUD
  const addProduct = useCallback(async (product) => {
    const newProduct = await insertProduct(product);
    setAdminProducts((prev) => [...(prev || []), newProduct]);
    return newProduct;
  }, []);

  const editProduct = useCallback(async (id, product) => {
    const updated = await updateProduct(id, product);
    setAdminProducts((prev) =>
      prev ? prev.map((p) => (p.id === id ? updated : p)) : [updated]
    );
    return updated;
  }, []);

  const removeProduct = useCallback(async (id) => {
    await deleteProduct(id);
    setAdminProducts((prev) => prev ? prev.filter((p) => p.id !== id) : []);
  }, []);

  const toggleProductFlag = useCallback(async (id, flag) => {
    const current = (adminProducts || []).find((p) => p.id === id);
    if (!current) return;
    const updated = await updateProduct(id, { ...current, [flag]: !current[flag] });
    setAdminProducts((prev) =>
      prev ? prev.map((p) => (p.id === id ? updated : p)) : [updated]
    );
  }, [adminProducts]);

  const updateSettings = useCallback(async (settings) => {
    const saved = await saveSettings(settings);
    setStoreSettings(saved);
    return saved;
  }, []);

  const resetToDefaults = useCallback(async () => {
    const seeded = await seedProducts(staticProducts);
    setAdminProducts(seeded);
  }, []);

  // Auth
  const login = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated, login, logout,
      adminProducts, productsLoading, productsError,
      addProduct, editProduct, removeProduct, toggleProductFlag,
      resetToDefaults, reloadProducts: loadProducts,
      storeSettings, updateSettings,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() { return useContext(AdminContext); }
