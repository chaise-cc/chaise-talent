/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { User } from "@/types";
import ClientHomePageScreen from "@/app/_screens/client/HomePage.screen";
import TalentHomePageScreen from "@/app/_screens/talent/HomePage.screen";

export default async function HomePage() {
  // Fetch cookies
  const cookiesStore = await cookies();
  const token = cookiesStore.get("session")?.value;

  let user: User | null = null;
  let activeRole;

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
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Render the main content
  return activeRole === "client" ? (
    <ClientHomePageScreen user={user} activeRole={activeRole} />
  ) : (
    activeRole === "talent" && (
      <TalentHomePageScreen activeRole={activeRole} user={user} />
    )
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
