import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(
  ({ className, variant = "pink", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition focus:outline-none disabled:opacity-50",

          // VARIANT
          variant === "pink" &&
            "bg-pink-500 hover:bg-pink-600 text-white shadow-lg",

          // SIZE
          size === "default" && "px-6 py-3 text-sm",
          size === "lg" && "px-8 py-4 text-base",
          size === "xl" && "px-10 py-5 text-lg",

          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
