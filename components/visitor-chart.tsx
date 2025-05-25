"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", visitors: 400 },
  { name: "Feb", visitors: 300 },
  { name: "Mar", visitors: 600 },
  { name: "Apr", visitors: 800 },
  { name: "May", visitors: 700 },
  { name: "Jun", visitors: 900 },
  { name: "Jul", visitors: 1200 },
]

export function VisitorChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Visitors</CardTitle>
        <CardDescription>Monthly visitor statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
