import { api } from "./api";

export interface Category {
  name: string;
  id: number;
  user_id: number;
}

export async function getCategories() {
  const res = await api.get<Category[]>("/categories/")
  return res.data;
}

export async function createCategory(payload: { name: string; }) {
  const res = await api.post<Category>("/categories/", payload);
  return res.data;
}

export async function deleteCategory(id: number) {
  const res = await api.delete<Category>(`/categories/${id}/`);
  return res.data;
}

export async function updateCategory(id: number, payload: { name: string; }) {
  const res = await api.put<Category>(`/categories/${id}/`, payload);
  return res.data;
}