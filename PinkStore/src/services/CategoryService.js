import BASE_URL from "./api";

const ENDPOINT = `${BASE_URL}/categories`;

export const getCategories = async () => {
  const res = await fetch(ENDPOINT);
  return res.json();
};

export const getCategory = async (id) => {
  const res = await fetch(`${ENDPOINT}/${id}`);
  return res.json();
};

export const createCategory = async (data) => {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateCategory = async (id, data) => {
  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteCategory = async (id) => {
  const res = await fetch(`${ENDPOINT}/${id}`, { method: "DELETE" });
  return res.json();
};
