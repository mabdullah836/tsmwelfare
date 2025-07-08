import { Dialog, DialogContent } from '@/components/ui/dialog';
import React from 'react';

interface UniversalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}

export const UniversalDialog: React.FC<UniversalDialogProps> = ({
  open,
  onOpenChange,
  children,
  maxWidth = 'max-w-2xl',
  className = '',
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className={`${maxWidth} ${className}`}>
      {children}
    </DialogContent>
  </Dialog>
); 