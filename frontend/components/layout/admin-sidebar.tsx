"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { adminNavGroups, adminSettingsItem, isActivePath, type AdminNavItem } from "@/components/layout/admin-nav"

interface AdminSidebarProps {
  onNavigate?: () => void
}

function NavLink({ item, pathname, onNavigate }: { item: AdminNavItem; pathname: string; onNavigate?: () => void }) {
  const active = isActivePath(pathname, item.href)
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <item.icon
        className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}
        aria-hidden
      />
      <span>{item.name}</span>
    </Link>
  )
}

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname()
  return (
    <div className="flex h-full w-full flex-col bg-card">
      <div className="flex h-[var(--header-height)] shrink-0 items-center gap-3 border-b px-5">
        <Image src="/images/logo.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
        <div className="leading-tight">
          <p className="text-sm font-semibold">TSM Welfare</p>
          <p className="text-xs text-muted-foreground">Admin console</p>
        </div>
      </div>

      <nav aria-label="Admin" className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {adminNavGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground/80">{group.label}</p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.href}>
                  <NavLink item={item} pathname={pathname} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 space-y-1 border-t px-3 py-4">
        <NavLink item={adminSettingsItem} pathname={pathname} onNavigate={onNavigate} />
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
          <span>View website</span>
          <span className="sr-only">(opens in a new tab)</span>
        </Link>
      </div>
    </div>
  )
}
