import { ConfirmDialog } from "./ConfirmDialog";

interface ConfirmDeleteModalProps {
  open: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  title = "Delete",
  description = "Are you sure you want to delete the selected items? This action cannot be undone.",
  loading = false,
  onConfirm,
  onCancel,
}) => (
  <ConfirmDialog
    open={open}
    title={title}
    description={description}
    confirmLabel={loading ? "Deleting..." : "Delete"}
    cancelLabel="Cancel"
    loading={loading}
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
); 