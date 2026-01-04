import { Heart, Home, ShoppingCart, List } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar({ cartCount }) {
  return (
    <nav className="bg-gradient-to-r from-pink-400 via-pink-400 to-pink-400 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <Heart size={32} className="fill-white" />
            <div>
              <h1 className="text-2xl font-bold">Pink Store</h1>
              <p className="text-xs text-pink-100">Fashion Hijab Modern</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition hover:bg-pink-600"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/products"
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition hover:bg-pink-600"
            >
              <List size={18} />
              <span className="hidden sm:inline">Products</span>
            </Link>
            <Link
              to="/cart"
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition hover:bg-pink-600 relative"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;