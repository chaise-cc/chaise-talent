import React from "react";
import TopNavigation from "../_components/top-navigation";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { User } from "@/types";

export default async function HomePage() {
  // Fetch cookies
  const cookiesStore = await cookies();
  const token = cookiesStore.get("session")?.value;

  let user: User | null = null;

  if (token) {
    try {
      const decryptedData = await decrypt(token);

      // Ensure decryptedData matches the User type
      if (isUser(decryptedData)) {
        user = decryptedData;
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
  return (
    <div>
      <TopNavigation pageTitle={`Welcome back, ${user.firstName || "Guest"}`} />
      <main className="p-4">
        <p>Explore your dashboard and make the most of your account.</p>
      </main>
    </div>
  );
}

// Type guard to check if data is of type User
function isUser(data: unknown): data is User {
  return (
    typeof data === "object" &&
    data !== null &&
    "firstName" in data &&
    "lastName" in data &&
    "email" in data
  );
}
