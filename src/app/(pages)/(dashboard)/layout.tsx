import { LayoutTransition } from "@/LayoutTransition";

import { NotificationProvider } from "@/app/_providers/notification.provider";

import DashboardHeader from "./_components/header";
import NotificationSidebar from "./_components/sidebar/NotificationSidebar";

import DesktopSideBar from "./_components/sidebar/desktop.sidebar";

import "./_styles/index.scss";
import getUserAndRole from "@/utils/getUserAndRole";
import { redirect } from "next/navigation";

export default async function TalentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
  if (activeRole === "client") {
    return redirect("/panel");
  }

  // handleRoleRedirection(activeRole);

  return (
    <NotificationProvider>
      <div className="flex w-full">
        <DesktopSideBar />

        <div className="md:ml-64 w-full">
          <LayoutTransition
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DashboardHeader activeRole={activeRole} user={user} />

            <NotificationSidebar />

            <main className="p-4 w-full">{children}</main>
          </LayoutTransition>
        </div>
      </div>
    </NotificationProvider>
  );
}
