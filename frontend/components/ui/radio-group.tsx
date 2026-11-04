"use client"

import * as React from "react"
import { cn } from "@/lib/utils/cn"
import { Check } from "lucide-react"

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    defaultValue?: string
    onValueChange?: (value: string) => void
    value?: string
  }
>(({ className, defaultValue, value: propValue, onValueChange, children, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const isControlled = typeof propValue !== "undefined"
  const value = isControlled ? propValue : internalValue

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <div ref={ref} className={cn("grid gap-3", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement(child) &&
          (child.type as any).displayName === "RadioGroupItem"
        ) {
          const typedChild = child as React.ReactElement<any>;
          return React.cloneElement(typedChild, {
            checked: value === typedChild.props.value,
            onCheckedChange: handleChange,
          });
        }
        return child;
      })}
    </div>
  )
})
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (value: string) => void
  showCheckIcon?: boolean
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, checked, onCheckedChange, showCheckIcon = true, children, ...props }, ref) => {
    return (
      <label className={cn(
        "flex items-center space-x-3 cursor-pointer group",
        props.disabled ? "cursor-not-allowed opacity-70" : "",
        className
      )}>
        <div className="relative flex items-center justify-center">
          <input
            type="radio"
            ref={ref}
            className={cn(
              "absolute inset-0 opacity-0 cursor-pointer",
              props.disabled ? "cursor-not-allowed" : ""
            )}
            checked={checked}
            onChange={() => onCheckedChange?.(value as string)}
            value={value}
            {...props}
          />
          <div className={cn(
            "flex items-center justify-center w-5 h-5 rounded-full border-2 border-input transition-all",
            "group-hover:border-primary",
            checked ? "border-primary bg-primary" : "bg-background",
            props.disabled ? "group-hover:border-input" : ""
          )}>
            {showCheckIcon && checked && (
              <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
            )}
          </div>
        </div>
        {children && (
          <span className={cn(
            "text-sm font-medium text-foreground",
            props.disabled ? "text-muted-foreground" : ""
          )}>
            {children}
          </span>
        )}
      </label>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }