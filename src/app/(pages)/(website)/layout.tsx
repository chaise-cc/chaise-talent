import Header from "./_components/header";
import getUserAndRole from "@/utils/getUserAndRole";

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getUserAndRole();

  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
}
