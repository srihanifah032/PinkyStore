import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

import DataTable from '../../../components/admin/DataTable';
import ProductBadges from '../../../components/Public/ProductBadges';
import ProductService from '../../../services/ProductService';
import { formatPrice } from '../../../lib/utils';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getProducts();
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      'Apakah Anda yakin ingin menghapus produk ini?'
    );

    if (!confirmDelete) return;

    try {
      await ProductService.deleteProduct(productId);
      await loadProducts();

      console.log('Produk dihapus:', {
        productId,
        time: new Date().toISOString()
      });
    } catch (error) {
      console.error('Gagal menghapus produk:', error);
      alert('Gagal menghapus produk');
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Products Management
          </h2>
          <p className="text-gray-600 mt-1">
            Kelola semua produk di toko Anda
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="bg-gradient-to-r from-pink-500 to-pink-600
                     hover:from-pink-600 hover:to-pink-700
                     text-white px-6 py-3 rounded-lg
                     flex items-center gap-2
                     shadow-lg font-semibold transition"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
          Belum ada produk
        </div>
      ) : (
        <DataTable
          data={products}
          columns={[
            {
              header: 'ID',
              field: 'id',
              render: (row) => (
                <span className="font-bold text-gray-700">#{row.id}</span>
              )
            },
            {
              header: 'Product Name',
              field: 'name',
              render: (row) => (
                <span className="font-semibold text-gray-800">
                  {row.name}
                </span>
              )
            },
            {
              header: 'Category',
              field: 'category',
              render: (row) => (
                <ProductBadges category={row.category} />
              )
            },
            {
              header: 'Color',
              field: 'color',
              render: (row) => (
                <span className="text-pink-600 font-semibold">
                  {row.color}
                </span>
              )
            },
            {
              header: 'Price',
              field: 'price',
              render: (row) => (
                <span className="font-bold text-gray-700">
                  {formatPrice(row.price)}
                </span>
              )
            },
            {
              header: 'Stock',
              field: 'stock',
              render: (row) => (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    row.stock > 20
                      ? 'bg-green-100 text-green-700'
                      : row.stock > 10
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {row.stock} pcs
                </span>
              )
            }
          ]}
          renderActions={(row) => (
            <div className="flex gap-2">
              <Link
                to={`/admin/products/edit/${row.id}`}
                className="px-4 py-1.5 rounded-md text-sm font-semibold
                           bg-blue-500 hover:bg-blue-600 text-white transition"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(row.id)}
                className="px-4 py-1.5 rounded-md text-sm font-semibold
                           bg-red-500 hover:bg-red-600 text-white transition"
              >
                Hapus
              </button>
            </div>
          )}
        />
      )}
    </div>
  );
}

export default Products;
