"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, TooltipProps } from "recharts"

const data = [
  { name: "Jan", amount: 45000 },
  { name: "Feb", amount: 52000 },
  { name: "Mar", amount: 48000 },
  { name: "Apr", amount: 61000 },
  { name: "May", amount: 55000 },
  { name: "Jun", amount: 67000 },
  { name: "Jul", amount: 73000 },
  { name: "Aug", amount: 69000 },
  { name: "Sep", amount: 82000 },
  { name: "Oct", amount: 78000 },
  { name: "Nov", amount: 85000 },
  { name: "Dec", amount: 92000 },
]

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-medium">
              Rs. {payload[0].value?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function DonationChart() {
  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `Rs. ${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="amount" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 