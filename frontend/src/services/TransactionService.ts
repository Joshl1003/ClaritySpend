import { api } from "./api";

export interface Transaction {
  description: string;
  id: number;
  user_id: number;
  category_id: number;
  category_name: string;
  amount: number;
  date: string;
}

export async function getTransactions() {
  const res = await api.get<Transaction[]>("/transactions/")
  return res.data;
}

export async function createTransaction(payload: { description: string; category_id: number; amount: number; date?: string }) {
  const res = await api.post<Transaction>("/transactions/", payload);
  return res.data;
}

export async function deleteTransaction(id: number) {
  const res = await api.delete<Transaction>(`/transactions/${id}/`);
  return res.data;
}