import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import ProductCard from "../../../components/Public/ProductCard";
import ProductService from "../../../services/ProductService";
import { useAuth } from "../../../context/AuthContext";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // ✅ AMBIL DARI PUBLIC LAYOUT
  const outletContext = useOutletContext();
  const refreshKey = outletContext?.refreshKey ?? 0;

  // ======================
  // FETCH PRODUCTS
  // ======================
  const fetchProducts = async () => {
    try {
      const allProducts = await ProductService.getProducts();

      // 🔥 pastikan stock number & tampilkan semua
      setProducts(
        allProducts.map((p) => ({
          ...p,
          stock: Number(p.stock) || 0,
        }))
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshKey]);

  // ======================
  // LOGOUT
  // ======================
  const handleLogout = () => {
    logout();

    toast({
      title: "Logout berhasil",
      description: "Terima kasih telah berkunjung ke Pink Store 💖",
    });

    setTimeout(() => navigate("/login"), 300);
  };

  return (
    <div>
      {/* USER INFO */}
      {user && (
        <div className="flex flex-col md:flex-row items-center justify-between bg-pink-50 border border-pink-200 rounded-2xl p-6 mb-12 shadow-sm">
          <p className="text-lg font-bold text-pink-700">
            Selamat datang, {user.name}
          </p>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="mt-4 md:mt-0 border-pink-400 text-pink-600 hover:bg-pink-100"
          >
            Logout
          </Button>
        </div>
      )}

      {/* HEADER */}
      <div className="text-center mb-14">
        <span className="inline-block bg-pink-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-4">
          Koleksi Terbaru
        </span>

        <h2 className="text-4xl font-extrabold text-pink-600 mb-4">
          Selamat Datang di Pink Store
        </h2>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Hijab berkualitas dengan desain modern untuk keseharian Anda
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {/* EMPTY */}
      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Produk belum tersedia
        </p>
      )}
    </div>
  );
}

export default Home;
