// src/App.jsx
import React, { useState } from "react"
import AppRoutes from "./routes/AppRoutes"
import { Toaster } from "@/components/ui/toaster"

function App() {
  const [cart, setCart] = useState([])

  // ======================
  // ADD TO CART
  // ======================
  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  // ======================
  // REMOVE ITEM
  // ======================
  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  // ======================
  // CLEAR CART (CHECKOUT / LOGOUT)
  // ======================
  const clearCart = () => {
    setCart([])
  }

  return (
    <>
      <AppRoutes
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={clearCart}
      />

      {/* GLOBAL TOAST */}
      <Toaster />
    </>
  )
}

export default App
