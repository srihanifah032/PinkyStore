import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import OrderService from "../../../services/OrderService";
import { formatPrice } from "../../../lib/utils";

function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ambil produk sekali
    ProductService.getProducts().then((data) => {
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
    });

    // 🔥 realtime orders
    const unsubscribe = OrderService.subscribeOrders(setOrders);

    return () => unsubscribe(); // cleanup
  }, []);

  // ===============================
  // HITUNG DARI ORDERS
  // ===============================
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.totalPrice || 0),
    0
  );

  const totalOrders = orders.length;

  const itemsSold = orders.reduce(
    (sum, o) => sum + (o.totalItems || 0),
    0
  );

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-600">
          <p className="text-gray-600 mb-2">Total Products</p>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-600">
          <p className="text-gray-600 mb-2">Total Orders</p>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-600">
          <p className="text-gray-600 mb-2">Items Sold</p>
          <p className="text-3xl font-bold">{itemsSold}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-600">
          <p className="text-gray-600 mb-2">Total Revenue</p>
          <p className="text-2xl font-bold text-pink-600">
            {formatPrice(totalRevenue)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
