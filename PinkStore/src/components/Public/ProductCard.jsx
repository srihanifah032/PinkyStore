import { ShoppingCart, Package } from 'lucide-react';
import ProductBadges from './ProductBadges';
import ProductPrice from './ProductPrice';

function ProductCard({ product, onAddToCart }) {
  const handleBuy = () => {
    onAddToCart(product);
    console.log('Tombol "Beli" diklik:', {
      productId: product.id,
      productName: product.name,
      color: product.color,
      price: product.price,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-pink-100">
      <div className="bg-gradient-to-br from-pink-300 via-pink-300 to-pink-300 h-56 flex items-center justify-center relative">
        <Package size={72} className="text-white opacity-30" />
        <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 text-xs font-bold text-pink-600 shadow-md">
          {product.color}
        </div>
      </div>
      <div className="p-6">
        <ProductBadges category={product.category} />
        <h3 className="text-xl font-bold mb-2 text-gray-800 mt-3">{product.name}</h3>
        <ProductPrice price={product.price} />
        <p className="text-sm text-gray-600 mb-5">
          Stok: <span className="font-bold text-green-600">{product.stock} pcs</span>
        </p>
        <button
          onClick={handleBuy}
          className="w-full bg-gradient-to-r from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-lg"
        >
          <ShoppingCart size={20} />
          Beli Sekarang
        </button>
      </div>
    </div>
  );
}

export default ProductCard;