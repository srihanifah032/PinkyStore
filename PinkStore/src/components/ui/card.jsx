import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-white text-gray-800 shadow-md",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = ({ className, ...props }) => (
  <div className={cn("p-6 border-b", className)} {...props} />
)

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6", className)} {...props} />
)

const CardFooter = ({ className, ...props }) => (
  <div className={cn("p-6 border-t flex items-center justify-between", className)} {...props} />
)

export { Card, CardHeader, CardContent, CardFooter }
