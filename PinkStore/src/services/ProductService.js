import BASE_URL from "./api";

const ENDPOINT = `${BASE_URL}/products`;

const ProductService = {
  getProducts: async () => {
    const res = await fetch(ENDPOINT);
    return res.json();
  },

  getProduct: async (id) => {
    const res = await fetch(`${ENDPOINT}/${id}`);
    return res.json();
  },

  createProduct: async (data) => {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateProduct: async (id, data) => {
    const res = await fetch(`${ENDPOINT}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${ENDPOINT}/${id}`, { method: "DELETE" });
    return res.json();
  },
};

export default ProductService;
