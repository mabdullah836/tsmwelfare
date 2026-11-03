"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Copy, CreditCard, Globe2, InfoIcon, Landmark, Mail, Smartphone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/site/section"

type Row = { label: string; value: React.ReactNode; copy?: string }

const domestic: Row[] = [
  { label: "Bank Name", value: "Meezan Bank" },
  { label: "Account Title", value: "The Sirat-e-Mustaqeem Welfare Trust", copy: "The Sirat-e-Mustaqeem Welfare Trust" },
  { label: "Account Number", value: "1234567890123", copy: "1234567890123" },
  { label: "IBAN", value: "PK36MEZN0001234567890123", copy: "PK36MEZN0001234567890123" },
  { label: "Branch Code", value: "0123", copy: "0123" },
  { label: "Branch Address", value: <>Mansehra Colony, Lal Kothi Stop<br />Landhi, Karachi</> },
]

const easypaisa: Row[] = [
  { label: "Account Name", value: "The Sirat-e-Mustaqeem Welfare Trust", copy: "The Sirat-e-Mustaqeem Welfare Trust" },
  { label: "Mobile Number", value: "0300 1234567", copy: "03001234567" },
  { label: "CNIC", value: "12345-6789012-3", copy: "12345-6789012-3" },
  {
    label: "Payment Methods",
    value: (
      <span className="flex flex-wrap gap-2">
        {["EasyPaisa App", "USSD Code", "Agent Location"].map((m) => (
          <span key={m} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">{m}</span>
        ))}
      </span>
    ),
  },
]

const international: Row[] = [
  { label: "Bank Name", value: "Meezan Bank" },
  { label: "Account Name", value: "The Sirat-e-Mustaqeem Welfare Trust", copy: "The Sirat-e-Mustaqeem Welfare Trust" },
  { label: "Account Number", value: "1234567890123", copy: "1234567890123" },
  { label: "SWIFT Code", value: "MEZNPKKA", copy: "MEZNPKKA" },
  { label: "IBAN", value: "PK36MEZN0001234567890123", copy: "PK36MEZN0001234567890123" },
  { label: "Bank Address", value: <>Meezan House, Bahadurabad<br />Karachi, Pakistan</> },
]

const purposes = [
  {
    title: "For donations",
    items: ['Include "Donation" in payment reference', "Add name & contact for receipt", "Email receipt to donations@sirat-e-mustaqeem.org"],
  },
  {
    title: "For Zakat",
    items: ['Clearly mark as "Zakat" in reference', "Include your CNIC for verification", "Email to zakat@sirat-e-mustaqeem.org"],
  },
  {
    title: "For sponsorships",
    items: ["Include sponsor ID in reference", "Specify sponsored person/child", "Email to sponsorships@sirat-e-mustaqeem.org"],
  },
]

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-8 w-8 shrink-0 text-muted-foreground"
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1800)
        } catch {
          // Clipboard can be unavailable (e.g. insecure context); the value stays selectable.
        }
      }}
    >
      {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}

function DetailsList({ rows }: { rows: Row[] }) {
  return (
    <dl className="divide-y rounded-xl border">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-center sm:gap-4">
          <dt className="text-sm text-muted-foreground">{row.label}</dt>
          <dd className="flex min-w-0 items-center justify-between gap-2 font-medium">
            <span className="min-w-0 tabular-nums [overflow-wrap:anywhere]">{row.value}</span>
            {row.copy && <CopyButton value={row.copy} label={row.label} />}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function Panel({ icon: Icon, title, description, children }: { icon: typeof Landmark; title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary" aria-hidden>
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <h2 className="text-xl">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function Steps({ title, items, ordered = true }: { title: string; items: string[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul"
  return (
    <div className="rounded-xl bg-muted/60 p-5">
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      <List className="space-y-2 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={item} className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background text-[11px] font-bold text-primary ring-1 ring-border" aria-hidden>
              {ordered ? i + 1 : "•"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </List>
    </div>
  )
}

export default function BankDetailsPage() {
  return (
    <>
      <PageHeader title="Bank & payment details" eyebrow="Give directly">
        <p>Secure payment information for donations and transactions with our organization.</p>
      </PageHeader>

      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-primary/25 bg-accent/60 p-4 text-sm" role="note">
            <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <p>
              <strong className="font-semibold text-foreground">Verification required. </strong>
              <span className="text-muted-foreground">
                For security, please verify these details by calling our office (+92 300 1234567) before making any transactions.
              </span>
            </p>
          </div>

          <Tabs defaultValue="domestic" className="w-full">
            <TabsList className="grid h-auto w-full grid-cols-3 gap-1 rounded-xl p-1">
              <TabsTrigger value="domestic" className="gap-2 rounded-lg py-2.5 text-xs sm:text-sm">
                <Landmark className="hidden h-4 w-4 sm:block" aria-hidden /> Bank transfer
              </TabsTrigger>
              <TabsTrigger value="easypaisa" className="gap-2 rounded-lg py-2.5 text-xs sm:text-sm">
                <Smartphone className="hidden h-4 w-4 sm:block" aria-hidden /> EasyPaisa
              </TabsTrigger>
              <TabsTrigger value="international" className="gap-2 rounded-lg py-2.5 text-xs sm:text-sm">
                <Globe2 className="hidden h-4 w-4 sm:block" aria-hidden /> International
              </TabsTrigger>
            </TabsList>

            <TabsContent value="domestic" className="mt-6">
              <Panel icon={Landmark} title="Domestic bank details" description="For transfers within Pakistan">
                <DetailsList rows={domestic} />
                <div className="mt-6">
                  <Steps
                    title="Transfer instructions"
                    items={['Add "Donation" in the payment reference', "For receipts, include your name & phone number", "Email transfer receipt to donations@sirat-e-mustaqeem.org"]}
                  />
                </div>
              </Panel>
            </TabsContent>

            <TabsContent value="easypaisa" className="mt-6">
              <Panel icon={Smartphone} title="EasyPaisa mobile payments" description="Fast and secure mobile wallet transfers">
                <DetailsList rows={easypaisa} />
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <Steps title="Via EasyPaisa app" items={["Open EasyPaisa App", 'Select "Send Money"', "Enter our mobile number", "Add donation reference"]} />
                  <Steps title="Via USSD code" items={["Dial *786# from your mobile", 'Select "Send Money"', "Enter our mobile number", "Confirm transaction"]} />
                </div>
              </Panel>
            </TabsContent>

            <TabsContent value="international" className="mt-6">
              <Panel icon={Globe2} title="International transfers" description="For donations from outside Pakistan">
                <DetailsList rows={international} />
                <div className="mt-6">
                  <Steps
                    ordered={false}
                    title="Important notes"
                    items={['Include "Charity Donation" in transfer details', "Email transfer receipt to international@sirat-e-mustaqeem.org", "Allow 3-5 business days for processing"]}
                  />
                </div>
              </Panel>
            </TabsContent>
          </Tabs>

          <div className="mt-14">
            <h2 className="text-2xl">Payment instructions by purpose</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {purposes.map((p) => (
                <div key={p.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                  <h3 className="text-base">{p.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        <span className="min-w-0 break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section tone="muted" containerClassName="max-w-4xl">
        <SectionHeader eyebrow="Other options" title="Other payment options" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary" aria-hidden>
              <CreditCard className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg">Donate online</h3>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">Use our online donation form.</p>
            <Button asChild className="mt-5">
              <Link href="/donate">
                Donate online now <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary" aria-hidden>
              <Mail className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg">Cheque / cash by mail</h3>
            <p className="mt-1 text-sm text-muted-foreground">Send to our head office address:</p>
            <address className="mt-3 text-sm not-italic">
              The Sirat-e-Mustaqeem Welfare Trust
              <br />
              Mansehra Colony, Lal Kothi Stop
              <br />
              Landhi, Karachi, Pakistan
            </address>
            <p className="mt-3 text-xs text-muted-foreground">Mark envelope as &quot;Donation&quot;</p>
          </div>
        </div>
      </Section>
    </>
  )
}
