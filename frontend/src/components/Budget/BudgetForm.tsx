import { useState } from "react";
import { Button } from "@/components/ui/button";

interface BudgetFormProps {
  onSuccess: () => void; // called after successful create
}

export default function BudgetForm({ onSuccess }: BudgetFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [period, setPeriod] = useState("");
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
      user_id: 1,
      category_id: 1,

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

      <div className="flex gap-2 items-center">
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Budget"}
        </Button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </form>
  );
}

