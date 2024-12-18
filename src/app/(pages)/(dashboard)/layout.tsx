import DashboardHeader from "./_components/header";
import DesktopSideBar from "./_components/sidebar/desktop.sidebar";
import "./_styles/index.scss";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <DesktopSideBar />

      <div className="md:ml-60 w-full">
        <DashboardHeader />
        <main className="p-4 w-full">{children}</main>
      </div>
    </div>
  );
}
