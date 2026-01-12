import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/* ================= PROVIDER ================= */
const ToastProvider = ToastPrimitives.Provider

/* ================= VIEWPORT ================= */
const ToastViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )}
      {...props}
    />
  )
)
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

/* ================= VARIANTS ================= */
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-5 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-white border-pink-200 text-gray-800",
        destructive:
          "bg-red-50 border-red-200 text-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/* ================= ROOT ================= */
const Toast = React.forwardRef(
  ({ className, variant, ...props }, ref) => (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
)
Toast.displayName = ToastPrimitives.Root.displayName

/* ================= TITLE ================= */
const ToastTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Title
      ref={ref}
      className={cn("text-sm font-semibold", className)}
      {...props}
    />
  )
)
ToastTitle.displayName = ToastPrimitives.Title.displayName

/* ================= DESCRIPTION ================= */
const ToastDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Description
      ref={ref}
      className={cn("text-sm opacity-90", className)}
      {...props}
    />
  )
)
ToastDescription.displayName = ToastPrimitives.Description.displayName

/* ================= CLOSE ================= */
const ToastClose = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Close
      ref={ref}
      className={cn(
        "absolute right-2 top-2 rounded-md p-1 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400",
        className
      )}
      toast-close=""
      {...props}
    >
      <X className="h-4 w-4" />
    </ToastPrimitives.Close>
  )
)
ToastClose.displayName = ToastPrimitives.Close.displayName

/* ================= EXPORT ================= */
export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
}
