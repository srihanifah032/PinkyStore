import { useEffect, useState } from "react";
import DataTable from "../../../components/admin/DataTable";
import { formatPrice } from "../../../lib/utils";
import OrderService from "../../../services/OrderService";
import Loading from "../../../components/ui/Loading";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 REALTIME LISTENER FIRESTORE
    const unsubscribe = OrderService.subscribeOrders((data) => {
      const flattenedOrders = data.flatMap((order) =>
        order.items.map((item) => ({
          orderId: order.id,
          orderDate:
            order.createdAt?.toDate?.().toLocaleString() || "-",
          customer: order.userName || "Guest",
          product: item.name,
          category: item.category || "-",
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
          status: order.status || "pending",
        }))
      );

      setOrders(flattenedOrders);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ======================
  // LOADING STATE
  // ======================
  if (loading) {
    return <Loading text="Memuat data pesanan..." />;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Orders Management
      </h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-gray-500">No orders yet</p>
        </div>
      ) : (
        <DataTable
          data={orders}
          columns={[
            {
              header: "Customer",
              field: "customer",
            },
            {
              header: "Product",
              field: "product",
            },
            {
              header: "Category",
              field: "category",
            },
            {
              header: "Qty",
              field: "quantity",
            },
            {
              header: "Price",
              field: "price",
              render: (row) => formatPrice(row.price),
            },
            {
              header: "Total",
              field: "total",
              render: (row) => formatPrice(row.total),
            },
            {
              header: "Status",
              field: "status",
              render: (row) => (
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      row.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : row.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {row.status}
                </span>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}

export default AdminOrdersPage;