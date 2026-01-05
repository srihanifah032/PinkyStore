// src/pages/publik/Home.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../../../components/Public/ProductCard';
import ProductService from '../../../services/ProductService';

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
      {/* Header Section */}
      <div className="text-center mb-14">
        <span className="inline-block bg-pink-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
          Koleksi Terbaru
        </span>

        <h2 className="text-4xl md:text-5xl font-extrabold text-pink-600 mb-4">
          Selamat Datang di Pink Store
        </h2>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Pilihan hijab berkualitas dengan desain modern untuk menunjang penampilan Anda setiap hari.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
