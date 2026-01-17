import { api } from "./api";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string; // "bearer"
  user: AuthUser;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export async function register(payload: RegisterRequest): Promise<AuthUser> {
  const res = await api.post<AuthUser>("/auth/register", payload);
  return res.data;
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  return res.data;
}

export async function me(): Promise<AuthUser> {
  const res = await api.get<AuthUser>("/auth/me");
  return res.data;
}

// will implement later
export async function logout(): Promise<void> {
  await api.post("/auth/logout").catch(() => {
  });
}
