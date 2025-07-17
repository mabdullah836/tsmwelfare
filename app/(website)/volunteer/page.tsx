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

  const onSubmit = async (formData: VolunteerFormData) => {
    setShowConfirmDialog(false)

    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setAlert({
          message: "Thank you for your interest in volunteering. We'll contact you soon!",
          type: "success",
        })
        reset()
      } else if (data.status) {
        setAlert({
          message: `You have already submitted an application. Current status: ${data.status}. We'll contact you soon!`,
          type: "error",
        })
      } else {
        throw new Error(data.message || "Failed to submit application")
      }
    } catch (error) {
      setAlert({
        message: "Failed to submit application. Please try again later.",
        type: "error",
      })
      console.error("Error:", error)
    }
  }

  const handleFormSubmit = handleSubmit(() => setShowConfirmDialog(true))

  return (
    <>
      {alert && <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

      <PageHeader title="Volunteer With Us">
        <p className="text-xl text-white/90">
          Join our community of dedicated volunteers and make a real difference in people's lives.
        </p>
      </PageHeader>

      <VolunteerBenefits />

      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Application Form</CardTitle>
                <CardDescription>
                  Please fill out the form below to apply for volunteer opportunities. We'll review your application
                  and contact you soon.
                </CardDescription>
                <div className="mt-4 p-4 bg-muted rounded-lg border text-sm">
                  <p className="font-medium text-primary mb-2">Important Notice:</p>
                  <p>
                    This is an unpaid volunteer position. As a faith-based organization working for the greater good, we
                    believe in serving our community through selfless dedication. Your contribution will be rewarded
                    through the positive impact you make in people's lives and the spiritual fulfillment of serving others.
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleFormSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormInput
                      id="firstName"
                      label="First Name"
                      register={register}
                      errors={errors}
                      required
                      placeholder="First Name"
                    />
                    <FormInput
                      id="lastName"
                      label="Last Name"
                      register={register}
                      errors={errors}
                      required
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormInput
                      id="email"
                      label="Email"
                      type="email"
                      register={register}
                      errors={errors}
                      required
                      placeholder="Email"
                    />
                    <FormInput
                      id="phone"
                      label="Phone Number"
                      register={register}
                      errors={errors}
                      required
                      placeholder="Phone Number"
                    />
                  </div>
                  <FormInput
                    id="address"
                    label="Address"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Address"
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormInput
                      id="city"
                      label="City"
                      register={register}
                      errors={errors}
                      required
                      placeholder="City"
                    />
                    <FormInput
                      id="occupation"
                      label="Occupation"
                      register={register}
                      errors={errors}
                      required
                      placeholder="Occupation"
                    />
                  </div>
                  <FormInput
                    id="availability"
                    label="Availability"
                    register={register}
                    errors={errors}
                    required
                    options={AVAILABILITY_OPTIONS.map(option => ({ value: option.value, label: option.label }))}
                    onValueChange={handleAvailabilityChange}
                  />
                  <div className="space-y-3">
                    <label className="block font-medium">Areas of Interest</label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {INTEREST_OPTIONS.map((interest) => (
                        <FormInput
                          key={interest}
                          id={"interests"}
                          label={interest}
                          register={register}
                          errors={errors}
                          isCheckbox
                          checked={watch("interests")?.includes(interest)}
                          onCheckedChange={() => handleInterestChange(interest)}
                        />
                      ))}
                    </div>
                  </div>
                  <FormInput
                    id="skills"
                    label="Special Skills or Qualifications"
                    register={register}
                    errors={errors}
                    rows={3}
                    placeholder="List any special skills or qualifications you have"
                  />
                  <FormInput
                    id="experience"
                    label="Previous Volunteer Experience"
                    register={register}
                    errors={errors}
                    rows={3}
                    placeholder="Describe any previous volunteer experience"
                  />
                  <FormInput
                    id="motivation"
                    label="Motivation"
                    register={register}
                    errors={errors}
                    rows={3}
                    placeholder="Why do you want to volunteer with us?"
                  />
                  <FormInput
                    id="references"
                    label="References"
                    register={register}
                    errors={errors}
                    rows={2}
                    placeholder="Provide references (optional)"
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ConfirmDialog
        open={showConfirmDialog}
        title="Confirm Volunteer Application"
        description="Please confirm that you understand this is an unpaid volunteer position dedicated to serving our community through faith-based charitable work. Your contribution will be through your time, skills, and dedication to helping others."
        confirmLabel="I Understand & Confirm"
        cancelLabel="Cancel"
        onConfirm={handleSubmit(onSubmit)}
        onCancel={() => setShowConfirmDialog(false)}
      />
    </>
  )
}
