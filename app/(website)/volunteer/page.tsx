"use client"

import { PageHeader } from "@/components/page-header"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Info, Loader2, Send } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { AlertMessage } from "@/components/ui/alert-message"
import { VolunteerBenefits } from "@/components/features/volunteer/volunteer-benefits"
import { INTEREST_OPTIONS, AVAILABILITY_OPTIONS } from "@/lib/constants/volunteer"
import { useVolunteerForm } from "@/lib/hooks/use-volunteer-form"
import { FormInput } from "@/components/ui/form-input"
import { VolunteerFormData } from "@/lib/types/volunteer"
import { ConfirmDialog } from '@/components/modals/ConfirmDialog'

export default function VolunteerPage() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleInterestChange,
    handleAvailabilityChange,
    watch,
    reset,
  } = useVolunteerForm()

  const handleFormSubmit = handleSubmit(() => setShowConfirmDialog(true))

  const onSubmit = async (formData: VolunteerFormData) => {
    setShowConfirmDialog(false)

    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.error || 
          errorData.message || 
          "Failed to submit application"
        )
      }

      await response.json()
      setAlert({
        message: "Thank you for your interest in volunteering. We'll contact you soon!",
        type: "success",
      })
      reset()
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to submit application"
      
      setAlert({
        message: errorMessage,
        type: "error",
      })
      console.error("Volunteer submission error:", error)
    }
  }

  // Form sections configuration
  const formSections = [
    {
      title: "Personal Information",
      description: "Please provide your basic contact details",
      fields: [
        {
          grid: "md:grid-cols-2",
          inputs: [
            {
              id: "firstName",
              label: "First Name",
              required: true,
              placeholder: "Enter your first name",
            },
            {
              id: "lastName",
              label: "Last Name",
              required: true,
              placeholder: "Enter your last name",
            },
          ],
        },
        {
          grid: "md:grid-cols-2",
          inputs: [
            {
              id: "email",
              label: "Email Address",
              type: "email",
              required: true,
              placeholder: "your.email@example.com",
            },
            {
              id: "phone",
              label: "Phone Number",
              required: true,
              placeholder: "+1 (555) 123-4567",
            },
          ],
        },
        {
          inputs: [
            {
              id: "address",
              label: "Complete Address",
              required: true,
              placeholder: "Street address, apartment/unit number",
            },
          ],
        },
        {
          grid: "md:grid-cols-2",
          inputs: [
            {
              id: "city",
              label: "City",
              required: true,
              placeholder: "Enter your city",
            },
            {
              id: "occupation",
              label: "Current Occupation",
              required: true,
              placeholder: "Your current job or profession",
            },
          ],
        },
      ],
    },
    {
      title: "Availability & Interests",
      description: "Tell us about your availability and areas of interest",
      fields: [
        {
          inputs: [
            {
              id: "availability",
              label: "When are you available to volunteer?",
              required: true,
              options: AVAILABILITY_OPTIONS.map(option => ({ 
                value: option.value, 
                label: option.label 
              })),
              onValueChange: handleAvailabilityChange,
            },
          ],
        },
        {
          custom: (
            <div className="space-y-4">
              <p className="block text-sm font-medium text-foreground" id="interests-label">
                Areas of Interest <span className="text-destructive ml-1" aria-hidden="true">*</span>
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Select all areas where you'd like to contribute (choose at least one)
              </p>
              <div role="group" aria-labelledby="interests-label" className="grid gap-3 rounded-xl border bg-muted/40 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {INTEREST_OPTIONS.map((interest) => (
                  <FormInput
                    key={interest}
                    id="interests"
                    label={interest}
                    register={register}
                    errors={errors}
                    isCheckbox
                    checked={watch("interests")?.includes(interest)}
                    onCheckedChange={() => handleInterestChange(interest)}
                    watch={watch}
                  />
                ))}
              </div>
            </div>
          ),
        },
      ],
    },
    {
      title: "Experience & Qualifications",
      description: "Share your skills and experience with us",
      fields: [
        {
          inputs: [
            {
              id: "skills",
              label: "Special Skills or Qualifications",
              rows: 4,
              placeholder: "List any relevant skills, certifications, languages...",
            },
          ],
        },
        {
          inputs: [
            {
              id: "experience",
              label: "Previous Volunteer Experience",
              rows: 4,
              placeholder: "Describe any previous volunteer work...",
            },
          ],
        },
      ],
    },
    {
      title: "Motivation & References",
      description: "Help us understand your motivation and provide references",
      fields: [
        {
          inputs: [
            {
              id: "motivation",
              label: "Why do you want to volunteer with us?",
              required: true,
              rows: 4,
              placeholder: "Share what motivates you to volunteer...",
            },
          ],
        },
        {
          inputs: [
            {
              id: "references",
              label: "References (Optional)",
              rows: 3,
              placeholder: "Please provide contact information for 1-2 references...",
            },
          ],
        },
      ],
    },
  ]

  return (
    <>
      {alert && (
        <AlertMessage 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)} 
        />
      )}

      <PageHeader title="Volunteer with us" eyebrow="Get involved">
        <p>Join our community of dedicated volunteers and make a real difference in people&apos;s lives.</p>
      </PageHeader>

      <VolunteerBenefits />

      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl">Volunteer application</h2>
            <p className="mt-3 text-muted-foreground">Join our mission to make a positive impact in the community. It takes about 5 minutes.</p>
          </div>

          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-gold/40 bg-gold-soft p-4 text-sm" role="note">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-warning dark:text-gold" aria-hidden />
            <p>
              <strong className="font-semibold text-foreground">Important notice. </strong>
              <span className="text-muted-foreground">
                This is an unpaid volunteer position. As a faith-based organization, we believe in serving our community through selfless dedication.
              </span>
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
            {formSections.map((section, sectionIndex) => (
              <fieldset key={sectionIndex} className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                <legend className="sr-only">{section.title}</legend>
                <div className="mb-6 flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground" aria-hidden>
                    {sectionIndex + 1}
                  </span>
                  <div>
                    <h3 className="text-xl">{section.title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {section.fields.map((field, fieldIndex) => (
                    // Previously the md:grid-cols-2 hint was applied without "grid", so fields never sat side by side.
                    <div key={fieldIndex} className={'grid' in field ? cn("grid gap-5", field.grid) : ""}>
                      {'custom' in field ? field.custom : (
                        'inputs' in field && field.inputs ? field.inputs.map((input) => (
                          <FormInput
                            key={input.id}
                            id={input.id}
                            label={input.label}
                            type={'type' in input ? input.type : undefined}
                            register={register}
                            errors={errors}
                            required={'required' in input ? input.required : false}
                            options={'options' in input ? input.options : undefined}
                            onValueChange={'onValueChange' in input ? input.onValueChange : undefined}
                            placeholder={'placeholder' in input ? input.placeholder : undefined}
                            rows={'rows' in input ? input.rows : undefined}
                            watch={watch}
                          />
                        )) : null
                      )}
                    </div>
                  ))}
                </div>
              </fieldset>
            ))}

            <Button type="submit" size="lg" className="h-12 w-full text-base" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden /> Submitting application…
                </>
              ) : (
                <>
                  <Send aria-hidden /> Submit volunteer application
                </>
              )}
            </Button>
          </form>
        </div>
      </section>

      <ConfirmDialog
        open={showConfirmDialog}
        title="Confirm Volunteer Application"
        description="Please confirm that you understand this is an unpaid volunteer position dedicated to serving our community through faith-based charitable work."
        confirmLabel="I Understand & Confirm"
        cancelLabel="Cancel"
        onConfirm={handleSubmit(onSubmit)}
        onCancel={() => setShowConfirmDialog(false)}
      />
    </>
  )
}
