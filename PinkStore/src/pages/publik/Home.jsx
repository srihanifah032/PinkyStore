import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/ProductService';
import ProductCard from '../../components/Public/ProductCard';

// Mock data fallback
const MOCK_PRODUCTS = [
  { id: 1, name: 'Hijab Segi Empat Premium', price: 40000, category: 'Segi Empat', stock: 25, color: 'Dusty Pink', image: '/assets/product1.jpg' },
  { id: 2, name: 'Pashmina Ceruty Babydoll', price: 35000, category: 'Pashmina', stock: 30, color: 'Mocca', image: '/assets/product2.jpg' },
  { id: 3, name: 'Pashmina viscose', price: 45000, category: 'Pashmina', stock: 40, color: 'Navy', image: '/assets/product3.jpg' },
];

function HomePage({ onAddToCart }) {
  const [products, setProducts] = useState(MOCK_PRODUCTS.slice(0, 3));

  useEffect(() => {
    let mounted = true;
    getProducts()
      .then((data) => {
        if (mounted && data && data.length > 0) {
          setProducts(data.slice(0, 3));
        }
      })
      .catch(() => {
        if (mounted) {
          setProducts(MOCK_PRODUCTS.slice(0, 3));
        }
      });
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <div className="text-center mb-10">
        <div className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          ✨ Koleksi Terbaru ✨
        </div>
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          Selamat Datang di Pink Store
        </h2>
        <p className="text-gray-600 text-lg">Pilihan hijab berkualitas untuk penampilan sempurna Anda</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
