import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthUser, LoginRequest, RegisterRequest } from "@/types/auth";
import * as AuthService from "@/services/AuthService";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  // Bootstraps auth on page refresh
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;
        const me = await AuthService.me();
        setUser(me);
      } catch {
        localStorage.removeItem("access_token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = async (data: LoginRequest) => {
    const res = await AuthService.login(data);
    localStorage.setItem("access_token", res.access_token);
    setUser(res.user);
  };

  const register = async (data: RegisterRequest) => {
    await AuthService.register(data);
    navigate("/login");

  };

  const logout = async () => {
    await AuthService.logout();
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
