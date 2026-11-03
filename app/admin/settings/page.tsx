"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useForm } from 'react-hook-form';
import { FormInput } from "@/components/ui/form-input";

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    defaultValues: {
      currentPassword: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (data.newPassword && data.newPassword !== data.confirmPassword) {
      setError("New passwords do not match.")
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          email: data.email,
          newPassword: data.newPassword,
        }),
      })
      const respData = await res.json()
      if (respData.success) {
        setSuccess("Settings updated successfully.")
        reset()
      } else {
        setError(respData.message || "Failed to update settings.")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-description">Update the email and password used to sign in to the admin console.</p>
        </div>
      </div>
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-base">Account security</CardTitle>
          <CardDescription>Your current password is required to save any change. Leave a field blank to keep it unchanged.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              id="currentPassword"
              label="Current Password"
              type="password"
              register={register}
              errors={errors}
              required
              placeholder="Enter current password"
            />
            <FormInput
              id="email"
              label="New Email"
              type="email"
              register={register}
              errors={errors}
              pattern={{ value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }}
              placeholder="Enter new email"
            />
            <FormInput
              id="newPassword"
              label="New Password"
              type="password"
              register={register}
              errors={errors}
              placeholder="Enter new password"
            />
            <FormInput
              id="confirmPassword"
              label="Confirm New Password"
              type="password"
              register={register}
              errors={errors}
              placeholder="Confirm new password"
              registerOptions={{
                validate: value => !watch('newPassword') || value === watch('newPassword') || 'Passwords do not match',
              }}
            />
            {error && (
              <Alert variant="destructive" role="alert">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="default" role="status">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 