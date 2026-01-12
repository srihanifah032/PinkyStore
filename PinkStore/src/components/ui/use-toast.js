// src/components/ui/use-toast.js
import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 4000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toastState = {
  toasts: [],
}

const listeners = []

function emitChange() {
  listeners.forEach((listener) => {
    listener(toastState)
  })
}

function addToast(toast) {
  toastState.toasts = [toast, ...toastState.toasts].slice(0, TOAST_LIMIT)
  emitChange()
}

function removeToast(id) {
  toastState.toasts = toastState.toasts.filter((toast) => toast.id !== id)
  emitChange()
}

export function toast({ title, description, className }) {
  const id = genId()

  addToast({
    id,
    title,
    description,
    className,
  })

  setTimeout(() => removeToast(id), TOAST_REMOVE_DELAY)
}

export function useToast() {
  const [state, setState] = React.useState(toastState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  return {
    toast,
    toasts: state.toasts,
  }
}
