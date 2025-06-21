"use client"

import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { AdminHeader } from "@/components/layout/admin-header"

const SIDEBAR_WIDTH = 256; // 64 * 4 = 256px (w-64)

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 z-40 border-r bg-background">
        <AdminSidebar />
      </aside>
      {/* Content Area */}
      <div className="ml-64 min-h-screen flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 