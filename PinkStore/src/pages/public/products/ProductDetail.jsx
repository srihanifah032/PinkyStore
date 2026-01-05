// src/pages/publik/ProductDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react';
import ProductService from '../../../services/ProductService';
import ProductBadges from '../../../components/Public/ProductBadges';
import { formatPrice } from '../../../lib/utils';

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id || isNaN(id)) {
        navigate('/products');
        return;
      }

      try {
        const prod = await ProductService.getProduct(Number(id));
        setProduct(prod);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Produk tidak ditemukan');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = useCallback(() => {
    if (!product || product.stock === 0) return;

    onAddToCart(product);

    console.log('Produk ditambahkan ke keranjang:', {
      id: product.id,
      name: product.name,
      price: product.price,
      timestamp: new Date().toISOString(),
    });
  }, [product, onAddToCart]);

  /* =====================
     UI STATES
  ====================== */
  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 text-gray-500">
        Memuat detail produk...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24">
        <p className="text-lg text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate('/products')}
          className="text-pink-600 font-semibold hover:underline"
        >
          Kembali ke daftar produk
        </button>
      </div>
    );
  }

  /* =====================
     MAIN UI
  ====================== */
  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate('/products')}
        className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold mb-6"
      >
        <ArrowLeft size={20} />
        Kembali ke Produk
      </button>

      <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Image Placeholder */}
          <div className="bg-gradient-to-br from-pink-300 via-pink-300 to-pink-300 h-96 flex items-center justify-center">
            <Package size={120} className="text-white opacity-30" />
          </div>

          {/* Product Info */}
          <div className="p-8">
            <ProductBadges category={product.category} />

            <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-4">
              {product.name}
            </h1>

            {/* Color */}
            <div className="mb-5">
              <p className="text-sm text-gray-600 mb-1">Warna</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-pink-400 border" />
                <span className="font-semibold text-pink-600">
                  {product.color}
                </span>
              </div>
            </div>

            {/* Stock */}
            <div className="mb-5">
              <p className="text-sm text-gray-600 mb-1">Stok</p>
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${
                  product.stock > 20
                    ? 'bg-green-100 text-green-700'
                    : product.stock > 10
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} pcs tersedia`
                  : 'Stok habis'}
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-1">Harga</p>
              <p className="text-4xl font-bold text-pink-600">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-1">Deskripsi</p>
              <p className="text-gray-700 leading-relaxed">
                Hijab premium dengan material lembut, nyaman digunakan seharian,
                dan tidak mudah kusut. Cocok untuk aktivitas formal maupun casual.
              </p>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg'
              }`}
            >
              <ShoppingCart size={22} />
              {product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
