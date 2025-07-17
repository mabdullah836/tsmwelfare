"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-[calc(100vh-150px)] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Settings</CardTitle>
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
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="default">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 