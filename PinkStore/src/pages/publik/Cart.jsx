import { ShoppingCart } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import { formatPrice } from '../../lib/utils';
import ProductBadges from '../../components/Public/ProductBadges';

function CartPage({ cart, onRemoveFromCart }) {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleDelete = (productId) => {
    onRemoveFromCart(productId);
    console.log('Tombol "Hapus" diklik:', {
      productId: productId,
      timestamp: new Date().toISOString()
    });
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-16 text-center border-2 border-pink-100">
        <div className="bg-pink-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart size={48} className="text-pink-400" />
        </div>
        <p className="text-2xl font-bold text-gray-700 mb-2">Keranjang Masih Kosong</p>
        <p className="text-gray-500">Belum ada produk yang ditambahkan</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Keranjang Belanja</h2>
      <DataTable
        data={cart}
        columns={[
          { header: 'ID', field: 'id' },
          { header: 'Produk', field: 'name', render: (row) => <span className="font-bold">{row.name}</span> },
          { header: 'Kategori', field: 'category', render: (row) => <ProductBadges category={row.category} /> },
          { header: 'Warna', field: 'color', render: (row) => <span className="font-semibold text-pink-600">{row.color}</span> },
          { header: 'Harga', field: 'price', render: (row) => formatPrice(row.price) },
          { header: 'Jumlah', field: 'quantity', render: (row) => (
            <span className="bg-pink-200 text-pink-800 px-4 py-2 rounded-xl font-bold">{row.quantity}</span>
          )},
          { header: 'Subtotal', field: 'subtotal', render: (row) => (
            <span className="font-bold text-pink-600">{formatPrice(row.price * row.quantity)}</span>
          )}
        ]}
        onDelete={handleDelete}
      />
      <div className="mt-6 bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-800">Total Pembayaran:</span>
        <span className="text-3xl font-bold text-pink-600">{formatPrice(getTotalPrice())}</span>
      </div>
    </div>
  );
}

export default CartPage;