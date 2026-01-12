import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "bg-pink-100 text-pink-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
