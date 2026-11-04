"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOutIcon, SettingsIcon, Menu as MenuIcon, ExternalLink, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { getAdminPage } from "@/components/layout/admin-nav"

export function AdminHeader({ onSidebarToggle }: { onSidebarToggle?: () => void }) {
  const pathname = usePathname()
  const page = getAdminPage(pathname)

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
    } finally {
      window.location.href = "/admin/login"
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-[var(--header-height)] shrink-0 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/75 sm:px-6">
      {onSidebarToggle && (
        <Button variant="ghost" size="icon" className="-ml-2 lg:hidden" onClick={onSidebarToggle} aria-label="Open navigation">
          <MenuIcon className="h-5 w-5" />
        </Button>
      )}

      <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
        <ol className="flex items-center gap-1.5 text-sm">
          <li className="hidden text-muted-foreground sm:block">
            <Link href="/admin/dashboard" className="transition-colors hover:text-foreground">Admin</Link>
          </li>
          <li aria-hidden className="hidden text-muted-foreground/60 sm:block">
            <ChevronRight className="h-4 w-4" />
          </li>
          <li className="truncate font-medium" aria-current="page">{page?.name ?? "Admin"}</li>
        </ol>
      </nav>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink />
            View website
          </Link>
        </Button>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="rounded-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Account menu"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-accent text-sm font-semibold text-accent-foreground">AD</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Administrator</p>
                <p className="text-xs text-muted-foreground">admin@sirat-e-mustaqeem.org</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="cursor-pointer">
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
