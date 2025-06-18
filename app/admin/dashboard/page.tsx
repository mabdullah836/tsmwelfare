"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, DollarSign, Users, Image } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8 py-10 px-6">
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="text-muted-foreground text-lg">
            Welcome back! Here's an overview of your organization's statistics.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-xl shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Total Donations</CardTitle>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">PKR 45,231</div>
              <p className="text-xs text-muted-foreground mt-1">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-xl shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Active Donors</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">573</div>
              <p className="text-xs text-muted-foreground mt-1">
                +180 since last week
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-xl shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Media Items</CardTitle>
              <Image className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">129</div>
              <p className="text-xs text-muted-foreground mt-1">
                +4 new uploads today
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-xl shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Active Projects</CardTitle>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                3 projects near completion
              </p>
            </CardContent>
          </Card>
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