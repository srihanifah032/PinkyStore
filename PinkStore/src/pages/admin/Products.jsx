import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import ProductBadges from '../../components/Public/ProductBadges';
import ProductService from '../../services/ProductService';
import { formatPrice } from '../../lib/utils';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await ProductService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleDelete = (productId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      ProductService.deleteProduct(productId);
      loadProducts();
      
      console.log('Tombol "Hapus" diklik:', {
        productId: productId,
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Products Management</h2>
          <p className="text-gray-600 mt-1">Kelola semua produk di toko Anda</p>
        </div>
        <Link
          to="/admin/products/add"
          className="bg-gradient-to-r from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-lg font-semibold"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      <DataTable
        data={products}
        columns={[
          { 
            header: 'ID', 
            field: 'id',
            render: (row) => <span className="font-bold text-gray-700">#{row.id}</span>
          },
          { 
            header: 'Product Name', 
            field: 'name',
            render: (row) => <span className="font-semibold text-gray-800">{row.name}</span>
          },
          { 
            header: 'Category', 
            field: 'category', 
            render: (row) => <ProductBadges category={row.category} /> 
          },
          { 
            header: 'Color', 
            field: 'color',
            render: (row) => <span className="text-pink-600 font-semibold">{row.color}</span>
          },
          { 
            header: 'Price', 
            field: 'price', 
            render: (row) => <span className="font-bold text-gray-700">{formatPrice(row.price)}</span>
          },
          { 
            header: 'Stock', 
            field: 'stock',
            render: (row) => (
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                row.stock > 20 ? 'bg-green-100 text-green-700' : 
                row.stock > 10 ? 'bg-yellow-100 text-yellow-700' : 
                'bg-red-100 text-red-700'
              }`}>
                {row.stock} pcs
              </span>
            )
          }
        ]}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Products;