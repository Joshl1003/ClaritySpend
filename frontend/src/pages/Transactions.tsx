import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import TransactionForm from "@/components/Transaction/TransactionForm";
import TransactionCard from "@/components/Transaction/TransactionCard";

import { getTransactions, type Transaction } from "@/services/TransactionService";
import { useAuth } from "@/auth/useAuth";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchTransactions = async () => {
  try {
      const data = await getTransactions();
      setTransactions(data);
  } catch (e: any) {
      // If token is missing/expired, backend returns 401
      const status = e?.response?.status;

      if (status === 401) {
        await logout();
        navigate("/login", { replace: true });
        return;
      }

      console.error("Error fetching transactions:", e);
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
            setShowForm(false); 
          }}
        />
      )}

      <div className="mt-4 grid gap-4">
        {transactions.map((t) => (
          <TransactionCard
            key={t.id}
            transaction={t}
            onDeleted={fetchTransactions}  
            onUpdated={fetchTransactions}
          />
        ))}
      </div>
 
    </div>
    
  );
}