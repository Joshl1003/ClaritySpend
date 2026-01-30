import { useEffect, useState } from "react";
import SpendingChart from "@/components/SpendingChart";
import BudgetUsageList from "@/components/Budget/BudgetUsageList"; 

import { getTransactions, type Transaction } from "@/services/TransactionService";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTransactions({ limit: 100 });
      setTransactions(data);
    } catch (err: any) {
      const detail =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to load dashboard data";
      console.error("Error fetching transactions:", err);
      setError(String(detail));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // --- Derived stats ---
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const thisMonthTransactions = transactions.filter((tx) => {
    if (!tx.date) return false;
    const d = new Date(tx.date);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });

  const thisMonthExpenses = thisMonthTransactions.filter(
    (tx) => tx.amount > 0
  );

  const monthlySpending = thisMonthExpenses.reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpenses = thisMonthExpenses.length;
  const avgTransaction =
    totalExpenses > 0 ? monthlySpending / totalExpenses : 0;

  const recentTransactions = [...transactions]
    .filter((t) => !!t.date)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
    .slice(0, 5);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {loading && <p className="text-gray-600 mb-4">Loading dashboard...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm font-medium">Monthly Spending</h2>
          <p className="text-2xl font-semibold mt-2">
            {monthlySpending.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Based on {thisMonthTransactions.length} transaction
            {thisMonthTransactions.length === 1 ? "" : "s"} this month
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm font-medium">Average Transaction</h2>
          <p className="text-2xl font-semibold mt-2">
            {avgTransaction.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Simple average of this month&apos;s transactions
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm font-medium">Budget Used (mock)</h2>
          <p className="text-2xl font-semibold mt-2">{budgetUsedPercent}%</p>
          <p className="text-xs text-gray-400 mt-1">
            Assuming a ${mockBudgetLimit.toLocaleString()} monthly budget
          </p>
        </div>
      </div>

      {/* BudgetUsageList (uses same month/year + fetched transactions) */}
      <div className="mb-8">
        <BudgetUsageList
          transactions={transactions}
          month={thisMonth}
          year={thisYear}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Transactions
          </h2>

          {recentTransactions.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No transactions yet. Add one on the Transactions page.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentTransactions.map((tx) => (
                <li key={tx.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{tx.description}</p>
                    <p className="text-xs text-gray-400">
                      {tx.date ? new Date(tx.date).toLocaleDateString() : "No date"}
                    </p>
                  </div>
                  <div
                    className={`font-semibold ${
                      tx.amount < 0 ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {Math.abs(tx.amount).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Spending by Category
          </h2>

          <div className="text-sm text-gray-500">
            {mockChartData.map((item) => (
              <div key={item.category} className="flex justify-between mb-2 text-sm">
                <span>{item.category}</span>
                <span>
                  {item.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </div>
            ))}
            <p className="text-xs text-gray-400 mt-4">
              TODO: Replace this block with a real Chart.js donut or bar chart using
              actual category totals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}