export default function ExpenseList({ expenses, onDelete, onToggleCleared }) {
  if (!expenses.length) return <p>No expenses yet.</p>;

  return (
    <ul className="expense-list">
      {expenses.map((e) => (
        <li
          key={e.id}
          className={`expense-item ${e.isCleared ? 'cleared' : ''}`}
        >
          <span>{e.title}</span>
          <span>₹{e.amount.toFixed(2)}</span>
          <span>{e.category}</span>
          <span>{e.date}</span>
          <div className="expense-actions">
            <button onClick={() => onToggleCleared(e.id)}>
              {e.isCleared ? 'Unmark' : 'Mark'}
            </button>
            <button onClick={() => onDelete(e.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}