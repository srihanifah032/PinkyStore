import { Route, Navigate } from 'react-router-dom';

// Admin Pages
import DashboardPage from '../pages/admin/Dashboard';
import AdminProductsPage from '../pages/admin/Products';
import AddProductPage from '../pages/admin/AddProduct';
import EditProductPage from '../pages/admin/EditProduct';
import AdminOrdersPage from '../pages/admin/Orders';

function AdminRoutes({ cart }) {
  return (
    <>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<DashboardPage cart={cart} />} />
      <Route path="products" element={<AdminProductsPage />} />
      <Route path="products/add" element={<AddProductPage />} />
      <Route path="products/edit/:id" element={<EditProductPage />} />
      <Route path="orders" element={<AdminOrdersPage cart={cart} />} />
    </>
  );
}

export default AdminRoutes;
