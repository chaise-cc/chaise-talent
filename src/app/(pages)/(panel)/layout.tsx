/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation";
import { LayoutTransition } from "@/LayoutTransition";

import "./_styles/index.scss";

import getUserAndRole from "@/utils/getUserAndRole";

export default async function ClientDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, activeRole } = await getUserAndRole();

  // Handle unauthenticated or incomplete states
  if (!user || !activeRole) {
    return (
      <div className="flex justify-center items-center h-screen animate-pulse font-medium">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect based on active role
  if (activeRole === "talent") {
    return redirect("/dashboard");
  }

  return (
    <div className="flex w-full">
      {/* <DesktopSideBar /> */}

      <div className="md:ml-60 w-full">
        {/* <DashboardHeader /> */}
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
