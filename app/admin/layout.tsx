"use client"

import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { AdminHeader } from "@/components/layout/admin-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useState } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <SidebarProvider>
      <div className="fixed top-0 left-0 w-full z-50">
        <AdminHeader onSidebarToggle={() => setSidebarOpen((v) => !v)} />
      </div>
      <aside className="hidden md:block fixed left-0 top-[88px] h-[calc(100vh-88px)] w-64 z-40 border-r bg-background">
        <AdminSidebar />
      </aside>

      {sidebarOpen && (
        <>
          <aside className="block md:hidden fixed left-0 top-[88px] h-[calc(100vh-88px)] w-64 z-50 border-r bg-background transition-transform duration-300">
            <AdminSidebar onClose={() => setSidebarOpen(false)} isOpen={sidebarOpen} />
          </aside>
          <div className="fixed inset-0 top-[88px] bg-black/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
        </>
      )}

    <div className="flex pt-[88px] h-screen">
      <div className="hidden md:block w-64 flex-shrink-0" />
      <div className="flex-1 overflow-auto bg-background p-4 md:p-6">
        {children}
      </div>
    </div>
    </SidebarProvider>
  )
} 