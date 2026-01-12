import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, ShoppingBag, Trash2 } from "lucide-react"

import DataTable from "../../../components/admin/DataTable"
import ProductBadges from "../../../components/Public/ProductBadges"
import { formatPrice } from "../../../lib/utils"
import { Button } from "@/components/ui/button"

function Cart({ cart = [], onRemoveFromCart }) {
  const navigate = useNavigate()

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleCheckout = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
    navigate("/checkout")
  }

  // =====================
  // EMPTY CART
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

        <Link to="/products">
          <Button variant="pink" size="xl">
            <ShoppingBag size={22} />
            Mulai Belanja
          </Button>
        </Link>
      </div>
    )
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
            header: "Produk",
            render: (row) => <span className="font-bold">{row.name}</span>,
          },
          {
            header: "Kategori",
            render: (row) => <ProductBadges category={row.category} />,
          },
          {
            header: "Harga",
            render: (row) => formatPrice(row.price),
          },
          {
            header: "Jumlah",
            render: (row) => (
              <span className="bg-pink-200 text-pink-800 px-4 py-2 rounded-xl font-bold">
                {row.quantity}
              </span>
            ),
          },
          {
            header: "Subtotal",
            render: (row) => (
              <span className="font-bold text-pink-600">
                {formatPrice(row.price * row.quantity)}
              </span>
            ),
          },
        ]}
        renderActions={(row) => (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onRemoveFromCart(row.id)}
          >
            <Trash2 size={16} />
            Hapus
          </Button>
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

      {/* ACTION */}
      <div className="mt-6 flex justify-end gap-4">
        <Button asChild variant="secondary">
          <Link to="/products">Lanjut Belanja</Link>
        </Button>

        <Button variant="pink" size="lg" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  )
}

export default Cart
