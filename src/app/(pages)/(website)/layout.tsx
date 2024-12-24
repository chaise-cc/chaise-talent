import Header from "./_components/header";
import getUserAndRole from "@/utils/getUserAndRole";
import "./_styles/index.scss";
import SideBarProvider from "@/app/_providers/sidebar.provider";
import WebsiteMobileHeader from "./_components/WebsiteMobileHeader";
import SideBarWebsiteMobile from "./_components/sidebarWebsite";

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, activeRole } = await getUserAndRole();

  return (
    <SideBarProvider>
      <Header user={user} activeRole={activeRole} />
      <WebsiteMobileHeader user={user} />
      <SideBarWebsiteMobile user={user} />

      {children}
    </SideBarProvider>
  );
}
