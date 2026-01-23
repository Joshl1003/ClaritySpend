import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditTransactionForm from "@/components/Transaction/EditTransactionForm";

import { deleteTransaction } from "@/services/TransactionService";

interface Transaction {
  description: string
  id: number;
  user_id: number;
  category_id: number;
  category_name: string
  amount: number;
  date: string | null; //change
}

interface Props {
  transaction: Transaction;
  onDeleted?: () => void
  onUpdated?: () => void
}

export default function TransactionCard({ transaction, onDeleted, onUpdated}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const formattedDate = transaction.date
    ? new Date(transaction.date).toLocaleDateString()
    : "No date";

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
    <div className="border rounded p-4 shadow flex flex-col gap-2">
      <div>
        <h3 className="font-semibold text-lg">{transaction.description}</h3>
        <p>Amount: ${transaction.amount}</p>
        <p>Date: {formattedDate}</p>
        <p>Category: {transaction.category_name}</p>
      </div>

      <div className="flex gap-2 items-center">
        <Button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          variant="destructive"
        >
          {loading ? "Deleting..." : "Delete"}
        
        </Button>

         {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>

      <div className="flex gap-2 items-center">
        <Button type="button" onClick={() => setEditing(true)}>
          Edit
        </Button>

        {editing && (
          <EditTransactionForm
            transaction={transaction}
            onSuccess={() => {
              setEditing(false);
              onUpdated?.();
            }}
          />
        )}
      </div>
    </div>
  );
}