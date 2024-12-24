import SideBarProvider from "@/app/_providers/sidebar.provider";
import Header from "../(website)/_components/header";
import WebsiteMobileHeader from "../(website)/_components/WebsiteMobileHeader";
import SideBarWebsiteMobile from "../(website)/_components/sidebarWebsite";
import getUserAndRole from "@/utils/getUserAndRole";
import SiteFooter from "../(website)/_components/footer";

export default async function BlogLayout({
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

      <SiteFooter />
    </SideBarProvider>
  );
}
