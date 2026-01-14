import { useEffect, useState } from "react";
import SpendingChart from "@/components/SpendingChart";

interface Transaction {  
  id: number;
  description: string;
  amount: number;
  date: string;   
  category_id: number;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- 1. Fetch recent transactions from backend ---
  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: will replace user_id=1 with real logged-in user
      const res = await fetch("http://localhost:8000/transactions?limit=100/");
      if (!res.ok) {
        const body = await res.text();
        console.error("Fetch transactions failed:", res.status, body);
        setError("Failed to load dashboard data");
        return;
      }
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // --- 2. Derived stats (computed from transactions) ---

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const thisMonthTransactions = transactions.filter((tx) => {
    const d = new Date(tx.date);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });

  const monthlySpending = thisMonthTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  const totalTransactions = thisMonthTransactions.length;

  const avgTransaction = totalTransactions > 0 ? monthlySpending / totalTransactions : 0;

  // For now we'll mock a "budget used" percent until you wire real budget logic
  const mockBudgetLimit = 2000; // pretend user has $2000 monthly budget
  const budgetUsedPercent = mockBudgetLimit
    ? Math.min(100, Math.round((monthlySpending / mockBudgetLimit) * 100))
    : 0;

  // Take the 5 most recent (sorted by date desc)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // --- 3. Mock data for chart (replace later with real category breakdown) ---
  const mockChartData = [
    { category: "Food", amount: 250 },
    { category: "Entertainment", amount: 150 },
    { category: "Transport", amount: 120 },
    { category: "Bills", amount: 400 },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {loading && <p className="text-gray-600 mb-4">Loading dashboard...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Top summary cards */}
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

      {/* Middle section: Chart + recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Recent Transactions */}
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
                      {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className={`font-semibold ${
                      tx.amount >= 0 ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {tx.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: Spending chart */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Spending by Category
          </h2>

          {/* If you have your own Chart component, replace this block with it */}
          {/* Example (once wired): 
              <SpendingChart data={categoryTotalsFromBackendOrReducer} />
          */}
          <div className="text-sm text-gray-500">
            {/* Simple placeholder until you wire Chart.js */}
            {mockChartData.map((item) => (
              <div
                key={item.category}
                className="flex justify-between mb-2 text-sm"
              >
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
              TODO: Replace this block with a real Chart.js donut or bar chart
              using actual category totals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
