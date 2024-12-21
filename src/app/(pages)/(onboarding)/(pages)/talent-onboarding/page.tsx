import getUserAndRole from "@/utils/getUserAndRole";
import { redirect } from "next/navigation";
import React from "react";

export default async function TalentOnboardingPage() {
  const { activeRole } = await getUserAndRole();

  if (activeRole !== "talent") return redirect("/auth/login");

  return <div className="container">TalentOnboardingPage</div>;
}
