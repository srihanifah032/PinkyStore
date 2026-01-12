import { Routes, Route, Navigate } from "react-router-dom"

// Layouts
import PublicLayout from "../components/layout/PublicLayout"
import AdminLayout from "../components/layout/AdminLayout"

// Guards
import AdminRoute from "./AdminRoute"
import AuthRoute from "./AuthRoute"
import CheckoutRoute from "./CheckoutRoute"

// Admin routes
import { adminRoutes } from "./AdminRoutes"

// Public pages
import HomePage from "../pages/public/home/Home"
import ProductListPage from "../pages/public/products/ProductList"
import ProductDetailPage from "../pages/public/products/ProductDetail"
import CartPage from "../pages/public/cart/Cart"
import Checkout from "../pages/public/checkout/Checkout"
import NotFound from "../pages/NotFound"

// Auth pages
import LoginPage from "../pages/auth/Login"
import RegisterPage from "../pages/auth/Register"

function AppRoutes({ cart, onAddToCart, onRemoveFromCart }) {
  return (
    <Routes>

      {/* AUTH */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* PUBLIC + CHECKOUT */}
<Route element={<PublicLayout cartCount={cart.length} />}>
  <Route path="/" element={<HomePage onAddToCart={onAddToCart} />} />
  <Route path="/products" element={<ProductListPage onAddToCart={onAddToCart} />} />
  <Route path="/products/:id" element={<ProductDetailPage onAddToCart={onAddToCart} />} />
  <Route path="/cart" element={<CartPage cart={cart} onRemoveFromCart={onRemoveFromCart} />} />

  {/* CHECKOUT HARUS DI SINI */}
  <Route element={<CheckoutRoute />}>
    <Route path="/checkout" element={<Checkout />} />
  </Route>
</Route>


      {/* ADMIN */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          {adminRoutes}
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default AppRoutes
