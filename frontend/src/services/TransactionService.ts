import { api } from "./api";

export interface Transaction {
  name: string;
  id: number;
  user_id: number;
  category_id: number;
  amount: number;
  period: string;
}

export async function getTransaction() {
  const res = await api.get<Transaction[]>("/transactions/")
  return res.data;
}

export async function createTransaction(payload: { name: string; category_id: number; amount: number; period?: string }) {
  const res = await api.post<Transaction>("/transactions/", payload);
  return res.data;
}

export async function deleteTransaction(id: number) {
  const res = await api.delete<Transaction>(`/transactions/${id}/`);
  return res.data;
}