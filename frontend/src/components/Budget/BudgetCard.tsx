import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditBudgetForm from "@/components/Budget/EditBudgetForm";

import { deleteBudget } from "@/services/BudgetService";

interface Budget {
  name: string
  id: number;
  user_id: number;
  category_id: number;
  category_name: string;
  amount: number;
  period: string;
}

interface Props {
  budget: Budget;
  onDeleted?: () => void
  onUpdated?: () => void
}

export default function BudgetCard({ budget, onDeleted, onUpdated}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);


  // DELETE function
  const handleDelete = async () => {
    setError(null);
    setLoading(true);

    try {
          await deleteBudget(budget.id); 
          onDeleted?.();
        } catch (err: any) {
          const detail =
            err?.response?.data?.detail ||
            err?.message ||
            "Failed to delete budget";
          console.error("Error deleting budget:", err);
          setError(String(detail));
        } finally {
          setLoading(false);
        }
      };

  
  return (
    <div className="border rounded p-4 shadow flex flex-col gap-2">
      <div>
        <h3 className="font-semibold text-lg">{budget.name}</h3>
        <p>Amount: ${budget.amount}</p>
        <p>Period: {budget.period}</p>
        <p>Category: {budget.category_name}</p>
      </div>

      <div className="flex gap-2 items-center">
        <Button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          variant="destructive"
        >
          {loading ? "Deleting..." : "Delete"}
        
        </Button>

         {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>

      <div className="flex gap-2 items-center">
        <Button type="button" onClick={() => setEditing(true)}>
          Edit
        </Button>

        {editing && (
          <EditBudgetForm
            budget={budget}
            onSuccess={() => {
                setEditing(false);
                onUpdated?.();
              }}
            />
          )}
       </div>
    </div>
  );
}
