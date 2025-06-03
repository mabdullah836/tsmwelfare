"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", amount: 45000 },
  { name: "Feb", amount: 52000 },
  { name: "Mar", amount: 48000 },
  { name: "Apr", amount: 61000 },
  { name: "May", amount: 55000 },
  { name: "Jun", amount: 67000 },
  { name: "Jul", amount: 73000 },
]

export function DonationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Donations</CardTitle>
        <CardDescription>Donation amounts in PKR</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`Rs. ${Number(value).toLocaleString()}`, "Amount"]} />
            <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
