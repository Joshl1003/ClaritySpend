import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Category = {
  id: number;
  name: string;
  user_id: number | null;
}

interface BudgetFormProps {
  onSuccess: () => void; // called after successful create
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

  const userId = 1; //temp

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        // adjust endpoint/query to match your backend
        const res = await fetch(`http://localhost:8000/categories/?user_id=${userId}`);
        if (!res.ok) {
          const body = await res.text();
          console.error("Fetch categories failed:", res.status, body);
          return;
        }
        const data: Category[] = await res.json();
        setCategories(data);

        // 2) optionally auto-select first category
        if (data.length > 0) setCategoryId(data[0].id);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (categoryId === "") {
      setError("Please select a category");
      return;
    }

    setLoading(true);

    const payload = {
      name,           
      amount,
      period,
      user_id: userId,
      category_id: categoryId,

    };

    try {
      const res = await fetch("http://localhost:8000/budgets/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error("Create budget failed:", res.status, body);
        setError("Failed to create budget");
        return;
      }

      // reset form
      setName("");
      setAmount("");
      setPeriod("");

      // tell parent so it can refetch + close
      onSuccess();
    } catch (err) {
      console.error("Error creating budget:", err);
      setError("Network error");
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
          onChange={(e) => setName(e.target.value)}
          className="border p-2 flex-1"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-2 w-32"
        />
        <input
          type="text"
          placeholder="Period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border p-2 w-32"
        />
      </div>

      {/* Category dropdown */}
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

      <div className="flex gap-2 items-center">
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Budget"}
        </Button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </form>
  );
}

