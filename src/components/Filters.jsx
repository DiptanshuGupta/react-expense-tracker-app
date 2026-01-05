import { CATEGORIES } from '../utils/categories';

export default function Filters({ filters, onChange, sort, onSortChange }) {
  const { category, startDate, endDate, search } = filters;

  return (
    <div className="filters">
      <select
        value={category || ''}
        onChange={(e) => onChange({ category: e.target.value || null })}
      >
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        type="date"
        value={startDate || ''}
        onChange={(e) => onChange({ startDate: e.target.value || null })}
      />
      <input
        type="date"
        value={endDate || ''}
        onChange={(e) => onChange({ endDate: e.target.value || null })}
      />
      <input
        placeholder="Search title..."
        value={search || ''}
        onChange={(e) => onChange({ search: e.target.value || '' })}
      />
      <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="date_desc">Date ↓</option>
        <option value="date_asc">Date ↑</option>
        <option value="amount_desc">Amount ↓</option>
        <option value="amount_asc">Amount ↑</option>
        <option value="category_asc">Category A→Z</option>
        <option value="category_desc">Category Z→A</option>
      </select>
    </div>
  );
}