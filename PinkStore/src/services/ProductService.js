import BASE_URL from "./api";

const ENDPOINT = `${BASE_URL}/products`;

const ProductService = {
  // =========================
  // GET ALL PRODUCTS
  // =========================
  getProducts: async () => {
    const res = await fetch(ENDPOINT);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  // =========================
  // GET SINGLE PRODUCT
  // =========================
  getProduct: async (id) => {
    const res = await fetch(`${ENDPOINT}/${id}`);
    if (!res.ok) throw new Error("Product not found");
    return res.json();
  },

  // =========================
  // CREATE PRODUCT (ADMIN)
  // =========================
  createProduct: async (data) => {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        stock: Number(data.stock) || 0,
      }),
    });
    return res.json();
  },

  // =========================
  // UPDATE PRODUCT (ADMIN)
  // =========================
  updateProduct: async (id, data) => {
    // ⚠️ WAJIB ambil data lama
    const current = await fetch(`${ENDPOINT}/${id}`).then((r) => r.json());

    const res = await fetch(`${ENDPOINT}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...current,
        ...data,
      }),
    });

    return res.json();
  },

  // =========================
  // DELETE PRODUCT
  // =========================
  deleteProduct: async (id) => {
    const res = await fetch(`${ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },

  // =========================
  // UPDATE STOCK (CHECKOUT)
  // =========================
  updateStock: async (cart) => {
    await Promise.all(
      cart.map(async (item) => {
        // Ambil produk lama
        const res = await fetch(`${ENDPOINT}/${item.id}`);
        const product = await res.json();

        const currentStock = Number(product.stock) || 0;
        const newStock = Math.max(currentStock - item.quantity, 0);

        // PUT FULL OBJECT (PENTING!)
        await fetch(`${ENDPOINT}/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...product,
            stock: newStock,
          }),
        });
      })
    );
  },
};

export default ProductService;
