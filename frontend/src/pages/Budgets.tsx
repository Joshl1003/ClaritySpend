import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BudgetForm from "@/components/BudgetForm";
import BudgetCard from "@/components/BudgetCard";
import SpendingChart from "@/components/SpendingChart";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchBudgets = async () => {
  try {
    const res = await fetch("http://localhost:8000/budgets/?user_id=1");
    if (!res.ok) {
      console.error("Failed to fetch budgets", res.status);
      return;
    }
    const data = await res.json();
    setBudgets(data);
  } catch (err) {
    console.error("Error fetching budgets:", err);
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
          />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Spending Overview</h2>   
      <SpendingChart data={mockData} />  
    </div>
    
  );
}
