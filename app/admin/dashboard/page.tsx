"use client"

import { useState, useEffect} from "react";
import { Calendar, DollarSign, Users } from "lucide-react";
import { DonationChart } from '@/components/donation-chart';
import {
  DashboardHeader,
  StatsCards,
  TopDonorsList,
  RecentActivities
} from '@/components/dashboard/DashboardWidgets';
import { exportToCSV } from '@/lib/utils/format';

// --- TYPES ---
type AnalyticsData = {
  stats: { totalAmount: number; uniqueDonors: number; averageDonation: number; };
  pieData: { name: string; value: number; fill: string; }[];
  monthlyData: { month: string; amount: number; }[];
  trendsData: { date: string; donations: number; }[];
};

type TopDonor = { 
  name: string; 
  total: number; 
  lastDate: string; 
};

type Activity = { 
  icon: React.ReactNode; 
  description: string; 
  details: string; 
  timestamp: string; 
};

// --- CONSTANTS ---
const CHART_COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  chart1: "hsl(var(--chart-1))",
  chart2: "hsl(var(--chart-2))",
  chart3: "hsl(var(--chart-3))",
  chart4: "hsl(var(--chart-4))",
};

// --- MOCK DATA ---
const MOCK_ANALYTICS: AnalyticsData = {
  stats: { 
    totalAmount: 4523189, 
    uniqueDonors: 2350, 
    averageDonation: 12550 
  },
  pieData: [
    { name: "Online", value: 45, fill: CHART_COLORS.chart1 },
    { name: "In-Kind", value: 25, fill: CHART_COLORS.chart2 },
    { name: "Corporate", value: 15, fill: CHART_COLORS.chart3 },
    { name: "Grants", value: 15, fill: CHART_COLORS.chart4 },
  ],
  monthlyData: [
    { month: "Jan", amount: 189000 }, 
    { month: "Feb", amount: 289000 },
    { month: "Mar", amount: 239000 }, 
    { month: "Apr", amount: 349000 },
    { month: "May", amount: 249000 }, 
    { month: "Jun", amount: 459000 },
  ],
  trendsData: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    donations: Math.floor(Math.random() * 250) + 50
  })),
};

const MOCK_DONORS: TopDonor[] = [
  { name: "Jamil Ahmed", total: 5250, lastDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
  { name: "Aisha Khan", total: 4800, lastDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
  { name: "Bilal Enterprises", total: 4500, lastDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
  { name: "Fatima Zahra", total: 3200, lastDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
  { name: "Usman Public School", total: 2800, lastDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
];

const RECENT_ACTIVITIES: Activity[] = [
  { 
    icon: <DollarSign className="h-4 w-4" />, 
    description: "New donation of PKR 5,000 from Ahmed Khan.", 
    details: "Via Online Portal", 
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString() 
  },
  { 
    icon: <Users className="h-4 w-4" />, 
    description: "Sarah Ahmed has registered as a new volunteer.", 
    details: "Area of Interest: Event Management", 
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString() 
  },
  { 
    icon: <Calendar className="h-4 w-4" />, 
    description: "Upcoming Event: Food distribution drive.", 
    details: "Scheduled for tomorrow at 10 AM", 
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() 
  },
];

// --- MAIN COMPONENT ---
export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [topDonors, setTopDonors] = useState<TopDonor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 800));
        setAnalytics(MOCK_ANALYTICS);
        setTopDonors(MOCK_DONORS);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handler to export top donors as CSV
  const handleExportTopDonors = () => {
    if (topDonors && topDonors.length > 0) {
      exportToCSV(topDonors, 'top-donors-report.csv');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      
      <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
        <DashboardHeader onExport={handleExportTopDonors} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StatsCards data={analytics?.stats} loading={loading} />
            <DonationChart
              type="area"
              data={analytics?.trendsData || []}
              title="Donation Trends"
              description="Recent donation patterns over the last 30 days."
              loading={loading}
              xKey="date"
              yKey="donations"
            />
            <div className="grid md:grid-cols-2 gap-6">
              <DonationChart
                type="pie"
                data={analytics?.pieData || []}
                title="Donations by Type"
                description="Breakdown of donation sources."
                loading={loading}
                pieNameKey="name"
                pieValueKey="value"
              />
              <DonationChart
                type="bar"
                data={analytics?.monthlyData || []}
                title="Monthly Donations"
                description="Donation amounts over recent months."
                loading={loading}
                xKey="month"
                yKey="amount"
              />
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <TopDonorsList data={topDonors} loading={loading} />
            <RecentActivities activities={RECENT_ACTIVITIES} />
          </div>
        </div>
      </main>
    </div>
  );
}