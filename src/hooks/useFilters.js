import { useState } from 'react';

export function useFilters(initial = {}) {
  const [filters, setFilters] = useState({
    category: null,
    startDate: null,
    endDate: null,
    search: '',
    ...initial,
  });

  const [sort, setSort] = useState('date_desc');

  const changeFilters = (partial) =>
    setFilters((prev) => ({ ...prev, ...partial }));

  return {
    filters,
    sort,
    setSort,
    changeFilters,
  };
}