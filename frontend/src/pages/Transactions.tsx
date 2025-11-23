import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TransactionForm from "@/components/Transaction/TransactionForm";
import TransactionCard from "@/components/Transaction/TransactionCard";

export default function Transactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchTransactions = async () => {
  try {
    const res = await fetch("http://localhost:8000/transactions/?user_id=1");
    if (!res.ok) {
      console.error("Failed to fetch transactions", res.status);
      return;
    }
    const data = await res.json();
    setTransactions(data);
  } catch (err) {
    console.error("Error fetching transactions:", err);
  }
};


  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <Button onClick={() => setShowForm((prev) => !prev)}> 
        {showForm ? "Close" : "Add Transactions"}
      </Button>

      {showForm && (
        <TransactionForm
          onSuccess={async () => {
            await fetchTransactions();
            setShowForm(false);   // closes the form after successful create
          }}
        />
      )}

      <div className="mt-4 grid gap-4">
        {transactions.map((b) => (
          <TransactionCard
            key={b.id}
            transaction={b}
            onDeleted={fetchTransactions}  // refresh after delete
            onUpdated={fetchTransactions} // refresh after update
          />
        ))}
      </div>
 
    </div>
    
  );
}