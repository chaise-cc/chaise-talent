import Header from "./_components/header";
import getUserAndRole from "@/utils/getUserAndRole";
import "./_styles/index.scss";
import SideBarProvider from "@/app/_providers/sidebar.provider";
import WebsiteMobileHeader from "./_components/WebsiteMobileHeader";
import SideBarWebsiteMobile from "./_components/sidebarWebsite";
import SiteFooter from "./_components/footer";
import getAllServiceCategories from "@/utils/pb/services/getAllServiceCategories";

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, activeRole } = await getUserAndRole();
  const serviceCategories = await getAllServiceCategories();

  return (
    <SideBarProvider>
      <Header
        serviceCategories={serviceCategories}
        user={user}
        activeRole={activeRole}
      />

      <WebsiteMobileHeader user={user} />
      <SideBarWebsiteMobile user={user} />

      {children}

      <SiteFooter />
    </SideBarProvider>
  );
}
