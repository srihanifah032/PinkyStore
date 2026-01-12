import { Navigate, Outlet } from "react-router-dom"

function AuthRoute() {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default AuthRoute
