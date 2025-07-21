"use client"
import { useState } from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { OrganizationHeader } from "@/components/organization-header"
import { AdminDetailsSheet } from "@/components/shared/AdminDetailsSheet"

const navigationItems = [
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Media", href: "/media" },
  { title: "Contact Us", href: "/contact" },
  { title: "Bank Details", href: "/bank-details" },
]

export function SiteHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-20 items-center justify-between">
      <Link href="/">
        <OrganizationHeader 
          variant="full" 
          size="md" 
          showTagline={false}
          className="md:flex hidden items-center gap-3"
        />
        <OrganizationHeader 
          variant="icon" 
          size="md" 
          className="md:hidden flex items-center gap-3"
        />
      </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground/90 hover:text-primary transition-colors relative group"
              >
                {item.title}
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: navigationItems.length * 0.1, duration: 0.3 }}
            className="ml-4"
          >
            <Button 
              asChild
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-md hover:shadow-lg transition-all"
            >
              <Link href="/donate">
                Donate Now
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: (navigationItems.length + 1) * 0.1, duration: 0.3 }}
            className="ml-4"
          >
            <ThemeToggle />
          </motion.div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10 focus:ring-2 focus:ring-primary/50"
            onClick={() => setMobileNavOpen(true)}
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <AdminDetailsSheet
            open={mobileNavOpen}
            onOpenChange={setMobileNavOpen}
            showHeader={false}
            side="right"
            size="sm"
            title="Navigation Menu"
          >
            <div className="mt-6 mb-8">
              <OrganizationHeader size="md" />
            </div>
            <nav className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <div className="mt-4">
                <Button 
                  asChild
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-md"
                >
                  <Link href="/donate">
                    Donate Now
                  </Link>
                </Button>
              </div>
            </nav>
            
            <div className="absolute bottom-6 left-6 right-6 text-xs text-muted-foreground">
              © {new Date().getFullYear()} Your Organization
            </div>
          </AdminDetailsSheet>
        </div>
      </div>
    </header>
  )
}