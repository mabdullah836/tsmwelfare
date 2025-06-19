"use client"

import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { AdminHeader } from "@/components/layout/admin-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useState } from "react"

const SIDEBAR_WIDTH = 256; // 64 * 4 = 256px (w-64)
const HEADER_HEIGHT = 88

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <SidebarProvider>
      {/* Header always at the top, outside scrollable area */}
      <div className="fixed top-0 left-0 w-full z-50">
        <AdminHeader onSidebarToggle={() => setSidebarOpen((v) => !v)} />
      </div>
      {/* Sidebar under header, fixed on desktop */}
      <aside className="hidden md:block fixed left-0 top-[88px] h-[calc(100vh-88px)] w-64 z-40 border-r bg-background">
        <AdminSidebar />
      </aside>
      {/* Mobile sidebar and overlay */}
      {sidebarOpen && (
        <>
          <aside className="block md:hidden fixed left-0 top-[88px] h-[calc(100vh-88px)] w-64 z-50 border-r bg-background transition-transform duration-300">
            <AdminSidebar onClose={() => setSidebarOpen(false)} isOpen={sidebarOpen} />
          </aside>
          <div className="fixed inset-0 top-[88px] bg-black/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
        </>
      )}
      {/* Main scrollable content area */}
      <div className="min-h-screen bg-background pt-[88px] md:ml-64">
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
} 