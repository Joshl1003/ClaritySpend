import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { updateTransaction } from "@/services/TransactionService";
import { getCategories, type Category } from "@/services/CategoryService";

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
  onSuccess: () => void;
}

export default function EditTransactionForm({
  transaction,
  onSuccess,
}: EditTransactionFormProps) {
  const [description, setDescription] = useState(transaction.description);
  // show the amount as a positive number in the input
  const [amount, setAmount] = useState<number | "">(Math.abs(transaction.amount));

  const [date, setDate] = useState(
    transaction.date ? transaction.date.slice(0, 10) : ""
  );
  // Initialize type from existing amount
  const [txType, setTxType] = useState<"expense" | "income">(
    transaction.amount < 0 ? "income" : "expense"
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | "">(
    transaction.category_id ?? ""
  );

  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load categories
  useEffect(() => {
    let alive = true;

    const load = async () => {
      setLoadingCategories(true);
      try {
        const data = await getCategories();
        if (!alive) return;
        setCategories(data);

        // If transaction has no category, pick a default
        if ((transaction.category_id === null || transaction.category_id === undefined) && data.length > 0) {
          setCategoryId(data[0].id);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        if (!alive) return;
        setError("Failed to load categories");
      } finally {
        if (!alive) return;
        setLoadingCategories(false);
      }
    };

    load();
    return () => {
      alive = false;
    };
  }, [transaction.category_id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (amount === "" || Number.isNaN(Number(amount))) {
      setError("Please enter a valid amount");
      return;
    }

    if (categoryId === "") {
      setError("Please select a category");
      return;
    }

    setLoading(true);

    const raw = Math.abs(Number(amount));
    const signedAmount = txType === "income" ? -raw : raw;

    const payload = {
      description,
      amount: signedAmount,
      date: date ? date : null,
      category_id: categoryId,
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
      className="p-4 border rounded-lg mt-4 flex gap-3 flex-col max-w-lg"
    >
      {/* Type + Category row */}
      <div className="flex gap-2 items-center">
        <label className="text-sm w-20">Type</label>
        <select
          value={txType}
          onChange={(e) => setTxType(e.target.value as "expense" | "income")}
          className="border p-2 flex-1"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="flex gap-2 items-center">
        <label className="text-sm w-20">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="border p-2 flex-1"
          disabled={loadingCategories}
        >
          {loadingCategories && <option>Loading categories...</option>}
          {!loadingCategories && categories.length === 0 && (
            <option value="">No categories found</option>
          )}
          {!loadingCategories &&
            categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {/* Main inputs */}
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
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(e.target.value)
          }
          className="border p-2 w-40"
        />
      </div>

      <div className="flex gap-2 items-center">
        <Button type="submit" disabled={loading || loadingCategories}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </form>
  );
}
