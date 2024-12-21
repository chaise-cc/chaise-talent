import getUserAndRole from "@/utils/getUserAndRole";
import React from "react";
import ClientOnboardingIndex from "../_screens/client";
import TalentOnboardingIndex from "../_screens/talent";

export default async function OnboardingPage() {
  const { activeRole } = await getUserAndRole();

  if (!activeRole) return null;

  return (
    <div className="container">
      {activeRole === "client" ? (
        <ClientOnboardingIndex />
      ) : (
        <TalentOnboardingIndex />
      )}
    </div>
  );
}
