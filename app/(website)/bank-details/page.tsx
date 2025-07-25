"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, Smartphone, Mail, CreditCard, Landmark } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function BankDetailsPage() {
  return (
    <>
      <PageHeader title="Bank & Payment Details">
        <p className="text-xl text-white/90">
          Secure payment information for donations and transactions with our organization.
        </p>
      </PageHeader>

      <section className="py-16">
        <div className="container max-w-4xl">
          <Alert className="mb-8 border-primary/30 bg-primary/5">
            <InfoIcon className="h-5 w-5 text-primary" />
            <AlertTitle className="text-primary">Verification Required</AlertTitle>
            <AlertDescription>
              For security, please verify these details by calling our office (+92 300 1234567) before making any transactions.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="domestic" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted !h-14">
              <TabsTrigger value="domestic" className="py-3">
                <Landmark className="h-4 w-4 mr-2" />
                Bank Transfer
              </TabsTrigger>
              <TabsTrigger value="easypaisa" className="py-3">
                <Smartphone className="h-4 w-4 mr-2" />
                EasyPaisa
              </TabsTrigger>
              <TabsTrigger value="international" className="py-3">
                <Landmark className="h-4 w-4 mr-2" />
                International
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="domestic" className="mt-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Domestic Bank Details</CardTitle>
                  <CardDescription>For transfers within Pakistan</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Bank Name</TableCell>
                        <TableCell>Meezan Bank</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Account Title</TableCell>
                        <TableCell>The Sirat-e-Mustaqeem Welfare Trust</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Account Number</TableCell>
                        <TableCell>1234567890123</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">IBAN</TableCell>
                        <TableCell>PK36MEZN0001234567890123</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Branch Code</TableCell>
                        <TableCell>0123</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Branch Address</TableCell>
                        <TableCell>
                          Mansehra Colony, Lal Kothi Stop
                          <br />
                          Landhi, Karachi
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Transfer Instructions</h4>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>Add "Donation" in the payment reference</li>
                      <li>For receipts, include your name & phone number</li>
                      <li>Email transfer receipt to donations@sirat-e-mustaqeem.org</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="easypaisa" className="mt-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">EasyPaisa Mobile Payments</CardTitle>
                  <CardDescription>Fast and secure mobile wallet transfers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Smartphone className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold">EasyPaisa Account</h3>
                      <p className="text-muted-foreground">Send to our registered mobile number</p>
                    </div>
                  </div>

                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Account Name</TableCell>
                        <TableCell>The Sirat-e-Mustaqeem Welfare Trust</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Mobile Number</TableCell>
                        <TableCell>0300 1234567</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">CNIC</TableCell>
                        <TableCell>12345-6789012-3</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Payment Methods</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">EasyPaisa App</Badge>
                            <Badge variant="secondary">USSD Code</Badge>
                            <Badge variant="secondary">Agent Location</Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <h4 className="font-medium mb-2 text-green-700">Via EasyPaisa App</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-green-600">
                        <li>Open EasyPaisa App</li>
                        <li>Select "Send Money"</li>
                        <li>Enter our mobile number</li>
                        <li>Add donation reference</li>
                      </ol>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="font-medium mb-2 text-blue-700">Via USSD Code</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-blue-600">
                        <li>Dial *786# from your mobile</li>
                        <li>Select "Send Money"</li>
                        <li>Enter our mobile number</li>
                        <li>Confirm transaction</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="international" className="mt-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">International Transfers</CardTitle>
                  <CardDescription>For donations from outside Pakistan</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Bank Name</TableCell>
                        <TableCell>Meezan Bank</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Account Name</TableCell>
                        <TableCell>The Sirat-e-Mustaqeem Welfare Trust</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Account Number</TableCell>
                        <TableCell>1234567890123</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">SWIFT Code</TableCell>
                        <TableCell>MEZNPKKA</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">IBAN</TableCell>
                        <TableCell>PK36MEZN0001234567890123</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bank Address</TableCell>
                        <TableCell>
                          Meezan House, Bahadurabad
                          <br />
                          Karachi, Pakistan
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Important Notes</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Include "Charity Donation" in transfer details</li>
                      <li>Email transfer receipt to international@sirat-e-mustaqeem.org</li>
                      <li>Allow 3-5 business days for processing</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Payment Instructions by Purpose</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader className="bg-primary/5">
                  <CardTitle>For Donations</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                        <InfoIcon className="h-3 w-3" />
                      </span>
                      <span>Include "Donation" in payment reference</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                        <InfoIcon className="h-3 w-3" />
                      </span>
                      <span>Add name & contact for receipt</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                        <InfoIcon className="h-3 w-3" />
                      </span>
                      <span>Email receipt to donations@sirat-e-mustaqeem.org</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="bg-primary/5">
                  <CardTitle>For Zakat</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                        <InfoIcon className="h-3 w-3" />
                      </span>
                      <span>Clearly mark as "Zakat" in reference</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                        <InfoIcon className="h-3 w-3" />
                      </span>
                      <span>Include your CNIC for verification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                        <InfoIcon className="h-3 w-3" />
                      </span>
                      <span>Email to zakat@sirat-e-mustaqeem.org</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="bg-primary/5">
                  <CardTitle>For Sponsorships</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                        <InfoIcon className="h-3 w-3" />
                      </span>
                      <span>Include sponsor ID in reference</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                        <InfoIcon className="h-3 w-3" />
                      </span>
                      <span>Specify sponsored person/child</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                        <InfoIcon className="h-3 w-3" />
                      </span>
                      <span>Email to sponsorships@sirat-e-mustaqeem.org</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Other Payment Options</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Credit/Debit Card</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">Secure online payments through our donation portal</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/donate">Donate Online Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Check/Cash by Mail</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">Send to our head office address:</p>
                <address className="not-italic mb-4">
                  The Sirat-e-Mustaqeem Welfare Trust
                  <br />
                  Mansehra Colony, Lal Kothi Stop
                  <br />
                  Landhi, Karachi, Pakistan
                </address>
                <p className="text-sm text-muted-foreground">Mark envelope as "Donation"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}