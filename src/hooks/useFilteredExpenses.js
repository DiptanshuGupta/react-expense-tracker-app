import { useMemo } from 'react';
import dayjs from 'dayjs';
import { isWithinRange } from '../utils/date';

export function useFilteredExpenses(expenses, filters, sort) {
  const applied = useMemo(() => {
    let data = [...expenses];

    // Filter by category
    if (filters.category) {
      data = data.filter((e) => e.category === filters.category);
    }

    // Filter by date range
    if (filters.startDate || filters.endDate) {
      data = data.filter((e) =>
        isWithinRange(e.date, filters.startDate, filters.endDate)
      );
    }

    // Filter by search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter((e) => e.title.toLowerCase().includes(q));
    }

    // Sort
    const compare = {
      date_desc: (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf(),
      date_asc: (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
      amount_desc: (a, b) => b.amount - a.amount,
      amount_asc: (a, b) => a.amount - b.amount,
      category_asc: (a, b) => a.category.localeCompare(b.category),
      category_desc: (a, b) => b.category.localeCompare(a.category),
    }[sort];

    data.sort(compare);
    return data;
  }, [expenses, filters, sort]);

  const total = useMemo(
    () => applied.reduce((sum, e) => sum + e.amount, 0),
    [applied]
  );

  const monthly = useMemo(() => {
    const buckets = {};
    for (const e of applied) {
      const key = dayjs(e.date).format('YYYY-MM');
      buckets[key] = (buckets[key] || 0) + e.amount;
    }
    return buckets;
  }, [applied]);

  return { applied, total, monthly };
}