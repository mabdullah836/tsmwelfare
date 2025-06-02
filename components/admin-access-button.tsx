"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShieldIcon } from "lucide-react"
import Link from "next/link"

export function AdminAccessButton() {
  const [showButton, setShowButton] = useState(false)

  // Show admin button after 3 clicks on logo (secret access)
  const handleLogoClick = () => {
    const clicks = Number.parseInt(localStorage.getItem("logoClicks") || "0") + 1
    localStorage.setItem("logoClicks", clicks.toString())

    if (clicks >= 3) {
      setShowButton(true)
      localStorage.removeItem("logoClicks")
    }
  }

  return (
    <>
      {/* Hidden trigger - click logo 3 times */}
      <div onClick={handleLogoClick} className="cursor-pointer">
        {/* This would wrap your existing logo */}
      </div>

      {/* Admin access button (appears after secret trigger) */}
      {showButton && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button asChild className="shadow-lg">
            <Link href="/admin/login">
              <ShieldIcon className="h-4 w-4 mr-2" />
              Admin Access
            </Link>
          </Button>
        </div>
      )}
    </>
  )
}
