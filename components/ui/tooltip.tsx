"use client"

import * as React from "react"
import { cn } from "@/lib/utils/cn"

interface TooltipProps {
  children: React.ReactNode
}

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const Tooltip = ({ children }: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  
  const trigger = React.Children.toArray(children).find(
    (child: any) => child.type.displayName === "TooltipTrigger"
  )
  
  const content = React.Children.toArray(children).find(
    (child: any) => child.type.displayName === "TooltipContent"
  )

  const triggerWithProps = React.isValidElement(trigger) 
    ? React.cloneElement(trigger as React.ReactElement<{
        onMouseEnter?: React.MouseEventHandler
        onMouseLeave?: React.MouseEventHandler
        onFocus?: React.FocusEventHandler
        onBlur?: React.FocusEventHandler
      }>, {
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
        // Keyboard users get the same hint when the trigger receives focus.
        onFocus: () => setIsOpen(true),
        onBlur: () => setIsOpen(false),
      })
    : null

  return (
    <div className="relative inline-block">
      {triggerWithProps}
      {isOpen && content}
    </div>
  )
}

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const TooltipTrigger = React.forwardRef<HTMLDivElement, TooltipTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
TooltipTrigger.displayName = "TooltipTrigger"

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="tooltip"
      className={cn(
        "absolute z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95",
        "top-full left-1/2 transform -translate-x-1/2 mt-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }