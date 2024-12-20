/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { User } from "@/types";
import AccountSwitcher from "@/components/custom/AccountSwitcher";

export default async function HomePage() {
  // Fetch cookies
  const cookiesStore = await cookies();
  const token = cookiesStore.get("session")?.value;

  let user: User | null = null;
  let activeRole: string | undefined;

  if (token) {
    try {
      const decryptedData = await decrypt(token);
      activeRole = decryptedData?.activeRole;

      // Ensure decryptedData contains a valid User object
      if (isUser(decryptedData)) {
        user = decryptedData.user; // Access user from decrypted data
      } else {
        console.warn("Decrypted data is not of type User.");
      }
    } catch (error) {
      console.error("Failed to decrypt session token:", error);
    }
  }

  // Handle loading or unauthenticated states
  if (!user || !activeRole) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Top Navigation</h2>
      <main className="p-4">
        <p>Explore your dashboard and make the most of your account.</p>

        <AccountSwitcher accounts={user.accounts} activeRole={activeRole} />
      </main>
    </div>
  );
}

function isUser(data: unknown): data is { user: User } {
  return (
    typeof data === "object" &&
    data !== null &&
    "user" in data &&
    typeof (data as any).user === "object" &&
    (data as any).user !== null &&
    "firstName" in (data as any).user &&
    "lastName" in (data as any).user &&
    "email" in (data as any).user &&
    "activeRole" in (data as any).user
  );
}
