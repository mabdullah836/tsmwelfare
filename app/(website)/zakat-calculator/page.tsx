"use client"

import { PageHeader } from "@/components/page-header"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function ZakatCalculatorPage() {
  const [goldValue, setGoldValue] = useState<number>(0)
  const [silverValue, setSilverValue] = useState<number>(0)
  const [cashValue, setCashValue] = useState<number>(0)
  const [investmentsValue, setInvestmentsValue] = useState<number>(0)
  const [propertyValue, setPropertyValue] = useState<number>(0)
  const [businessValue, setBusinessValue] = useState<number>(0)
  const [debtsValue, setDebtsValue] = useState<number>(0)
  const [expensesValue, setExpensesValue] = useState<number>(0)
  const [calculatedZakat, setCalculatedZakat] = useState<number | null>(null)
  const [nisabValue, setNisabValue] = useState<number>(100000) // Example nisab value

  const calculateZakat = () => {
    const totalAssets = goldValue + silverValue + cashValue + investmentsValue + propertyValue + businessValue
    const totalLiabilities = debtsValue + expensesValue
    const zakatableAmount = totalAssets - totalLiabilities

    if (zakatableAmount > nisabValue) {
      const zakat = zakatableAmount * 0.025 // 2.5%
      setCalculatedZakat(zakat)
    } else {
      setCalculatedZakat(0)
    }
  }

  const resetCalculator = () => {
    setGoldValue(0)
    setSilverValue(0)
    setCashValue(0)
    setInvestmentsValue(0)
    setPropertyValue(0)
    setBusinessValue(0)
    setDebtsValue(0)
    setExpensesValue(0)
    setCalculatedZakat(null)
  }

  return (
    <>
      <PageHeader title="Zakat Calculator">
        <p className="text-xl text-white/90">Calculate your Zakat accurately with our easy-to-use calculator.</p>
      </PageHeader>

      <section className="py-16">
        <div className="container max-w-4xl">
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="information">Zakat Information</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="mr-2 h-5 w-5" />
                    Zakat Calculator
                  </CardTitle>
                  <CardDescription>
                    Enter the value of your assets and liabilities to calculate your Zakat.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Assets</h3>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <label htmlFor="gold" className="text-sm font-medium flex-1">
                                Gold
                              </label>
                              <HelpCircle
                                className="h-4 w-4 text-muted-foreground"
                                title="Enter the current market value of gold you own."
                              />
                            </div>
                            <Input
                              id="gold"
                              type="number"
                              min="0"
                              value={goldValue || ""}
                              onChange={(e) => setGoldValue(Number(e.target.value))}
                              placeholder="0"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <label htmlFor="silver" className="text-sm font-medium flex-1">
                                Silver
                              </label>
                              <HelpCircle
                                className="h-4 w-4 text-muted-foreground"
                                title="Enter the current market value of silver you own."
                              />
                            </div>
                            <Input
                              id="silver"
                              type="number"
                              min="0"
                              value={silverValue || ""}
                              onChange={(e) => setSilverValue(Number(e.target.value))}
                              placeholder="0"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <label htmlFor="cash" className="text-sm font-medium flex-1">
                                Cash & Bank Balances
                              </label>
                              <HelpCircle
                                className="h-4 w-4 text-muted-foreground"
                                title="Enter the total amount of cash and bank balances you have."
                              />
                            </div>
                            <Input
                              id="cash"
                              type="number"
                              min="0"
                              value={cashValue || ""}
                              onChange={(e) => setCashValue(Number(e.target.value))}
                              placeholder="0"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <label htmlFor="investments" className="text-sm font-medium flex-1">
                                Investments
                              </label>
                              <HelpCircle
                                className="h-4 w-4 text-muted-foreground"
                                title="Enter the current value of your investments, stocks, and shares."
                              />
                            </div>
                            <Input
                              id="investments"
                              type="number"
                              min="0"
                              value={investmentsValue || ""}
                              onChange={(e) => setInvestmentsValue(Number(e.target.value))}
                              placeholder="0"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <label htmlFor="property" className="text-sm font-medium flex-1">
                                Property for Investment
                              </label>
                              <HelpCircle
                                className="h-4 w-4 text-muted-foreground"
                                title="Enter the value of property owned for investment purposes, not personal use."
                              />
                            </div>
                            <Input
                              id="property"
                              type="number"
                              min="0"
                              value={propertyValue || ""}
                              onChange={(e) => setPropertyValue(Number(e.target.value))}
                              placeholder="0"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <label htmlFor="business" className="text-sm font-medium flex-1">
                                Business Assets
                              </label>
                              <HelpCircle
                                className="h-4 w-4 text-muted-foreground"
                                title="Enter the value of your business inventory and assets."
                              />
                            </div>
                            <Input
                              id="business"
                              type="number"
                              min="0"
                              value={businessValue || ""}
                              onChange={(e) => setBusinessValue(Number(e.target.value))}
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Liabilities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label htmlFor="debts" className="text-sm font-medium flex-1">
                              Debts
                            </label>
                            <HelpCircle
                              className="h-4 w-4 text-muted-foreground"
                              title="Enter the total amount of debts you owe to others."
                            />
                          </div>
                          <Input
                            id="debts"
                            type="number"
                            min="0"
                            value={debtsValue || ""}
                            onChange={(e) => setDebtsValue(Number(e.target.value))}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label htmlFor="expenses" className="text-sm font-medium flex-1">
                              Due Expenses
                            </label>
                            <HelpCircle
                              className="h-4 w-4 text-muted-foreground"
                              title="Enter the total amount of expenses that are due."
                            />
                          </div>
                          <Input
                            id="expenses"
                            type="number"
                            min="0"
                            value={expensesValue || ""}
                            onChange={(e) => setExpensesValue(Number(e.target.value))}
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button onClick={calculateZakat} className="flex-1">
                        Calculate Zakat
                      </Button>
                      <Button variant="outline" onClick={resetCalculator}>
                        Reset
                      </Button>
                    </div>

                    {calculatedZakat !== null && (
                      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Your Zakat Calculation</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Assets:</p>
                            <p className="font-medium">
                              Rs.{" "}
                              {(
                                goldValue +
                                silverValue +
                                cashValue +
                                investmentsValue +
                                propertyValue +
                                businessValue
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Liabilities:</p>
                            <p className="font-medium">Rs. {(debtsValue + expensesValue).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Net Zakatable Amount:</p>
                            <p className="font-medium">
                              Rs.{" "}
                              {(
                                goldValue +
                                silverValue +
                                cashValue +
                                investmentsValue +
                                propertyValue +
                                businessValue -
                                debtsValue -
                                expensesValue
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Nisab Threshold:</p>
                            <p className="font-medium">Rs. {nisabValue.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-lg font-bold text-primary">
                            Your Zakat Amount: Rs. {calculatedZakat.toLocaleString()}
                          </p>
                          {calculatedZakat > 0 ? (
                            <p className="text-sm mt-2">
                              You are eligible to pay Zakat. Consider donating your Zakat to The Sirat-e-Mustaqeem
                              Welfare Trust to support our community initiatives.
                            </p>
                          ) : (
                            <p className="text-sm mt-2">
                              Your wealth does not reach the Nisab threshold. You are not obligated to pay Zakat this
                              year.
                            </p>
                          )}
                          {calculatedZakat > 0 && (
                            <Button asChild className="mt-4">
                              <Link href={`/donate?amount=${calculatedZakat}&type=zakat`}>Pay Zakat Now</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="information">
              <Card>
                <CardHeader>
                  <CardTitle>Understanding Zakat</CardTitle>
                  <CardDescription>Learn about the importance of Zakat and how it is calculated.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">What is Zakat?</h3>
                    <p>
                      Zakat is one of the five pillars of Islam. It is a form of obligatory charity that has a deep
                      spiritual significance for Muslims. The word Zakat means "purification" and "growth." By giving
                      Zakat, Muslims purify their wealth and gain spiritual growth.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Who Must Pay Zakat?</h3>
                    <p>
                      Zakat is obligatory on every adult Muslim who possesses wealth equal to or exceeding the nisab
                      (minimum threshold) for one lunar year.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">How is Zakat Calculated?</h3>
                    <p>
                      Zakat is calculated at 2.5% of wealth that has been in possession for one lunar year. This
                      includes gold, silver, cash, savings, investments, business inventory, and other assets intended
                      for trade or growth.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">What is Nisab?</h3>
                    <p>
                      Nisab is the minimum amount of wealth a Muslim must possess before they become eligible to pay
                      Zakat. It is equivalent to the value of 87.48 grams of gold or 612.36 grams of silver.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Who Can Receive Zakat?</h3>
                    <p>The Quran specifies eight categories of people who are eligible to receive Zakat:</p>
                    <ol className="list-decimal pl-5 mt-2 space-y-1">
                      <li>The poor (Al-Fuqara)</li>
                      <li>The needy (Al-Masakin)</li>
                      <li>Zakat administrators</li>
                      <li>Those whose hearts are to be reconciled</li>
                      <li>Those in bondage (slaves and captives)</li>
                      <li>Those in debt</li>
                      <li>In the cause of Allah</li>
                      <li>The wayfarer</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      How The Sirat-e-Mustaqeem Welfare Trust Distributes Zakat
                    </h3>
                    <p>
                      At The Sirat-e-Mustaqeem Welfare Trust, we ensure that your Zakat reaches those who are most in
                      need. We distribute Zakat funds to support:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Education for underprivileged children</li>
                      <li>Medical assistance for those who cannot afford healthcare</li>
                      <li>Food and basic necessities for poor families</li>
                      <li>Support for orphans and widows</li>
                      <li>Emergency relief during disasters</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="font-medium">
                      If you have any questions about Zakat or need assistance with your calculation, please{" "}
                      <Link href="/contact" className="text-primary hover:underline">
                        contact us
                      </Link>
                      .
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
