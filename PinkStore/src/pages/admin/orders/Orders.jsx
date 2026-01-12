import { useEffect, useState } from "react";
import DataTable from "../../../components/admin/DataTable";
import { formatPrice } from "../../../lib/utils";
import OrderService from "../../../services/OrderService";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // 🔥 REALTIME LISTENER
    const unsubscribe = OrderService.subscribeOrders((data) => {
      const flattened = data.flatMap((order) =>
        order.items.map((item) => ({
          orderId: order.id,
          orderDate: order.createdAt?.toDate?.().toLocaleString() || "-",
          customer: order.userName || "Guest",
          product: item.name,
          category: item.category || "-",
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
          status: order.status || "pending",
        }))
      );

      setOrders(flattened);
    });

    return () => unsubscribe();
  }, []);

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
            { header: "Customer", field: "customer" },
            { header: "Product", field: "product" },
            { header: "Category", field: "category" },
            { header: "Qty", field: "quantity" },
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
            { header: "Status", field: "status" },
          ]}
        />
      )}
    </div>
  );
}

export default AdminOrdersPage;
