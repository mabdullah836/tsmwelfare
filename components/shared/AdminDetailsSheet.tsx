import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface AdminDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  statusBadge?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
  headerClassName?: string;
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
}: AdminDetailsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={contentClassName}>
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
        {children}
      </SheetContent>
    </Sheet>
  );
}

export default AdminDetailsSheet; 