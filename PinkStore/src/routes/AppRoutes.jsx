// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Import Public Pages
import HomePage from '../pages/publik/Home';
import ProductListPage from '../pages/publik/ProductList';
import ProductDetailPage from '../pages/publik/ProductDetail';
import CartPage from '../pages/publik/Cart';

// Import Admin Pages
import DashboardPage from '../pages/admin/Dashboard';
import AdminProductsPage from '../pages/admin/Products';
import AddProductPage from '../pages/admin/AddProduct';
import EditProductPage from '../pages/admin/EditProduct';
import AdminOrdersPage from '../pages/admin/Orders';

function AppRoutes({ cart, onAddToCart, onRemoveFromCart }) {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<PublicLayout cartCount={cart.length} />}>
        <Route index element={<HomePage onAddToCart={onAddToCart} />} />
        <Route path="products" element={<ProductListPage onAddToCart={onAddToCart} />} />
        <Route path="products/:id" element={<ProductDetailPage onAddToCart={onAddToCart} />} />
        <Route path="cart" element={<CartPage cart={cart} onRemoveFromCart={onRemoveFromCart} />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage cart={cart} />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/add" element={<AddProductPage />} />
        <Route path="products/edit/:id" element={<EditProductPage />} />
        <Route path="orders" element={<AdminOrdersPage cart={cart} />} />
      </Route>

      {/* 404 NOT FOUND */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;