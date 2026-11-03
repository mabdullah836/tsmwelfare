"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HeartHandshake, MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { OrganizationHeader } from "@/components/organization-header"
import { AdminDetailsSheet } from "@/components/shared/AdminDetailsSheet"
import { cn } from "@/lib/utils/cn"

const navigationItems = [
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Media", href: "/media" },
  { title: "Contact Us", href: "/contact" },
  { title: "Bank Details", href: "/bank-details" },
]

export function SiteHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-lg supports-[backdrop-filter]:bg-background/75">
      <div className="container flex h-[var(--header-height)] items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="min-w-0 rounded-lg" aria-label="The Sirat-e-Mustaqeem Welfare Trust — home">
          <OrganizationHeader
            variant="full"
            size="md"
            showTagline={false}
            className="hidden items-center gap-3 sm:flex [&_span]:font-display [&_span]:text-base xl:[&_span]:text-lg"
          />
          <OrganizationHeader
            variant="icon"
            size="md"
            className="flex items-center gap-3 sm:hidden"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                isActive(item.href) ? "text-primary" : "text-foreground/80"
              )}
            >
              {item.title}
            </Link>
          ))}
          <Button asChild className="ml-3 whitespace-nowrap">
            <Link href="/donate">
              <HeartHandshake /> Donate Now
            </Link>
          </Button>
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-1 lg:hidden">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/donate">Donate Now</Link>
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileNavOpen}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
          <AdminDetailsSheet
            open={mobileNavOpen}
            onOpenChange={setMobileNavOpen}
            showHeader={false}
            side="right"
            size="sm"
            title="Navigation Menu"
            contentClassName="flex flex-col overflow-y-auto"
          >
            <div className="mb-6 mt-2 pr-8">
              <OrganizationHeader size="md" className="[&_span]:text-base" />
            </div>
            <nav aria-label="Main" className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted",
                    isActive(item.href) ? "bg-accent text-accent-foreground" : "text-foreground"
                  )}
                  onClick={() => setMobileNavOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <Button asChild className="mt-4 w-full">
                <Link href="/donate" onClick={() => setMobileNavOpen(false)}>
                  Donate Now
                </Link>
              </Button>
            </nav>

            <p className="mt-auto pt-8 text-xs text-muted-foreground">
              © {new Date().getFullYear()} The Sirat-e-Mustaqeem Welfare Trust
            </p>
          </AdminDetailsSheet>
        </div>
      </div>
    </header>
  )
}
