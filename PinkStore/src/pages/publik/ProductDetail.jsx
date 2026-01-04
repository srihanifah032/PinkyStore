// src/pages/publik/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react';
import ProductService from '../../services/ProductService';
import ProductBadges from '../../components/Public/ProductBadges';
import { formatPrice } from '../../lib/utils';

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const prod = await ProductService.getProduct(parseInt(id));
        setProduct(prod);
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate('/products');
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(product);
    
    console.log('Tombol "Beli" diklik:', {
      productId: product.id,
      productName: product.name,
      color: product.color,
      price: product.price,
      timestamp: new Date().toISOString()
    });

    alert('Produk ditambahkan ke keranjang!');
  };

  return (
    <div>
      <button
        onClick={() => navigate('/products')}
        className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold mb-6"
      >
        <ArrowLeft size={20} />
        Kembali ke Products
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-pink-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-pink-300 via-pink-400 to-rose-400 h-96 flex items-center justify-center">
            <Package size={120} className="text-white opacity-30" />
          </div>

          {/* Product Info */}
          <div className="p-8">
            <ProductBadges category={product.category} />
            <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-4">{product.name}</h1>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Warna:</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-pink-400 border-2 border-gray-300"></div>
                <span className="font-semibold text-pink-600">{product.color}</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Stok:</p>
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                product.stock > 20 ? 'bg-green-100 text-green-700' : 
                product.stock > 10 ? 'bg-yellow-100 text-yellow-700' : 
                'bg-red-100 text-red-700'
              }`}>
                {product.stock} pcs tersedia
              </span>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Harga:</p>
              <p className="text-4xl font-bold text-pink-600">{formatPrice(product.price)}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Deskripsi:</p>
              <p className="text-gray-700">
                Hijab premium dengan kualitas terbaik, nyaman dipakai seharian. 
                Material lembut dan tidak mudah kusut. Cocok untuk berbagai acara formal maupun casual.
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg"
            >
              <ShoppingCart size={24} />
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
