import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react';
import AdminHeader from '../admin/AdminHeader';

function AdminLayout({ children, onNavigate, currentPage }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onNavigate={onNavigate} currentPage={currentPage} />
      <div className="flex">
        <aside className="w-64 bg-white shadow-lg min-h-screen p-4">
          <nav className="space-y-2">
            <button
              onClick={() => onNavigate('admin-dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                currentPage === 'admin-dashboard' ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('admin-products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                currentPage === 'admin-products' ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100'
              }`}
            >
              <Package size={20} />
              Products
            </button>
            <button
              onClick={() => onNavigate('admin-orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                currentPage === 'admin-orders' ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100'
              }`}
            >
              <ShoppingCart size={20} />
              Orders
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;