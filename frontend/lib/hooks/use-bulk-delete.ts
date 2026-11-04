import { useState } from "react";

export function useBulkDelete(deleteFn: (ids: string[]) => Promise<void>, selectedIds: string[]) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleBulkDelete = async () => {
    setShowDeleteConfirm(false);
    setDeleting(true);
    try {
      await deleteFn(selectedIds);
    } finally {
      setDeleting(false);
    }
  };

  return {
    showDeleteConfirm,
    setShowDeleteConfirm,
    deleting,
    handleBulkDelete,
  };
} 