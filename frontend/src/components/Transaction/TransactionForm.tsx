import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { getCategories, type Category } from "@/services/CategoryService";
import { createTransaction } from "@/services/TransactionService";

interface TransactionFormProps {
  onSuccess: () => void;
}

export default function TransactionForm({ onSuccess }: TransactionFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | "">("");

  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoadingCategories(true);
      try {
        const data = await getCategories();
        setCategories(data);

        // pick a default selection
        if (data.length > 0) setCategoryId(data[0].id);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (categoryId === "") {
      setError("Please select a category");
      return;
    }

    if (amount === "" || Number.isNaN(Number(amount))) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);

    const payload = {
      description,
      amount: Number(amount),
      date,
      category_id: categoryId,
    };

    try {
      await createTransaction(payload);
      setDescription("");
      setAmount("");
      setDate("");
      onSuccess();
    } catch (err: any) {
      const detail =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to create transaction";
      console.error("Create transaction failed:", err);
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
          placeholder="Transaction Name"
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

      {/* Category dropdown */}
      <div className="flex gap-2 items-center">
        <label className="text-sm w-20">Category</label>
        <select
          value={categoryId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCategoryId(Number(e.target.value))
          }
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

      <div className="flex gap-2 items-center">
        <Button type="submit" disabled={loading || loadingCategories}>
          {loading ? "Creating..." : "Create Transaction"}
        </Button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </form>
  );
}
