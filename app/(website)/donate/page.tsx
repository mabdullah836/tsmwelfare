"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { ArrowRight, Building2, Check, Heart, Loader2, Lock, Package, ShieldCheck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AlertMessage } from "@/components/ui/alert-message"
import { PageHeader } from "@/components/page-header"
import { FormInput } from "@/components/ui/form-input"
import { Section, SectionHeader } from "@/components/site/section"
import { cn } from "@/lib/utils/cn"

const PRESET_AMOUNTS = ["1000", "5000", "10000", "25000"]

const FUNDS = [
  { value: "gaza-relief", label: "Gaza Relief Fund", desc: "Emergency aid for Palestinians in Gaza", highlight: true },
  { value: "general", label: "General Fund", desc: "Supports our most critical needs" },
  { value: "zakat", label: "Zakat", desc: "For eligible recipients according to Islamic principles" },
  { value: "education", label: "Education", desc: "Schooling and vocational training programs" },
  { value: "medical", label: "Medical Aid", desc: "Healthcare and emergency medical support" },
  { value: "orphans", label: "Orphan Care", desc: "Sponsorship and care for orphaned children" },
  { value: "food", label: "Food Relief", desc: "Nutritional support for families in need" },
  { value: "SelfEarningSupport", label: "Self-Earning Assistance", desc: "Financial support for skilled individuals to start small businesses" },
]

const fundLabel = (value?: string) => FUNDS.find((f) => f.value === value)?.label ?? "General Fund"
const formatRs = (value?: string) => (value && Number(value) > 0 ? `Rs. ${Number.parseInt(value).toLocaleString()}` : "—")

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedTransactionId, setSubmittedTransactionId] = useState("")
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

  // Other pages link here with a preselection: the Gaza appeal uses ?fund=gaza-relief and the
  // Zakat calculator uses ?amount=<n>&type=zakat.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const fund = params.get("fund") || params.get("type")
    if (fund && FUNDS.some((f) => f.value === fund)) setValue("donationType", fund)
    const amount = Number(params.get("amount"))
    if (Number.isFinite(amount) && amount > 0) {
      const value = String(Math.round(amount))
      setDonationAmount(value)
      setValue("donationAmount", value)
      setUseCustomAmount(!PRESET_AMOUNTS.includes(value))
    }
  }, [setValue])

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
    if (watchedAmount && !PRESET_AMOUNTS.includes(watchedAmount)) {
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

      setSubmittedTransactionId(transactionId)
      setIsSubmitted(true)
      setAlert({
        message: "Thank you for your donation!",
        type: "success"
      })
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Payment processing failed. Please try again.",
        type: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const submitButton = (className?: string) => (
    <Button
      type="submit"
      form="donation-form"
      size="lg"
      className={cn("h-12 w-full text-base", className)}
      disabled={!watchedAmount || isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin" aria-hidden /> Processing…
        </>
      ) : (
        <>
          <Heart aria-hidden /> Donate {watchedAmount && Number(watchedAmount) > 0 ? formatRs(watchedAmount) : ""}
        </>
      )}
    </Button>
  )

  return (
    <div>
      {alert && <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

      <PageHeader title="Make a difference today" eyebrow="Donate">
        <p>Your support transforms lives. Join us in creating positive change through your generous contribution.</p>
      </PageHeader>

      <section className="py-12 md:py-16">
        <div className="container max-w-6xl">
          {isSubmitted ? (
            <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border bg-card shadow-lg">
              <div className="bg-accent px-8 py-10 text-center">
                <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden>
                  <Check className="h-8 w-8" />
                </span>
                <h2 className="text-3xl">Thank you!</h2>
                <p className="mt-3 text-muted-foreground">
                  Your generous donation of <span className="font-semibold text-foreground">{formatRs(donationAmount)}</span> will make a real difference.
                </p>
              </div>
              <div className="p-8">
                <h3 className="text-center text-base font-semibold">Donation receipt</h3>
                <dl className="mt-4 divide-y rounded-2xl border text-sm">
                  {[
                    ["Transaction ID", submittedTransactionId],
                    ["Amount", formatRs(donationAmount)],
                    ["Fund", fundLabel(watchedType)],
                    ["Date", new Date().toLocaleDateString()],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-4 px-4 py-3">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="break-all text-right font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/donate">Make another donation</Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link href="/">Back to home</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-12">
              <form id="donation-form" onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6 lg:col-span-8" noValidate>
                {/* Step 1: amount */}
                <fieldset className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                  <legend className="sr-only">Donation amount</legend>
                  <StepTitle step={1} title="Choose an amount" />
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {PRESET_AMOUNTS.map((amount) => {
                      const selected = donationAmount === amount && !useCustomAmount
                      return (
                        <button
                          key={amount}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => handleAmountSelection(amount)}
                          className={cn(
                            "h-14 rounded-xl border text-lg font-semibold tabular-nums transition-colors",
                            selected
                              ? "border-primary bg-primary text-primary-foreground shadow-sm"
                              : "bg-background hover:border-primary/40 hover:bg-accent"
                          )}
                        >
                          Rs. {Number.parseInt(amount).toLocaleString()}
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <Label htmlFor="customAmount" className="font-medium">Or enter a custom amount (PKR)</Label>
                      {donationAmount && !useCustomAmount && (
                        <Button
                          type="button"
                          variant="link"
                          className="h-auto p-0 font-medium text-primary"
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
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm font-medium text-muted-foreground" aria-hidden>Rs.</span>
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
                          inputMode: "numeric",
                          min: 1,
                          "aria-label": "Custom amount in rupees",
                          className: cn("h-12 pl-11 text-base", !useCustomAmount && donationAmount !== "" && "cursor-not-allowed bg-muted"),
                          placeholder: useCustomAmount || !donationAmount
                            ? "Enter amount"
                            : `Selected: Rs. ${Number.parseInt(donationAmount).toLocaleString()}`
                        }}
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Step 2: fund */}
                <fieldset className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                  <legend className="sr-only">Where should your donation go?</legend>
                  <StepTitle step={2} title="Where should your donation go?" />
                  <div role="radiogroup" aria-label="Donation fund" className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {FUNDS.map((option) => {
                      const selected = watchedType === option.value
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setValue("donationType", option.value)}
                          className={cn(
                            "flex items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                            selected ? "border-primary bg-accent ring-1 ring-primary" : "hover:border-primary/40 hover:bg-muted/50",
                            option.highlight && !selected && "border-destructive/30 bg-destructive/5"
                          )}
                        >
                          <span
                            className={cn(
                              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                              selected ? "border-primary bg-primary text-primary-foreground" : "border-input"
                            )}
                            aria-hidden
                          >
                            {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                          </span>
                          <span className="flex-1">
                            <span className="flex flex-wrap items-center gap-2 font-semibold">
                              {option.label}
                              {option.highlight && (
                                <span className="rounded-full bg-destructive px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-destructive-foreground">Urgent</span>
                              )}
                            </span>
                            <span className="mt-0.5 block text-sm text-muted-foreground">{option.desc}</span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                {/* Step 3: details */}
                <fieldset className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                  <legend className="sr-only">Your details</legend>
                  <StepTitle step={3} title="Your details" />
                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <FormInput id="firstName" label="First Name" register={register} errors={errors} required inputProps={{ autoComplete: "given-name" }} />
                    <FormInput id="lastName" label="Last Name" register={register} errors={errors} required inputProps={{ autoComplete: "family-name" }} />
                    <FormInput id="email" label="Email Address" type="email" register={register} errors={errors} required inputProps={{ autoComplete: "email" }} />
                    <FormInput id="phone" label="Phone Number" type="tel" register={register} errors={errors} required inputProps={{ autoComplete: "tel" }} />
                  </div>
                  <div className="mt-5">
                    <FormInput
                      id="message"
                      label="Additional Notes (Optional)"
                      register={register}
                      errors={errors}
                      rows={4}
                      placeholder="Any special instructions or dedication for your donation..."
                    />
                  </div>
                  <div className="mt-6 lg:hidden">{submitButton()}</div>
                </fieldset>
              </form>

              <aside className="lg:col-span-4" aria-label="Donation summary">
                <div className="space-y-4 lg:sticky lg:top-28">
                  <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                    <div className="border-b bg-muted/50 px-6 py-4">
                      <h2 className="text-lg">Donation summary</h2>
                    </div>
                    <dl className="space-y-3 px-6 py-5 text-sm">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Amount</dt>
                        <dd className="font-display text-2xl font-bold tabular-nums">{formatRs(watchedAmount)}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <dt className="text-muted-foreground">Fund</dt>
                        <dd className="text-right font-medium">{fundLabel(watchedType)}</dd>
                      </div>
                    </dl>
                    {watchedType === "gaza-relief" && (
                      <p className="mx-6 mb-4 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive dark:text-red-300">
                        <strong>Urgent Gaza appeal.</strong> Your donation will provide immediate relief to families in Gaza.
                      </p>
                    )}
                    <div className="hidden px-6 pb-6 lg:block">{submitButton()}</div>
                    <p className="flex items-center justify-center gap-1.5 border-t px-6 py-3 text-center text-xs text-muted-foreground">
                      <Lock className="h-3.5 w-3.5" aria-hidden /> We respect your privacy and never share your information.
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-card p-5 text-sm">
                    <p className="flex items-center gap-2 font-semibold">
                      <ShieldCheck className="h-4 w-4 text-primary" aria-hidden /> Prefer a bank transfer?
                    </p>
                    <p className="mt-1 text-muted-foreground">Send directly to our accounts, EasyPaisa or international transfer.</p>
                    <Link href="/bank-details" className="mt-3 inline-flex items-center gap-1 font-semibold text-primary hover:underline underline-offset-4">
                      View bank details <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="More ways to help"
          title="More ways to support"
          description="Discover additional opportunities to make an impact and join our community of changemakers."
        />
        {/* These cards previously linked to /support/* pages that do not exist. */}
        <ul className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Building2, title: "Bank transfer", desc: "Give through our bank accounts or EasyPaisa.", href: "/bank-details", cta: "View bank details" },
            { icon: Package, title: "In-kind donations", desc: "Contribute goods or services. Get in touch to arrange it.", href: "/contact", cta: "Contact us" },
            { icon: Users, title: "Volunteer", desc: "Share your time and talents with our teams.", href: "/volunteer", cta: "Explore opportunities" },
          ].map(({ icon: Icon, title, desc, href, cta }) => (
            <li key={title} className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary" aria-hidden>
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg">{title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{desc}</p>
              <Link href={href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline underline-offset-4">
                {cta} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}

function StepTitle({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground" aria-hidden>
        {step}
      </span>
      <h2 className="text-xl">{title}</h2>
    </div>
  )
}

