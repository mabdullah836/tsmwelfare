"use client"

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
import { LogOutIcon, SettingsIcon } from "lucide-react"
import Link from "next/link"

export function AdminHeader() {
  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    window.location.href = "/admin/login"
  }

  return (
    <header className="z-50 border-b bg-background/95 shadow-sm supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-[88px] items-center justify-between px-10">
        <Link href="/admin" className="flex items-center gap-2 font-semibold text-lg">
          <span className="hidden font-bold text-2xl sm:inline-block">Dashboard</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/">View Website</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="relative h-9 w-9 rounded-full p-0 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Administrator</p>
                  <p className="text-xs text-muted-foreground">admin@sirat-e-mustaqeem.org</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
