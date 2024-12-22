/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import TopNavigation from "../_components/top-navigation";
import getUserAndRole from "@/utils/getUserAndRole";

export default async function HomePage() {
  const { user } = await getUserAndRole();

  if (!user) return null;

  return (
    <div>
      <TopNavigation
        pageTitle={`Welcome back, ${user?.firstName || "Guest"}`}
      />
      <main className="p-4"></main>
    </div>
  );
}
