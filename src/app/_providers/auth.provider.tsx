"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserLogin } from "@/lib/zod/user.zod";
import { User } from "@/types";
import { login } from "../api/auth/login";

type AuthContextType = {
  authToken?: string | null;
  currentUser?: User | null;
  handleLogin: (data: UserLogin) => Promise<void>;
  handleLogout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  status: number | null;
};

type AuthProviderProps = PropsWithChildren;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const router = useRouter();

  async function handleLogin(data: UserLogin) {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        setAuthToken(token);
        setIsAuthenticated(true);
      }
    }

    setLoading(true);
    setStatus(null);

    try {
      const [loginStatus, response] = await login(data);

      if (loginStatus === 500) {
        setStatus(loginStatus);
        setAuthToken(null);
        setCurrentUser(null);
        setIsAuthenticated(false);
        return;
      }

      const { authToken, user } = response;
      setAuthToken(authToken);
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("authToken", authToken || "");
      setStatus(loginStatus);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setStatus(500);
    } finally {
      setLoading(false);
    }

    return;
  }

  async function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }

    setAuthToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false); // This should be set before the redirect
    router.push("/login");

    return;
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        currentUser,
        handleLogout,
        handleLogin,
        isAuthenticated,
        loading,
        status,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside of an AuthProvider");
  }
  return context;
}
