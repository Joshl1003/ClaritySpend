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

  // transactions made during current month
  const thisMonthTransactions = transactions.filter((tx) => {
    if (!tx.date) return false;
    const d = new Date(tx.date);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });

  // current month expenses
  const thisMonthExpenses = thisMonthTransactions.filter(
    (tx) => tx.amount > 0
  );
  const monthlySpending = thisMonthExpenses.reduce((sum, tx) => sum + tx.amount, 0);

  // money earned this month
  const thisMonthEarnings = thisMonthTransactions.filter(
    (tx) => tx.amount < 0
  );
  const monthlyEarnings = Math.abs(thisMonthEarnings.reduce((sum, tx) => sum + tx.amount, 0));
  
  // total cash flow (income subtracted by expenses)
  const cashFlow = monthlyEarnings - monthlySpending;

  const spendingByCategory = thisMonthExpenses.reduce((acc, tx) => {
    const name = tx.category_name ?? "Uncategorized";
    acc[name] = (acc[name] ?? 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(spendingByCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6); // top 6 categories, keeps chart readable

  
  // list of recent transactions made
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
            Based on {thisMonthExpenses.length} transaction
            {thisMonthExpenses.length === 1 ? "" : "s"} this month
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm font-medium">Monthly Earnings</h2>
          <p className="text-2xl font-semibold mt-2">
            {monthlyEarnings.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Based on {thisMonthEarnings.length} transaction
            {thisMonthEarnings.length === 1 ? "" : "s"} this month
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm font-medium">Net Cash Flow</h2>
          <p className="text-2xl font-semibold mt-2">
            {cashFlow.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Net income from this month&apos;s transactions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Budget usage list */}
        <div className="lg:col-span-2">
          <BudgetUsageList
            transactions={transactions}
            month={thisMonth}
            year={thisYear}
          />
        </div>

        {/* Transactions chart */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Spending by Category
          </h2>
          <SpendingChart data={chartData} />
        </div>
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
      </div>
    </div>
  );
}