import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { updateBudget } from "@/services/BudgetService";
import { getCategories, type Category } from "@/services/CategoryService";

interface Budget {
    id: number;
    name: string;
    amount: number;
    period: string | null;
    user_id: number;
    category_id: number | null;
}

interface EditBudgetFormProps {
    budget: Budget;
  onSuccess: () => void; // called after successful create
}

export default function EditBudgetForm({ budget, onSuccess }: EditBudgetFormProps) {
  const [name, setName] = useState(budget.name);
  const [amount, setAmount] = useState<number | "">(budget.amount);
  const [period, setPeriod] = useState<string>(budget.period ?? "");

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | "">(
    budget.category_id ?? ""
  );

  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      let alive = true;
  
      const load = async () => {
        setLoadingCategories(true);
        try {
          const data = await getCategories();
          if (!alive) return;
          setCategories(data);
  
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
    }, [budget.category_id]);

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

    const payload = {
      name,           
      amount: Number(amount),
      period,
      category_id: categoryId,
    };

    try {
          await updateBudget(budget.id, payload); 
          onSuccess();
        } catch (err: any) {
          const detail =
            err?.response?.data?.detail ||
            err?.message ||
            "Failed to update budget";
          console.error("Error updating budget:", err);
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

      <div className="flex gap-2 items-center">
        <Button type="submit" disabled={loading || loadingCategories}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </form>
  );
}

