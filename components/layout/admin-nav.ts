import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  HandCoins,
  CalendarDays,
  UserPlus,
  FileText,
  Mail,
  Settings,
  type LucideIcon,
} from "lucide-react"

export interface AdminNavItem {
  name: string
  href: string
  icon: LucideIcon
  description?: string
}

export const adminNavGroups: { label: string; items: AdminNavItem[] }[] = [
  {
    label: "Overview",
    items: [{ name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, description: "Key metrics and recent activity" }],
  },
  {
    label: "Content",
    items: [
      { name: "Team", href: "/admin/team", icon: Users, description: "Manage team members shown on the website" },
      { name: "Media", href: "/admin/media", icon: ImageIcon, description: "Photos and videos for the media gallery" },
      { name: "Events", href: "/admin/events", icon: CalendarDays, description: "Create and update upcoming events" },
    ],
  },
  {
    label: "Records",
    items: [
      { name: "Donations", href: "/admin/donations", icon: HandCoins, description: "Manage and review donation records" },
      { name: "Volunteers", href: "/admin/volunteers", icon: UserPlus, description: "Manage and review volunteer applications" },
      { name: "Applications", href: "/admin/applications", icon: FileText, description: "Manage and review assistance applications" },
      { name: "Newsletter", href: "/admin/newsletter", icon: Mail, description: "Newsletter subscribers" },
    ],
  },
]

export const adminSettingsItem: AdminNavItem = {
  name: "Settings",
  href: "/admin/settings",
  icon: Settings,
  description: "Update your sign-in email and password",
}

const allItems = [...adminNavGroups.flatMap((g) => g.items), adminSettingsItem]

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function getAdminPage(pathname: string) {
  return allItems.find((item) => isActivePath(pathname, item.href))
}
