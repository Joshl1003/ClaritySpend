import { useState } from "react";
import { Button } from "@/components/ui/button";

import { updateTransaction } from "@/services/TransactionService";

interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: string | null;
    user_id: number;
    category_id: number | null;
}

interface EditTransactionFormProps {
    transaction: Transaction;
  onSuccess: () => void; // called after successful create
}

export default function EditTransactionForm({ transaction, onSuccess }: EditTransactionFormProps) {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState<number | "">(transaction.amount);
  const [date, setDate] = useState(
    transaction.date ? transaction.date.slice(0, 10) : ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      description,           
      amount: Number(amount),
      date: date ? date : null,
      category_id: transaction.category_id,
    };

    try {
      await updateTransaction(transaction.id, payload); 
      onSuccess();
    } catch (err: any) {
      const detail =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to update transaction";
      console.error("Error updating transaction:", err);
      setError(String(detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
        onSubmit={handleSubmit} 
        className="p-4 border rounded-lg mt-4 flex gap-2 flex-col max-w-lg"
    >
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          className="border p-2 flex-1"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="border p-2 w-32"
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(e.target.value)
          }
          className="border p-2 w-32"
        />
      </div>

      <div className="flex gap-2 items-center">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </form>
  );
}

