import React, { useState } from 'react';
import { Home, LayoutDashboard } from 'lucide-react';

// Import Layouts
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

// Import Public Pages
import HomePage from './pages/publik/Home';
import ProductListPage from './pages/publik/ProductList';
import CartPage from './pages/publik/Cart';

// Import Admin Pages
import DashboardPage from './pages/admin/Dashboard';
import AdminProductsPage from './pages/admin/Products';
import AdminOrdersPage from './pages/admin/Orders';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);

  // Handler untuk menambah ke cart
  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Handler untuk hapus dari cart
  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Render halaman sesuai route
  const renderPage = () => {
    // Halaman Public
    // test
    const publicPages = {
      'home': <HomePage onAddToCart={handleAddToCart} />,
      'products': <ProductListPage onAddToCart={handleAddToCart} />,
      'cart': <CartPage cart={cart} onRemoveFromCart={handleRemoveFromCart} />
    };

    // Halaman Admin
    // test
    const adminPages = {
      'admin-dashboard': <DashboardPage cart={cart} />,
      'admin-products': <AdminProductsPage />,
      'admin-orders': <AdminOrdersPage cart={cart} />
    };

    // Cek apakah halaman admin atau public
    if (currentPage.startsWith('admin-')) {
      return (
        <AdminLayout onNavigate={setCurrentPage} currentPage={currentPage}>
          {adminPages[currentPage]}
        </AdminLayout>
      );
    }

    return (
      <PublicLayout 
        cartCount={cart.length} 
        onNavigate={setCurrentPage} 
        currentPage={currentPage}
      >
        {publicPages[currentPage]}
      </PublicLayout>
    );
  };

  return (
    <>
      {renderPage()}
      
      {/* Floating Button untuk Switch Public/Admin */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setCurrentPage(currentPage.startsWith('admin-') ? 'home' : 'admin-dashboard')}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 transition-all transform hover:scale-105"
        >
          {currentPage.startsWith('admin-') ? (
            <>
              <Home size={20} />
              <span className="font-semibold">Public</span>
            </>
          ) : (
            <>
              <LayoutDashboard size={20} />
              <span className="font-semibold">Admin</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}

export default App;
