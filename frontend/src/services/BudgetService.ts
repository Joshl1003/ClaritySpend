export interface Budget {
  id: number;
  user_id: number;
  category_id: number;
  amount: number;
  period: string;
}

export async function getBudgets(userId: number) {
  const res = await fetch(`http://localhost:8000/budgets?user_id=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch budgets");
  return res.json() as Promise<Budget[]>;
}

export async function createBudget(budget: Omit<Budget, "id">) {
  const res = await fetch("http://localhost:8000/budgets/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(budget),
  });
  if (!res.ok) throw new Error("Failed to create budget");
  return res.json() as Promise<Budget>;
}
