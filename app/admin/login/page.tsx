"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormInput } from '@/components/ui/form-input';
import { useForm } from 'react-hook-form';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSubmitForm = async (data: any) => {
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const dataRes = await res.json()
      if (dataRes?.success) {
        router.push('/admin/dashboard');
      } else {
        setError(dataRes?.message || 'Invalid email or password')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/images/logo.png" alt="" width={56} height={56} className="mb-4 h-14 w-14 object-contain" priority />
          <h1 className="text-2xl font-semibold">Sign in to Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">The Sirat-e-Mustaqeem Welfare Trust</p>
        </div>
        <Card>
          <CardHeader className="sr-only">
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Sign in to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-5" noValidate>
              <FormInput
                id="email"
                label="Email"
                type="email"
                register={register}
                errors={errors}
                required
                placeholder="admin@sirat-e-mustaqeem.org"
                inputProps={{ autoComplete: "username" }}
              />
              <FormInput
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                register={register}
                errors={errors}
                required
                placeholder="Enter your password"
                inputProps={{ autoComplete: "current-password" }}
                endAdornment={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                }
              />

              {error && (
                <Alert variant="destructive" role="alert">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" aria-hidden />}
                {isLoading ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
