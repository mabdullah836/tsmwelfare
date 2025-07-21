"use client"

import { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils/cn"

interface SidebarContext {
  isOpen: boolean
  toggle: () => void
}

const SidebarContext = createContext<SidebarContext>({
  isOpen: true,
  toggle: () => {}
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()

  return (
    <aside
      className={cn(
        "relative h-screen transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {children}
    </aside>
  )
}
