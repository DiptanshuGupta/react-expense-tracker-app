import { CATEGORIES } from '../utils/categories';
import { useForm } from '../hooks/useForm';

export default function ExpenseForm({ onAdd }) {
  const { values, bindField, setField, reset } = useForm({
    title: '',
    amount: '',
    category: CATEGORIES[0],
    date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, amount, category, date } = values;
    if (!title.trim() || !amount || !date) return;
    onAdd({
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
      isCleared: false,
    });
    reset();
    setField('category', CATEGORIES[0]); // preserve default
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '8px' }}>
      <input placeholder="Title" {...bindField('title')} />
      <input type="number" placeholder="Amount" min="0" step="0.01" {...bindField('amount')} />
      <select value={values.category} onChange={(e) => setField('category', e.target.value)}>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input type="date" {...bindField('date')} />
      <button type="submit">Add Expense</button>
    </form>
  );
}