import BASE_URL from "./api";

export const login = async (email, password) => {
  const res = await fetch(
    `${BASE_URL}/users?email=${email}&password=${password}`
  );
  const data = await res.json();

  if (data.length === 0) {
    throw new Error("Email atau password salah");
  }

  localStorage.setItem("user", JSON.stringify(data[0]));
  return data[0];
};
