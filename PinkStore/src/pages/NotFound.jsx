import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.title}>Halaman Tidak Ditemukan</h2>
      <p style={styles.text}>
        Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
      </p>

      <div style={styles.actions}>
        <Link to="/" style={styles.primaryButton}>
          Kembali ke Home
        </Link>
        <Link to="/products" style={styles.secondaryButton}>
          Lihat Produk
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "2rem",
  },
  code: {
    fontSize: "6rem",
    fontWeight: "700",
    color: "#e5e7eb",
    margin: 0,
  },
  title: {
    fontSize: "1.8rem",
    margin: "0.5rem 0",
  },
  text: {
    color: "#6b7280",
    maxWidth: "400px",
    marginBottom: "1.5rem",
  },
  actions: {
    display: "flex",
    gap: "1rem",
  },
  primaryButton: {
    background: "#2563eb",
    color: "#fff",
    padding: "0.6rem 1.2rem",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
  },
  secondaryButton: {
    border: "1px solid #d1d5db",
    padding: "0.6rem 1.2rem",
    borderRadius: "6px",
    textDecoration: "none",
    color: "#111827",
  },
};

export default NotFound;
