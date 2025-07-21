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
  contentClassName = "w-full sm:max-w-lg overflow-y-auto",
  headerClassName = "mb-6",
  showHeader = true,
  side = "right",
  size = "md",
}: AdminDetailsSheetProps) {
  const sizeClasses = {
    sm: "w-[300px]",
    md: "w-[350px]",
    lg: "w-[400px]",
    xl: "w-[450px]",
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side={side}
        className={`${sizeClasses[size]} ${contentClassName}`}
      >
        {showHeader ? (
          <SheetHeader className={headerClassName}>
            <SheetTitle className="flex items-center gap-2 text-2xl">
              {title}
            </SheetTitle>
            {(statusBadge || description) && (
              <SheetDescription>
                {statusBadge} {description}
              </SheetDescription>
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