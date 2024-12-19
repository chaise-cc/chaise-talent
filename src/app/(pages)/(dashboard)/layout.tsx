/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { User } from "@/types";
import { decrypt } from "@/lib/session";
import ClientDashboardLayout from "./_layouts/ClientDashboardLayout";
import TalentDashboardLayout from "./_layouts/TalentDashboardLayout";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  // Handle loading, unauthenticated, or invalid user states
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading or user not authenticated...</p>
      </div>
    );
  }

  // Ensure user has an activeRole
  if (!activeRole) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Active role is missing. Please contact support.</p>
      </div>
    );
  }

  // Render the appropriate dashboard layout based on activeRole
  if (activeRole === "client") {
    return <ClientDashboardLayout>{children}</ClientDashboardLayout>;
  } else if (activeRole === "talent") {
    return <TalentDashboardLayout>{children}</TalentDashboardLayout>;
  } else {
    // Handle cases where activeRole doesn't match expected values
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Invalid account type. Please log in again.</p>
      </div>
    );
  }
}

// Type guard to check if data contains a valid User object
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
