"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Heart, Clock, Users, GraduationCap } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertMessage } from "@/components/ui/alert-message"

export default function VolunteerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    occupation: "",
    availability: "",
    interests: [],
    skills: "",
    experience: "",
    motivation: "",
    references: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleInterestChange = (interest: string) => {
    setFormData((prev : any) => {
      const currentInterests = prev.interests as string[]
      return {
        ...prev,
        interests: currentInterests.includes(interest)
          ? currentInterests.filter((i) => i !== interest)
          : [...currentInterests, interest]
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmDialog(true)
  }

  const handleConfirmedSubmit = async () => {
    setShowConfirmDialog(false)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setAlert({
          message: "Thank you for your interest in volunteering. We'll contact you soon!",
          type: "success"
        })
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          occupation: "",
          availability: "",
          interests: [],
          skills: "",
          experience: "",
          motivation: "",
          references: "",
        })
      } else {
        throw new Error(data.message || "Failed to submit application")
      }
    } catch (error) {
      setAlert({
        message: "Failed to submit application. Please try again later.",
        type: "error"
      })
      console.error("Error:", error)
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
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Volunteer With Us</h1>
            <p className="text-xl text-white/90">
              Join our community of dedicated volunteers and make a real difference in people's lives.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="bg-background">
              <CardContent className="pt-6">
                <Heart className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Make an Impact</h3>
                <p className="text-muted-foreground">
                  Your time and skills can make a real difference in your community and change lives.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
                <p className="text-muted-foreground">
                  Connect with like-minded individuals who share your passion for helping others.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="pt-6">
                <GraduationCap className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Learn New Skills</h3>
                <p className="text-muted-foreground">
                  Gain valuable experience and develop new skills while helping your community.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="pt-6">
                <Clock className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Flexible Hours</h3>
                <p className="text-muted-foreground">
                  Choose volunteer opportunities that fit your schedule and availability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
                  <p>This is an unpaid volunteer position. As a faith-based organization working for the greater good, 
                  we believe in serving our community through selfless dedication. Your contribution will be rewarded 
                  through the positive impact you make in people's lives and the spiritual fulfillment of serving others.</p>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Availability</Label>
                    <Select
                      name="availability"
                      value={formData.availability}
                      onValueChange={(value) => handleSelectChange(value, "availability")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="evenings">Evenings</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Areas of Interest</Label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        "Education and Tutoring",
                        "Food Distribution",
                        "Healthcare Support",
                        "Administrative Work",
                        "Event Planning",
                        "Fundraising",
                        "Social Media",
                        "Community Outreach",
                      ].map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest}
                            checked={formData.interests.includes(interest)}
                            onCheckedChange={() => handleInterestChange(interest)}
                          />
                          <Label htmlFor={interest} className="cursor-pointer">
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Special Skills or Qualifications</Label>
                    <Textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="List any special skills or qualifications you have"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Previous Volunteer Experience</Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Describe your previous volunteer experience"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Why do you want to volunteer with us?</Label>
                    <Textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      placeholder="Tell us why you'd like to volunteer with our organization"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="references">References</Label>
                    <Textarea
                      id="references"
                      name="references"
                      value={formData.references}
                      onChange={handleChange}
                      placeholder="Please provide two references with their contact information"
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Volunteer Application</AlertDialogTitle>
            <AlertDialogDescription>
              Please confirm that you understand this is an unpaid volunteer position dedicated to serving our community 
              through faith-based charitable work. Your contribution will be through your time, skills, and dedication 
              to helping others.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmedSubmit}>
              I Understand & Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 