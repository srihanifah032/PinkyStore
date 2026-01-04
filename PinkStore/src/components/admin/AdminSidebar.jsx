// src/components/admin/AdminSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Plus } from 'lucide-react';

function AdminSidebar({ currentPath }) {
  const isActive = (path) => currentPath.startsWith(path);

  const menuItems = [
    {
      path: '/admin/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard'
    },
    {
      path: '/admin/products',
      icon: Package,
      label: 'Products',
      exact: true
    },
    {
      path: '/admin/products/add',
      icon: Plus,
      label: 'Add Product'
    },
    {
      path: '/admin/orders',
      icon: ShoppingCart,
      label: 'Orders'
    }
  ];

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = item.exact 
            ? currentPath === item.path 
            : isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                active
                  ? 'bg-pink-100 text-pink-700 font-semibold' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
