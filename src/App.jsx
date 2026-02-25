import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AdminProvider, useAdmin } from "./context/AdminContext";
import { ThemeProvider } from "./context/ThemeContext";

// Store
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import CartDrawer from "./components/CartDrawer";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import { AboutPage, FAQsPage, WarrantyPage, DeliveryPage, ContactPage } from "./pages/InfoPages";

// Admin
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminProductForm from "./admin/AdminProductForm";
import AdminSettings from "./admin/AdminSettings";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function RequireAuth({ children }) {
  const { isAuthenticated } = useAdmin();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return children;
}

function StoreFront() {
  return (
    <>
      <Header />
      <Sidebar />
      <CartDrawer />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/warranty" element={<WarrantyPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={<RequireAuth><AdminLayout /></RequireAuth>}
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductForm />} />
          <Route path="products/edit/:id" element={<AdminProductForm />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="/*" element={<StoreFront />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <AdminProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AdminProvider>
    </BrowserRouter>
    </ThemeProvider>
  );
}
