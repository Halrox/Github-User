import { useState} from 'react';

export function useSelection<T extends { id: number }>(items: T[]) 
{
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggle = (id: number) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const toggleAll = () => 
  {
    if (selectedIds.length === items.length) 
    {
      setSelectedIds([]);
    }
    else 
    {
      setSelectedIds(items.map((i) => i.id));
    }
  };

  const isSelected = (id: number) => selectedIds.includes(id);

  const selectedItems = items.filter((item) => selectedIds.includes(item.id));

  return {
    selectedIds,
    selectedItems,
    toggle,
    toggleAll,
    isSelected,
    clear: () => setSelectedIds([]),
  };
}
