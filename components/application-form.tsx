"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AlertMessage } from "@/components/ui/alert-message"

const applicationTypes = [
  { value: "orphan_marriage", label: "Orphan Marriage Support" },
  { value: "education", label: "Education Assistance" },
  { value: "healthcare", label: "Healthcare Aid" },
  { value: "self_earning", label: "Self-Earning Support" },
  { value: "food", label: "Food Assistance" },
  { value: "other", label: "Other" },
]

// CNIC format: 00000-0000000-0
const formatCNIC = (value: string) => {
  const cleaned = value.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{5})(\d{7})(\d{1})?$/)
  if (match) {
    return `${match[1]}-${match[2]}${match[3] ? `-${match[3]}` : ''}`
  }
  return cleaned
}

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    cnic: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    documents: [] as string[]
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'cnic') {
      setFormData(prev => ({
        ...prev,
        [name]: formatCNIC(value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      type: value
    }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i])
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const data = await response.json()
      const newUrls = data.urls
      setUploadedFiles((prev) => [...prev, ...newUrls])
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newUrls]
      }))
      setAlert({ type: 'success', message: 'Files uploaded successfully' })
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to upload files' })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateForm = () => {
    if (!formData.type) {
      setAlert({ type: 'error', message: 'Please select an application type' })
      return false
    }
    if (!formData.name || formData.name.length < 2) {
      setAlert({ type: 'error', message: 'Name must be at least 2 characters' })
      return false
    }
    if (!formData.cnic || !/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic)) {
      setAlert({ type: 'error', message: 'Please enter a valid CNIC (format: 00000-0000000-0)' })
      return false
    }
    if (!formData.email || !formData.email.includes("@")) {
      setAlert({ type: 'error', message: 'Please enter a valid email address' })
      return false
    }
    if (!formData.phone || formData.phone.length < 10) {
      setAlert({ type: 'error', message: 'Please enter a valid phone number' })
      return false
    }
    if (!formData.address || formData.address.length < 10) {
      setAlert({ type: 'error', message: 'Please enter your complete address' })
      return false
    }
    if (!formData.description || formData.description.length < 50) {
      setAlert({ type: 'error', message: 'Please provide a detailed description (at least 50 characters)' })
      return false
    }
    if (formData.documents.length === 0) {
      setAlert({ type: 'error', message: 'Please upload at least one document' })
      return false
    }
    return true
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Submission failed")

      setAlert({ type: 'success', message: 'Application submitted successfully' })
      setFormData({
        type: "",
        name: "",
        cnic: "",
        email: "",
        phone: "",
        address: "",
        description: "",
        documents: []
      })
      setUploadedFiles([])
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to submit application' })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {alert && (
        <AlertMessage
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="space-y-4">
        <label className="block text-sm font-medium">Application Type</label>
        <Select onValueChange={handleTypeChange} value={formData.type}>
          <SelectTrigger>
            <SelectValue placeholder="Select application type" />
          </SelectTrigger>
          <SelectContent>
            {applicationTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium">Full Name</label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium">CNIC</label>
        <Input
          name="cnic"
          value={formData.cnic}
          onChange={handleInputChange}
          placeholder="Enter your CNIC (format: 00000-0000000-0)"
          maxLength={15}
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium">Email</label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium">Phone Number</label>
        <Input
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium">Address</label>
        <Textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Enter your complete address"
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium">Description</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Please provide details about your situation and why you need assistance"
        />
        <p className="text-sm text-muted-foreground">
          Please provide as much detail as possible to help us understand your situation better.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium">Supporting Documents</label>
        <div className="space-y-4">
          <Input
            type="file"
            multiple
            onChange={handleFileUpload}
            disabled={isSubmitting}
          />
          {uploadedFiles.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {uploadedFiles.length} file(s) uploaded
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Please upload relevant documents (e.g., death certificate for orphan marriage,
          medical prescription for healthcare, etc.)
        </p>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  )
} 