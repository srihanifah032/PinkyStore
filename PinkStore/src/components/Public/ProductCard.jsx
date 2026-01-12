import { ShoppingCart, Package } from "lucide-react"
import ProductBadges from "./ProductBadges"
import ProductPrice from "./ProductPrice"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

function ProductCard({ product, onAddToCart }) {
  const { toast } = useToast()

  const handleBuy = () => {
    if (product.stock <= 0) {
      toast({
        title: "Stok habis 😢",
        description: "Produk ini sedang tidak tersedia",
        variant: "destructive",
      })
      return
    }

    onAddToCart(product)

    toast({
      title: "Berhasil ditambahkan 🛒",
      description: `${product.name} masuk ke keranjang`,
      className: "bg-pink-50 border-pink-300 text-pink-700",
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-pink-100">
      
      {/* IMAGE / HEADER */}
      <div className="bg-gradient-to-br from-pink-300 to-pink-400 h-56 flex items-center justify-center relative">
        <Package size={72} className="text-white opacity-30" />

        {product.color && (
          <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 text-xs font-bold text-pink-600 shadow-md">
            {product.color}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <ProductBadges category={product.category} />

        <h3 className="text-xl font-bold mt-3 mb-2 text-gray-800">
          {product.name}
        </h3>

        <ProductPrice price={product.price} />

        <p className="text-sm mb-5">
          Stok:{" "}
          <span
            className={`font-bold ${
              product.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? `${product.stock} pcs` : "Habis"}
          </span>
        </p>

        <Button
          onClick={handleBuy}
          size="lg"
          className="w-full gap-2"
          disabled={product.stock <= 0}
          variant={product.stock > 0 ? "default" : "outline"}
        >
          <ShoppingCart size={20} />
          {product.stock > 0 ? "Beli Sekarang" : "Stok Habis"}
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
