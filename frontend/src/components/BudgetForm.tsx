// BudgetForm.tsx
import { useState } from "react";

interface BudgetFormProps {
  onAdd: () => void; // <-- define the prop here
}

export default function BudgetForm({ onAdd }: BudgetFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { name, amount, user_id: 1, category_id: 1, period: "monthly" };

    try {
      const res = await fetch("http://localhost:8000/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create budget");

      setName("");
      setAmount("");
      onAdd(); // <-- call this after successful creation
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg mt-4">
      <input
        type="text"
        placeholder="Budget Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Budget
      </button>
    </form>
  );
}

