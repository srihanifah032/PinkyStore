// src/components/public/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Home, List, LayoutDashboard } from 'lucide-react';

function Navbar({ cartCount }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="text-2xl">💖</div>
            <div>
              <h1 className="text-2xl font-bold">Pink Store</h1>
              <p className="text-xs text-pink-100">Fashion Hijab Modern</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                isActive('/') ? 'bg-white text-pink-600' : 'hover:bg-pink-600'
              }`}
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link
              to="/products"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                isActive('/products') ? 'bg-white text-pink-600' : 'hover:bg-pink-600'
              }`}
            >
              <List size={18} />
              <span className="hidden sm:inline">Products</span>
            </Link>
            
            <Link
              to="/cart"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition relative ${
                isActive('/cart') ? 'bg-white text-pink-600' : 'hover:bg-pink-600'
              }`}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="hidden sm:inline">Cart</span>
            </Link>
            
            <Link
              to="/admin"
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition bg-pink-600 hover:bg-pink-700 border-2 border-white/30"
            >
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;