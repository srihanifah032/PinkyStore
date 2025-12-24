import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/ProductService';
import { formatPrice } from '../../lib/utils';

// Mock data
const MOCK_PRODUCTS = [
  { id: 1, name: 'Hijab Segi Empat Premium', price: 40000 },
  { id: 2, name: 'Pashmina Ceruty Babydoll', price: 35000 },
  { id: 3, name: 'Pashmina viscose', price: 45000 },
  { id: 4, name: 'Pashmina Voal', price: 50000 },
  { id: 5, name: 'Hijab Paris Premium', price: 35000 },
  { id: 6, name: 'Pashmina Kaos', price: 50000 },
];

function DashboardPage({ cart }) {
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  useEffect(() => {
    let mounted = true;
    getProducts()
      .then((data) => {
        if (mounted && data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (mounted) {
          setProducts(MOCK_PRODUCTS);
        }
      });
    return () => { mounted = false; };
  }, []);

  const totalRevenue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-500">
          <p className="text-gray-600 mb-2">Total Products</p>
          <p className="text-3xl font-bold text-gray-800">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-rose-500">
          <p className="text-gray-600 mb-2">Cart Items</p>
          <p className="text-3xl font-bold text-gray-800">{cart.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-fuchsia-500">
          <p className="text-gray-600 mb-2">Total Revenue</p>
          <p className="text-2xl font-bold text-pink-600">{formatPrice(totalRevenue)}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;