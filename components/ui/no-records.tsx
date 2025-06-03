"use client"

import Image from "next/image"
import { FileX } from "lucide-react"

interface NoRecordsProps {
  title?: string
  description?: string
  showImage?: boolean
}

export function NoRecords({
  title = "No Records Found",
  description = "There are no records available at the moment.",
  showImage = true
}: NoRecordsProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      {showImage && (
        <div className="relative mb-6 text-muted-foreground">
          <FileX className="w-24 h-24" />
        </div>
      )}
      <h3 className="text-2xl font-semibold tracking-tight mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
} 