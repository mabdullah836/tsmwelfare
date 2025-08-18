"use client"

import { PageHeader } from "@/components/page-header"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

      const data = await response.json()
      console.log(data)
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
      borderColor: "border-primary",
      textColor: "text-primary",
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
      borderColor: "border-green-500",
      textColor: "text-green-700",
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
              <label className="block text-sm font-medium text-foreground">
                Areas of Interest <span className="text-destructive ml-1">*</span>
              </label>
              <p className="text-sm text-muted-foreground mb-4">
                Select all areas where you'd like to contribute (choose at least one)
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
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
      borderColor: "border-blue-500",
      textColor: "text-blue-700",
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
      borderColor: "border-purple-500",
      textColor: "text-purple-700",
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

      <PageHeader title="Volunteer With Us">
        <p className="text-xl text-white/90">
          Join our community of dedicated volunteers and make a real difference in people's lives.
        </p>
      </PageHeader>

      <VolunteerBenefits />

      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                <div className="text-center space-y-4">
                  <CardTitle className="text-3xl font-bold text-primary">
                    Volunteer Application Form
                  </CardTitle>
                  <CardDescription className="text-lg max-w-2xl mx-auto">
                    Join our mission to make a positive impact in the community.
                  </CardDescription>
                </div>
                <div className="mt-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-amber-800 mb-2">Important Notice</p>
                      <p className="text-amber-700 leading-relaxed">
                        This is an unpaid volunteer position. As a faith-based organization, we believe in serving our community through selfless dedication.
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  {formSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="space-y-6">
                      <div className={`border-l-4 ${section.borderColor} pl-4`}>
                        <h3 className={`text-xl font-semibold ${section.textColor} mb-2`}>
                          {section.title}
                        </h3>
                        <p className="text-muted-foreground">{section.description}</p>
                      </div>

                      {section.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex} className={'grid' in field ? field.grid : ""}>
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
                  ))}

                  <div className="pt-6 border-t">
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg transition-all duration-200" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Submitting Application...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span>Submit Volunteer Application</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
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