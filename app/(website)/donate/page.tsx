"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Heart, Calendar, Package, Users, Circle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PageHeader } from "@/components/page-header"
import { FormInput } from "@/components/ui/form-input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [useCustomAmount, setUseCustomAmount] = useState(false)

  const { 
    handleSubmit, 
    register, 
    formState: { errors }, 
    setValue, 
    watch,
  } = useForm({
    defaultValues: {
      donationAmount: "",
      donationType: "general",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    }
  })

  const watchedAmount = watch("donationAmount")
  const watchedType = watch("donationType")

  const handleAmountSelection = (amount: string) => {
    setDonationAmount(amount)
    setValue("donationAmount", amount)
    setUseCustomAmount(false)
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDonationAmount(value)
    setValue("donationAmount", value)
    setUseCustomAmount(true)
  }

  useEffect(() => {
    if (watchedAmount && !["1000", "5000", "10000", "25000"].includes(watchedAmount)) {
      setUseCustomAmount(true)
    }
  }, [watchedAmount])

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
      const transactionId = `DON-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: data.donationAmount,
          type: data.donationType,
          donor: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone
          },
          message: data.message,
          transactionId
        }),
      })

      if (!response.ok) throw new Error("Donation processing failed")

      setIsSubmitted(true)
      setAlert({
        message: "Thank you for your donation!",
        type: "success"
      })
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Payment processing failed. Please try again.",
        type: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {alert && (
        <Alert variant={alert.type === "error" ? "destructive" : "default"}>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{alert.type === "error" ? "Error" : "Success"}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <PageHeader title="Make a Difference">
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Your support transforms lives. Join us in creating positive change through your generous contribution.
        </p>
      </PageHeader>

      <section className="py-16">
        <div className="container max-w-6xl">
          {isSubmitted ? (
            <Card className="max-w-2xl mx-auto border-0 bg-card shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-primary/5 py-12 px-8 text-center">
                  <div className="bg-primary/10 p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Your generous donation of <span className="font-semibold text-primary">Rs. {donationAmount ? Number.parseInt(donationAmount).toLocaleString() : "0"}</span> will make a real difference.
                  </p>
                </div>
                <div className="p-8">
                  <div className="bg-muted/50 p-6 rounded-xl mb-8">
                    <h3 className="font-medium text-lg mb-4 text-center">Donation Receipt</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-muted-foreground">Transaction ID</span>
                        <span className="font-medium">DON-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-medium">Rs. {donationAmount ? Number.parseInt(donationAmount).toLocaleString() : "0"}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-muted-foreground">Fund</span>
                        <span className="font-medium capitalize">{watchedType?.replace(/-/g, ' ') || "General Fund"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild variant="outline" className="flex-1 max-w-xs">
                      <Link href="/donate">Make Another Donation</Link>
                    </Button>
                    <Button asChild className="flex-1 max-w-xs">
                      <Link href="/">Back to Home</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <Card className="border-0 bg-card shadow-sm rounded-xl overflow-hidden">
                  <CardHeader className="border-b bg-muted/50">
                    <CardTitle className="text-2xl">Donation Details</CardTitle>
                    <CardDescription>Tell us about your donation</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-8">
                      <div>
                        <Label className="text-base font-medium">How much would you like to give?</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                          {["1000", "5000", "10000", "25000"].map((amount) => (
                            <Button
                              key={amount}
                              type="button"
                              variant={
                                donationAmount === amount && !useCustomAmount 
                                  ? "default" 
                                  : "outline"
                              }
                              onClick={() => handleAmountSelection(amount)}
                              className="h-14 text-lg font-medium"
                            >
                              Rs. {Number.parseInt(amount).toLocaleString()}
                            </Button>
                          ))}
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-2">
                            <Label htmlFor="customAmount" className="font-medium">Or enter a custom amount (PKR)</Label>
                            {donationAmount && !useCustomAmount && (
                              <Button
                                type="button"
                                variant="link"
                                className="h-auto p-0 text-primary font-medium"
                                onClick={() => {
                                  setDonationAmount("")
                                  setValue("donationAmount", "")
                                  setUseCustomAmount(true)
                                  setTimeout(() => {
                                    const input = document.getElementById("customAmount")
                                    if (input) input.focus()
                                  }, 0)
                                }}
                              >
                                Use custom amount
                              </Button>
                            )}
                          </div>
                          <FormInput
                            id="customAmount"
                            label=""
                            type="number"
                            register={register}
                            errors={errors}
                            inputProps={{
                              value: useCustomAmount ? donationAmount : "",
                              onChange: handleCustomAmountChange,
                              disabled: !useCustomAmount && donationAmount !== "",
                              className: !useCustomAmount && donationAmount !== "" 
                                ? "bg-muted cursor-not-allowed" 
                                : "",
                              placeholder: useCustomAmount || !donationAmount 
                                ? "Enter amount" 
                                : `Selected: Rs. ${Number.parseInt(donationAmount).toLocaleString()}`
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Where should your donation go?</Label>
                        <RadioGroup
                          value={watchedType}
                          onValueChange={(value) => {
                            setValue("donationType", value)
                          }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
                        >
                          {[
                            { 
                              value: "gaza-relief", 
                              label: "Gaza Relief Fund", 
                              desc: "Emergency aid for Palestinians in Gaza",
                              highlight: true
                            },
                            { 
                              value: "general", 
                              label: "General Fund", 
                              desc: "Supports our most critical needs" 
                            },
                            { 
                              value: "zakat", 
                              label: "Zakat", 
                              desc: "For eligible recipients according to Islamic principles" 
                            },
                            { 
                              value: "education", 
                              label: "Education", 
                              desc: "Schooling and vocational training programs" 
                            },
                            { 
                              value: "medical", 
                              label: "Medical Aid", 
                              desc: "Healthcare and emergency medical support" 
                            },
                            { 
                              value: "orphans", 
                              label: "Orphan Care", 
                              desc: "Sponsorship and care for orphaned children" 
                            },
                            { 
                              value: "food", 
                              label: "Food Relief", 
                              desc: "Nutritional support for families in need" 
                            },
                            {
                              value: "SelfEarningSupport",
                              label: "Self-Earning Assistance",
                              desc: "Financial support for skilled individuals to start small businesses"
                            }
                          ].map((option) => (
                            <div 
                              key={option.value} 
                              className={`flex items-start space-x-3 cursor-pointer p-3 rounded-lg ${option.highlight ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' : 'hover:bg-muted/50'}`}
                              onClick={() => setValue("donationType", option.value)}
                            >
                              <div className="relative mt-1">
                                <Circle className={`h-5 w-5 ${watchedType === option.value ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
                              </div>
                              <Label htmlFor={option.value} className="flex flex-col cursor-pointer flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{option.label}</span>
                                  {option.highlight && (
                                    <Badge variant="destructive" className="text-xs">Urgent</Badge>
                                  )}
                                </div>
                                <span className="text-sm text-muted-foreground font-normal">{option.desc}</span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Personal Information</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                          <FormInput
                            id="firstName"
                            label="First Name"
                            register={register}
                            errors={errors}
                            required
                          />
                          <FormInput
                            id="lastName"
                            label="Last Name"
                            register={register}
                            errors={errors}
                            required
                          />
                          <FormInput
                            id="email"
                            label="Email Address"
                            type="email"
                            register={register}
                            errors={errors}
                            required
                          />
                          <FormInput
                            id="phone"
                            label="Phone Number"
                            type="tel"
                            register={register}
                            errors={errors}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <FormInput
                          id="message"
                          label="Additional Notes (Optional)"
                          register={register}
                          errors={errors}
                          rows={4}
                          placeholder="Any special instructions or dedication for your donation..."
                        />
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-4">
                <Card className="sticky top-8 border-0 bg-card shadow-lg rounded-xl overflow-hidden">
                  <CardHeader className="bg-primary/5 border-b">
                    <CardTitle className="text-xl">Donation Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b">
                          <span className="text-muted-foreground">Amount</span>
                          <span className="font-bold text-lg">
                            {watchedAmount ? `Rs. ${Number.parseInt(watchedAmount).toLocaleString()}` : "—"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b">
                          <span className="text-muted-foreground">Fund</span>
                          <span className="font-medium capitalize">
                            {watchedType?.replace(/-/g, ' ') || "—"}
                          </span>
                        </div>
                      </div>
                      {watchedType === "gaza-relief" && (
                        <Alert className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                          <AlertTitle className="text-red-600 dark:text-red-400">Urgent Gaza Appeal</AlertTitle>
                          <AlertDescription className="text-red-600 dark:text-red-400">
                            Your donation will provide immediate relief to families in Gaza.
                          </AlertDescription>
                        </Alert>
                      )}
                      <div>
                        <Button 
                          onClick={handleSubmit(handleSubmitForm)}
                          size="lg" 
                          className="w-full py-6 text-lg font-medium"
                          disabled={!watchedAmount || isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            "Complete Donation"
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-center text-muted-foreground mt-2">
                        Your donation is tax deductible. We respect your privacy and will never share your information.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">More Ways to Support</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover additional opportunities to make an impact and join our community of changemakers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 bg-card shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
              <CardHeader className="pb-0">
                <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Monthly Giving</CardTitle>
                <CardDescription>Sustainable support for lasting change</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/support/monthly">Set Up Recurring Gift</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
              <CardHeader className="pb-0">
                <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>In-Kind Donations</CardTitle>
                <CardDescription>Contribute goods or services</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/support/in-kind">View Current Needs</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
              <CardHeader className="pb-0">
                <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Volunteer</CardTitle>
                <CardDescription>Share your time and talents</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/support/volunteer">Explore Opportunities</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}