"use client";

import React from "react";
import TopNavigation from "../_components/top-navigation";
import { useAuth } from "@/app/_providers/auth.provider";

export default function HomePage() {
  const { currentUser: user, loading } = useAuth();

  // Handle loading state
  if ((loading && user === null) || undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <TopNavigation pageTitle={`Welcome back, ${user?.firstName}`} />
      <main className="p-4">
        <p>Explore your dashboard and make the most of your account.</p>
      </main>
    </div>
  );
}
