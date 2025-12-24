import { useEffect, useState } from "react";
import { getProducts } from "../../services/ProductService";
import DataTable from "../../components/admin/DataTable";
import { formatPrice } from "../../lib/utils";

const MOCK_PRODUCTS = [
  { id: 1, name: 'Hijab Segi Empat Premium', price: 40000, category: 'Segi Empat', stock: 25 },
  { id: 2, name: 'Pashmina Ceruty Babydoll', price: 35000, category: 'Pashmina', stock: 30 },
  { id: 3, name: 'Pashmina viscose', price: 45000, category: 'Pashmina', stock: 40 },
  { id: 4, name: 'Hijab Instan Mewah', price: 50000, category: 'Instan', stock: 20 },
  { id: 5, name: 'Hijab Segi Empat Katun', price: 30000, category: 'Segi Empat', stock: 35 },
  { id: 6, name: 'Pashmina Premium Diamond', price: 55000, category: 'Pashmina', stock: 15 },
];

function AdminProductsPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getProducts()
      .then((data) => {
        if (mounted && data && data.length > 0) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch(() => {
        if (mounted) {
          setProducts(MOCK_PRODUCTS);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="text-center py-10"><p>Loading...</p></div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin - Products</h1>
      <FormData />
      <DataTable 
        data={products} 
        columns={[
          { header: 'No', field: 'id', render: (row) => row.id },
          { header: 'Nama', field: 'name', render: (row) => <span className="font-bold">{row.name}</span> },
          { header: 'Kategori', field: 'category' },
          { header: 'Harga', field: 'price', render: (row) => formatPrice(row.price) },
          { header: 'Stock', field: 'stock', render: (row) => <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">{row.stock}</span> }
        ]}
      />
    </div>
  );
}

export default AdminProductsPage;
