import { Navigate, Outlet } from "react-router-dom"

function CheckoutRoute() {
  const user = JSON.parse(localStorage.getItem("user"))
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")

  if (!cart || cart.length === 0) {
    return <Navigate to="/cart" replace />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default CheckoutRoute
