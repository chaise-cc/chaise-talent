import getUserAndRole from "@/utils/getUserAndRole";

import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const { activeRole } = await getUserAndRole();

  if (!activeRole) return null;

  if (activeRole === "client") redirect("/onboarding/client");
  if (activeRole === "talent") redirect("/onboarding/talent");
}
