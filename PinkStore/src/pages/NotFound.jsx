import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">

      {/* Badge */}
      <span className="inline-block bg-pink-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
        Error 404
      </span>

      {/* Title */}
      <h1 className="text-6xl md:text-7xl font-extrabold text-pink-600 mb-4">
        Oops!
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-lg max-w-md mb-8">
        Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        Yuk kembali dan temukan koleksi terbaik kami
      </p>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-pink-700 transition"
        >
          Kembali ke Home
        </Link>

        <Link
          to="/products"
          className="border border-pink-600 text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 transition"
        >
          Lihat Produk
        </Link>
      </div>
    </div>
  );
}

export default NotFound;