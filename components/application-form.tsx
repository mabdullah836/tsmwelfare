"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { AlertMessage } from "@/components/ui/alert-message"
import { APPLICATION_TYPES } from "@/lib/constants/application"
import { FormInput } from "@/components/ui/form-input"
import { FileUpload } from '@/components/ui/file-upload'

type ApplicationType = typeof APPLICATION_TYPES[number]['value']

interface ApplicationFormData {
  type: ApplicationType | ""
  name: string
  cnic: string
  email: string
  phone: string
  address: string
  description: string
  documents: File[]
}

export function ApplicationForm() {
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors, isSubmitting }, 
    reset, 
    watch, 
    control 
  } = useForm<ApplicationFormData>({
    defaultValues: {
      type: "",
      name: "",
      cnic: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      documents: []
    }
  })

  // Format CNIC on blur
  const handleCNICBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    const match = value.match(/^(\d{5})(\d{7})(\d{1})?$/)
    if (match) {
      setValue('cnic', `${match[1]}-${match[2]}${match[3] ? `-${match[3]}` : ''}`)
    }
  }

  const validateDocuments = (documents: File[]) => {
    return documents && documents.length > 0 || 'Please upload at least one document'
  }

  const handleFileUpload = (value: File | File[] | null) => {
    if (!value) {
      setValue('documents', [], { shouldValidate: true })
      return
    }
    
    const files = Array.isArray(value) ? value : [value]
    setValue('documents', files, { shouldValidate: true })
  }

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      // Validate documents
      const documentsValidation = validateDocuments(data.documents)
      if (typeof documentsValidation === 'string') {
        setAlert({ type: 'error', message: documentsValidation })
        return
      }

      // Validate application type
      if (!data.type || !APPLICATION_TYPES.some(type => type.value === data.type)) {
        setAlert({ type: 'error', message: 'Please select a valid application type' })
        return
      }

      // Prepare form data for file upload
      const formData = new FormData()
      if (Array.isArray(data.documents)) {
        data.documents.forEach((file: any) => {
          if (file instanceof File) {
            formData.append('files', file)
          }
        })
      }
      formData.append('folder', 'applications')

      // Upload files
      const uploadRes = await fetch('/api/media/upload', { 
        method: 'POST', 
        body: formData 
      })

      if (!uploadRes.ok) {
        throw new Error('Failed to upload documents')
      }

      const uploaded = await uploadRes.json()
      const documentUrls = (uploaded || []).map((u: any) => u.url).filter(Boolean)

      // Submit application data
      const payload = { 
        ...data, 
        documents: documentUrls 
      }

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || response.statusText || 'Submission failed')
      }

      setAlert({ type: 'success', message: 'Application submitted successfully' })
      reset()
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to submit application'
      
      setAlert({ type: 'error', message: errorMessage })
      console.error('Application submission error:', error)
    }
  }

  const formFields = [
    {
      id: 'type',
      label: 'Application Type',
      required: true,
      options: APPLICATION_TYPES.map((type) => ({ 
        value: type.value, 
        label: type.label 
      })),
      onValueChange: (value: string) => setValue('type', value as ApplicationType),
    },
    {
      id: 'name',
      label: 'Full Name',
      required: true,
      placeholder: 'Enter your full name',
    },
    {
      id: 'cnic',
      label: 'CNIC',
      required: true,
      placeholder: 'Enter your CNIC (format: 00000-0000000-0)',
      inputProps: { onBlur: handleCNICBlur },
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Enter your email',
      pattern: { 
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
        message: 'Invalid email address' 
      },
    },
    {
      id: 'phone',
      label: 'Phone Number',
      required: true,
      placeholder: 'Enter your phone number',
    },
    {
      id: 'address',
      label: 'Address',
      required: true,
      rows: 3,
      placeholder: 'Enter your complete address',
    },
    {
      id: 'description',
      label: 'Description',
      required: true,
      rows: 4,
      placeholder: 'Please provide details about your situation and why you need assistance',
    },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {alert && (
        <AlertMessage
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      {formFields.map((field) => (
        <FormInput
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type as any}
          register={register}
          errors={errors}
          required={field.required}
          options={field.options as any}
          onValueChange={field.onValueChange as any}
          placeholder={field.placeholder}
          rows={field.rows}
          pattern={field.pattern as any}
          inputProps={field.inputProps}
          watch={watch}
        />
      ))}

      <p className="text-sm text-muted-foreground">
        Please provide as much detail as possible to help us understand your situation better.
      </p>

      <div className="space-y-4">
        <label className="block text-sm font-medium">
          Supporting Documents<span className="text-destructive ml-1">*</span>
        </label>
        <FileUpload
          name="documents"
          form={{ setValue, watch }}
          multiple
          accept="image/*,application/pdf"
          preview
          onChange={handleFileUpload}
        />
        {errors.documents && (
          <p className="text-sm text-destructive">
            {errors.documents.message as string}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  )
}