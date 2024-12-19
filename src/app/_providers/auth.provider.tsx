"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import { logout as logoutAction } from "@/app/_actions/auth.action"; // Import the logout function

type AuthContextType = {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  status: number | null;
  logout: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<number | null>(null);

  // Fetch session on mount and after login
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true); // Set loading to true before the fetch
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.user);
          setIsAuthenticated(true);
        } else {
          handleAuthError(res.status);
        }
      } catch (error) {
        console.error("Failed to initialize authentication:", error);
        handleAuthError(500); // Internal server error
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
      }
    };

    initializeAuth();
  }, []); // On mount or after login

  // Helper function to handle authentication errors
  const handleAuthError = (statusCode: number) => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setStatus(statusCode);
  };

  // The logout function now uses the one from auth.actions
  const logout = async () => {
    try {
      await logoutAction(); // Call the logout function from auth.actions
      setCurrentUser(null);
      setIsAuthenticated(false);
      setStatus(null);
      window.location.href = "/auth/login"; // Redirect to login page after logout
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loading,
        status,
        logout,
      }}
    >
      {/* Conditionally render based on loading */}
      {loading ? (
        <div>Loading...</div> // Placeholder while data is being fetched
      ) : (
        children
      )}
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
