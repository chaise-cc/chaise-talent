/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import AccountSwitcher from "@/components/custom/AccountSwitcher";
import getUserAndRole from "@/utils/getUserAndRole";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { activeRole } = await getUserAndRole();

  // Redirect based on active role
  if (!activeRole) {
    return redirect("/auth/login");
  }
  return (
    <div>
      <h2>Top Navigation</h2>
      <main className="p-4">
        <p>Explore your dashboard and make the most of your account.</p>

        <AccountSwitcher activeRole={activeRole} />
      </main>
    </div>
  );
}
