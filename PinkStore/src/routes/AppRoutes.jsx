import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "../pages/publik/ProductList";
import Products from "../pages/admin/Products";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/admin/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}
