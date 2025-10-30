import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BudgetForm from "@/components/BudgetForm";
import SpendingChart from "@/components/SpendingChart";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchBudgets = async () => {
    const res = await fetch("http://localhost:8000/budgets");
    const data = await res.json();
    setBudgets(data);
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

      {showForm && <BudgetForm onAdd={fetchBudgets} />}

      <div className="mt-4 grid gap-4">
        {budgets.map((b) => (
          <div key={b.id} className="p-4 border rounded-lg">
            <h2 className="font-bold">{b.name}</h2>
            <p>${b.amount}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Spending Overview</h2>   
      <SpendingChart data={mockData} />  
    </div>
    
  );
}
