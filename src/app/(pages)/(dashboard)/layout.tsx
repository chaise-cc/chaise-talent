import { redirect } from "next/navigation";

import { LayoutTransition } from "@/LayoutTransition";

import NotificationSidebar from "./_components/sidebar/NotificationSidebar";
import DesktopSideBar from "./_components/sidebar/desktop.sidebar";
import MobileNavbarDashboard from "./_components/sidebar/mobile.sidebar";
import DashboardHeader from "./_components/header";

import "./_styles/index.scss";

import getUserAndRole from "@/utils/getUserAndRole";
import { isMobile } from "@/utils/checkDeviceIsMobile";
import { Toaster } from "@/components/ui/sonner";

export default async function TalentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, activeRole } = await getUserAndRole();
  const deviceIsMobile = await isMobile();

  // Handle unauthenticated or incomplete states
  if (!user || !activeRole) {
    return (
      <div className="flex justify-center items-center h-screen animate-pulse font-medium">
        <p>Loading...</p>
      </div>
    );
  }

  if (activeRole === "client") {
    return redirect("/panel");
  }

  return (
    <div className="flex w-full">
      <DesktopSideBar />
      <div className="md:ml-64 w-full">
        <LayoutTransition
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <DashboardHeader activeRole={activeRole} user={user} />
          <NotificationSidebar />
          <main className="p-4 w-full">{children}</main>
          {deviceIsMobile && <MobileNavbarDashboard />}

          <Toaster richColors position="top-right" />
        </LayoutTransition>
      </div>
    </div>
  );
}
