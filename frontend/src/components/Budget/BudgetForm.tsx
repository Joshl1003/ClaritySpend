import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { getCategories, type Category } from "@/services/CategoryService";
import { createBudget } from "@/services/BudgetService";

interface BudgetFormProps {
  onSuccess: () => void; 
}

export default function BudgetForm({ onSuccess }: BudgetFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [period, setPeriod] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | "">("");

  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetch categories
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
      name,           
      amount: Number(amount),
      period,
      category_id: categoryId,

    };

    try {
          await createBudget(payload);
          setName("");
          setAmount("");
          setPeriod("");
          onSuccess();
        } catch (err: any) {
          const detail =
            err?.response?.data?.detail ||
            err?.message ||
            "Failed to create budget";
          console.error("Create budget failed:", err);
          setError(String(detail));
        } finally {
          setLoading(false);
        }
      };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg mt-4 flex gap-2 flex-col max-w-lg">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Budget Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
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
          type="text"
          placeholder="Period"
          value={period}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPeriod(e.target.value)
          }
          className="border p-2 w-32"
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
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Budget"}
        </Button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </form>
  );
}

