import DataTable from "../../components/admin/DataTable";
import { formatPrice } from "../../lib/utils";

function AdminOrdersPage({ cart }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Orders Management</h2>
      {cart.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-gray-500">No orders yet</p>
        </div>
      ) : (
        <DataTable
          data={cart}
          columns={[
            { header: 'Product', field: 'name' },
            { header: 'Category', field: 'category' },
            { header: 'Quantity', field: 'quantity' },
            { header: 'Price', field: 'price', render: (row) => formatPrice(row.price) },
            { header: 'Total', field: 'total', render: (row) => formatPrice(row.price * row.quantity) }
          ]}
        />
      )}
    </div>
  );
}

export default AdminOrdersPage;
