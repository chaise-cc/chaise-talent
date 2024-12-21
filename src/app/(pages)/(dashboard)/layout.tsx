/* eslint-disable @typescript-eslint/no-explicit-any */
import { LayoutTransition } from "@/LayoutTransition";
import "./_styles/index.scss";
import { cookies } from "next/headers";
import { User } from "@/types";
import { redirect } from "next/navigation";
import { decrypt } from "@/lib/session";
import DesktopSideBar from "./_components/sidebar/desktop.sidebar";
import DashboardHeader from "./_components/header";
import { NotificationProvider } from "./_providers/NotificationProvider";
import NotificationSidebar from "./_components/sidebar/NotificationSidebar";
// import NotificationSidebarClient from "./_components/notifications/NotificationSidebarClient";

export default async function TalentDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const notifications = [
    {
      id: 1,
      title: "New Message",
      message: "You have a message from Jane.",
      timestamp: "2 mins ago",
      read: false,
      link: "/dashboard/messages/123", // Example event URL
    },
    {
      id: 2,
      title: "System Update",
      message: "System update completed.",
      timestamp: "1 hour ago",
      read: true,
      link: "/dashboard/system-updates",
    },
    {
      id: 3,
      title: "Reminder",
      message: "Team meeting tomorrow.",
      timestamp: "3 hours ago",
      read: false,
      link: "/dashboard/calendar/events/456",
    },
  ];

  const cookiesStore = await cookies();
  const token = cookiesStore.get("session")?.value;

  let user: User | null = null;
  let activeRole: string | undefined;

  if (token) {
    try {
      const decryptedData = await decrypt(token);
      activeRole = decryptedData?.activeRole;

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
      <div className="flex justify-center items-center h-screen animate-pulse font-medium">
        <p>Loading...</p>
      </div>
    );
  }

  if (activeRole == "client") return redirect("/panel");

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
            <DashboardHeader
              notifications={notifications}
              user={user}
              activeRole={activeRole}
            />

            <NotificationSidebar notifications={notifications} />

            <main className="p-4 w-full">{children}</main>
          </LayoutTransition>
        </div>
      </div>
    </NotificationProvider>
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
