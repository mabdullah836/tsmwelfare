"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { AlertMessage } from "@/components/ui/alert-message"
import { APPLICATION_TYPES } from "@/lib/constants/application"
import { FormInput } from "@/components/ui/form-input"
import { FileUpload } from '@/components/ui/file-upload';

export function ApplicationForm() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset, watch, control } = useForm({
    defaultValues: {
      type: "",
      name: "",
      cnic: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      documents: [] as string[]
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

  const onSubmit = async (data: any) => {
    if (!data.documents || data.documents.length === 0) {
      setAlert({ type: 'error', message: 'Please upload at least one document' })
      return
    }
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Submission failed")

      setAlert({ type: 'success', message: 'Application submitted successfully' })
      reset()
      setUploadedFiles([])
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to submit application' })
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {alert && (
        <AlertMessage
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <FormInput
        id="type"
        label="Application Type"
        register={register}
        errors={errors}
        required
        options={APPLICATION_TYPES.map((type) => ({ value: type.value, label: type.label }))}
        onValueChange={value => setValue('type', value)}
      />

      <FormInput
        id="name"
        label="Full Name"
        register={register}
        errors={errors}
        required
        placeholder="Enter your full name"
      />

      <FormInput
        id="cnic"
        label="CNIC"
        register={register}
        errors={errors}
        required
        placeholder="Enter your CNIC (format: 00000-0000000-0)"
        inputProps={{ onBlur: handleCNICBlur }}
      />

      <FormInput
        id="email"
        label="Email"
        type="email"
        register={register}
        errors={errors}
        required
        placeholder="Enter your email"
        pattern={{ value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }}
      />

      <FormInput
        id="phone"
        label="Phone Number"
        register={register}
        errors={errors}
        required
        placeholder="Enter your phone number"
      />

      <FormInput
        id="address"
        label="Address"
        register={register}
        errors={errors}
        required
        rows={3}
        placeholder="Enter your complete address"
      />

      <FormInput
        id="description"
        label="Description"
        register={register}
        errors={errors}
        required
        rows={4}
        placeholder="Please provide details about your situation and why you need assistance"
      />
      <p className="text-sm text-muted-foreground">
        Please provide as much detail as possible to help us understand your situation better.
      </p>

      <div className="space-y-4">
        <label className="block text-sm font-medium">Supporting Documents<span className="text-destructive ml-1">*</span></label>
        <FileUpload
          name="documents"
          control={control}
          label="Supporting Documents"
          multiple
          accept="image/*,application/pdf"
          preview
        />
        {errors.documents && <p className="text-sm text-destructive">{errors.documents.message as string}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  )
} 