import React, { createContext, useContext, useState } from "react";

const AdminContext = createContext(null);

const ADMIN_CREDENTIALS = { username: "theadmindoncome", password: "theadmindoncome" };
const STORAGE_KEY = "franco_products";
const AUTH_KEY = "franco_admin_auth";

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try { return sessionStorage.getItem(AUTH_KEY) === "true"; } catch { return false; }
  });

  const [adminProducts, setAdminProductsState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const setAdminProducts = (data) => {
    setAdminProductsState(data);
    try {
      if (data === null) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { console.error("Storage error:", e); }
  };

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
    <AdminContext.Provider value={{ isAuthenticated, login, logout, adminProducts, setAdminProducts }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() { return useContext(AdminContext); }
