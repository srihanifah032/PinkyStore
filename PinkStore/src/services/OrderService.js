import BASE_URL from "./api";

const ENDPOINT = `${BASE_URL}/orders`;

export const getOrders = async () => {
  const res = await fetch(ENDPOINT);
  return res.json();
};

export const getOrder = async (id) => {
  const res = await fetch(`${ENDPOINT}/${id}`);
  return res.json();
};

export const createOrder = async (data) => {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateOrder = async (id, data) => {
  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteOrder = async (id) => {
  const res = await fetch(`${ENDPOINT}/${id}`, { method: "DELETE" });
  return res.json();
};
