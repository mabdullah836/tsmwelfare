import type * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { UseFormRegister, FieldErrors, UseFormWatch, RegisterOptions } from "react-hook-form"

interface FormInputProps<T extends Record<string, any> = Record<string, any>> {
  id: string
  label: string
  type?: string
  register?: UseFormRegister<T>
  errors?: FieldErrors<T>
  required?: boolean | string
  pattern?: {
    value: RegExp
    message: string
  }
  placeholder?: string
  rows?: number
  options?: { value: string; label: string }[]
  watch?: UseFormWatch<T>
  onValueChange?: (value: string) => void
  isCheckbox?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  registerOptions?: RegisterOptions<T>
  /** Element rendered inside the input on the right (e.g. a show-password toggle). */
  endAdornment?: React.ReactNode
}

export const FormInput = <T extends Record<string, any>>({
  id,
  label,
  type = "text",
  register,
  errors,
  required = false,
  pattern,
  placeholder,
  rows,
  options,
  watch,
  onValueChange,
  isCheckbox = false,
  checked,
  onCheckedChange,
  inputProps,
  registerOptions,
  endAdornment,
}: FormInputProps<T>) => {
  const error = errors?.[id]?.message as string
  const errorId = `${id}-error`
  const a11yProps = {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    "aria-required": required ? true : undefined,
  }
  const requiredMark = required ? <span className="text-destructive ml-1" aria-hidden="true">*</span> : null
  const errorText = error ? <p id={errorId} role="alert" className="text-sm text-destructive">{error}</p> : null

  const getRegisterOptions = (): RegisterOptions<T> => {
    const opts: RegisterOptions<T> = {
      ...(required && { 
        required: typeof required === 'string' ? required : `${label} is required` 
      }),
      ...registerOptions
    };
    if (pattern) {
      opts.pattern = pattern;
    }
    return opts;
  }

  if (isCheckbox) {
    // Several checkboxes can share one field id (e.g. a multi-select group), so each gets its own DOM id.
    const checkboxId = `${id}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id={checkboxId}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label htmlFor={checkboxId} className="cursor-pointer">
          {label}
        </Label>
      </div>
    )
  }

  if (options) {
    const currentValue = watch ? watch(id as any) : undefined;
    
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>
          {label}
          {requiredMark}
        </Label>
        <Select
          value={currentValue || ""}
          onValueChange={onValueChange}
          {...(register ? register(id as any, getRegisterOptions()) : {})}
        >
          <SelectTrigger id={id} {...a11yProps}>
            <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errorText}
      </div>
    )
  }

  if (rows) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>
          {label}
          {requiredMark}
        </Label>
        <Textarea
          id={id}
          {...(register ? register(id as any, getRegisterOptions()) : {})}
          placeholder={placeholder}
          rows={rows}
          {...a11yProps}
        />
        {errorText}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {requiredMark}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          {...(register ? register(id as any, getRegisterOptions()) : {})}
          placeholder={placeholder}
          className={endAdornment ? "pr-10" : undefined}
          {...a11yProps}
          {...inputProps}
        />
        {endAdornment && <div className="absolute inset-y-0 right-0 flex items-center pr-1">{endAdornment}</div>}
      </div>
      {errorText}
    </div>
  )
} 