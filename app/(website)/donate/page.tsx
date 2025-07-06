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
import { Textarea } from "@/components/ui/textarea"
import { Heart, CreditCard, Landmark, Smartphone } from "lucide-react"
import { AlertMessage } from "@/components/ui/alert-message"
import { PageHeader } from "@/components/page-header"

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState<string>("")
  const [donationType, setDonationType] = useState<string>("general")
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!donationAmount || Number(donationAmount) <= 0) {
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
          amount: donationAmount,
          type: donationType,
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
                    <a href="/">Return to Homepage</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit}>
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
                        <div className="relative">
                          <Input
                            type="number"
                            min="100"
                            placeholder="Other Amount"
                            value={!["1000", "5000", "10000", "25000"].includes(donationAmount) ? donationAmount : ""}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            className="pl-10"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rs.</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Donation Type</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="general"
                              id="general"
                              name="donationType"
                              onChange={(e) => setDonationType(e.target.value)}
                              defaultChecked
                            />
                            <label htmlFor="general" className="cursor-pointer">
                              General Donation
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="zakat"
                              id="zakat"
                              name="donationType"
                              onChange={(e) => setDonationType(e.target.value)}
                            />
                            <label htmlFor="zakat" className="cursor-pointer">
                              Zakat
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="education"
                              id="education"
                              name="donationType"
                              onChange={(e) => setDonationType(e.target.value)}
                            />
                            <label htmlFor="education" className="cursor-pointer">
                              Education Program
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="medical"
                              id="medical"
                              name="donationType"
                              onChange={(e) => setDonationType(e.target.value)}
                            />
                            <label htmlFor="medical" className="cursor-pointer">
                              Medical Assistance
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="orphans"
                              id="orphans"
                              name="donationType"
                              onChange={(e) => setDonationType(e.target.value)}
                            />
                            <label htmlFor="orphans" className="cursor-pointer">
                              Orphan Care
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="food"
                              id="food"
                              name="donationType"
                              onChange={(e) => setDonationType(e.target.value)}
                            />
                            <label htmlFor="food" className="cursor-pointer">
                              Food Distribution
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea id="message" placeholder="Add a message with your donation" rows={3} />
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
                          <Input id="firstName" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" type="tel" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address (Optional)</Label>
                        <Input id="address" />
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
                  <a href="/volunteer">Become a Volunteer</a>
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
                  <a href="/monthly-giving">Join Monthly Giving</a>
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
                  <a href="/in-kind">Learn More</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
