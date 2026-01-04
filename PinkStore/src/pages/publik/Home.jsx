// src/pages/publik/Home.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/Public/ProductCard';
import ProductService from '../../services/ProductService';

function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await ProductService.getProducts();
        setProducts(allProducts.slice(0, 3));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="text-center mb-10">
        <div className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
           Koleksi Terbaru 
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

export default Home;
