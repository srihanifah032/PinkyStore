// src/components/admin/AdminHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home } from 'lucide-react';

function AdminHeader() {
  return (
    <header className="bg-white shadow-md border-b-2 border-pink-200">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart size={28} className="text-pink-500 fill-pink-500" />
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <Link
          to="/"
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition font-semibold flex items-center gap-2"
        >
          <Home size={18} />
          Back to Store
        </Link>
      </div>
    </header>
  );
}

export default AdminHeader;
