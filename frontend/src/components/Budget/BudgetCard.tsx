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

  const displayAmount = Math.abs(budget.amount);

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
    <div className="border rounded-lg p-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium truncate">{budget.name}</p>
          <p className="text-xs text-gray-500">
            {budget.period} • {budget.category_name}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p>
              {displayAmount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>

          <div className="flex gap-1">
            <Button size="sm" type="button" onClick={() => setEditing((v) => !v)}>
              {editing ? "Close" : "Edit"}
            </Button>

            <Button
              size="sm"
              type="button"
              onClick={handleDelete}
              disabled={loading}
              variant="destructive"
              title="Delete"
            >
              {loading ? "…" : "✕"}
            </Button>
          </div>
        </div>
      </div>

      {editing && (
        <div className="mt-3">
          <EditBudgetForm
            budget={budget}
            onSuccess={() => {
              setEditing(false);
              onUpdated?.();
            }}
          />
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}