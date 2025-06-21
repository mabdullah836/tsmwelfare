import { Activity, DollarSign, Users, Image, Calendar, Heart, BookOpen, Building2 } from "lucide-react"

export const dashboardStats = [
  {
    title: "Total Donations",
    value: "PKR 45,231",
    description: "+20.1% from last month",
    icon: DollarSign,
    color: "text-green-500"
  },
  {
    title: "Active Donors",
    value: "573",
    description: "+180 since last week",
    icon: Users,
    color: "text-blue-500"
  },
  {
    title: "Media Items",
    value: "129",
    description: "+4 new uploads today",
    icon: Image,
    color: "text-purple-500"
  },
  {
    title: "Active Projects",
    value: "12",
    description: "3 projects near completion",
    icon: Activity,
    color: "text-orange-500"
  },
  {
    title: "Upcoming Events",
    value: "8",
    description: "2 events this week",
    icon: Calendar,
    color: "text-red-500"
  },
  {
    title: "Volunteers",
    value: "45",
    description: "+5 new volunteers this month",
    icon: Heart,
    color: "text-pink-500"
  },
  {
    title: "Education Programs",
    value: "6",
    description: "Active programs",
    icon: BookOpen,
    color: "text-indigo-500"
  },
  {
    title: "Departments",
    value: "4",
    description: "All departments active",
    icon: Building2,
    color: "text-cyan-500"
  }
] 