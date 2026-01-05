import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ShoppingBag, Trash2 } from 'lucide-react';
import DataTable from '../../../components/admin/DataTable';
import ProductBadges from '../../../components/Public/ProductBadges';
import { formatPrice } from '../../../lib/utils';

function Cart({ cart, onRemoveFromCart }) {
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // =====================
  // EMPTY CART STATE
  // =====================
  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-16 text-center border-2 border-pink-100">
        <div className="bg-pink-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart size={48} className="text-pink-400" />
        </div>

        <p className="text-2xl font-bold text-gray-700 mb-2">
          Keranjang Masih Kosong
        </p>
        <p className="text-gray-500 mb-6">
          Belum ada produk yang ditambahkan
        </p>

        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3 rounded-lg transition"
        >
          <ShoppingBag size={20} />
          Mulai Belanja
        </Link>
      </div>
    );
  }

  // =====================
  // CART TABLE
  // =====================
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Keranjang Belanja
      </h2>

      <DataTable
        data={cart}
        columns={[
          {
            header: 'ID',
            field: 'id',
            render: (row) => (
              <span className="font-bold">#{row.id}</span>
            ),
          },
          {
            header: 'Produk',
            field: 'name',
            render: (row) => (
              <span className="font-bold">{row.name}</span>
            ),
          },
          {
            header: 'Kategori',
            field: 'category',
            render: (row) => (
              <ProductBadges category={row.category} />
            ),
          },
          {
            header: 'Warna',
            field: 'color',
            render: (row) => (
              <span className="font-semibold text-pink-600">
                {row.color}
              </span>
            ),
          },
          {
            header: 'Harga',
            field: 'price',
            render: (row) => formatPrice(row.price),
          },
          {
            header: 'Jumlah',
            field: 'quantity',
            render: (row) => (
              <span className="bg-pink-200 text-pink-800 px-4 py-2 rounded-xl font-bold">
                {row.quantity}
              </span>
            ),
          },
          {
            header: 'Subtotal',
            field: 'subtotal',
            render: (row) => (
              <span className="font-bold text-pink-600">
                {formatPrice(row.price * row.quantity)}
              </span>
            ),
          },
        ]}
        renderActions={(row) => (
          <button
            onClick={() => onRemoveFromCart(row.id)}
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <Trash2 size={16} />
            Hapus
          </button>
        )}
      />

      {/* TOTAL */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-6 flex justify-between items-center border border-pink-100">
        <span className="text-xl font-bold text-gray-800">
          Total Pembayaran:
        </span>
        <span className="text-3xl font-bold text-pink-600">
          {formatPrice(getTotalPrice())}
        </span>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          to="/products"
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold px-6 py-3 rounded-lg transition"
        >
          Lanjut Belanja
        </Link>

        <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3 rounded-lg transition shadow-lg"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
