import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductService from '../../services/ProductService';

function AddProduct() {
  const navigate = useNavigate();
  
  const categories = ['Segi Empat', 'Pashmina', 'Instan', 'Paris', 'Kaos'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newProduct = {
      id: Date.now(),
      name: formData.get('name'),
      price: parseInt(formData.get('price')),
      category: formData.get('category'),
      stock: parseInt(formData.get('stock')),
      color: formData.get('color')
    };

    ProductService.createProduct(newProduct);
    
    console.log('Produk baru ditambahkan:', {
      product: newProduct,
      timestamp: new Date().toISOString()
    });

    alert('Produk berhasil ditambahkan!');
    navigate('/admin/products');
  };

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold mb-4"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>
        <h2 className="text-3xl font-bold text-gray-800">Add New Product</h2>
        <p className="text-gray-600 mt-1">Tambahkan produk baru ke katalog Anda</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-pink-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="e.g., Hijab Premium"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Color *
              </label>
              <input
                type="text"
                name="color"
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="e.g., Dusty Pink"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (Rp) *
              </label>
              <input
                type="number"
                name="price"
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="e.g., 85000"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="e.g., 25"
                min="0"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 rounded-lg transition shadow-lg"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
