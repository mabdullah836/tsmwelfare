import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function BankDetailsPage() {
  return (
    <>
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Bank Details</h1>
            <p className="text-xl text-white/90">
              Secure banking information for donations and transactions with our organization.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <Alert className="mb-8">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Important Notice</AlertTitle>
            <AlertDescription>
              Please verify these bank details by calling our office before making any large transactions.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="domestic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="domestic">Domestic Transfers</TabsTrigger>
              <TabsTrigger value="international">International Transfers</TabsTrigger>
            </TabsList>
            <TabsContent value="domestic" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Domestic Bank Details</CardTitle>
                  <CardDescription>Use these details for transfers within the United States.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Bank Name</TableCell>
                        <TableCell>First National Bank</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Account Name</TableCell>
                        <TableCell>Organization Name Inc.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Account Number</TableCell>
                        <TableCell>123456789</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Routing Number</TableCell>
                        <TableCell>987654321</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Account Type</TableCell>
                        <TableCell>Checking</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bank Address</TableCell>
                        <TableCell>
                          100 Main Street
                          <br />
                          City, State 12345
                          <br />
                          United States
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="international" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>International Bank Details</CardTitle>
                  <CardDescription>Use these details for transfers from outside the United States.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Bank Name</TableCell>
                        <TableCell>First National Bank</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Account Name</TableCell>
                        <TableCell>Organization Name Inc.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Account Number</TableCell>
                        <TableCell>123456789</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">SWIFT Code</TableCell>
                        <TableCell>FNBAUS12</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">IBAN</TableCell>
                        <TableCell>US12 FNBA 1234 5678 9012 3456 78</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bank Address</TableCell>
                        <TableCell>
                          Mansehra Colony, Lal Kothi Stop
                          <br />
                          Landhi, Karachi
                          <br />
                          Pakistan
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Payment Instructions</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>For Donations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Include "Donation" in the payment reference.</li>
                    <li>Add your name and contact information if you'd like a receipt.</li>
                    <li>For specific programs, include the program name in the reference.</li>
                    <li>Email a copy of the transfer receipt to donations@organization.org.</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>For Program Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Include the program name and your participant ID in the reference.</li>
                    <li>Email a copy of the transfer receipt to programs@organization.org.</li>
                    <li>Allow 2-3 business days for payment processing.</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>For Vendor Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Include the invoice number in the payment reference.</li>
                    <li>Email a copy of the transfer receipt to finance@organization.org.</li>
                    <li>Include your vendor ID if applicable.</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Alternative Payment Methods</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Credit Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Make secure credit card payments through our online donation portal.</p>
                <a href="/donate" className="text-primary font-medium hover:underline">
                  Go to Donation Page →
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Check by Mail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Send checks payable to "The Sirat-e-Mustaqeem Welfare Trust" to our head office address:</p>
                <address className="not-italic text-muted-foreground">
                  Mansehra Colony, Lal Kothi Stop
                  <br />
                  Landhi, Karachi
                  <br />
                  Pakistan
                </address>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>PayPal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Send payments to our PayPal account for quick and easy transactions.</p>
                <p className="text-muted-foreground">PayPal ID: donations@sirat-e-mustaqeem.org</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}