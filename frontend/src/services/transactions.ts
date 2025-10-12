const API_URL = "http://localhost:8000";

export async function getTransactions() {
  const res = await fetch(`${API_URL}/transactions`);
  return res.json();
}

export async function addTransaction(data: any) {
  const res = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Similarly for updateTransaction, deleteTransaction
