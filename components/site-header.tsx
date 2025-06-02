import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { OrganizationHeader } from "@/components/organization-header"

const navigationItems = [
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Media", href: "/media" },
  { title: "Contact Us", href: "/contact" },
  { title: "Bank Details", href: "/bank-details" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 items-center justify-between">
        <Link href="/" className="flex items-center">
          <OrganizationHeader variant="full" size="sm" showTagline={true} />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/donate">Donate</Link>
          </Button>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-6 mb-8">
                <OrganizationHeader variant="full" size="sm" showTagline={true} />
              </div>
              <nav className="flex flex-col gap-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/donate">Donate</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
