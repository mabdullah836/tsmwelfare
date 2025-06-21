"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { dashboardStats } from "@/lib/constants/dashboard"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8 py-10 px-6">
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="text-muted-foreground text-lg">
            Welcome back! Here's an overview of your organization's statistics.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 rounded-xl shadow-sm border">
            <CardHeader>
              <CardTitle className="text-2xl">Donation Overview</CardTitle>
              <CardDescription>
                Monthly donation trends for the current year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                {/* Chart component will be added later */}
                <p>Donation chart will be implemented with real data</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3 rounded-xl shadow-sm border">
            <CardHeader>
              <CardTitle className="text-2xl">Recent Activities</CardTitle>
              <CardDescription>
                Latest updates and actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                <p>Activity feed will be implemented with real data</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}