/* eslint-disable @typescript-eslint/no-explicit-any */
import { LayoutTransition } from "@/LayoutTransition";

import "./_styles/index.scss";
import { cookies } from "next/headers";
import { User } from "@/types";
import { redirect } from "next/navigation";
import { decrypt } from "@/lib/session";
import DesktopSideBar from "./_components/sidebar/desktop.sidebar";
import DashboardHeader from "./_components/header";

export default async function TalentDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  if (activeRole == "client") return redirect("/panel");

  return (
    <div className="flex w-full">
      <DesktopSideBar />

      <div className="md:ml-60 w-full">
        <DashboardHeader user={user} activeRole={activeRole} />
        <main className="p-4 w-full">
          <LayoutTransition
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </LayoutTransition>
        </main>
      </div>
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
