"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  DollarSign,
  Calendar,
  UserPlus,
  FileText,
  ExternalLink,
  ChevronLeft,

} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard
  },
  {
    name: "Team",
    href: "/admin/team",
    icon: Users
  },
  {
    name: "Media",
    href: "/admin/media",
    icon: ImageIcon
  },
  {
    name: "Donations",
    href: "/admin/donations",
    icon: DollarSign
  },
  {
    name: "Events",
    href: "/admin/events",
    icon: Calendar
  },
  {
    name: "Volunteers",
    href: "/admin/volunteers",
    icon: UserPlus
  },
  {
    name: "Applications",
    href: "/admin/applications",
    icon: FileText
  }
]

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  return (
    <div className="h-full w-64 flex flex-col border-r bg-background transition-all duration-300">
      {/* Logo and Title */}
      <div className="flex items-center justify-between px-4 py-6 border-b bg-background z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">TSM</span>
          </div>
          <div>
            <h2 className="font-semibold">Admin Panel</h2>
            <p className="text-xs text-muted-foreground">TSM Welfare</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 md:hidden"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                isActive ? "bg-accent" : "transparent"
              )}
              onClick={() => {
                if (onClose) onClose()
              }}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
      {/* User Menu and View Website */}
      <div className="p-4 border-t space-y-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          <span>View Website</span>
        </Link>
      </div>
    </div>
  )
} 