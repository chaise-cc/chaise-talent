import { LayoutTransition } from "@/LayoutTransition";

import "../_styles/index.scss";
import DesktopSideBar from "../_components/talent/sidebar/desktop.sidebar";
import DashboardHeader from "../_components/talent/header";

export default function TalentDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <DesktopSideBar />

      <div className="md:ml-60 w-full">
        <DashboardHeader />
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
