import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form"

interface FormInputProps<T extends Record<string, any>> {
  id: string
  label: string
  type?: string
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  required?: boolean
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
}: FormInputProps<T>) => {
  const error = errors[id]?.message as string

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
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Select
          onValueChange={onValueChange}
          {...register(id as any, { required: required ? `${label} is required` : false })}
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
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }

  if (rows) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Textarea
          id={id}
          {...register(id as any, {
            required: required ? `${label} is required` : false,
            pattern: pattern
          })}
          placeholder={placeholder}
          rows={rows}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        {...register(id as any, {
          required: required ? `${label} is required` : false,
          pattern: pattern
        })}
        placeholder={placeholder}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
} 