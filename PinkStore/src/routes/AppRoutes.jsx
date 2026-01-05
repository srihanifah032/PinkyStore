import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../components/layout/PublicLayout.jsx';
import AdminLayout from '../components/layout/AdminLayout.jsx';

// PUBLIC PAGES
import HomePage from '../pages/public/home/Home.jsx';
import ProductListPage from '../pages/public/products/ProductList.jsx';
import ProductDetailPage from '../pages/public/products/ProductDetail.jsx';
import CartPage from '../pages/public/cart/Cart.jsx';
import NotFound from '../pages/NotFound.jsx';

// ADMIN PAGES
import DashboardPage from '../pages/admin/dashboard/Dashboard.jsx';
import ProductsPage from '../pages/admin/products/Products.jsx';
import AddProductPage from '../pages/admin/products/AddProduct.jsx';
import EditProductPage from '../pages/admin/products/EditProduct.jsx';
import OrdersPage from '../pages/admin/orders/Orders.jsx';


function AppRoutes({ cart, onAddToCart, onRemoveFromCart }) {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route element={<PublicLayout cartCount={cart.length} />}>
        <Route path="/" element={<HomePage onAddToCart={onAddToCart} />} />
        <Route path="/products" element={<ProductListPage onAddToCart={onAddToCart} />} />
        <Route path="/products/:id" element={<ProductDetailPage onAddToCart={onAddToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} onRemoveFromCart={onRemoveFromCart} />} />
      </Route>

      {/* ================= ADMIN ROUTES ================= */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/add" element={<AddProductPage />} />
        <Route path="products/edit/:id" element={<EditProductPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<NotFound />} />


    </Routes>
  );
}

export default AppRoutes;
