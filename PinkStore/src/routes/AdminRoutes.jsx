import { Route, Navigate } from "react-router-dom";

import DashboardPage from "../pages/admin/dashboard/Dashboard";
import ProductsPage from "../pages/admin/products/Products";
import AddProductPage from "../pages/admin/products/AddProduct";
import EditProductPage from "../pages/admin/products/EditProduct";
import OrdersPage from "../pages/admin/orders/Orders";

export const adminRoutes = (
  <>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="products" element={<ProductsPage />} />
    <Route path="products/add" element={<AddProductPage />} />
    <Route path="products/edit/:id" element={<EditProductPage />} />
    <Route path="orders" element={<OrdersPage />} />
  </>
);
