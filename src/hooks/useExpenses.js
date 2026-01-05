import { nanoid } from "nanoid";
import { useLocalStorage } from "./useLocalStorage";
import dayjs from "dayjs";

/**
 * Custom hook to manage expenses with localStorage persistence
 */
export function useExpenses(storageKey = "expenses") {
  const [expenses, setExpenses] = useLocalStorage(storageKey, []);

  const add = (payload) => {
    setExpenses((prev) => [{ id: nanoid(), ...payload }, ...prev]);
  };

  const remove = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const toggleCleared = (id) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isCleared: !e.isCleared } : e))
    );
  };

  const update = (id, patch) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e))
    );
  };

  const addRecurring = (payload) => {
    // payload: { title, amount, category, date, recurringEvery: 'monthly'|'weekly'|'yearly' }
    const nextDueDate = computeNextDueDate(payload.date, payload.recurringEvery);
    add({ ...payload, isCleared: false, nextDueDate });
  };

  return {
    expenses,
    add,
    remove,
    toggleCleared,
    update,
    setExpenses,
    addRecurring,
  };
}

/**
 * Utility: compute next due date for recurring expenses
 */
function computeNextDueDate(date, every) {
  const d = dayjs(date);
  if (every === "weekly") return d.add(1, "week").format("YYYY-MM-DD");
  if (every === "monthly") return d.add(1, "month").format("YYYY-MM-DD");
  if (every === "yearly") return d.add(1, "year").format("YYYY-MM-DD");
  return date;
}

/**
 * Named export: upcoming expenses within N days
 */
export function upcoming(expenses, withinDays = 7) {
  const now = dayjs();
  return expenses.filter((e) => {
    if (!e.nextDueDate) return false;
    const diff = dayjs(e.nextDueDate).diff(now, "day");
    return diff >= 0 && diff <= withinDays;
  });
}