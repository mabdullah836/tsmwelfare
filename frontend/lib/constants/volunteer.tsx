import { Heart, Users, GraduationCap, Clock } from "lucide-react"
import { BenefitCardProps, AvailabilityOption } from "@/lib/types/volunteer"

export const VOLUNTEER_BENEFITS: BenefitCardProps[] = [
  {
    icon: <Heart className="w-12 h-12 text-primary mb-4" />,
    title: "Make an Impact",
    description: "Your time and skills can make a real difference in your community and change lives."
  },
  {
    icon: <Users className="w-12 h-12 text-primary mb-4" />,
    title: "Join Our Community",
    description: "Connect with like-minded individuals who share your passion for helping others."
  },
  {
    icon: <GraduationCap className="w-12 h-12 text-primary mb-4" />,
    title: "Learn New Skills",
    description: "Gain valuable experience and develop new skills while helping your community."
  },
  {
    icon: <Clock className="w-12 h-12 text-primary mb-4" />,
    title: "Flexible Hours",
    description: "Choose volunteer opportunities that fit your schedule and availability."
  }
];

export const INTEREST_OPTIONS = [
  "Education and Tutoring",
  "Food Distribution",
  "Healthcare Support",
  "Administrative Work",
  "Event Planning",
  "Fundraising",
  "Social Media",
  "Community Outreach",
] as const;

export const AVAILABILITY_OPTIONS: AvailabilityOption[] = [
  { value: "weekdays", label: "Weekdays" },
  { value: "weekends", label: "Weekends" },
  { value: "evenings", label: "Evenings" },
  { value: "flexible", label: "Flexible" },
]; 