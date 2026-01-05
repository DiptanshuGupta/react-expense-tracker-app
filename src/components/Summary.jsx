export default function Summary({ total, monthlyTotals }) {
  return (
    <div className="summary">
      <h3>Total spending: ₹{total.toFixed(2)}</h3>
      <h4>Monthly summary</h4>
      {Object.keys(monthlyTotals).length === 0 && <p>No data</p>}
      <ul>
        {Object.entries(monthlyTotals).map(([month, amt]) => (
          <li key={month}>
            <span>{month}</span>
            <strong>₹{amt.toFixed(2)}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}