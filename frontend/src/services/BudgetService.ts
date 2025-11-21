import { api } from "./api";

export interface Budget {
  name: string;
  id: number;
  user_id: number;
  category_id: number;
  amount: number;
  period: string;
}

export async function getBudgets(userId: number) {
  const res = await api.get<Budget[]>("/budgets", { params: { user_id: userId}})
  return res.data;
}

export async function createBudget(payload: { name: string; user_id: number; category_id: number; amount: number; period?: string }) {
  const res = await api.post<Budget>("/budgets", payload);
  return res.data;
}

export async function deleteBudget(id: number) {
  const res = await api.delete<Budget>(`/budgets/${id}`);
  return res.data;
}