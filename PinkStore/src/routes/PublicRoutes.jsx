import { Route } from 'react-router-dom';

// Public Pages
import HomePage from '../pages/public/Home';
import ProductListPage from '../pages/public/ProductList';
import ProductDetailPage from '../pages/public/ProductDetail';
import CartPage from '../pages/public/Cart';

function PublicRoutes({ cart, onAddToCart, onRemoveFromCart }) {
  return (
    <>
      <Route index element={<HomePage onAddToCart={onAddToCart} />} />
      <Route
        path="products"
        element={<ProductListPage onAddToCart={onAddToCart} />}
      />
      <Route
        path="products/:id"
        element={<ProductDetailPage onAddToCart={onAddToCart} />}
      />
      <Route
        path="cart"
        element={<CartPage cart={cart} onRemoveFromCart={onRemoveFromCart} />}
      />
    </>
  );
}

export default PublicRoutes;
