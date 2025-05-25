"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, TrendingUp, ImageIcon, Upload, Eye } from "lucide-react"
import { AdminHeader } from "@/components/admin-header"
import { VisitorChart } from "@/components/visitor-chart"
import { DonationChart } from "@/components/donation-chart"
import { MediaUpload } from "@/components/media-upload"
import { DonationRecords } from "@/components/donation-records"
import { MediaManager } from "@/components/media-manager"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVisitors: 12450,
    totalDonations: 850000,
    monthlyVisitors: 2340,
    monthlyDonations: 125000,
    totalImages: 156,
    totalVideos: 23,
  })

  const [recentActivity] = useState([
    { id: 1, type: "donation", amount: 5000, donor: "Ahmed Khan", time: "2 hours ago" },
    { id: 2, type: "visitor", page: "Services", count: 45, time: "3 hours ago" },
    { id: 3, type: "media", action: "Image uploaded", file: "medical-camp-2024.jpg", time: "5 hours ago" },
    { id: 4, type: "donation", amount: 10000, donor: "Fatima Ali", time: "1 day ago" },
  ])

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken")
    if (!token) {
      window.location.href = "/admin/login"
    }
  }, [])

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader />

      <div className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your organization.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+{stats.monthlyVisitors.toLocaleString()} this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rs. {stats.totalDonations.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+Rs. {stats.monthlyDonations.toLocaleString()} this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Media Files</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalImages + stats.totalVideos}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalImages} images, {stats.totalVideos} videos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.5%</div>
              <p className="text-xs text-muted-foreground">Compared to last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="media">Media Manager</TabsTrigger>
            <TabsTrigger value="upload">Upload Media</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VisitorChart />
              <DonationChart />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions on your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {activity.type === "donation" && <DollarSign className="h-4 w-4 text-green-600" />}
                        {activity.type === "visitor" && <Eye className="h-4 w-4 text-blue-600" />}
                        {activity.type === "media" && <Upload className="h-4 w-4 text-purple-600" />}
                        <div>
                          <p className="font-medium">
                            {activity.type === "donation" &&
                              `Rs. ${activity.amount?.toLocaleString()} donation from ${activity.donor}`}
                            {activity.type === "visitor" && `${activity.count} visitors on ${activity.page} page`}
                            {activity.type === "media" && `${activity.action}: ${activity.file}`}
                          </p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{activity.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations">
            <DonationRecords />
          </TabsContent>

          <TabsContent value="media">
            <MediaManager />
          </TabsContent>

          <TabsContent value="upload">
            <MediaUpload />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
