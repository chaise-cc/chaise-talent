import getUserAndRole from "@/utils/getUserAndRole";
import { redirect } from "next/navigation";
import React from "react";

export default async function ClientOnboardingPage() {
  const { activeRole } = await getUserAndRole();

  if (activeRole !== "client") return redirect("/login");

  return <div className="container">ClientOnboardingPage</div>;
}
