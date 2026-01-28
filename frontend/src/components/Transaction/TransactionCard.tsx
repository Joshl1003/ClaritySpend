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
    <div className="border rounded-lg p-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium truncate">{transaction.description}</p>
          <p className="text-xs text-gray-500">
            {formattedDate} • {transaction.category_name}
          </p>
        </div>

        <div className="flex items-center gap-3">
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
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                isIncome
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isIncome ? "Income" : "Expense"}
            </span>
          </div>

          <div className="flex gap-1">
            <Button size="sm" type="button" onClick={() => setEditing((v) => !v)}>
              {editing ? "Close" : "Edit"}
            </Button>

            <Button
              size="sm"
              type="button"
              onClick={handleDelete}
              disabled={loading}
              variant="destructive"
              title="Delete"
            >
              {loading ? "…" : "✕"}
            </Button>
          </div>
        </div>
      </div>

      {editing && (
        <div className="mt-3">
          <EditTransactionForm
            transaction={transaction}
            onSuccess={() => {
              setEditing(false);
              onUpdated?.();
            }}
          />
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}