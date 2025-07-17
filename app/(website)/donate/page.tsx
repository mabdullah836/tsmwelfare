"use client"

import { RadioGroupItem } from "@/components/ui/radio-group"

import { RadioGroup } from "@/components/ui/radio-group"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Heart, CreditCard, Landmark, Smartphone } from "lucide-react"
import { AlertMessage } from "@/components/ui/alert-message"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { FormInput } from "@/components/ui/form-input"

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState<string>("")
  const [donationType, setDonationType] = useState<string>("general")
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const { handleSubmit, register, formState: { errors } } = useForm()

  // Change handleSubmitForm to accept form data
  const handleSubmitForm = async (data: any) => {
    if (!data.donationAmount || Number(data.donationAmount) <= 0) {
      setAlert({
        message: "Please enter a valid donation amount",
        type: "error"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: data.donationAmount,
          type: data.donationType,
          paymentMethod,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to process donation")
      }

      setIsSubmitted(true)
      setAlert({
        message: "Thank you for your generous donation!",
        type: "success"
      })
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Failed to process donation. Please try again later.",
        type: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {alert && (
        <AlertMessage
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <PageHeader title="Donate">
        <p className="text-xl text-white/90">
          Your generosity can change lives. Support our mission to serve the community.
        </p>
      </PageHeader>

      <section className="py-16">
        <div className="container max-w-4xl">
          {isSubmitted ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Thank You for Your Donation!</h2>
                  <p className="text-lg mb-6">
                    Your generosity will help us continue our mission to serve the community. A confirmation has been
                    sent to your email.
                  </p>
                  <div className="bg-muted p-4 rounded-lg inline-block text-left mb-6">
                    <p className="font-medium">Donation Details:</p>
                    <p>Amount: Rs. {Number.parseInt(donationAmount).toLocaleString()}</p>
                    <p>Type: {donationType.charAt(0).toUpperCase() + donationType.slice(1)}</p>
                    <p>
                      Payment Method:{" "}
                      {paymentMethod === "card"
                        ? "Credit/Debit Card"
                        : paymentMethod === "bank"
                          ? "Bank Transfer"
                          : "Mobile Wallet"}
                    </p>
                  </div>
                  <Button asChild>
                    <Link href="/">Return to Homepage</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Donation Information</CardTitle>
                      <CardDescription>Please provide the details of your donation.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label>Donation Amount (PKR)</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {["1000", "5000", "10000", "25000"].map((amount) => (
                            <Button
                              key={amount}
                              type="button"
                              variant={donationAmount === amount ? "default" : "outline"}
                              onClick={() => setDonationAmount(amount)}
                            >
                              Rs. {Number.parseInt(amount).toLocaleString()}
                            </Button>
                          ))}
                        </div>
                        <FormInput
                          id="donationAmount"
                          label="Donation Amount (PKR)"
                          type="number"
                          register={register}
                          errors={errors}
                          required
                          placeholder="Other Amount"
                        />
                      </div>

                      <div className="space-y-4">
                        <Label>Donation Type</Label>
                        <FormInput
                          id="donationType"
                          label="Donation Type"
                          type="radio"
                          options={[
                            { value: "general", label: "General Donation" },
                            { value: "zakat", label: "Zakat" },
                            { value: "education", label: "Education Program" },
                            { value: "medical", label: "Medical Assistance" },
                            { value: "orphans", label: "Orphan Care" },
                            { value: "food", label: "Food Distribution" },
                          ]}
                          register={register}
                          errors={errors}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message (Optional)</Label>
                        <FormInput
                          id="message"
                          label="Message (Optional)"
                          register={register}
                          errors={errors}
                          rows={3}
                          placeholder="Add a message with your donation"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Your information will be kept confidential.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <FormInput
                            id="firstName"
                            label="First Name"
                            register={register}
                            errors={errors}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <FormInput
                            id="lastName"
                            label="Last Name"
                            register={register}
                            errors={errors}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <FormInput
                            id="email"
                            label="Email"
                            type="email"
                            register={register}
                            errors={errors}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <FormInput
                            id="phone"
                            label="Phone"
                            type="tel"
                            register={register}
                            errors={errors}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address (Optional)</Label>
                        <FormInput
                          id="address"
                          label="Address (Optional)"
                          register={register}
                          errors={errors}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="sticky top-20">
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                      <CardDescription>Choose how you'd like to donate.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="card">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Card
                          </TabsTrigger>
                          <TabsTrigger value="bank">
                            <Landmark className="h-4 w-4 mr-2" />
                            Bank
                          </TabsTrigger>
                          <TabsTrigger value="mobile">
                            <Smartphone className="h-4 w-4 mr-2" />
                            Mobile
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="card" className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" />
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="bank" className="pt-4">
                          <div className="bg-muted p-4 rounded-lg mb-4">
                            <p className="font-medium mb-2">Bank Transfer Details:</p>
                            <p className="text-sm">Bank: First National Bank</p>
                            <p className="text-sm">Account: The Sirat-e-Mustaqeem Welfare Trust</p>
                            <p className="text-sm">Account #: 123456789</p>
                            <p className="text-sm">Branch Code: 12345</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Please complete your bank transfer and then submit this form to notify us of your donation.
                          </p>
                        </TabsContent>

                        <TabsContent value="mobile" className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="mobileNumber">Mobile Number</Label>
                            <Input id="mobileNumber" placeholder="+92 300 1234567" />
                          </div>
                          <div className="space-y-2">
                            <Label>Mobile Wallet</Label>
                            <RadioGroup defaultValue="easypaisa">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="easypaisa" id="easypaisa" />
                                <Label htmlFor="easypaisa" className="cursor-pointer">
                                  Easypaisa
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="jazzcash" id="jazzcash" />
                                <Label htmlFor="jazzcash" className="cursor-pointer">
                                  JazzCash
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="upaisa" id="upaisa" />
                                <Label htmlFor="upaisa" className="cursor-pointer">
                                  UPaisa
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <div className="border-t pt-4">
                        <div className="flex justify-between mb-2">
                          <span>Donation Amount:</span>
                          <span className="font-bold">
                            Rs. {donationAmount ? Number.parseInt(donationAmount).toLocaleString() : "0"}
                          </span>
                        </div>
                        <Button type="submit" className="w-full" disabled={!donationAmount || isSubmitting}>
                          {isSubmitting ? "Processing..." : "Complete Donation"}
                        </Button>
                        <p className="text-xs text-center mt-4 text-muted-foreground">
                          Your donation is tax-deductible. A receipt will be emailed to you.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Other Ways to Support</h2>
            <p className="text-lg text-muted-foreground">
              There are many ways you can contribute to our mission beyond monetary donations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Your Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Join our team of dedicated volunteers and contribute your time and skills to make a difference.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/volunteer">Become a Volunteer</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Giving</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Become a monthly donor and provide sustainable support for our ongoing programs and services.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/monthly-giving">Join Monthly Giving</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>In-Kind Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Donate goods, supplies, or services that can help us serve our community more effectively.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/in-kind">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
