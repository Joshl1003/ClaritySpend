import { useEffect, useMemo, useState } from "react";
import { getBudgets, type Budget } from "@/services/BudgetService";
import type { Transaction } from "@/services/TransactionService";

interface Props {
  transactions: Transaction[];
  month: number; // 0-11
  year: number;
}

export default function BudgetUsageList({
  transactions,
  month,
  year,
}: Props) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch budgets once
  useEffect(() => {
    const fetchBudgets = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBudgets();
        // only monthly budgets
        setBudgets(data.filter((b) => b.period === "monthly"));
      } catch (err: any) {
        const detail =
          err?.response?.data?.detail ||
          err?.message ||
          "Failed to load budgets";
        console.error(err);
        setError(String(detail));
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  // Filter to this month + expenses only
  const monthExpenses = useMemo(() => {
    return transactions.filter((tx) => {
      if (!tx.date) return false;
      if (tx.amount <= 0) return false; // ignore income
      const d = new Date(tx.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });
  }, [transactions, month, year]);

  // Sum spending per category
  const spentByCategory = useMemo(() => {
    const map = new Map<number, number>();

    for (const tx of monthExpenses) {
      if (tx.category_id == null) continue;
      map.set(
        tx.category_id,
        (map.get(tx.category_id) ?? 0) + tx.amount
      );
    }

    return map;
  }, [monthExpenses]);

  // Build rows for display
  const rows = useMemo(() => {
    return budgets
      .map((b) => {
        const spent = spentByCategory.get(b.category_id) ?? 0;
        const limit = b.amount;
        const ratio = limit > 0 ? spent / limit : 0;
        const percent = Math.min(100, Math.round(ratio * 100));

        let color = "bg-emerald-500";
        if (ratio >= 1) color = "bg-red-500";
        else if (ratio >= 0.8) color = "bg-yellow-500";

        return {
          id: b.id,
          category: b.category_name,
          spent,
          limit,
          percent,
          color,
        };
      })
      .sort((a, b) => b.percent - a.percent);
  }, [budgets, spentByCategory]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-sm text-gray-500">Loading budgets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-sm text-gray-500">
          No monthly budgets found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Budget Usage</h2>

      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.id}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{row.category}</span>
              <span className="text-gray-500">
                ${row.spent.toFixed(2)} / ${row.limit.toFixed(2)}
              </span>
            </div>

            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${row.color}`}
                style={{ width: `${row.percent}%` }}
              />
            </div>

            <div className="text-xs text-gray-400 mt-1">
              {row.percent}% used
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}