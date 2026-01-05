import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filters from "./components/Filters";
import Summary from "./components/Summary";
import { useExpenses, upcoming } from "./hooks/useExpenses";
import { useFilters } from "./hooks/useFilters";
import { useFilteredExpenses } from "./hooks/useFilteredExpenses";

export default function App() {
  const { expenses, add, remove, toggleCleared } = useExpenses("expenses");
  const { filters, sort, setSort, changeFilters } = useFilters();
  const { applied, total, monthly } = useFilteredExpenses(expenses, filters, sort);
  const upcomingItems = upcoming(expenses, 14);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Personal Expense Tracker</h2>
        <ExpenseForm onAdd={add} />
        <Filters
          filters={filters}
          onChange={changeFilters}
          sort={sort}
          onSortChange={setSort}
        />
        <Summary total={total} monthlyTotals={monthly} />

        {upcomingItems.length > 0 && (
          <div className="upcoming-panel">
            <strong>Upcoming (14 days):</strong>
            <ul>
              {upcomingItems.map((e) => (
                <li key={e.id}>
                  {e.title} on {e.nextDueDate} — ₹{e.amount.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="main">
        <ExpenseList
          expenses={applied}
          onDelete={remove}
          onToggleCleared={toggleCleared}
        />
      </div>
    </div>
  );
}