import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditTransactionForm from "@/components/Transaction/EditTransactionForm";

import { deleteTransaction } from "@/services/TransactionService";

interface Transaction {
  description: string;
  id: number;
  user_id: number;
  category_id: number;
  category_name: string;
  amount: number;
  date: string | null;
}

interface Props {
  transaction: Transaction;
  onDeleted?: () => void;
  onUpdated?: () => void;
}

export default function TransactionCard({
  transaction,
  onDeleted,
  onUpdated,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  const formattedDate = transaction.date
    ? new Date(transaction.date).toLocaleDateString()
    : "No date";

  const isIncome = transaction.amount < 0;
  const displayAmount = Math.abs(transaction.amount);

  // DELETE function
  const handleDelete = async () => {
    setError(null);
    setLoading(true);

    try {
      await deleteTransaction(transaction.id);
      onDeleted?.();
    } catch (err: any) {
      const detail =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to delete transaction";
      console.error("Error deleting transaction:", err);
      setError(String(detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-3 shadow-sm flex items-center justify-between">
      {/* Left: main info */}
      <div className="flex flex-col">
        <span className="font-medium">{transaction.description}</span>
        <span className="text-xs text-gray-500">
          {formattedDate} • {transaction.category_name}
        </span>
      </div>

      {/* Right: amount + actions */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p
            className={`font-semibold ${
              isIncome ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {isIncome ? "+" : "-"}
            {displayAmount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full ${
              isIncome
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isIncome ? "Income" : "Expense"}
          </span>
        </div>

        <div className="flex gap-1">
          <Button size="sm" onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            ✕
          </Button>
        </div>
      </div>
    </div>
  );
}