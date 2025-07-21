import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { exportToCSV } from "@/lib/utils/export-csv";
import { FileText,Download, Users, TrendingUp, DollarSign, Loader2 } from "lucide-react";
import React from "react";

// Types for props
export type AnalyticsStats = {
  totalAmount: number;
  uniqueDonors: number;
  averageDonation: number;
};
export type TopDonor = {
  name: string;
  total: number;
  lastDate: string;
};
export type Activity = {
  icon: React.ReactNode;
  description: string;
  details: string;
  timestamp: string;
};

// Update DashboardHeader to accept an onExport prop
export function DashboardHeader({ onExport }: { onExport?: () => void }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview and analytics for your organization.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button className="gap-2" onClick={onExport}>
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </div>
    </div>
  );
}

export const StatsCards = ({ data, loading }: { data: AnalyticsStats | undefined, loading: boolean }) => (
  <div className="grid gap-4 md:grid-cols-3">
    <StatCard 
      title="Total Donations" 
      value={`PKR ${data?.totalAmount?.toLocaleString() ?? '0'}`} 
      icon={<TrendingUp className="h-5 w-5" />} 
      loading={loading} 
    />
    <StatCard 
      title="Unique Donors" 
      value={data?.uniqueDonors?.toString() ?? '0'} 
      icon={<Users className="h-5 w-5" />} 
      loading={loading} 
    />
    <StatCard 
      title="Average Donation" 
      value={`PKR ${data?.averageDonation?.toLocaleString() ?? '0'}`} 
      icon={<DollarSign className="h-5 w-5" />} 
      loading={loading} 
    />
  </div>
);

export const StatCard = ({ title, value, icon, loading }: { title: string; value: string; icon: React.ReactNode; loading: boolean }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="rounded-full bg-primary/10 p-2 text-primary">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      {loading ? (
        <Skeleton className="h-8 w-3/4" />
      ) : (
        <div className="text-2xl font-bold">{value}</div>
      )}
    </CardContent>
  </Card>
);

export const TopDonorsList = ({ data, loading }: { data: TopDonor[], loading: boolean }) => (
  <Card>
    <CardHeader>
      <CardTitle>Top Donors</CardTitle>
      <CardDescription>Your most generous supporters.</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Donor</TableHead>
            <TableHead className="text-right">Total Donated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={2}>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                No donor records found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((donor) => (
              <TableRow key={donor.name} className="hover:bg-muted/50">
                <TableCell>
                  <div className="font-medium">{donor.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Last: {new Date(donor.lastDate).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  PKR {donor.total.toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter>
      <Button 
        variant="outline" 
        className="w-full gap-2"
        onClick={() => exportToCSV(data, 'top-donors')}
      >
        <Download className="h-4 w-4" />
        Export as CSV
      </Button>
    </CardFooter>
  </Card>
);

export const RecentActivities = ({ activities }: { activities: Activity[] }) => {

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates across the organization.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {activity.icon}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.details}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(activity.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 