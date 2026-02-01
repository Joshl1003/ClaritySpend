import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import BudgetForm from "@/components/Budget/BudgetForm";
import BudgetCard from "@/components/Budget/BudgetCard";

import { getBudgets, type Budget } from "@/services/BudgetService";
import { useAuth } from "@/auth/useAuth";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data);
    } catch (e: any) {
      const status = e?.response?.status;

      if (status === 401) {
        await logout();
        navigate("/login", { replace: true });
        return;
      }

    console.error("Error fetching budgets:", e);
    }
};

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div className="p-4">
      <Button onClick={() => setShowForm((prev) => !prev)}> 
        {showForm ? "Close" : "Add Budget"}
      </Button>

      {showForm && (
        <BudgetForm
          onSuccess={async () => {
            await fetchBudgets();
            setShowForm(false);   // closes form after successful create
          }}
        />
      )}

      <div className="mt-4 grid gap-4">
        {budgets.map((b) => (
          <BudgetCard
            key={b.id}
            budget={b}
            onDeleted={fetchBudgets}  
            onUpdated={fetchBudgets} 
          />
        ))}
      </div>
    </div>
    
  );
}
