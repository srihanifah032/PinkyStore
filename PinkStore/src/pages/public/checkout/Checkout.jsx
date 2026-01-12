import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { formatPrice } from "@/lib/utils";
import ProductService from "@/services/ProductService";
import OrderService from "@/services/OrderService";

function Checkout() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast({
        title: "Keranjang kosong",
        description: "Silakan pilih produk terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    // ===============================
    // 1️⃣ FORMAT PESAN WHATSAPP
    // ===============================
    const itemsText = cart
      .map(
        (item) =>
          `• ${item.name} (${item.quantity} pcs) – ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join("%0A");

    const waText = `
Halo Admin Pink Store 👋

Saya ingin melakukan pemesanan dengan detail berikut:

📦 *Daftar Produk*
${itemsText}

💰 *Total Pembayaran*
${formatPrice(total)}

Mohon konfirmasi ketersediaan & langkah selanjutnya 🙏
Terima kasih.
    `;

    const waUrl = `https://wa.me/6287763699833?text=${encodeURIComponent(
      waText
    )}`;

    // 2️⃣ BUKA WHATSAPP
    window.open(waUrl, "_blank");

    try {
      setLoading(true);

      // 3️⃣ SIMPAN ORDER
      await OrderService.createOrder(cart, total);

      // 4️⃣ UPDATE STOCK
      await ProductService.updateStock(cart);

      // 5️⃣ CLEAR CART
      localStorage.removeItem("cart");

      toast({
        title: "Admin sudah dihubungi 📲",
        description:
          "Pesanan Anda telah dikirim ke WhatsApp admin. Mohon tunggu konfirmasi.",
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      toast({
        title: "Checkout gagal",
        description: "Terjadi kesalahan saat memproses pesanan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        Checkout
      </h2>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b pb-2"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} × {formatPrice(item.price)}
              </p>
            </div>
            <p className="font-semibold">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-xl font-bold mb-8">
        <span>Total</span>
        <span className="text-pink-600">
          {formatPrice(total)}
        </span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full py-4 rounded-xl font-semibold transition
          ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700 text-white"
          }`}
      >
        {loading ? "Menghubungi Admin..." : "Checkout via WhatsApp"}
      </button>
    </div>
  );
}

export default Checkout;
