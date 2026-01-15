import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BudgetForm from "@/components/Budget/BudgetForm";
import BudgetCard from "@/components/Budget/BudgetCard";
import SpendingChart from "@/components/SpendingChart";

import { getBudgets } from "@/services/BudgetService";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  
  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data);
    } catch (e) {
      console.error(e);
  }
};

  const mockData = [
    { category: "Food", amount: 250 },
    { category: "Entertainment", amount: 150 },
    { category: "Transport", amount: 100 },
  ];

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
            setShowForm(false);   // closes the form after successful create
          }}
        />
      )}

      <div className="mt-4 grid gap-4">
        {budgets.map((b) => (
          <BudgetCard
            key={b.id}
            budget={b}
            onDeleted={fetchBudgets}  // refresh after delete
            onUpdated={fetchBudgets} // refresh after update
          />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Spending Overview</h2>   
      <SpendingChart data={mockData} />  
    </div>
    
  );
}
