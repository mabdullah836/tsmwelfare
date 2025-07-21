import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import React from 'react';

interface UniversalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: string;
  className?: string;
}

export const UniversalDialog: React.FC<UniversalDialogProps> = ({
  open,
  onOpenChange,
  children,
  title = 'Dialog',
  maxWidth = 'max-w-2xl',
  className = '',
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className={`${maxWidth} ${className}`}>
      {title ? (
        <DialogTitle>
          <VisuallyHidden>{title}</VisuallyHidden>
        </DialogTitle>
      ) : null}
      {children}
    </DialogContent>
  </Dialog>
); 