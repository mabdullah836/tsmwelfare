"use client"

import { useState, useEffect, useRef } from "react"
import { AlertCircle, CheckCircle2, X } from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface AlertMessageProps {
  message: string
  type?: 'success' | 'error'
  duration?: number
  onClose?: () => void
}

export function AlertMessage({ message, type = 'success', duration = 3000, onClose }: AlertMessageProps) {
  const [isVisible, setIsVisible] = useState(true)
  // Keep the latest callback without restarting the dismiss timer on every parent render.
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onCloseRef.current?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, message])

  if (!isVisible) return null

  const isSuccess = type === 'success'

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      aria-live={isSuccess ? "polite" : "assertive"}
      className="fixed inset-x-4 top-4 z-[60] ml-auto flex max-w-sm items-start gap-3 rounded-xl border bg-popover p-4 text-popover-foreground shadow-lg animate-in fade-in slide-in-from-top-2 sm:left-auto sm:right-4"
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />
      ) : (
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden />
      )}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        type="button"
        onClick={() => {
          setIsVisible(false)
          onClose?.()
        }}
        className={cn("-m-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground")}
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
