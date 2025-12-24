import { Heart, Home, ShoppingCart, List } from 'lucide-react';

function Navbar({ cartCount, onNavigate, currentPage }) {
  return (
    <nav className="bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <Heart size={32} className="fill-white" />
            <div>
              <h1 className="text-2xl font-bold">Pink Store</h1>
              <p className="text-xs text-pink-100">Fashion Hijab Modern</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                currentPage === 'home' ? 'bg-white text-pink-600' : 'hover:bg-pink-600'
              }`}
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </button>
            <button
              onClick={() => onNavigate('products')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                currentPage === 'products' ? 'bg-white text-pink-600' : 'hover:bg-pink-600'
              }`}
            >
              <List size={18} />
              <span className="hidden sm:inline">Products</span>
            </button>
            <button
              onClick={() => onNavigate('cart')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition relative ${
                currentPage === 'cart' ? 'bg-white text-pink-600' : 'hover:bg-pink-600'
              }`}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;