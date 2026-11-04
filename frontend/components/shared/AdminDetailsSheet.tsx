// components/admin-details-sheet.tsx
"use client"
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface AdminDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  statusBadge?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
  headerClassName?: string;
  showHeader?: boolean;
  side?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg" | "xl";
}

export function AdminDetailsSheet({
  open,
  onOpenChange,
  title,
  statusBadge,
  description,
  children,
  contentClassName = "overflow-y-auto",
  headerClassName = "mb-6",
  showHeader = true,
  side = "right",
  size = "md",
}: AdminDetailsSheetProps) {
  // Width is capped by the viewport so the panel never overflows narrow phones.
  const sizeClasses = {
    sm: "w-[85vw] sm:max-w-[300px]",
    md: "w-[90vw] sm:max-w-md",
    lg: "w-[92vw] sm:max-w-lg",
    xl: "w-[94vw] sm:max-w-xl",
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side={side}
        className={`${sizeClasses[size]} ${contentClassName}`}
      >
        {showHeader ? (
          <SheetHeader className={headerClassName}>
            <SheetTitle className="flex items-center gap-2 pr-8 text-xl [&_svg]:h-5 [&_svg]:w-5 [&_svg]:text-muted-foreground">
              {title}
            </SheetTitle>
            {(statusBadge || description) && (
              <div className="flex flex-wrap items-center gap-2">
                {statusBadge}
                {description && <SheetDescription className="first-letter:uppercase">{description}</SheetDescription>}
              </div>
            )}
          </SheetHeader>
        ) : (
          <SheetTitle>
            <VisuallyHidden>{typeof title === "string" ? title : "Navigation Menu"}</VisuallyHidden>
          </SheetTitle>
        )}
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default AdminDetailsSheet;