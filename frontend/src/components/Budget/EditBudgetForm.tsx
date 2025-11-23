import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Budget {
    id: number;
    name: string;
    amount: number;
    period: string;
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
  const [period, setPeriod] = useState(budget.period);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      name,           
      amount,
      period,
      category_id: budget.category_id,
    };

    try {
      const res = await fetch(`http://localhost:8000/budgets/${budget.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error("Update budget failed:", res.status, body);
        setError("Failed to update budget");
        return;
      }

      onSuccess();
    } catch (err) {
      console.error("Error updating budget:", err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
        onSubmit={handleSubmit} 
        className="p-4 border rounded-lg mt-4 flex gap-2 flex-col max-w-md"
    >
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

      <div className="flex gap-2 items-center">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </form>
  );
}

