import { createContext, useContext, useEffect, useState } from "react";
import BASE_URL from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/users`);
    const users = await res.json();

    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) throw new Error("Email atau password salah");

    setUser(found);
    localStorage.setItem("user", JSON.stringify(found));
    return found;
  };

  const register = async (data) => {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, role: "user" }),
    });

    return res.json();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
