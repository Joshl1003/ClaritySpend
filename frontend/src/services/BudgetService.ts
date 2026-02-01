import { api } from "./api";

export interface Budget {
  name: string;
  id: number;
  user_id: number;
  category_id: number;
  category_name: string;
  amount: number;
  period: string;
}

export async function getBudgets() {
  const res = await api.get<Budget[]>("/budgets/")
  return res.data;
}

export async function createBudget(payload: { name: string; category_id: number; 
  amount: number; period?: string }) {
  const res = await api.post<Budget>("/budgets/", payload);
  return res.data;
}

export async function deleteBudget(id: number) {
  const res = await api.delete<Budget>(`/budgets/${id}/`);
  return res.data;
}

export async function updateBudget(
  id: number,
  payload: {
    name?: string;
    amount?: number;
    period?: string | null;
    category_id?: number | null;
  }
) {
  const res = await api.put(`/budgets/${id}`, payload);
  return res.data;
}