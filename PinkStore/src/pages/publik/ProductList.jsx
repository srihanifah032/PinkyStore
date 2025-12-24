import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/ProductService';
import ProductCard from '../../components/Public/ProductCard';

// Mock data fallback
const MOCK_PRODUCTS = [
  { id: 1, name: 'Hijab Segi Empat Premium', price: 40000, category: 'Segi Empat', stock: 25, color: 'Dusty Pink', image: '/assets/product1.jpg' },
  { id: 2, name: 'Pashmina Ceruty Babydoll', price: 35000, category: 'Pashmina', stock: 30, color: 'Mocca', image: '/assets/product2.jpg' },
  { id: 3, name: 'Pashmina viscose', price: 45000, category: 'Pashmina', stock: 40, color: 'Navy', image: '/assets/product3.jpg' },
  { id: 4, name: 'Hijab Instan Mewah', price: 50000, category: 'Instan', stock: 20, color: 'Mauve', image: '/assets/product4.jpg' },
  { id: 5, name: 'Hijab Segi Empat Katun', price: 30000, category: 'Segi Empat', stock: 35, color: 'Cream', image: '/assets/product5.jpg' },
  { id: 6, name: 'Pashmina Premium Diamond', price: 55000, category: 'Pashmina', stock: 15, color: 'Rose Gold', image: '/assets/product6.jpg' },
];

function ProductListPage({ onAddToCart }) {
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

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold mb-8 text-pink-600">Daftar Produk Kami</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">Produk kosong</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListPage;
