import { useState } from "react";

export function useSelection<T extends { id: string }>(items: T[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allIds = items.map(item => item.id);
  const allSelected = allIds.length > 0 && allIds.every(id => selectedIds.includes(id));

  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds(ids => ids.filter(id => !allIds.includes(id)));
    else setSelectedIds(ids => Array.from(new Set([...ids, ...allIds])));
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(ids => ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]);
  };

  return { selectedIds, setSelectedIds, allSelected, toggleSelectAll, toggleSelect };
} 