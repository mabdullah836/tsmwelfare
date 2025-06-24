"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, DollarSign, Users, Image, Plus, Calendar, FileText, TrendingUp, AlertCircle, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

const DonationChart = dynamic(() => import("@/components/donation-chart").then(mod => mod.DonationChart), { ssr: false, loading: () => <div className="h-full flex items-center justify-center">Loading chart...</div> })

export default function AdminDashboard() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8 py-10 px-6">
        <div className="flex flex-col gap-4 items-center text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
            <p className="text-muted-foreground text-lg">
              Here's an overview of your organization's statistics.
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              New Donation
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Event
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Total Donations</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">PKR 45,231</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span>+20.1% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Active Donors</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">573</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span>+180 since last week</span>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Media Items</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Image className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">129</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span>+4 new uploads today</span>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Active Projects</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                <span>3 projects near completion</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 rounded-xl shadow-sm border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Donation Overview</CardTitle>
                  <CardDescription>
                    Monthly donation trends for the current year
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    This Year
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <DonationChart />
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3 rounded-xl shadow-sm border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Recent Activities</CardTitle>
                  <CardDescription>
                    Latest updates and actions
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">New donation received</p>
                    <p className="text-xs text-muted-foreground">PKR 5,000 from Ahmed Khan</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">New volunteer registered</p>
                    <p className="text-xs text-muted-foreground">Sarah Ahmed joined the team</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Upcoming event</p>
                    <p className="text-xs text-muted-foreground">Food distribution drive tomorrow</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}