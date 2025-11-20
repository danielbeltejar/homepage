import { useState, useMemo } from 'react';

interface UseFilterReturn<T> {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filteredItems: T[];
  availableFilters: string[];
}

export const useFilter = <T extends Record<string, any>>(
  items: T[],
  filterKey: keyof T,
  includeAll: boolean = true
): UseFilterReturn<T> => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const availableFilters = useMemo(() => {
    const filters = Array.from(new Set(items.map(item => item[filterKey] as string)));
    return includeAll ? ['all', ...filters] : filters;
  }, [items, filterKey, includeAll]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return items;
    return items.filter(item => item[filterKey] === activeFilter);
  }, [items, activeFilter, filterKey]);

  return {
    activeFilter,
    setActiveFilter,
    filteredItems,
    availableFilters
  };
};