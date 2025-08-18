import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { UseFormRegister, FieldErrors, UseFormWatch, RegisterOptions, ValidationRule } from "react-hook-form"

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
}: FormInputProps<T>) => {
  const error = errors?.[id]?.message as string

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
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label htmlFor={id} className="cursor-pointer">
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
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Select
          value={currentValue || ""}
          onValueChange={onValueChange}
          {...(register ? register(id as any, getRegisterOptions()) : {})}
        >
          <SelectTrigger>
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
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }

  if (rows) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Textarea
          id={id}
          {...(register ? register(id as any, getRegisterOptions()) : {})}
          placeholder={placeholder}
          rows={rows}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        {...(register ? register(id as any, getRegisterOptions()) : {})}
        placeholder={placeholder}
        {...inputProps}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
} 