import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TransactionFormProps {
  onSuccess: () => void; // called after successful create
}

export default function Transaction({ onSuccess }: TransactionFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      description,           
      amount,
      date,
      user_id: 1,
      category_id: 1,

    };

    try {
      const res = await fetch("http://localhost:8000/transactions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error("Create transaction failed:", res.status, body);
        setError("Failed to create transaction");
        return;
      }

      // reset form
      setDescription("");
      setAmount("");
      setDate("");

      // tell parent so it can refetch + close
      onSuccess();
    } catch (err) {
      console.error("Error creating transaction:", err);
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
          placeholder="Transaction Name"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-32"
        />
      </div>

      <div className="flex gap-2 items-center">
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Transaction"}
        </Button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </form>
  );
}
